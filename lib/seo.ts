export const siteConfig = {
  name: "Ibrahim Shittu",
  title: "Ibrahim Shittu - Senior Software Engineer",
  description:
    "Senior Software Engineer with a proven track record of building scalable, high-performance web, mobile, and AI-driven solutions for startups and global enterprises across diverse industries.",
  url: "https://ibrahimshittu.com",
  ogImage:
    "https://res.cloudinary.com/ibrahimshittu/image/upload/c_fill,g_face,h_630,w_1200,q_auto,f_auto/v1756380032/ibrahim-shittu.png",
  twitterHandle: "@ibrahimshittu01",
  author: {
    name: "Ibrahim Shittu",
    email: "ibshittu01@gmail.com",
    linkedin: "https://linkedin.com/in/ibrahimshittu",
    github: "https://github.com/ibrahimshittu",
    twitter: "https://x.com/ibrahimshittu01",
    image:
      "https://res.cloudinary.com/ibrahimshittu/image/upload/v1756380032/ibrahim-shittu.png",
  },
  keywords: [
    "Ibrahim Shittu",
    "Senior Software Engineer",
    "AI",
    "ML",
    "AI Agents",
    "Artificial Intelligence",
    "Machine Learning",
    "TypeScript",
    "NextJS",
    "React",
    "Career",
    "Engineering",
    "Personal Journey",
    "Legal Tech",
    "Education Tech",
    "Startup",
    "Software Engineering",
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
    sameAs: [
      siteConfig.author.linkedin,
      siteConfig.author.github,
      siteConfig.author.twitter,
    ],
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
      "Software Engineering",
      "AI Agents",
      "Web Development",
      "Mobile Development",
      "Cloud Computing",
      "Artificial Intelligence",
      "Data Science",
      "Machine Learning",
      "TypeScript",
      "NextJS",
      "React",
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
    sameAs: [
      siteConfig.author.linkedin,
      siteConfig.author.github,
      siteConfig.author.twitter,
    ],
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
