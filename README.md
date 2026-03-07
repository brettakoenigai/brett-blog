# Brett Koenig's Personal Blog

A Next.js-powered personal blog with newsletter signup functionality.

## Features

- 📝 Markdown-based blog posts
- 📧 SendGrid newsletter integration
- 🎥 Links to YouTube channel and Spotify podcast
- 🎨 Modern, responsive design with Tailwind CSS
- ⚡ Built with Next.js 14 and TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- SendGrid account with API key

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file with:

```
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=your_verified_sender_email
SENDGRID_CONTACT_LIST_ID=your_contact_list_id
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Production Build

```bash
npm run build
npm start
```

## Writing Blog Posts

Create a new markdown file in the `posts/` directory:

```markdown
---
title: "Your Post Title"
date: "2026-03-07"
excerpt: "A brief description of your post"
---

# Your content here

Write your post content in markdown format.
```

The file name will become the URL slug (e.g., `my-post.md` → `/blog/my-post`).

## Deployment

This blog is designed to deploy on Vercel:

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## Technologies

- Next.js 14
- TypeScript
- Tailwind CSS
- SendGrid
- gray-matter (frontmatter parsing)
- remark (markdown processing)

## License

MIT
