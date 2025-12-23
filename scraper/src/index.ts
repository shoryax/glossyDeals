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

interface StoreConfig {
  name: string;
  baseUrl: string;
  selectors: {
    productContainer: string;
    productName: string;
    productPrice: string;
    productImage: string;
    productLink: string;
  };
  getPaginationUrl: (baseUrl: string, pageNum: number) => string;
  priceParser: (priceText: string) => number;
}

// Store configurations
const storeConfigs: StoreConfig[] = [
  {
    name: 'YesStyle',
    baseUrl: 'https://www.yesstyle.com/en/beauty-skin-care/list.html/bcc.15544_bpt.46',
    selectors: {
      productContainer: 'a[class*="itemContainer"]',
      productName: 'div[class*="itemContent"]',
      productPrice: 'b[class*="itemPrice"]',
      productImage: 'img',
      productLink: 'a',
    },
    getPaginationUrl: (baseUrl, pageNum) => 
      pageNum === 1 ? baseUrl : `${baseUrl}?page=${pageNum}`,
    priceParser: (text) => parseFloat(text.replace(/[^0-9.]/g, '')) || 0,
  },
  {
    name: 'Jolse',
    baseUrl: 'https://www.jolse.com/category/skincare/1',
    selectors: {
      productContainer: 'div[class*="product-item"]',
      productName: 'h2[class*="product-title"]',
      productPrice: 'span[class*="price"]',
      productImage: 'img[class*="product-image"]',
      productLink: 'a[class*="product-link"]',
    },
    getPaginationUrl: (baseUrl, pageNum) => 
      pageNum === 1 ? baseUrl : `${baseUrl}?p=${pageNum}`,
    priceParser: (text) => parseFloat(text.replace(/[^0-9.]/g, '')) || 0,
  },
  {
    name: 'StyleVana',
    baseUrl: 'https://www.stylevana.com/en_US/skincare.html',
    selectors: {
      productContainer: 'div[class*="product-item"]',
      productName: 'a[class*="product-title"]',
      productPrice: 'span[class*="product-price"]',
      productImage: 'img[class*="product-img"]',
      productLink: 'a[class*="product-item-link"]',
    },
    getPaginationUrl: (baseUrl, pageNum) => 
      pageNum === 1 ? baseUrl : `${baseUrl}?page=${pageNum}`,
    priceParser: (text) => parseFloat(text.replace(/[^0-9.]/g, '')) || 0,
  },
];

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

// 4. The Scraper Logic - scrapes a single page for a specific store
async function scrapePage(page: Page, url: string, storeConfig: StoreConfig): Promise<ScrapedProduct[]> {
  console.log(`🕵️ Scraping ${storeConfig.name}: ${url}`);
  
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
  
  // Wait for products to load
  await page.waitForSelector(storeConfig.selectors.productContainer, { timeout: 30000 });
  await autoScroll(page);
  
  // Give time for lazy-loaded images
  await new Promise(resolve => setTimeout(resolve, 2000));

  // EXTRACT DATA using store-specific selectors
  const products = await page.evaluate((config) => {
    const results: Array<{name: string; price: number; store: string; imageUrl: string; category: string; link: string}> = [];
    const debug = { foundContainers: 0, noName: 0, noPrice: 0, noImage: 0, noLink: 0, success: 0 };
    
    // Select all product containers
    const productContainers = Array.from(document.querySelectorAll(config.selectors.productContainer));
    debug.foundContainers = productContainers.length;
    
    for (const container of productContainers) {
      // Get product name
      const nameEl = container.querySelector(config.selectors.productName);
      const name = nameEl?.textContent?.trim() || '';
      
      // Skip if no name
      if (!name || name.length < 3) {
        debug.noName++;
        continue;
      }
      
      // Get price
      const priceEl = container.querySelector(config.selectors.productPrice);
      const priceText = priceEl?.textContent || '0';
      const price = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;
      
      if (price === 0) {
        debug.noPrice++;
      }
      
      // Get image URL
      const imgEl = container.querySelector(config.selectors.productImage);
      const imageUrl = imgEl?.getAttribute('src') || imgEl?.getAttribute('data-src') || '';
      
      if (!imageUrl) {
        debug.noImage++;
      }
      
      // Get product link
      let link = '';
      const linkEl = container.querySelector(config.selectors.productLink);
      if (linkEl) {
        link = (linkEl as HTMLAnchorElement).getAttribute('href') || '';
      }
      
      if (!link) {
        debug.noLink++;
      }
      
      // Make relative links absolute
      if (link && !link.startsWith('http')) {
        const baseUrl = window.location.origin;
        link = link.startsWith('/') ? baseUrl + link : baseUrl + '/' + link;
      }
      
      if (name && price > 0 && imageUrl && link) {
        results.push({
          name: name.substring(0, 200),
          price,
          store: config.name,
          imageUrl,
          category: 'Skincare',
          link,
        });
        debug.success++;
      }
    }
    
    return { products: results, debug };
  }, storeConfig);

  console.log(`DEBUG: ${storeConfig.name}:`, products.debug);
  const actualProducts = products.products;

  console.log(`📦 Found ${actualProducts.length} items on this page.`);
  return actualProducts;
}

// Scrape multiple pages from a specific store
async function scrapeStore(storeConfig: StoreConfig, totalPages: number = 1): Promise<ScrapedProduct[]> {
  console.log(`🚀 Starting scrape of ${storeConfig.name} (${totalPages} pages)...`);
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });

  const allProducts: ScrapedProduct[] = [];

  try {
    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      const pageUrl = storeConfig.getPaginationUrl(storeConfig.baseUrl, pageNum);
      
      const products = await scrapePage(page, pageUrl, storeConfig);
      allProducts.push(...products);
      
      console.log(`✅ Page ${pageNum}/${totalPages} done. Total products so far: ${allProducts.length}`);
      
      // Small delay between pages to be polite to the server
      if (pageNum < totalPages) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    return allProducts;

  } catch (error) {
    console.error(`Scrape Error for ${storeConfig.name}:`, error);
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

// 5. Main Execution - Scrape all stores
(async () => {
  const pagesToScrape = 1; // Start small to test, then increase
  
  let allScrapedProducts: ScrapedProduct[] = [];
  
  // Scrape each store sequentially
  for (const storeConfig of storeConfigs) {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`Starting ${storeConfig.name}...`);
    console.log(`${'='.repeat(50)}\n`);
    
    try {
      const products = await scrapeStore(storeConfig, pagesToScrape);
      allScrapedProducts = allScrapedProducts.concat(products);
      
      // Delay between stores
      await new Promise(resolve => setTimeout(resolve, 3000));
    } catch (error) {
      console.error(`Failed to scrape ${storeConfig.name}:`, error);
    }
  }
  
  // Filter out bad data before uploading
  const cleanProducts = allScrapedProducts.filter((p: ScrapedProduct) => p.name !== 'Unknown' && p.price > 0);
  
  console.log(`\n${'='.repeat(50)}`);
  console.log(`📊 Summary: ${cleanProducts.length} valid products from ${storeConfigs.length} stores`);
  console.log(`${'='.repeat(50)}\n`);
  
  // Show breakdown by store
  const storeBreakdown = cleanProducts.reduce((acc: {[key: string]: number}, p) => {
    acc[p.store] = (acc[p.store] || 0) + 1;
    return acc;
  }, {});
  
  console.log('Products by store:');
  Object.entries(storeBreakdown).forEach(([store, count]) => {
    console.log(`  ${store}: ${count}`);
  });
  
  await uploadToDB(cleanProducts);
})();