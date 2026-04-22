# FitPDF - Product Specification

## 1. Project Overview

**Project Name:** FitPDF
**Type:** Web Application (SaaS)
**Core Functionality:** A simple tool to optimize PDFs for specific upload size limits (WhatsApp, Email, Job portals)
**Target Users:** Anyone needing to reduce PDF file size for upload constraints
**Live URL:** https://fitpdf.vercel.app

## 2. SEO & Indexing

### Google Setup Complete

All SEO files are bundled:

- `app/sitemap.ts` - XML sitemap for Google
- `app/robots.ts` - Robots.txt configuration  
- `components/GoogleAnalytics.tsx` - GA4 tracking
- `app/layout.tsx` - Meta tags, OpenGraph, keywords
- `.env.local` - Configuration template

### How to Connect Google Services

#### 1. Google Analytics (analytics.google.com)

1. Create account → Get Measurement ID (G-XXXXXXXXXX)
2. Add to Vercel: `NEXT_PUBLIC_GA_ID` = your ID
3. Add to Vercel: `NEXT_PUBLIC_URL` = your-app.vercel.app
4. Redeploy

#### 2. Google Search Console (search.google.com/search-console)

1. Add property: https://your-app.vercel.app
2. Vercel auto-verifies
3. Submit sitemap.xml

#### 3. Check Indexing

Search: `site:your-app.vercel.app`

---

## 2. UI/UX Specification

### Layout Structure

- **Single Page Application** - No navigation needed
- **Centered Content** - Max-width: 640px, centered
- **Sections Flow:**
  1. Header (Title + Subtitle)
  2. Upload Zone
  3. Platform Selection
  4. Action Button
  5. Result Section

### Responsive Breakpoints
- Mobile: < 640px (stack elements, full-width buttons)
- Desktop: >= 640px (grid layout for platforms)

### Visual Design

#### Color Palette
```css
--bg-main: #0f0f0f          /* Deep black background */
--bg-card: #1a1a1a          /* Card/zone background */
--bg-hover: #252525         /* Hover states */
--accent-primary: #22c55e   /* Green - primary action */
--accent-hover: #16a34a    /* Green hover */
--accent-glow: rgba(34, 197, 94, 0.15)  /* Glow effect */
--text-primary: #ffffff    /* White text */
--text-secondary: #a3a3a3  /* Muted gray */
--text-muted: #525252      /* Very muted */
--border: #2a2a2a          /* Subtle borders */
--error: #ef4444           /* Red errors */
--success: #22c55e        /* Green success */
--warning: #f59e0b         /* Amber warnings */
```

#### Typography
- **Font Family:** "Outfit" (Google Fonts) - Modern geometric sans-serif
- **Title:** 48px, font-weight: 700, tracking: -0.02em
- **Subtitle:** 18px, font-weight: 400, text-secondary color
- **Body:** 16px, font-weight: 400
- **Labels:** 14px, font-weight: 500

#### Spacing System
- **Container padding:** 24px
- **Section gaps:** 32px
- **Element gaps:** 16px
- **Button padding:** 16px 32px
- **Border radius:** 12px (cards), 8px (buttons), 16px (upload zone)

#### Visual Effects
- **Upload zone:** Dashed border (2px), transitions on hover/drag
- **Cards:** Subtle border, hover glow effect
- **Buttons:** Scale transform on hover (1.02), shadow
- **Loading:** Pulsing animation on button
- **Success:** Fade-in animation with checkmark

### Components

#### 1. Header
- H1: "Make your PDF upload-ready in seconds"
- Paragraph: "Optimize your PDF for WhatsApp, Email, and job portals instantly"

#### 2. Upload Zone
- **Default state:** Dashed border, upload icon, "Drop your PDF here or click to browse"
- **Hover state:** Border color changes to accent, bg lightens
- **Drag over state:** Accent border, pulsing
- **File selected state:** Show file icon, filename (truncated if long), file size, remove button
- **Accepted:** PDF files only
- **Max size:** 50MB

#### 3. Platform Selection Cards
Four options in a 2x2 grid (desktop) / stacked (mobile):

