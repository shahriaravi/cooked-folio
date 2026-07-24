import { siteConfig } from "@/lib/site-config";
import type { PostMeta } from "@/lib/writing";

interface ArticleJsonLdProps {
  post: PostMeta;
  description: string;
}

export function ArticleJsonLd({ post, description }: ArticleJsonLdProps) {
  const url = `${siteConfig.url}/writing/${post.slug}`;
  const ogImageUrl = `${url}/opengraph-image`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    image: ogImageUrl,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: "Shahriar Avi",
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: "Shahriar Avi",
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
    wordCount: post.wordCount,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}