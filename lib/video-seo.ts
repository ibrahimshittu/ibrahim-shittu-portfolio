import { siteConfig } from "./seo";

export interface VideoMetadata {
  title: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string; // ISO 8601 duration format (e.g., "PT1M30S" for 1 minute 30 seconds)
  embedUrl?: string;
  contentUrl?: string;
  videoId?: string; // For YouTube videos
}

export function generateVideoObjectSchema(
  video: VideoMetadata,
  pageUrl: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.uploadDate,
    contentUrl: video.contentUrl,
    embedUrl: video.embedUrl,
    ...(video.duration && { duration: video.duration }),
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    potentialAction: {
      "@type": "WatchAction",
      target: video.embedUrl || video.contentUrl,
    },
  };
}

export function generateVideoSitemapEntry(
  video: VideoMetadata,
  pageUrl: string
) {
  return {
    loc: pageUrl,
    video: {
      thumbnail_loc: video.thumbnailUrl,
      title: video.title,
      description: video.description,
      content_loc: video.contentUrl,
      player_loc: video.embedUrl,
      duration: video.duration,
      publication_date: video.uploadDate,
      family_friendly: "yes",
      view_count: undefined, // Can be added if available
      rating: undefined, // Can be added if available
      tag: [], // Can be populated with relevant tags
    },
  };
}

export function extractYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  return null;
}

export function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}

export function parseCloudinaryVideoUrl(url: string): {
  title?: string;
  publicId?: string;
} {
  // Extract public ID from Cloudinary URL for metadata
  const match = url.match(/\/v\d+\/(.+)\.(mp4|webm|mov|avi)$/);
  if (match) {
    const publicId = match[1];
    // Convert public ID to a readable title
    const title = publicId
      .split(/[-_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return { title, publicId };
  }
  return {};
}

// Helper function to convert seconds to ISO 8601 duration
export function secondsToISO8601Duration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes > 0) {
    return `PT${minutes}M${remainingSeconds}S`;
  }
  return `PT${seconds}S`;
}