| Platform | Size Limit | Icon |
|----------|------------|------|
| WhatsApp | 2MB | Phone icon |
| Email | 25MB | Mail icon |
| Job Portal | 2MB | Briefcase icon |
| Custom | User input | Settings icon |

- **Selected state:** Green border, subtle glow background
- **Custom input:** Number input (MB) with + sign, appears when Custom selected

#### 4. CTA Button
- Text: "Fix my PDF"
- Disabled state: Opacity 50%, cursor not-allowed
- Loading state: Spinner + "Processing..."
- Success state: Not clickable, shows result

#### 5. Result Section
- **Appears after:** Successfully compressed
- **Content:**
  - Success icon (green checkmark)
  - "Your PDF is ready!"
  - Size comparison: Original (X MB) → Optimized (Y MB)
  - Reduction percentage
  - Download button (green, full-width on mobile)

#### 6. Error States
- Red border on upload zone for errors
- Error message below: "File too large (max 50MB)" / "Invalid file type" / "Compression failed"

---

## 3. Functionality Specification

### Core Features

#### File Upload
1. Click to open file picker
2. Drag and drop support
3. Validate: PDF only, max 50MB
4. Show file info on success
5. Allow file removal

#### Platform Selection
1. Default: None selected
2. Single selection (click to select)
3. Custom shows input field when selected
4. Custom input: Number 1-100 MB, default 10MB

#### Compression (API Route)
1. Endpoint: `/api/compress`
2. Method: POST
3. Input: FormData with file + targetSize
4. Process:
   - Load PDF with pdf-lib
   - Attempt to reduce quality/scale images
   - Re-serialize to meet target size
   - If exact not possible, get as close as possible under limit
5. Output: Optimized PDF buffer
6. Headers: Content-Disposition: attachment

#### Download
1. Triggered by download button
2. Uses blob URL with auto-download
3. Filename: `optimized-{original-name}`

### User Interactions

1. **Upload file** → Validate → Show file info OR error
2. **Select platform** → Update selection state
3. **Click Fix** → Validate → Call API → Show result OR error
4. **Click Download** → Download file
5. **Click Remove** → Reset to initial state

### Edge Cases

- No file selected + click Fix → Show error "Please upload a PDF"
- No platform selected + click Fix → Show error "Please select a target"
- File too large (>50MB) → Show error
- Invalid file type → Show error
- Compression fails → Show error with generic message
- Custom input < 1 or > 100 → Clamp to valid range

---

## 4. Technical Implementation

### Project Structure
```
/app
  ├── layout.tsx
  ├── page.tsx
  ├── globals.css
  └── api/compress/route.ts
/components
  ├── UploadZone.tsx
  ├── PlatformSelect.tsx
  ├── ResultCard.tsx
  └── LoadingButton.tsx
/lib
  └── pdf-compressor.ts
/public
  └── (no static assets needed)
```

### Dependencies
```json
{
  "next": "^14.0.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "pdf-lib": "^1.17.1",
  "@react-pdf/renderer": "^3.1.0",
  "framer-motion": "^10.0.0",
  "lucide-react": "^0.294.0",
  "clsx": "^2.0.0"
}
```

### Compression Strategy
1. Use pdf-lib to load and modify PDF
2. Apply image downsampling via @react-pdf/renderer (if images present)
3. Re-save with compressed content streams
4. Iterate quality if target not met

---

## 5. Acceptance Criteria

### Visual Checkpoints
- [ ] Dark theme with green accent visible
- [ ] Outfit font loaded correctly
- [ ] Upload zone has dashed border
- [ ] Platform cards respond to selection
- [ ] Button has hover/loading states
- [ ] Result shows size comparison
- [ ] Mobile layout stacks properly

### Functional Checkpoints
- [ ] Can upload PDF file
- [ ] Can select platform
- [ ] Can click Fix and see loading state
- [ ] API route processes file
- [ ] Can download optimized file
- [ ] Error states display correctly
- [ ] No page reloads occur

### Performance
- [ ] Initial load < 2s
- [ ] Compression < 10s for typical files
- [ ] Smooth animations (60fps)

---

## 6. Deployment

- Run: `npm install && npm run dev`
- Build: `npm run build`
- Deploy to Vercel with zero-config