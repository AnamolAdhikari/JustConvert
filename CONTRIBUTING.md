# Contributing to JustConvert

Thanks for helping improve JustConvert! Contributions of all sizes are welcome: bug reports, browser compatibility findings, documentation, tests, and code.

## Before you start

- Browse [existing issues](https://github.com/AnamolAdhikari/JustConvert/issues) and pull requests to avoid duplicate work.
- For larger features or changes to privacy behavior, open an issue first to discuss the approach.
- Never include private documents or personally identifiable data in bug reports or test fixtures. Use synthetic sample files.

## Local setup

You'll need a current Node.js version and npm.

```bash
git clone https://github.com/AnamolAdhikari/JustConvert.git
cd JustConvert
npm install
npm run dev
```

Open the local address printed by Vite.

## Validate your change

```bash
npm test
npm run build
```

For browser tests, install the Playwright browsers once, then run:

```bash
npx playwright install
npm run test:e2e
```

If a browser-specific test cannot run in your environment, explain that in the PR.

## Submit a pull request

1. Fork the repository and create a focused feature branch.
2. Keep changes small and describe the user-facing behavior.
3. Add or update tests when changing conversion behavior.
4. Run the relevant checks and mention the results.
5. Open a PR explaining what changed, why, and any limitations.

## Privacy and quality expectations

- Keep document and image processing local to the browser; do not add file-upload or analytics endpoints without explicit discussion.
- Handle large files and browser-memory limits gracefully.
- Test with synthetic data and consider mobile/browser compatibility.
- Keep dependencies justified and avoid unnecessary network requests.

## Reporting a bug

Include the operation, expected and actual behavior, browser and device, approximate file type/size, and reproducible steps. Please do **not** attach sensitive personal files.

Be respectful and constructive in discussions and reviews.
