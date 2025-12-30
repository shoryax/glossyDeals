import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';
  const store = searchParams.get('store') || null;
  
  // Parse prices safely
  const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : null;
  const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : null;

  const client = await pool.connect();
  try {
    let query = 'SELECT * FROM products WHERE 1=1';
    const params: (string | number | null)[] = [];
    let paramCount = 1;

    // Add search filter
    if (search) {
      query += ` AND name ILIKE $${paramCount}`;
      params.push(`%${search}%`);
      paramCount++;
    }

    // Add store filter
    if (store) {
      query += ` AND store = $${paramCount}`;
      params.push(store);
      paramCount++;
    }

    // Add price range filters
    if (minPrice !== null) {
      query += ` AND price >= $${paramCount}`;
      params.push(minPrice);
      paramCount++;
    }

    if (maxPrice !== null) {
      query += ` AND price <= $${paramCount}`;
      params.push(maxPrice);
      paramCount++;
    }

    query += ' ORDER BY price ASC LIMIT 100';

    const result = await client.query(query, params);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  } finally {
    client.release();
  }
}

export async function POST(request: NextRequest) {
  const client = await pool.connect();
  try {
    const body = await request.json(); 
    
    // Safety check: ensure body.products exists and is an array
    if (!body.products || !Array.isArray(body.products)) {
        return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    console.log("📥 Received products:", body.products[0]);
    
    // Insert products one by one to handle any validation issues
    for (const product of body.products) {
      const { name, price, store, url, discount, original_price } = product;
      
      await client.query(
        `INSERT INTO products (name, price, store, url, discount, original_price) 
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (url) DO UPDATE SET price = $2, discount = $5, original_price = $6`,
        [name, price, store, url, discount || null, original_price || null]
      );
    }
    
    return NextResponse.json({ success: true, count: body.products.length });
  } catch (error) {
    console.error("❌ Database Error:", error);
    console.error("Error details:", error instanceof Error ? error.message : error);
    return NextResponse.json({ 
      error: "Failed to save products",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  } finally {
    client.release();
  }
}