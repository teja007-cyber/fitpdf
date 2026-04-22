'use client'

import { useState, useCallback, useRef } from 'react'
import { Upload, FileText, X, CheckCircle, ArrowDown, Loader2, Mail, Briefcase, Smartphone, Settings } from 'lucide-react'
import clsx from 'clsx'

interface Platform {
  id: string
  name: string
  limit: number
  icon: React.ReactNode
}

interface ProcessedResult {
  originalSize: number
  newSize: number
  blob: Blob
  filename: string
}

const platforms: Platform[] = [
  { id: 'whatsapp', name: 'WhatsApp', limit: 2, icon: <Smartphone className="w-5 h-5" /> },
  { id: 'email', name: 'Email', limit: 25, icon: <Mail className="w-5 h-5" /> },
  { id: 'job', name: 'Job Portal', limit: 2, icon: <Briefcase className="w-5 h-5" /> },
  { id: 'custom', name: 'Custom', limit: 10, icon: <Settings className="w-5 h-5" /> },
]

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [customSize, setCustomSize] = useState<number>(10)
  const [isDragOver, setIsDragOver] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<ProcessedResult | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const validateFile = (f: File): string | null => {
    if (f.type !== 'application/pdf' && !f.name.toLowerCase().endsWith('.pdf')) {
      return 'Please upload a PDF file'
    }
    if (f.size > 50 * 1024 * 1024) {
      return 'File too large. Maximum size is 50MB'
    }
    return null
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      const validationError = validateFile(droppedFile)
      if (validationError) {
        setError(validationError)
        return
      }
      setError(null)
      setFile(droppedFile)
      setResult(null)
    }
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      const validationError = validateFile(selectedFile)
      if (validationError) {
        setError(validationError)
        return
      }
      setError(null)
      setFile(selectedFile)
      setResult(null)
    }
  }, [])

  const handleRemoveFile = useCallback(() => {
    setFile(null)
    setError(null)
    setResult(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [])

  const handleCompress = async () => {
    if (!file) {
      setError('Please upload a PDF first')
      return
    }
    if (!selectedPlatform) {
      setError('Please select a target platform')
      return
    }

    const platform = platforms.find(p => p.id === selectedPlatform)
    if (!platform) return

    const targetSize = platform.id === 'custom' ? customSize : platform.limit
    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('targetSize', targetSize.toString())

      const response = await fetch('/api/compress', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Compression failed')
      }

      const blob = await response.blob()
      const newSize = blob.size

      setResult({
        originalSize: file.size,
        newSize,
        blob,
        filename: `optimized-${file.name}`,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Compression failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    if (!result) return
    const url = URL.createObjectURL(result.blob)
    const a = document.createElement('a')
    a.href = url
    a.download = result.filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getSelectedPlatformLimit = () => {
    const platform = platforms.find(p => p.id === selectedPlatform)
    if (!platform) return null
    return platform.id === 'custom' ? customSize : platform.limit
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-4 py-12 md:py-20">
      <div className="w-full max-w-xl flex flex-col gap-8">

        <header className="text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Make your PDF <span className="text-accent-primary">upload-ready</span> in seconds
          </h1>
          <p className="text-text-secondary text-lg">
            Optimize your PDF for WhatsApp, Email, and job portals instantly
          </p>
        </header>

        <section className="flex flex-col gap-6">
          <div
            className={clsx(
              'relative border-2 border-dashed rounded-2xl p-8 transition-all duration-200 cursor-pointer',
              'hover:border-accent-primary hover:bg-accent-glow',
              isDragOver && 'border-accent-primary bg-accent-glow',
              file && 'border-solid border-border bg-bg-card',
              error && 'border-error',
              result && 'opacity-50'
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !file && fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileSelect}
              className="hidden"
              disabled={!!result}
            />

            {!file ? (
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="w-14 h-14 rounded-full bg-bg-hover flex items-center justify-center">
                  <Upload className="w-7 h-7 text-accent-primary" />
                </div>
                <div>
                  <p className="text-text-primary font-medium">Drop your PDF here or click to browse</p>
                  <p className="text-text-muted text-sm mt-1">Maximum 50MB</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-bg-hover flex items-center justify-center">
                    <FileText className="w-6 h-6 text-accent-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-text-primary font-medium truncate max-w-[200px] md:max-w-[300px]">
                      {file.name}
                    </p>
                    <p className="text-text-secondary text-sm">
                      {formatSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveFile()
                  }}
                  className="p-2 rounded-lg hover:bg-bg-hover transition-colors"
                  disabled={isLoading}
                >
                  <X className="w-5 h-5 text-text-secondary hover:text-text-primary" />
                </button>
              </div>
            )}
          </div>

          {error && (
            <p className="text-error text-sm animate-fade-in">{error}</p>
          )}

          <div className="grid grid-cols-2 gap-3">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => {
                  setSelectedPlatform(platform.id)
                  if (platform.id === 'custom') {
                    setCustomSize(10)
                  }
                }}
                disabled={!file || isLoading}
                className={clsx(
                  'flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200',
                  'hover:bg-bg-hover',
                  selectedPlatform === platform.id
                    ? 'border-accent-primary bg-accent-glow'
                    : 'border-border bg-bg-card',
                  (!file || isLoading) && 'opacity-50 cursor-not-allowed'
                )}
              >
                <div className={clsx(
                  'w-10 h-10 rounded-lg flex items-center justify-center',
                  selectedPlatform === platform.id
                    ? 'bg-accent-primary text-bg-main'
                    : 'bg-bg-hover text-text-secondary'
                )}>
                  {platform.icon}
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-text-primary">{platform.name}</p>
                  <p className="text-xs text-text-secondary">
                    {platform.id === 'custom' ? `${customSize}MB` : `${platform.limit}MB`}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {selectedPlatform === 'custom' && (
            <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-bg-card animate-fade-in">
              <span className="text-text-secondary">Target size:</span>
              <input
                type="number"
                min={1}
                max={100}
                value={customSize}
                onChange={(e) => setCustomSize(Math.max(1, Math.min(100, parseInt(e.target.value) || 10)))}
                className="w-20 px-3 py-2 rounded-lg bg-bg-hover border border-border text-text-primary text-center focus:outline-none focus:border-accent-primary"
              />
              <span className="text-text-secondary">MB</span>
            </div>
          )}

          <button
            onClick={handleCompress}
            disabled={!file || !selectedPlatform || isLoading}
            className={clsx(
              'flex items-center justify-center gap-2 w-full py-4 rounded-xl font-semibold transition-all duration-200',
              'bg-accent-primary text-bg-main hover:bg-accent-hover',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              isLoading && 'animate-pulse-glow'
            )}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <span>Fix my PDF</span>
            )}
          </button>

          {result && (
            <div className="p-6 rounded-xl border border-accent-primary bg-accent-glow animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-accent-primary" />
                <span className="text-lg font-semibold text-text-primary">Your PDF is ready!</span>
              </div>

              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="text-center">
                  <p className="text-text-secondary text-sm">Original</p>
                  <p className="text-lg font-semibold text-text-primary">{formatSize(result.originalSize)}</p>
                </div>
                <ArrowDown className="w-5 h-5 text-accent-primary" />
                <div className="text-center">
                  <p className="text-text-secondary text-sm">Optimized</p>
                  <p className="text-lg font-semibold text-accent-primary">{formatSize(result.newSize)}</p>
                </div>
              </div>

              <div className="text-center mb-4">
                <span className="text-sm text-text-secondary">
                  Reduced by {Math.round((1 - result.newSize / result.originalSize) * 100)}%
                </span>
                {getSelectedPlatformLimit() && (
                  <span className="text-sm text-text-muted ml-2">
                    (Target: {getSelectedPlatformLimit()}MB)
                  </span>
                )}
              </div>

              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold bg-accent-primary text-bg-main hover:bg-accent-hover transition-colors"
              >
                <ArrowDown className="w-5 h-5" />
                <span>Download Optimized PDF</span>
              </button>
            </div>
          )}
        </section>

        <footer className="text-center text-text-muted text-sm">
          <p>FitPDF - Fast, free, no signup required</p>
        </footer>
      </div>
    </main>
  )
}