<div align="center">

# 🍳 cooked-folio

A minimal, editorial portfolio built with **Next.js 14**, **Tailwind**, and **TypeScript**.
<br/>
Real-time Discord presence, Spotify now-playing, GitHub heatmap, MDX blog with syntax highlighting, dynamic OG images, and a chat-style contact form.

<br/>

[![Discord](https://img.shields.io/badge/Discord-Join%20Community-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/wG9qpfvuQQ)

</div>

## ⚡ Deploy

One-click deploy on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fshahriaravi%2Fcooked-folio&env=DISCORD_WEBHOOK_URL,NEXT_PUBLIC_DISCORD_USER_ID,SPOTIFY_CLIENT_ID,SPOTIFY_CLIENT_SECRET,SPOTIFY_REFRESH_TOKEN,NEXT_PUBLIC_URL,GITHUB_USERNAME,GITHUB_TOKEN)

---

## ✨ Features

- **Discord presence** via Lanyard with real status dot + current activity
- **Spotify now playing** with album art
- **GitHub contributions heatmap** + live star count badge in footer
- **MDX blog** at /writing — auto reading time, per-post dynamic OG images, share menu (X, Facebook, Discord, copy link), related posts, syntax highlighted code blocks with copy button
- **Chat-style contact form** — sequential prompts, posts to Discord webhook
- **Cal.com booking modal** embedded in homepage footer
- **Sound feedback** via Cuelume — hover ticks, press sounds, success chimes on every interaction
- **Dark/light theme** with instant swap
- **SEO-optimized** — full metadata, JSON-LD Person + WebSite + BlogPosting schema, robots.txt, dynamic sitemap
- **AI crawler friendly** — GPTBot, ClaudeBot, Gemini, Perplexity explicitly allowed
- **Dark mode extension blocker** — locks out Dark Reader, Night Eye, etc. so your theme stays yours
- Editorial typography (Inter + Geist Mono), squircle avatars, no unnecessary animations, instant client-side navigation

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14.2 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Fonts:** Inter (body) + Geist Mono (meta/labels)
- **Content:** MDX via next-mdx-remote, gray-matter, reading-time
- **Syntax highlighting:** rehype-pretty-code + shiki (github-dark-dimmed theme)
- **OG images:** @vercel/og with bundled Inter fonts and per-post cards
- **Icons:** lucide-react, react-icons
- **Data:** SWR + async server components
- **Analytics:** Vercel Analytics
- **Booking:** @calcom/embed-react
- **Sound feedback:** cuelume

---

## 🚀 Getting Started

    git clone https://github.com/shahriaravi/cooked-folio.git
    cd cooked-folio
    npm install
    npm run dev

Open http://localhost:3000.

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env.local`:

    cp .env.example .env.local

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
Metadata, keywords, JSON-LD schema, OpenGraph, Twitter cards. Every page defaults to `Shahriar Avi` as title unless overridden per-page.

**Blog posts** → `src/content/writing/*.mdx`
Filename becomes slug. Frontmatter is minimal:

    ---
    title: "Post Title"
    date: "2026-01-15"
    ---

Reading time, word count, slug, and per-post OG image all auto-generated.

**OG images** → `src/app/writing/[slug]/opengraph-image.tsx`
Dynamic per-post preview cards using your background at `public/images/og-bg.png`, avatar, post title, and reading time. Fonts bundled at `public/fonts/Inter-Regular.ttf` + `Inter-Bold.ttf`.

---

## 📂 Project Structure

    src/
    ├─ app/
    │  ├─ api/                                # contact, donate, discord, spotify, github routes
    │  ├─ writing/
    │  │  ├─ page.tsx                         # blog list
    │  │  └─ [slug]/
    │  │     ├─ page.tsx                      # dynamic post page (SSG)
    │  │     └─ opengraph-image.tsx           # per-post OG image generator
    │  ├─ playground/
    │  │  ├─ page.tsx                         # playground list (grid of previews)
    │  │  └─ [slug]/
    │  │     └─ page.tsx                      # per-component customizer page
    │  ├─ contact/                            # chat-style form
    │  ├─ donate/                             # donation page + thanks
    │  ├─ layout.tsx                          # root: Providers, NavbarWrapper, SiteFooterWrapper, JSON-LD, fonts
    │  ├─ sitemap.ts                          # dynamic sitemap
    │  └─ page.tsx                            # homepage
    ├─ components/
    │  ├─ common/                             # Container, ThemeToggle, CodeBlock, CopyButton, CustomScrollArea
    │  ├─ layout/                             # Hero, Navbar, NavbarWrapper, HomeFooter, SiteFooter, SiteFooterWrapper, Providers
    │  ├─ sections/                           # Experience, Education, Projects, Stack, PlaygroundSection
    │  ├─ integrations/                       # Discord, Spotify, GitHub cards
    │  ├─ contact/                            # ContactForm
    │  ├─ donate/                             # DonateContent, DonateThanks
    │  ├─ writing/                            # WritingList, MdxComponents, ShareMenu, MorePosts, ArticleJsonLd
    │  ├─ playground/
    │  │  ├─ Controls/                        # Text, Number, Slider, Color, Select, MultiSelect, Toggle
    │  │  ├─ showcases/                       # InputBox, Button, ToggleShowcase
    │  │  ├─ PlaygroundLayout.tsx             # preview area + controls grid
    │  │  ├─ PlaygroundList.tsx               # grid of playground previews
    │  │  ├─ usePlaygroundState.ts            # URL param sync hook
    │  │  ├─ registry.tsx                     # slug → showcase + control config
    │  │  └─ types.ts                         # control type definitions
    │  └─ ui/                                 # TimeDisplay, Folder, LogoLoop, PixelBlast
    ├─ content/writing/                       # MDX blog posts
    ├─ hooks/                                 # useDiscordPresence
    └─ lib/                                   # config, site-config, writing, utils
    public/
    ├─ fonts/                                 # Inter-Regular.ttf, Inter-Bold.ttf (for OG images)
    ├─ images/                                # og-bg.png (OG background)
    └─ avatar/                                # avatar.png, avatar.jpg, avatar-fill.png

---

## 🎨 Design System

- **Content width:** 44rem (704px) centered column
- **Fonts:** Inter body, Geist Mono for meta/labels/dates
- **Section overline:** `text-[11px] font-mono uppercase tracking-[0.14em]`
- **Body copy:** `16px / 24px / 0.2px`
- **Headings:** `22–28px semibold`, tight letter-spacing
- **Avatars:** squircle with fixed px radius
- **Cards:** `rounded-2xl` with subtle border + hover tint
- **Interactions:** instant CSS transitions, no page fade animations, no unnecessary pop-ins
- **Sticky footer:** `flex min-h-[100dvh] flex-col` layout keeps footer at bottom on short pages
- **Sound design:** Cuelume for tactile audio feedback on hover, press, success, error

---

## 📝 Writing System

Add a new blog post by creating a `.mdx` file:

    src/content/writing/my-new-post.mdx

Filename becomes the URL slug (`/writing/my-new-post`). The list page, related posts, sitemap, and per-post OG image all update automatically on next build.

Code blocks support syntax highlighting when you specify a language after the opening backticks (tsx, ts, css, bash, powershell, python, and 100+ more via shiki). Every code block gets an always-visible copy button.

---

## 🔒 Dark Mode Extension Blocking

The site actively blocks browser extensions like Dark Reader from overriding its theme, since it already ships proper dark mode. Handled via:

- `<meta name="darkreader-lock" />` in the head
- `darkreader-ignore` class + `data-darkreader-ignore` attribute on `<html>`
- CSS reset for any `[data-darkreader-inline-*]` attributes
- `color-scheme: only light/dark` locks

Full explanation in `/writing/block-dark-mode-extensions`.

---

## 🗑️ Removing Optional Features

**Donate page:**

    rm -rf src/app/donate src/app/api/donate src/components/donate

Remove any `/donate` links from `src/lib/config.ts`.

**Playground:**

    rm -rf src/app/playground src/components/playground

Then remove the `<PlaygroundSection />` import and usage from `src/app/page.tsx`, delete `src/components/sections/PlaygroundSection.tsx`, and remove the `/playground` case from `getBackHref` in `src/components/layout/Navbar.tsx`.

**Component Craft** (if you added your own local `/craft` registry):

    rm -rf src/app/craft src/app/r src/components/craft src/content/craft src/lib/craft.ts src/lib/registry-source.ts

Then remove the `/craft` entry from `navLinks` in `src/components/layout/Navbar.tsx` and remove the `/craft` include from `experimental.outputFileTracingIncludes` in `next.config.js`.

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