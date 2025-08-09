# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio and blog website for Ibrahim Shittu built with Next.js 14 App Router, TypeScript, and Tailwind CSS. Features include a professional resume/portfolio page, markdown-based blog system, dark/light theme support, and comprehensive SEO optimization.

## Commands

### Development

```bash
npm run dev        # Start development server on http://localhost:3000
npm run build      # Create production build
npm run start      # Start production server
npm run lint       # Run ESLint with Next.js core web vitals rules
```

### SEO Testing

```bash
npm run seo-check  # Build and verify SEO files generation
npm run test-seo   # Test SEO endpoints (sitemap, robots, manifest)
```

## Architecture

### Core Stack

- **Next.js 14.0.0** with App Router (`/app` directory)
- **TypeScript** with strict configuration
- **Tailwind CSS** with typography plugin for styling
- **next-themes** for dark/light mode switching
- **gray-matter** for markdown frontmatter parsing

### Key Directories

- `/app` - Next.js pages and API routes using App Router pattern
  - `page.tsx` - Resume/portfolio home page
  - `blog/` - Blog listing and individual post pages
  - `api/og/` - Open Graph image generation endpoint
- `/components` - Reusable React components (theme toggle, icons, providers)
- `/lib` - Utility functions for SEO, markdown processing, and blog management
- `/content/blog` - Markdown blog posts with frontmatter metadata
- `/public` - Static assets (favicon, images, OG image)

### Blog System

Blog posts are markdown files in `/content/blog/` with required frontmatter:
```yaml
title: string
excerpt: string
date: YYYY-MM-DD
readTime: string (e.g., "5 min read")
image: string (URL)
tags: string[]
```

Posts are processed by `lib/markdown.ts` which handles parsing, metadata extraction, and slug generation. The blog system automatically generates SEO metadata, structured data, and Open Graph images.

### SEO Implementation

- Dynamic sitemap generation from blog posts
- Structured data (JSON-LD) for Person, Website, Organization, and Article schemas
- Open Graph and Twitter Card meta tags on all pages
- Canonical URLs and robots.txt configuration
- Custom API route for OG image generation

### Styling Approach

Uses Tailwind CSS with utility-first approach. Custom design tokens are defined as CSS variables in `globals.css`. The site supports dark/light themes through next-themes provider wrapped around the app.

### TypeScript Configuration

Strict mode enabled with comprehensive type checking. All components and utilities are fully typed. No implicit any allowed.

## Development Guidelines

### Adding New Blog Posts

1. Create markdown file in `/content/blog/` with proper frontmatter
2. Images should be optimized and hosted externally (current posts use res.cloudinary.com)
3. Use descriptive slugs in filename (will become URL path)
4. Tags should be lowercase and hyphenated

### Modifying Pages

- Home page content is hardcoded in `/app/page.tsx`
- Blog listing logic is in `/app/blog/page.tsx`
- Individual blog post rendering is in `/app/blog/[slug]/page.tsx`

### Working with Components

- Keep components small and focused
- Use TypeScript interfaces for props
- Follow existing patterns for theme-aware styling

### SEO Updates

- Page metadata is defined in each page's `metadata` export
- Structured data generation is in `/lib/seo.ts`
- Update sitemap logic in `/app/sitemap.ts` if adding new pages

## Important Notes

- No test framework currently configured
- Deployed on Vercel (uses Vercel Analytics and Speed Insights)
- Production domain: `https://ibrahimshittu.com`
- All images should be optimized before use
- Maintains security headers and CSP for SVG handling
