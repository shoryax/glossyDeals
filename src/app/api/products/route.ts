import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';
  const store = searchParams.get('store') || undefined; // undefined works better with Prisma filters than null
  
  // Parse prices safely
  const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined;
  const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined;

  try {
    const products = await prisma.product.findMany({
      where: {
        name: { contains: search, mode: 'insensitive' },
        store: store,
        price: { 
          gte: minPrice, 
          lte: maxPrice 
        },
      },
      orderBy: { price: 'asc' },
      take: 100,
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json(); 
    
    // Safety check: ensure body.products exists and is an array
    if (!body.products || !Array.isArray(body.products)) {
        return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    console.log("📥 Received products:", body.products[0]); // Log first product to see structure
    
    await prisma.product.createMany({ 
      data: body.products
    });
    
    return NextResponse.json({ success: true, count: body.products.length });
  } catch (error) {
    console.error("❌ Database Error:", error);
    console.error("Error details:", error instanceof Error ? error.message : error);
    return NextResponse.json({ 
      error: "Failed to save products",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}