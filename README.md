<div align="center">

# 🍳 cooked-folio

A minimal, editorial portfolio built with **Next.js 14**, **Tailwind**, and **TypeScript**.
<br/>
Real-time Discord presence, Spotify now-playing, GitHub heatmap, MDX blog, and a chat-style contact form.

<br/>

[![Discord](https://img.shields.io/badge/Discord-Join%20Community-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/wG9qpfvuQQ)

</div>

## ⚡ Deploy

One-click deploy on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fshahriaravi%2Fcooked-folio&env=DISCORD_WEBHOOK_URL,NEXT_PUBLIC_DISCORD_USER_ID,SPOTIFY_CLIENT_ID,SPOTIFY_CLIENT_SECRET,SPOTIFY_REFRESH_TOKEN,NEXT_PUBLIC_URL,GITHUB_USERNAME,GITHUB_TOKEN)

---

## ✨ Features

- **Discord presence** via Lanyard, with real status dot + current activity
- **Spotify now playing** with album art
- **GitHub contributions heatmap**
- **MDX blog** at `/writing` — auto reading time, share menu (X, Facebook, Discord, copy link), related posts
- **Chat-style contact form** — sequential prompts, posts to Discord webhook
- **Cal.com booking modal** embedded in homepage footer
- **Dark/light theme** with instant swap
- **Universal navbar + footer** with copyright and GitHub star link
- **SEO-optimized** — full metadata, JSON-LD Person + WebSite schema, robots.txt, sitemap.xml
- **AI crawler friendly** — GPTBot, ClaudeBot, Gemini, Perplexity explicitly allowed
- Editorial typography (Inter + Geist Mono), squircle avatars, no unnecessary animations

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14.2 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Fonts:** Inter (body) + Geist Mono (meta/labels)
- **Content:** MDX via `next-mdx-remote`, `gray-matter`, `reading-time`
- **Icons:** lucide-react, react-icons
- **Data:** SWR + async server components
- **Analytics:** Vercel Analytics
- **Booking:** @calcom/embed-react
- **Sound feedback:** cuelume

---

## 🚀 Getting Started

```bash
git clone https://github.com/shahriaravi/cooked-folio.git
cd cooked-folio
npm install
npm run dev
```

Open `http://localhost:3000`.

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_URL` | Your live site URL |
| `DISCORD_WEBHOOK_URL` | Discord webhook for contact/donate messages |
| `NEXT_PUBLIC_DISCORD_USER_ID` | Your Discord User ID |
| `SPOTIFY_CLIENT_ID` | Spotify app Client ID |
| `SPOTIFY_CLIENT_SECRET` | Spotify app Client Secret |
| `SPOTIFY_REFRESH_TOKEN` | Spotify refresh token |
| `GITHUB_USERNAME` | Your GitHub username |
| `GITHUB_TOKEN` | GitHub PAT with `read:user` |

---

## 🔧 Configuration

**Content** → `src/lib/config.ts`
Socials, stack, experience, education, projects, external links.

**SEO** → `src/lib/site-config.ts`
Metadata, keywords, JSON-LD schema, OpenGraph, Twitter cards.

**Blog posts** → `src/content/writing/*.mdx`
Filename becomes slug. Frontmatter is minimal:

```mdx
---
title: "Post Title"
date: "2026-01-15"
---
```

Reading time, word count, and slug are auto-generated.

---

## 📂 Project Structure

```text
src/
├─ app/
│  ├─ api/                     # contact, donate, discord, spotify, github routes
│  ├─ writing/                 # blog list + [slug] dynamic post pages
│  ├─ contact/                 # chat-style form
│  ├─ donate/                  # donation page + thanks
│  ├─ layout.tsx               # root layout (Navbar, footer, JSON-LD, splash)
│  ├─ sitemap.ts               # dynamic sitemap
│  └─ page.tsx                 # homepage
├─ components/
│  ├─ common/                  # Container, ThemeToggle, InitialSplash, HelloLoader
│  ├─ layout/                  # Hero, Navbar, HomeFooter, SiteFooter
│  ├─ sections/                # Experience, Education, Projects, Stack
│  ├─ integrations/            # Discord, Spotify, GitHub cards
│  ├─ contact/                 # ContactForm
│  ├─ donate/                  # DonateContent, DonateThanks
│  ├─ writing/                 # WritingList, MdxComponents, ShareMenu, MorePosts
│  └─ ui/                      # TimeDisplay, Folder, LogoLoop, PixelBlast
├─ content/writing/            # MDX blog posts
├─ hooks/                      # useDiscordPresence
└─ lib/                        # config, site-config, writing, utils
```

---

## 🎨 Design System

- **Content width:** 640px column, centered
- **Fonts:** Inter body, Geist Mono for meta/labels/dates
- **Section overline:** `text-[11px] font-mono uppercase tracking-[0.14em]`
- **Body copy:** `16px / 24px / 0.2px`
- **Headings:** `22–28px semibold`, tight letter-spacing
- **Avatars:** squircle with fixed px radius
- **Cards:** `rounded-2xl` with subtle border + hover tint
- **Interactions:** instant CSS transitions, no unnecessary animations

---

## 📝 Writing System

Add a new blog post by creating a `.mdx` file:

```
src/content/writing/my-new-post.mdx
```

Filename becomes the URL slug (`/writing/my-new-post`). The list page, related posts, and metadata all update automatically on next build.

---

## 🗑️ Removing Optional Features

**Donate page**:

```bash
rm -rf src/app/donate src/app/api/donate src/components/donate
```

Remove any `/donate` links from `src/lib/config.ts`.

---

## 🤝 Contributing

1. Fork
2. `git checkout -b feat/thing`
3. `git commit -m "feat: add thing"`
4. `git push origin feat/thing`
5. Open PR

---

## 📄 License

MIT © 2026 Shahriar Avi