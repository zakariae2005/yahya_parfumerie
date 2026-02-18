import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { CreateProductInput } from '@/types/product'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category     = searchParams.get('category')
    const subcategory  = searchParams.get('subcategory')
    const megacategory = searchParams.get('megacategory')
    const brand        = searchParams.get('brand')
    const minPrice     = searchParams.get('minPrice')
    const maxPrice     = searchParams.get('maxPrice')
    const searchTerm   = searchParams.get('searchTerm')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {}

    if (category)     where.category     = category
    if (subcategory)  where.subcategory  = subcategory
    if (megacategory) where.megacategory = megacategory
    if (brand)        where.brand        = brand

    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = parseFloat(minPrice)
      if (maxPrice) where.price.lte = parseFloat(maxPrice)
    }

    if (searchTerm) {
      where.OR = [
        { name:        { contains: searchTerm, mode: 'insensitive' } },
        { brand:       { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } },
      ]
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateProductInput = await request.json()

    if (!body.name || body.price === undefined || body.price === null) {
      return NextResponse.json({ error: 'Name and price are required' }, { status: 400 })
    }
    if (body.price <= 0) {
      return NextResponse.json({ error: 'Price must be greater than 0' }, { status: 400 })
    }

    const product = await prisma.product.create({
      data: {
        name:         body.name,
        price:        body.price,
        brand:        body.brand        || null,
        description:  body.description  || null,
        category:     body.category     || null,
        subcategory:  body.subcategory  || null,
        megacategory: body.megacategory || null,  // ← new
        images:       body.images       || [],
        rating:       body.rating       || 0,
        reviews:      body.reviews      || 0,
      },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}