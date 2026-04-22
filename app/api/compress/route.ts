import { NextRequest, NextResponse } from 'next/server'
import { compressPDF } from '@/lib/pdf-compressor'

export const runtime = 'nodejs'
export const maxDuration = 60
export const dynamic = 'force-dynamic'

function log(level: string, message: string, meta?: object) {
  const timestamp = new Date().toISOString()
  console.log(JSON.stringify({ timestamp, level, message, ...meta }))
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  const requestId = Math.random().toString(36).substring(2, 15)

  try {
    log('info', 'Compression request started', { requestId })

    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const targetSize = formData.get('targetSize')

    if (!file) {
      log('warn', 'No file provided', { requestId })
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    if (!targetSize) {
      log('warn', 'Target size not provided', { requestId })
      return NextResponse.json(
        { error: 'Target size not provided' },
        { status: 400 }
      )
    }

    const targetSizeNum = parseFloat(targetSize as string)
    if (isNaN(targetSizeNum) || targetSizeNum <= 0 || targetSizeNum > 100) {
      log('warn', 'Invalid target size', { requestId, targetSize: targetSize })
      return NextResponse.json(
        { error: 'Invalid target size. Must be between 1 and 100 MB' },
        { status: 400 }
      )
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    if (buffer.length === 0) {
      log('warn', 'Empty file uploaded', { requestId })
      return NextResponse.json(
        { error: 'Empty file uploaded' },
        { status: 400 }
      )
    }

    const originalSize = buffer.length
    log('info', 'Processing PDF', {
      requestId,
      filename: file.name,
      originalSize,
      targetSize: targetSizeNum,
    })

    const compressedBuffer = await compressPDF(buffer, targetSizeNum)

    if (compressedBuffer.length === buffer.length) {
      log('info', 'PDF already within target size', { requestId, originalSize, compressedSize: compressedBuffer.length })
    }

    const uint8Array = new Uint8Array(compressedBuffer)
    const duration = Date.now() - startTime
    const savedBytes = originalSize - compressedBuffer.length
    const savedPercent = ((savedBytes / originalSize) * 100).toFixed(1)

    log('info', 'Compression completed', {
      requestId,
      originalSize,
      compressedSize: compressedBuffer.length,
      savedBytes,
      savedPercent,
      duration,
    })

    return new NextResponse(uint8Array, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="optimized-${file.name}"`,
        'Content-Length': compressedBuffer.length.toString(),
        'X-Original-Size': originalSize.toString(),
        'X-Compressed-Size': compressedBuffer.length.toString(),
        'Cache-Control': 'private, no-cache, no-store',
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    log('error', 'Compression failed', { requestId, error: message })

    return NextResponse.json(
      { error: 'Failed to compress PDF. Please try again.' },
      { status: 500 }
    )
  }
}