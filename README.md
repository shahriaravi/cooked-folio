<div align="center">

# 🍳 cooked-folio

A minimal, high-performance portfolio built with **Next.js**, **Tailwind CSS**, and **Framer Motion**.
<br/>
Real-time Discord presence, Spotify/Trakt.tv/MyAnimeList integration, useful slide-to-vibe page, and a chat-style contact form.

<br/>

[![Discord](https://img.shields.io/badge/Discord-Join%20Community-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/wG9qpfvuQQ)

</div>

## ⚡ Deploy

One‑click deploy on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fshahriaravi%2Fcooked-folio&env=DISCORD_WEBHOOK_URL,NEXT_PUBLIC_DISCORD_USER_ID,SPOTIFY_CLIENT_ID,SPOTIFY_CLIENT_SECRET,SPOTIFY_REFRESH_TOKEN,NEXT_PUBLIC_URL,GITHUB_USERNAME,GITHUB_TOKEN)

---

## ✨ Features
- Discord presence (via Lanyard)
- Trakt.tv & MyAnimeList Stats
- Spotify “Now Playing”
- GitHub contributions heatmap
- Slide to Vibe with audio + animations
- Chat-style contact form (Discord webhook)
- Dark/Light theme toggle
- Next.js App Router, TypeScript, Tailwind, Framer Motion

### 🔮 Roadmap

- Suggestions are open, no new ideas in my mind rn 🙂

---

## 🛠️ Tech Stack

- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Animations: Framer Motion (spring physics, scroll-triggered reveals)
- Theme: next-themes
- Icons: lucide-react, react-icons
- Analytics: Vercel Analytics

---

## 🚀 Getting Started

Clone and install:

```bash
git clone https://github.com/shahriaravi/cooked-folio.git
cd cooked-folio
npm install
# or
bun install
```

Run dev:

```bash
npm run dev
# or
bun dev
```

Then open: http://localhost:3000

---

## ⚙️ Environment Variables

Create a `.env.local` file in the project root. You can start from `.env.example`:

Example command:

```bash
cp .env.example .env.local
```

Required variables:

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_URL` | Your live site URL (for example: `https://your-site.com`) |
| `DISCORD_WEBHOOK_URL` | Discord webhook URL to receive contact form messages |
| `NEXT_PUBLIC_DISCORD_USER_ID` | Your Discord User ID (Developer Mode → Copy ID) |
| `SPOTIFY_CLIENT_ID` | Spotify app Client ID |
| `SPOTIFY_CLIENT_SECRET` | Spotify app Client Secret |
| `SPOTIFY_REFRESH_TOKEN` | Spotify refresh token to fetch now-playing |
| `GITHUB_USERNAME` | Your GitHub username for contributions |
| `GITHUB_TOKEN` | GitHub Personal Access Token (classic) with `read:user` |
| `NEXT_PUBLIC_TRAKT_USERNAME` | TRAKT.tv Username |
| `TRAKT_CLIENT_ID` | TRAKT.tv Client ID |
| `NEXT_PUBLIC_MAL_USERNAME` | MyAnimeList Username |

Analytics are handled by **Vercel Analytics**, enabled from your Vercel project settings (no extra env needed).

---

## 🔧 Configuration

Site configuration is split into two main files.

### 1. Content Config – `src/lib/config.ts`

Edit your personal data here:

- Banner image
- Social links
- Tech stack (`STACK`)
- Experience (`EXPERIENCE`)
- Education (`EDUCATION`)
- Projects (`PROJECTS`)
- External links (Cal.com, Fiverr, etc.)

### 2. SEO / Metadata – `src/lib/site-config.ts`

Controls site-wide metadata:

- Site name and description
- Base URL and OG image
- Twitter / X card settings

Example shape:

```ts
export const siteConfig = {
  name: "avi",
  username: "shahriaravi_",
  description: "founder & swe @ byontriq. building things with next.js, caffeine & monke energy.",
  url: process.env.NEXT_PUBLIC_URL || "https://yoavi.fun",
  ogImage: "/og-img.png",
  links: {
    twitter: "https://twitter.com/shahriaravi_",
    github: "https://github.com/shahriaravi",
  },
};

export function constructMetadata(/* overrides */) {
  // returns a Next.js Metadata object
}
```

---

## 📂 Project Structure

```text
src/
├─ app/
│  ├─ api/
│  │  ├─ contact/route.ts
│  │  ├─ discord/current-activity/route.ts
│  │  ├─ discord/presence/route.ts
│  │  ├─ github/contributions/route.ts
│  │  └─ spotify/now-playing/route.ts
│  ├─ contact/page.tsx                    # wraps ContactForm
│  ├─ donate/page.tsx                     # donation page
│  ├─ donate/thanks/page.tsx              # post-donation thank you
│  ├─ resume/page.tsx                     # wraps ResumeViewer
│  ├─ ty/page.tsx                         # thank-you screen
│  ├─ what/page.tsx                       # Slide to Vibe page
│  ├─ layout.tsx
│  ├─ loading.tsx
│  ├─ not-found.tsx
│  └─ page.tsx                            # home
├─ components/
│  ├─ common/                             # Container, ThemeToggle, HelloLoader, CustomScrollArea, InitialSplash
│  ├─ layout/                             # Hero, Footer, Providers
│  ├─ sections/                           # ExperienceList, EducationList, ProjectList, StackList
│  ├─ integrations/                       # DiscordPresenceDot, NowPlaying, GithubActivityCard
│  ├─ vibe/                               # Vibing, SlideToVibeButton
│  ├─ contact/                            # ContactForm
│  ├─ donate/                             # DonateContent, DonateThanks
│  └─ ui/                                 # Button, Input, Return, ResumeViewer, TimeDisplay, ThankYouContent
├─ hooks/
│  └─ useDiscordPresence.ts
└─ lib/
   ├─ animations.ts                       # shared animation variants & utilities
   ├─ config.ts                           # content & links
   ├─ site-config.ts                      # metadata/SEO
   └─ utils.ts
```

---

## 🗑️ Removing the Donate Page

The `/donate` page is specific to me. If you're forking this repo, you'll likely want to remove it:

1. Delete these directories:
   ```bash
   rm -rf src/app/donate
   rm -rf src/app/api/donate
   rm -rf src/components/donate
   ```

2. Remove any links to `/donate` from your site (e.g. in `src/lib/config.ts` or navigation)

That's it — no other files depend on the donate feature.

---

## 🤝 Contributing

PRs are welcome.

1. Fork the repo  
2. Create a branch: `git checkout -b feat/cool-thing`  
3. Commit: `git commit -m "feat: add cool thing"`  
4. Push: `git push origin feat/cool-thing`  
5. Open a pull request  

---

## 📄 License

MIT © 2025 Shahriar Avi