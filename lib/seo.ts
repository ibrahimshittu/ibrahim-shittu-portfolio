export const siteConfig = {
  name: "Ibrahim Shittu",
  title: "Ibrahim Shittu - Senior Software Engineer",
  description:
    "Senior Software Engineer with expertise in web and mobile development, AI, and Machine Learning.",
  url: "https://ibrahimshittu.com",
  ogImage: "https://ibrahimshittu.com/og-image.jpg",
  twitterHandle: "@ibrahimshittu01",
  author: {
    name: "Ibrahim Shittu",
    email: "ibshittu01@gmail.com",
    linkedin: "https://linkedin.com/in/ibrahimshittu",
    github: "https://github.com/ibrahimshittu",
    image:
      "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zMFNVYTB5U011aGdYTXBvRHhueFlIZ09qU1gifQ",
  },
  keywords: [
    "Ibrahim Shittu",
    "Senior Software Engineer",
    "AI",
    "Machine Learning",
    "TypeScript",
    "NextJS",
    "React",
    "Legal Tech",
    "Finiti Legal",
    "Software Development",
    "Web Development",
    "Mobile Development",
  ],
};

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author.name,
    email: siteConfig.author.email,
    image: siteConfig.author.image,
    url: siteConfig.url,
    sameAs: [siteConfig.author.linkedin, siteConfig.author.github],
    jobTitle: "Senior Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Finiti Legal",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "University of Ilorin",
    },
    knowsAbout: [
      "Software Development",
      "AI Agents",
      "Machine Learning",
      "TypeScript",
      "NextJS",
      "React",
      "CAD",
      "Education Tech",
      "Legal Tech",
      "Startup",
      "Career",
      "Engineering",
      "Personal Journey",
    ],
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateArticleSchema(
  title: string,
  description: string,
  slug: string,
  datePublished: string,
  dateModified: string,
  tags: string[],
  readTime: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    url: `${siteConfig.url}/blog/${slug}`,
    datePublished: datePublished,
    dateModified: dateModified,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
      image: siteConfig.author.image,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: siteConfig.ogImage,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${slug}`,
    },
    keywords: tags,
    timeRequired: readTime,
    inLanguage: "en-US",
  };
}

export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: siteConfig.ogImage,
    founder: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
    sameAs: [siteConfig.author.linkedin, siteConfig.author.github],
  };
}

// Helper function to generate canonical URLs
export function generateCanonicalUrl(path: string) {
  return `${siteConfig.url}${path}`;
}

// Helper function to create SEO-friendly URLs
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// Generate meta description with optimal length
export function generateMetaDescription(text: string, maxLength = 160): string {
  if (text.length <= maxLength) return text;

  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");

  return lastSpace > 100
    ? truncated.slice(0, lastSpace) + "..."
    : truncated + "...";
}

// Extract reading time from content
export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

// Generate Open Graph image URL for articles
export function generateOgImageUrl(title: string): string {
  const encodedTitle = encodeURIComponent(title);
  return `${siteConfig.url}/api/og?title=${encodedTitle}`;
}
