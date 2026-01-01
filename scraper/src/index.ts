import 'dotenv/config';
import puppeteerExtra from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Page } from 'puppeteer';
import { Pool } from 'pg';
import net from 'node:net';
import { URL } from 'node:url';


interface ScrapedProduct {
  name: string;
  price: number;
  store: string;
  imageUrl: string;
  category: string;
  link: string;
}

const puppeteer = puppeteerExtra.default ?? puppeteerExtra;
puppeteer.use(StealthPlugin());

async function preflightDbTcpCheck(connectionString: string, timeoutMs: number) {
  const url = new URL(connectionString);
  const host = url.hostname;
  const port = Number(url.port || '5432');

  await new Promise<void>((resolve, reject) => {
    const socket = net.connect({ host, port });
    const timeoutId = setTimeout(() => {
      socket.destroy(new Error(`TCP connect timed out after ${timeoutMs}ms`));
    }, timeoutMs);

    socket.once('connect', () => {
      clearTimeout(timeoutId);
      socket.end();
      resolve();
    });

    socket.once('error', (err) => {
      clearTimeout(timeoutId);
      reject(err);
    });
  });
}

async function uploadToDB(products: ScrapedProduct[]) {
  if (products.length === 0) {
    console.log('⚠️ No products to upload.');
    return;
  }
  
  console.log(`📤 Uploading ${products.length} products to GLOSSY database...`);

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('❌ Upload Failed: DATABASE_URL is not set.');
    return;
  }

  const dbUrl = new URL(connectionString);
  const dbHost = dbUrl.hostname;
  const dbPort = dbUrl.port || '5432';
  console.log(`🔌 DB target: ${dbHost}:${dbPort}${dbUrl.pathname}`);

  const connectTimeoutMs = Number(process.env.PG_CONNECT_TIMEOUT_MS || '30000');

  try {
    // Fail fast with a clearer error if the network path is blocked.
    await preflightDbTcpCheck(connectionString, Math.min(5000, connectTimeoutMs));
  } catch (err) {
    console.error('❌ Cannot reach Postgres over TCP. This is usually network/permissions (RDS private subnet, security group inbound, VPN/corp firewall), not your insert loop.', err);
    console.error('   If the DB is in a private VPC, run this scraper on an EC2/bastion in the VPC or use SSH port-forwarding and point DATABASE_URL at localhost.');
    return;
  }
  
  const pool = new Pool({ 
    connectionString,
    max: 1,
    connectionTimeoutMillis: connectTimeoutMs,
    ssl: { rejectUnauthorized: false },
  });
  
  try {
    const client = await pool.connect();
    
    try {
      let insertedCount = 0;
      
      for (const product of products) {
        try {
          await client.query(
            `INSERT INTO "Product" (name, price, store, "imageUrl", category, link, "scrapedAt")
             VALUES ($1, $2, $3, $4, $5, $6, NOW())
             ON CONFLICT (name, store) DO NOTHING`,
            [product.name, product.price, product.store, product.imageUrl, product.category, product.link]
          );
          insertedCount++;
        } catch (err) {
          console.error(`Failed to insert product: ${product.name}`, err);
        }
      }
      
      console.log(`✅ Upload Success: ${insertedCount} products saved`);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('❌ Upload Failed:', error);
  } finally {
    await pool.end();
  }
}

async function scrapePage(page: Page, url: string): Promise<ScrapedProduct[]> {
  console.log(`🕵️ Scraping YesStyle: ${url}`);
  
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    await new Promise(resolve => setTimeout(resolve, 2000));

    const products = await page.evaluate(() => {
      const results: ScrapedProduct[] = [];
      const debug = { foundContainers: 0, success: 0, noLink: 0 };
      
      // Target product containers on YesStyle
      const productContainers = Array.from(document.querySelectorAll('a[class*="itemContainer"]'));
      debug.foundContainers = productContainers.length;
      
      for (const container of productContainers) {
        try {
          // Container is an <a> tag, so href is the link
          const link = (container as HTMLAnchorElement).href || '';
          if (!link) {
            debug.noLink++;
            continue;
          }
          
          // Get product name
          const nameEl = container.querySelector('div[class*="itemContent"]');
          const name = nameEl?.textContent?.trim() || '';
          if (!name || name.length < 3) continue;
          
          // Get price (in INR)
          const priceEl = container.querySelector('b[class*="itemPrice"]');
          const priceText = priceEl?.textContent || '0';
          const price = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;
          if (price <= 0) continue;
          
          // Get image
          const imgEl = container.querySelector('img') as HTMLImageElement;
          const imageUrl = imgEl?.src || imgEl?.dataset.src || '';
          if (!imageUrl) continue;
          
          results.push({
            name: name.substring(0, 200),
            price,
            store: 'YesStyle',
            imageUrl,
            category: 'Skincare',
            link,
          });
          debug.success++;
        } catch (e) {
          console.log('Error parsing product:', e);
          continue;
        }
      }
      
      return { products: results, debug };
    });

    console.log(`DEBUG:`, products.debug);
    console.log(`📦 Found ${products.products.length} items`);
    return products.products;
    
  } catch (error) {
    console.error(`Error scraping:`, error);
    return [];
  }
}

async function scrapeYesStyle(totalPages: number = 1): Promise<ScrapedProduct[]> {
  console.log(`\n🚀 Starting YesStyle scraper (${totalPages} pages)...`);
  const browser = await puppeteer.launch({ 
    headless: true,
    args: [
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });
  
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36');
  await page.setViewport({ width: 1366, height: 768 });

  const allProducts: ScrapedProduct[] = [];
  const baseUrl = 'https://www.yesstyle.com/en/beauty-skin-care/list.html/bcc.15544_bpt.46';

  try {
    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      const pageUrl = pageNum === 1 ? baseUrl : `${baseUrl}?page=${pageNum}`;
      
      try {
        const products = await scrapePage(page, pageUrl);
        allProducts.push(...products);
        console.log(`✅ Page ${pageNum}/${totalPages} done. Total: ${allProducts.length} products`);
        
        if (pageNum < totalPages) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      } catch (pageError) {
        console.error(`Error on page ${pageNum}:`, pageError);
        continue;
      }
    }
    
    return allProducts;
  } finally {
    await browser.close();
  }
}

(async () => {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🚀 GLOSSY Scraper - YesStyle Only`);
  console.log(`${'='.repeat(60)}`);
  
  const pagesToScrape = 1; // Change to 2, 3, etc for more pages
  
  try {
    const products = await scrapeYesStyle(pagesToScrape);
    
    const cleanProducts = products.filter((p) => p.name && p.price > 0);
    
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📊 Summary: ${cleanProducts.length} valid products`);
    console.log(`${'='.repeat(60)}\n`);
    
    await uploadToDB(cleanProducts);
  } catch (error) {
    console.error('❌ Fatal error:', error);
  }
})().catch(console.error);
