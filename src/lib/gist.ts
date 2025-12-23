export interface GistLink {
  name: string;
  url: string;
  description: string;
}

export interface GistSubCategory {
  title: string;
  slug: string;
  links: GistLink[];
}

export interface GistCategory {
  title: string;
  slug: string;
  type: "direct" | "subcategories";
  links?: GistLink[];
  subcategories?: GistSubCategory[];
}

export const GIST_CATEGORIES: GistCategory[] = [
  {
    title: "ui libraries",
    slug: "ui-libraries",
    type: "direct",
    links: [
      {
        name: "shadcn/ui",
        url: "https://ui.shadcn.com/?avi",
        description: "beautifully designed components built with radix ui and tailwind css. copy paste into your apps.",
      },
      {
        name: "Kokonut UI",
        url: "https://kokonutui.com/?avi",
        description: "free modern ui components built with tailwind css and framer motion.",
      },
      {
        name: "Smooth UI",
        url: "https://smoothui.dev/?avi",
        description: "a collection of smooth, animated ui components for react and next.js projects.",
      },
      {
        name: "Magic UI",
        url: "https://magicui.design/?avi",
        description: "50+ free and open-source animated components built with react, typescript, tailwind css, and framer motion.",
      },
      {
        name: "Skiper UI",
        url: "https://skiper-ui.com/?avi",
        description: "modern ui components and blocks for building stunning websites faster.",
      },
      {
        name: "daisyUI",
        url: "https://daisyui.com/?avi",
        description: "the most popular component library for tailwind css. semantic class names for cleaner html.",
      },
      {
        name: "Aceternity UI",
        url: "https://ui.aceternity.com/?avi",
        description: "copy paste the most trending components and use them in your websites without worrying about styling.",
      },
    ],
  },
  {
    title: "ui inspiration",
    slug: "ui-inspiration",
    type: "subcategories",
    subcategories: [
      {
        title: "general",
        slug: "general",
        links: [
          {
            name: "Behance",
            url: "https://www.behance.net/?avi",
            description: "the world's largest creative network for showcasing and discovering creative work.",
          },
          {
            name: "Minimal Gallery",
            url: "https://minimal.gallery/?avi",
            description: "curated collection of minimal website design inspiration.",
          },
          {
            name: "Godly",
            url: "https://godly.website/?avi",
            description: "astronomically good web design inspiration from across the web.",
          },
          {
            name: "Maxibestof",
            url: "https://maxibestof.one/?avi",
            description: "hand-picked collection of the best website designs updated daily.",
          },
          {
            name: "Site Inspire",
            url: "https://www.siteinspire.com/?avi",
            description: "a showcase of the finest web and interactive design. curated since 2009.",
          },
          {
            name: "Awwwards",
            url: "https://www.awwwards.com/?avi",
            description: "the awards of design, creativity and innovation on the internet.",
          },
          {
            name: "Best Website Gallery",
            url: "https://bestwebsite.gallery/?avi",
            description: "the most beautiful websites handpicked for you daily.",
          },
          {
            name: "Mobbin",
            url: "https://mobbin.com/?avi",
            description: "save hours of ui & ux research with a library of 300,000+ fully searchable mobile and web screens.",
          },
          {
            name: "Site of Sites",
            url: "https://www.siteofsites.co/?p=1&avi",
            description: "curated gallery of beautiful website designs from around the world.",
          },
          {
            name: "Lapa Ninja",
            url: "https://www.lapa.ninja/?avi",
            description: "the best landing page design inspiration from around the web.",
          },
          {
            name: "SiteSee",
            url: "https://sitesee.co/?avi",
            description: "a curated gallery of beautiful, modern websites collections.",
          },
        ],
      },
      {
        title: "dark mode",
        slug: "dark-mode",
        links: [
          {
            name: "Dark Design",
            url: "https://www.dark.design/?avi",
            description: "the best hand-picked dark themed websites on the internet.",
          },
          {
            name: "Dark Mode Design",
            url: "https://www.darkmodedesign.com/?avi",
            description: "a showcase of beautifully designed dark mode websites.",
          },
          {
            name: "Pixel Fika",
            url: "https://pixelfika.com/?avi",
            description: "curated collection of dark and moody website design inspiration.",
          },
          {
            name: "Inspo Page",
            url: "https://www.inspo.page/?avi",
            description: "beautiful dark website designs to inspire your next project.",
          },
        ],
      },
      {
        title: "landing pages",
        slug: "landing-pages",
        links: [
          {
            name: "Landing Love",
            url: "https://www.landing.love/?avi",
            description: "curated landing page design inspiration from the best saas and startup websites.",
          },
          {
            name: "One Page Love",
            url: "https://onepagelove.com/?avi",
            description: "the ultimate showcase of one page websites, templates and resources.",
          },
        ],
      },
      {
        title: "ui collections",
        slug: "ui-collections",
        links: [
          {
            name: "Collect UI",
            url: "https://collectui.com/?avi",
            description: "daily inspiration collected from daily ui archive and beyond. hand picked, updating daily.",
          },
          {
            name: "Unsection",
            url: "https://www.unsection.com/?avi",
            description: "curated collection of website sections for design inspiration.",
          },
          {
            name: "Viewport UI",
            url: "https://viewport-ui.design/?avi",
            description: "a curated collection of ui design patterns and components from real products.",
          },
          {
            name: "Design Spells",
            url: "https://www.designspells.com/?avi",
            description: "a collection of design details and micro-interactions that feel magical.",
          },
        ],
      },
      {
        title: "creative & vibes",
        slug: "creative-vibes",
        links: [
          {
            name: "Doing Cool Stuff",
            url: "https://www.doingcoolstuff.xyz/?avi",
            description: "a showcase of people doing cool creative stuff on the internet.",
          },
          {
            name: "Details Matter",
            url: "https://detailsmatter.framer.website/?avi",
            description: "a curated collection of tiny design details that make a big difference.",
          },
          {
            name: "SaaS Frame",
            url: "https://www.saasframe.io/?aff=kzPjR&avi",
            description: "inspiration gallery for saas marketers and designers. 1000+ screenshots.",
          },
          {
            name: "Made with Vibe",
            url: "https://www.madewithvibe.com/?avi",
            description: "showcase of products and websites made with great vibes and energy.",
          },
          {
            name: "Whimsical Club",
            url: "https://whimsical.club/?avi",
            description: "a collection of whimsical, playful, and delightful website designs.",
          },
          {
            name: "3D Websites",
            url: "https://3dwebsites.design/?avi",
            description: "curated gallery of the best 3d websites and webgl experiences.",
          },
        ],
      },
      {
        title: "portfolios",
        slug: "portfolios",
        links: [
          {
            name: "Prettyfolio",
            url: "https://www.prettyfolio.com/?avi",
            description: "curated collection of beautiful portfolio websites from designers and developers.",
          },
          {
            name: "Bestfolios",
            url: "https://www.bestfolios.com/?avi",
            description: "gallery of the best portfolio websites for designers, developers, and creatives.",
          },
          {
            name: "Pafolios",
            url: "https://pafolios.com/?avi",
            description: "hand-picked portfolio inspiration for product designers and ux professionals.",
          },
        ],
      },
      {
        title: "sections",
        slug: "sections",
        links: [
          {
            name: "Supahero",
            url: "https://www.supahero.io/?avi",
            description: "curated collection of the best hero section designs from top websites.",
          },
          {
            name: "Navbar Gallery",
            url: "https://www.navbar.gallery/?avi",
            description: "a showcase of beautiful navigation bar designs from around the web.",
          },
          {
            name: "CTA Gallery",
            url: "https://www.cta.gallery/?avi",
            description: "collection of the best call-to-action designs to boost your conversions.",
          },
          {
            name: "Footer Design",
            url: "https://www.footer.design/?avi",
            description: "the best footer designs from across the web. never skip footer day.",
          },
          {
            name: "Pricing Pages",
            url: "https://pricingpages.design/?avi",
            description: "curated gallery of the best pricing page designs for saas and products.",
          },
          {
            name: "404s Design",
            url: "https://www.404s.design/?avi",
            description: "a collection of creative and beautiful 404 error page designs.",
          },
          {
            name: "OG Image Gallery",
            url: "https://www.ogimage.gallery/?avi",
            description: "inspiration for designing perfect open graph images for social sharing.",
          },
        ],
      },
    ],
  },
];