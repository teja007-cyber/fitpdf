import { PDFDocument } from 'pdf-lib'

export interface CompressionOptions {
  targetSizeMB: number
  reduceImages?: boolean
  imageQuality?: number
}

export async function compressPDF(
  pdfBuffer: Buffer,
  targetSizeMB: number
): Promise<Buffer> {
  const targetBytes = targetSizeMB * 1024 * 1024
  const originalSize = pdfBuffer.length

  if (originalSize <= targetBytes) {
    return pdfBuffer
  }

  const pdfDoc = await PDFDocument.load(pdfBuffer, {
    ignoreEncryption: true,
    updateMetadata: false,
  })
  const pageCount = pdfDoc.getPages().length

  let bestResult = pdfBuffer
  let keepPages = pageCount

  const strategies = [
    { pages: pageCount },
    { pages: Math.floor(pageCount * 0.9) },
    { pages: Math.floor(pageCount * 0.8) },
    { pages: Math.floor(pageCount * 0.7) },
    { pages: Math.floor(pageCount * 0.6) },
    { pages: Math.floor(pageCount * 0.5) },
    { pages: Math.floor(pageCount * 0.4) },
    { pages: Math.floor(pageCount * 0.3) },
    { pages: Math.floor(pageCount * 0.2) },
    { pages: 1 },
  ]

  for (const strategy of strategies) {
    if (strategy.pages <= 0) continue

    try {
      const newDoc = await PDFDocument.create()
      const pageIndices = Array.from({ length: strategy.pages }, (_, idx) => idx)

      const copiedPages = await newDoc.copyPages(pdfDoc, pageIndices)
      for (const page of copiedPages) {
        newDoc.addPage(page)
      }

      const compressed = await newDoc.save({ useObjectStreams: true } as any)

      if (compressed.length <= targetBytes) {
        return Buffer.from(compressed)
      }

      if (compressed.length < bestResult.length) {
        bestResult = Buffer.from(compressed)
      }

      if (keepPages === 1) break
      keepPages = strategy.pages
    } catch (err) {
      console.error('Compression strategy failed:', err)
    }
  }

  return bestResult
}

export async function getPDFPageCount(buffer: Buffer): Promise<number> {
  try {
    const pdfDoc = await PDFDocument.load(buffer)
    return pdfDoc.getPageCount()
  } catch {
    return 0
  }
}