# JustConvert ↗

**Free, private, browser-based image and PDF conversion. No file uploads. No signup.**

**Try it:** https://justconvert.n90.workers.dev/  
**Status:** Public beta — feedback and bug reports welcome.

Convert JPG, PNG and WebP, resize and compress images, create PDFs from images, render PDF pages to images, merge PDFs and split PDFs. Multiple results download as a ZIP. All file processing happens in the browser.

## Quick start

```bash
npm install
npm run dev
```

Open the Vite development URL. To verify: `npm test && npm run build`.

## Supported actions

- JPG / PNG / WebP conversion
- Image resize and compression
- Images to PDF
- PDF to PNG / JPG
- Merge and split PDFs
- Batch conversion with ZIP output

## Privacy

File contents are processed in the browser; the application does not implement a file-upload endpoint. Dependencies are downloaded during initial page load. Avoid claiming zero network requests: hosting and third-party resources may still generate requests.

## Safety limits

- Maximum 100 MB per input file
- Maximum 30 files and 250 MB total per batch
- Images over 40 megapixels are rejected to limit memory use
- PDF-to-image export is limited to 100 pages; rendered pages are limited to 40 megapixels
- Browser/device memory constraints may require smaller files even within these limits

## Testing

The Playwright suite covers Chromium, Firefox and WebKit. Run `npm run test:e2e` after installing the Playwright browsers. Automated tests complement but do not replace real-device testing.

## Limitations

Large PDFs can consume substantial browser memory. Password-protected or malformed PDFs may fail. PDF rendering rasterizes pages. Some image encoders are browser-dependent. This is an early release, not a replacement for every document format.

## License

MIT. Contributions and bug reports welcome.
