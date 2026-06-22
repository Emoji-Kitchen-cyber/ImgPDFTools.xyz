# 🛠️ ImgPDFTools

**Free Online Image & PDF Toolkit** — 17+ tools that run 100% in your browser. No uploads, no sign-up, no waiting.

🌐 **Live:** [imgpdftools.xyz](https://imgpdftools.xyz/)

---

## ✨ Overview

ImgPDFTools is a privacy-first, browser-based collection of image and PDF utilities. Every operation — compression, conversion, merging, cropping — happens entirely on the user's device. Files are **never uploaded to a server**, making it fast, private, and usable offline.

### Key Features

- 🛠️ **17+ Tools** — image editing + PDF utilities + dev utilities, all in one place
- 🔒 **100% Private** — all processing happens client-side, files never leave the device
- ⚡ **Instant** — no upload/download wait, no queues
- 🌐 **Works Offline** — Service Worker enabled for offline use
- 🚫 **No Sign-up** — no accounts, no watermarks, no usage limits
- 🌓 **Dark/Light Theme** — auto-detects system preference, toggleable, persisted via `localStorage`
- 📱 **Fully Responsive** — works on desktop, tablet, and mobile
- ♿ **Accessible** — skip-to-content link, ARIA labels, focus management, reduced-motion support
- 🔍 **SEO Optimized** — JSON-LD structured data (WebSite, Organization, ItemList, FAQPage)

---

## 🧰 Tools Included

### 🖼️ Image Tools
| Tool | Description |
|---|---|
| [Compress Image](https://imgpdftools.xyz/compress.html) | Compress JPG, PNG, and WEBP while saving space |
| [Resize Image](https://imgpdftools.xyz/resize.html) | Resize by percent or exact pixel dimensions |
| [Convert Image Format](https://imgpdftools.xyz/convert.html) | Convert between JPG, PNG, and WEBP |
| [Remove Background](https://imgpdftools.xyz/remove-bg.html) | AI-powered background remover |
| [Advanced Crop](https://imgpdftools.xyz/crop.html) | Precise cropping with aspect ratio control |
| [Blur Face](https://imgpdftools.xyz/blur-face.html) | Auto-detect and blur faces for privacy |
| [Thumbnail Maker](https://imgpdftools.xyz/thumbnail-maker.html) | Generate streaming & social media thumbnails |
| [Screenshot Editor](https://imgpdftools.xyz/screenshot-editor.html) | Wrap screenshots in device frames |
| [Favicon Generator](https://imgpdftools.xyz/favicon-generator.html) | Generate multi-size `.ico` favicons |

### 📄 PDF & Document Tools
| Tool | Description |
|---|---|
| [PDF to JPG](https://imgpdftools.xyz/pdf-to-jpg.html) | Extract PDF pages as JPG images |
| [JPG to PDF](https://imgpdftools.xyz/jpg-to-pdf.html) | Combine images into a single PDF |
| [Split PDF](https://imgpdftools.xyz/split-pdf.html) | Extract page ranges or split every page |
| [Merge PDF](https://imgpdftools.xyz/merge-pdf.html) | Combine multiple PDFs into one file |
| [Compress PDF](https://imgpdftools.xyz/compress-pdf.html) | Reduce PDF file size |
| [PDF to Word](https://imgpdftools.xyz/pdf-to-word.html) | Convert PDF into an editable `.docx` |

### 🧑‍💻 Developer & Utility Tools
| Tool | Description |
|---|---|
| [QR Code Generator](https://imgpdftools.xyz/qr-generator.html) | Generate custom vector QR codes |
| [Unit Converter](https://imgpdftools.xyz/unit-converter.html) | High-performance unit/metric calculator |

---

## 🏗️ Tech Stack

- **HTML5 / Vanilla JavaScript (ES5-compatible IIFE)** — no framework dependencies on the homepage
- **CSS Custom Properties** — full theming system (light/dark) via CSS variables
- **Google Fonts** — Space Grotesk (headings) + Plus Jakarta Sans (body), loaded non-blocking
- **Font Awesome 6.4.0** — iconography, loaded non-blocking
- **Service Worker** (`/sw.js`) — offline support & auto-update on new deploys
- **Google Analytics (GA4)** — `G-3P7QPQKV3K`
- **JSON-LD Structured Data** — `WebSite`, `Organization`, `ItemList`, `FAQPage` schemas for rich SEO results
- **Content Security Policy** — strict CSP meta tag restricting script/style/font/img sources

---

## 📂 Project Structure (homepage-relevant)

```
/
├── index.html                  # Homepage (tool directory, search, filters)
├── compress.html                # Image tools...
├── resize.html
├── convert.html
├── remove-bg.html
├── crop.html
├── blur-face.html
├── thumbnail-maker.html
├── screenshot-editor.html
├── favicon-generator.html
├── pdf-to-jpg.html              # PDF tools...
├── jpg-to-pdf.html
├── split-pdf.html
├── merge-pdf.html
├── compress-pdf.html
├── pdf-to-word.html
├── qr-generator.html            # Utility tools...
├── unit-converter.html
├── about.html
├── contact.html
├── faq.html
├── blog/
├── privacy-policy.html
├── terms.html
├── disclaimer.html
├── sw.js                        # Service worker
├── site.webmanifest
├── favicon.ico / favicon-*.png / apple-icon-180x180.png
└── og-image.png
```

---

## 🖥️ Homepage Functionality

The `index.html` homepage dynamically renders:
- **Tool grid** — generated from a `TOOLS` array (icon, title, description, category, link)
- **Search bar** — live filters tools by title/description; supports `?q=` URL param (wired to the `SearchAction` schema) and `Ctrl/Cmd + K` shortcut to focus
- **Category filter pills** — Optimize, Create, Edit, Convert, Security, PDF & Docs, Utilities
- **Sidebar navigation** — auto-generated from tool + info link data, with focus trapping and `Esc`-to-close
- **Theme toggle** — persists choice in `localStorage`, applied pre-paint to avoid flash of wrong theme
- **Legacy short-link redirect handler** — resolves old `#/s/{id}` hash links stored in `localStorage` (kept for backward compatibility)

---

## 🔐 Privacy

All file processing (compression, conversion, merging, etc.) happens **client-side in the browser**. No image or PDF is ever transmitted to or stored on a server. See the full [Privacy Policy](https://imgpdftools.xyz/privacy-policy.html).

---

## ❓ FAQ

**Are these tools really free?**
Yes — every tool is completely free with no account, no watermarks, and no usage limits.

**Are my files uploaded anywhere?**
No. All processing happens locally in your browser.

**Do I need to install anything?**
No. Works in any modern browser, and many tools work offline.

**Which image formats are supported?**
JPG, PNG, and WEBP across all image tools; some tools also accept GIF and BMP.

**Can I use this on mobile?**
Yes — fully responsive and tested on Android and iOS.

---

## 📜 License

© 2026 ImgPDFTools — All Rights Reserved.

---

## 🔗 Links

- Website: [imgpdftools.xyz](https://imgpdftools.xyz/)
- About: [/about.html](https://imgpdftools.xyz/about.html)
- Contact: [/contact.html](https://imgpdftools.xyz/contact.html)
- Blog: [/blog/](https://imgpdftools.xyz/blog/)
