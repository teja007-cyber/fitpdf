# FitPDF - PDF Compressor

Optimize PDFs for WhatsApp, Email, and job portals instantly. Free online PDF compression tool.

## Features

- Drag & drop PDF upload
- Compress for WhatsApp (2MB), Email (25MB), Job portals (2MB), or custom size
- No signup required
- 100% free
- Privacy-focused (files processed locally)

## Tech Stack

- Next.js 14
- React
- Tailwind CSS
- pdf-lib

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build for Production

```bash
npm run build
npm run start:prod
```

## Deployment

Deploy on Vercel with one click:

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/git/github/teja007-cyber/fitpdf)

## SEO Setup (Complete Guide)

### 1. Google Analytics

1. Go to https://analytics.google.com
2. Sign in with your Google account
3. Click "Start measuring"
4. Create property:
   - Property name: FitPDF
   - Time zone: Your country
   - Currency: USD
5. Click "Create" → Select "Web"
6. Enter your website: `your-app.vercel.app`
7. Copy the Measurement ID (e.g., `G-XXXXXXXXXX`)
8. Go to Vercel → Settings → Environment Variables
9. Add: `NEXT_PUBLIC_GA_ID` = `G-XXXXXXXXXX`
10. Add: `NEXT_PUBLIC_URL` = `your-app.vercel.app`
11. Redeploy in Vercel

### 2. Google Search Console

1. Go to https://search.google.com/search-console
2. Click "Add property"
3. Enter: `https://your-app.vercel.app`
4. Ownership verification:
   - If connected to GitHub: Vercel auto-verifies
   - Or add TXT record to your domain
5. After verified, click "Sitemaps"
6. Add: `sitemap.xml`
7. Click "Submit"

### 3. Verify Indexing

Check if indexed:
```
site:your-app.vercel.app
```

Or request indexing:
1. Go to Search Console → URL inspection
2. Enter: `https://your-app.vercel.app`
3. Click "Request indexing"

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| NEXT_PUBLIC_GA_ID | Google Analytics ID | G-XXXXXXXXXX |
| NEXT_PUBLIC_URL | Your domain | https://fitpdf.vercel.app |

## License

MIT