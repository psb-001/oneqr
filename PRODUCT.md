# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/JS, no build step. Vendored QR encoder (`vendor/qrcode.min.js`, Kazuhiko Arase qrcode-generator, MIT). Responsive for desktop and mobile.

## Users

People with accounts on multiple social platforms (Instagram, X, YouTube, LinkedIn, GitHub, WhatsApp, custom sites) who want one scannable artifact that shows all of their links — creators, freelancers, students, small-business owners.

## Product Purpose

Replace the five-QR-codes-on-a-card problem with a single QR code that opens one Material 3 page listing every social profile. The visitor scans once and gets everything; the owner builds and regenerates their code locally.

## Positioning

No account, no subscription, no cloud database. The builder runs entirely in the browser and the scan target is either a self-contained `data:` URL page or a static viewer with data in the URL hash. A neighboring link-tree product could not copy the zero-account, zero-hosting-authority core without giving up its cloud model.

## Operating Context

- Owner adds platforms + links in the builder, then generates a QR code.
- Visitor scans with a plain camera/QR app; the page opens in their browser.
- Mode A (default): QR encodes the self-contained viewer as a `data:text/html;base64,…` URL — zero cloud.
- Mode B: QR points to a static `viewer.html` with links carried in the URL hash (`#ig=…&x=…`) — no database, user hosts the file anywhere.
- Owner can also download the self-contained viewer HTML file directly.

## Capabilities and Constraints

- Preset platform list (Instagram, X, YouTube, LinkedIn, GitHub, WhatsApp, Facebook, TikTok…) plus custom free-form entries.
- Add, reorder, remove entries; live QR preview; download viewer HTML; copy Mode B URL.
- Everything client-side. No analytics, no accounts, no server component.
- Open decision: final product name ("oneqr" is working title), whether a downloadable "card" PDF/asset mode is ever in scope, and the public URL if Mode B is hosted.

## Brand Commitments

- Material 3 (Google Material Design 3) visual language: M3 color tokens, Roboto, rounded shapes, tonal buttons.
- Tone: calm, useful, zero marketing-speak in the product itself.

## Evidence on Hand

- `proposal.html` — the confirmed product concept page rendered as a Material 3 document (e2e flow + screens mockup).
- VISION/README sources for this directory do not exist yet; this PRODUCT.md is the founding record.

## Product Principles

1. The visitor's two seconds matter — scanning must land on the links, nothing before it.
2. No account is a feature, not a gap.
3. The page the scanner sees is the brand — it must feel considered, not generated.
4. Client-side by default; any hosting is the owner's explicit choice.
5. Material 3 everywhere: one visual language from builder to viewer.

## Accessibility & Inclusion

Viewer page must meet WCAG 2.1 AA: semantic landmarks, real link text (no icon-only links without labels), sufficient contrast on all platform chips, keyboard-operable builder, alt text on the QR (with the URL alongside as text fallback).
