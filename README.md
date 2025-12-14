# 🍳 cooked-folio

“monke brain code, premium developer vibes.”

A minimal, high-performance portfolio built with Next.js, Tailwind CSS, and Framer Motion. Real-time Discord presence, Spotify now playing, GitHub contribution graph, slide-to-vibe page, and a chat-style contact form.

![License](https://img.shields.io/github/license/shahriaravi/cooked-folio?style=flat-square)
![Stars](https://img.shields.io/github/stars/shahriaravi/cooked-folio?style=flat-square)

---

## ⚡ Deploy

One‑click deploy on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fshahriaravi%2Fcooked-folio&env=DISCORD_WEBHOOK_URL,NEXT_PUBLIC_DISCORD_USER_ID,SPOTIFY_CLIENT_ID,SPOTIFY_CLIENT_SECRET,SPOTIFY_REFRESH_TOKEN,NEXT_PUBLIC_URL,GITHUB_USERNAME,GITHUB_TOKEN)

---

## ✨ Features

- Discord presence (via Lanyard)
- Spotify “Now Playing”
- GitHub contributions heatmap
- Slide to Vibe with audio + animations
- Chat-style contact form (Discord webhook)
- Dark/Light theme toggle
- Next.js App Router, TypeScript, Tailwind, Framer Motion

### 🔮 Roadmap

- Analytics
- Trakt.tv activity integration
- MyAnimeList watch history integration

---

## 🛠️ Tech Stack

- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Animations: Framer Motion
- Theme: next-themes
- Icons: lucide-react, react-icons

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
  url: process.env.NEXT_PUBLIC_URL || "https://avi.byontriq.xyz",
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

### 3. “Cooked by Avi” copyright

The small footer badge is injected via a script route:

- Code: `src/app/api/c/route.ts`
- Used in the footer via a `<script>` element appended at runtime.

You can remove or tweak this logic if you fork the template.

---

## 📂 Project Structure

```text
src/
├─ app/
│  ├─ api/
│  │  ├─ c/route.ts                       # “Cooked by Avi” copyright script
│  │  ├─ contact/route.ts                 # Discord webhook
│  │  ├─ discord/current-activity/route.ts
│  │  ├─ discord/presence/route.ts
│  │  ├─ github/contributions/route.ts
│  │  └─ spotify/now-playing/route.ts
│  ├─ contact/page.tsx                    # wraps ContactForm
│  ├─ ty/page.tsx                         # thank-you screen
│  ├─ what/page.tsx                       # Slide to Vibe page
│  ├─ layout.tsx
│  ├─ loading.tsx
│  ├─ not-found.tsx
│  └─ page.tsx                            # home
├─ components/
│  ├─ common/                             # Container, ThemeToggle, etc.
│  ├─ layout/                             # HeroHeader, Footer, Providers
│  ├─ sections/                           # ExperienceList, EducationList, ProjectList, TechStack
│  ├─ integrations/                       # DiscordPresenceDot, NowPlaying, GithubActivityCard
│  ├─ vibe-check/                         # SlideToVibe, SlideToVibeButton
│  ├─ contact/                            # ContactForm
│  └─ ui/                                 # HelloLoader, InitialSplash, ThankYouContent
├─ hooks/
│  └─ useDiscordPresence.ts
└─ lib/
   ├─ config.ts                           # content & links
   ├─ site-config.ts                      # metadata/SEO
   └─ utils.ts
```

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