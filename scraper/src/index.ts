import puppeteerExtra from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Page } from 'puppeteer';

interface ScrapedProduct {
  name: string;
  price: number;
  store: string;
  imageUrl: string;
  category: string;
  link: string;
}

// 2. Add Stealth Plugin to avoid detection
const puppeteer = puppeteerExtra.default ?? puppeteerExtra;
puppeteer.use(StealthPlugin());

// 3. The Uploader (Talks to your Next.js API)
async function uploadToDB(products: ScrapedProduct[]) {
  if (products.length === 0) {
    console.log('⚠️ No products to upload.');
    return;
  }
  
  console.log(`📤 Uploading ${products.length} products to GLOSSY database...`);
  console.log('📋 Sample product:', JSON.stringify(products[0], null, 2));
  try {
    const response = await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ products }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Status: ${response.status} - ${JSON.stringify(errorData)}`);
    }
    const result = await response.json();
    console.log('✅ Upload Success:', result);
  } catch (error) {
    console.error('❌ Upload Failed:', error);
  }
}

// 4. The Scraper Logic - scrapes a single page
async function scrapePage(page: Page, url: string): Promise<ScrapedProduct[]> {
  console.log(`🕵️ Scraping: ${url}`);
  
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
  
  // Wait for products to load - using the exact class from YesStyle
  await page.waitForSelector('a[class*="itemContainer"]', { timeout: 30000 });
  await autoScroll(page);
  
  // Give time for lazy-loaded images
  await new Promise(resolve => setTimeout(resolve, 2000));

  // EXTRACT DATA using YesStyle's exact selectors from the DOM
  const products = await page.evaluate(() => {
    const results: Array<{name: string; price: number; store: string; imageUrl: string; category: string; link: string}> = [];
    
    // Select all product containers using the exact class pattern
    const productContainers = Array.from(document.querySelectorAll('a[class*="itemContainer"]'));
    
    for (const container of productContainers) {
      // Get product name from itemContent div
      const contentDiv = container.querySelector('div[class*="itemContent"]');
      const name = contentDiv?.textContent?.trim() || '';
      
      // Skip if no name
      if (!name || name.length < 3) continue;
      
      // Get current price from <b class="...itemPrice...">
      const priceEl = container.querySelector('b[class*="itemPrice"]');
      const priceText = priceEl?.textContent || '0';
      // Remove "INR", spaces, &nbsp; and commas, then parse
      const price = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;
      
      // Get image from <img class="MuiBox-root...">
      const imgEl = container.querySelector('img');
      const imageUrl = imgEl?.getAttribute('src') || imgEl?.getAttribute('data-src') || '';
      
      // Get link from the anchor tag href
      const link = (container as HTMLAnchorElement).getAttribute('href') || '';
      
      if (name && price > 0 && imageUrl && link) {
        results.push({
          name: name.substring(0, 200),
          price,
          store: 'YesStyle',
          imageUrl,
          category: 'Skincare',
          link,
        });
      }
    }
    
    return results;
  });

  console.log(`📦 Found ${products.length} items on this page.`);
  return products;
}

// Scrape multiple pages
async function scrapeYesStyle(baseUrl: string, totalPages: number = 1): Promise<ScrapedProduct[]> {
  console.log(`🚀 Starting scrape of ${totalPages} pages...`);
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });

  const allProducts: ScrapedProduct[] = [];

  try {
    for (let pageNum = 1; pageNum <= 1; pageNum++) {
      // YesStyle pagination uses ?page=X parameter
      const pageUrl = pageNum === 1 ? baseUrl : `${baseUrl}?page=${pageNum}`;
      
      const products = await scrapePage(page, pageUrl);
      allProducts.push(...products);
      
      console.log(`✅ Page ${pageNum}/${totalPages} done. Total products so far: ${allProducts.length}`);
      
      // Small delay between pages to be polite to the server
      if (pageNum < totalPages) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    return allProducts;

  } catch (error) {
    console.error("Scrape Error:", error);
    return allProducts; // Return what we got so far
  } finally {
    await browser.close();
  }
}

// Helper to scroll down page (triggers lazy loading)
async function autoScroll(page: Page) {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 200);
    });
  });
}

// 5. Main Execution
(async () => {
  const targetUrl = 'https://www.yesstyle.com/en/beauty-skin-care/list.html/bcc.15544_bpt.46';
  
  // ⬇️ CHANGE THIS NUMBER to scrape more pages (max 168 for this category)
  const pagesToScrape = 1; // Start small to test, then increase
  
  const scrapedProducts = await scrapeYesStyle(targetUrl, pagesToScrape);
  
  // Filter out bad data before uploading
  const cleanProducts = scrapedProducts.filter((p: ScrapedProduct) => p.name !== 'Unknown' && p.price > 0);
  
  console.log(`\n📊 Summary: ${cleanProducts.length} valid products from ${pagesToScrape} pages`);
  
  await uploadToDB(cleanProducts);
})();