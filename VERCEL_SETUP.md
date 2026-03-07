# Vercel Deployment Setup for Brett Blog

## Repository
https://github.com/brettakoenigai/brett-blog

## Environment Variables Required

Add these environment variables in the Vercel dashboard:

### 1. SENDGRID_API_KEY
- **Value**: Get from SendGrid dashboard or your saved credentials
- **Environment**: Production, Preview, Development

### 2. SENDGRID_FROM_EMAIL
- **Value**: `noreply@brettkoenig.com`
- **Environment**: Production, Preview, Development

### 3. SENDGRID_CONTACT_LIST_ID
- **Value**: Get from your SendGrid contact list settings
- **Environment**: Production, Preview, Development

## Deployment Steps

1. Go to https://vercel.com/new
2. Import the GitHub repository: `brettakoenigai/brett-blog`
3. Framework Preset: Next.js (should auto-detect)
4. Add the environment variables above
5. Click Deploy!

## After Deployment

1. Update YouTube and Spotify links in:
   - `app/layout.tsx` (footer section)
   - `app/page.tsx` (hero and content sections)
   - `app/about/page.tsx`

2. To add new blog posts, create `.md` files in the `posts/` folder with this format:

```markdown
---
title: "Your Post Title"
date: "2026-03-07"
excerpt: "Brief description of the post"
---

Your blog content here in Markdown format...
```

## Features

- ✅ Markdown-based blog posts
- ✅ SendGrid newsletter integration with welcome emails
- ✅ YouTube and Spotify links
- ✅ Responsive design with Tailwind CSS
- ✅ TypeScript + Next.js 14

## Testing Newsletter Signup

After deployment, test the newsletter signup form:
1. Visit your deployed site
2. Scroll to the newsletter section
3. Enter an email
4. Check that the email gets added to your SendGrid contact list
5. Verify the welcome email is sent
