# JustConvert ↗

**Free, private, browser-based image and PDF conversion. No uploads. No signup.**

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

## Limitations

Large PDFs can consume substantial browser memory. Password-protected or malformed PDFs may fail. PDF rendering rasterizes pages. Some image encoders are browser-dependent. This is an early release, not a replacement for every document format.

## License

MIT. Contributions and bug reports welcome.
