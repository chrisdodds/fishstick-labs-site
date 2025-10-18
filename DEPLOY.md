# Deployment Checklist

## Google Search Console Setup

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `fishsticklabs.com`
3. Verify ownership (DNS or file upload method)
4. Submit sitemap: `https://fishsticklabs.com/sitemap-index.xml`
5. Monitor indexing status after a few days

## Deployment

Site is ready to deploy. Recommended hosts:
- **Vercel** (recommended for Astro) - automatic SSL, CDN, zero config
- **Netlify** - similar to Vercel
- **Cloudflare Pages** - also great

### Build command
```bash
npm run build
```

### Output directory
```
dist/
```

## Post-Deploy

1. Verify SSL certificate is active
2. Test all links
3. Check mobile responsiveness
4. Submit sitemap to Google Search Console
5. Share on LinkedIn to test Open Graph tags
6. Set up Google Analytics if desired (beyond Clicky)

## DNS

Point `fishsticklabs.com` to your hosting provider:
- A record or CNAME as specified by host
- Most hosts provide instructions after connecting repo

