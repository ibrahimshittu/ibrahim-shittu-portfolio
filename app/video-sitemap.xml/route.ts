import { getAllBlogPosts } from "@/lib/markdown";
import { getAllProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/seo";
import {
  extractYouTubeVideos,
  generateBlogVideoMetadata,
} from "@/lib/blog-utils";
import { parseCloudinaryVideoUrl } from "@/lib/video-seo";

interface VideoEntry {
  loc: string;
  video: {
    thumbnail_loc: string;
    title: string;
    description: string;
    content_loc?: string;
    player_loc?: string;
    publication_date: string;
    family_friendly: "yes" | "no";
    tag?: string[];
  };
}

export async function GET() {
  const blogPosts = getAllBlogPosts();
  const projects = getAllProjects();
  const videoEntries: VideoEntry[] = [];

  // Process blog posts with YouTube videos
  blogPosts.forEach((post) => {
    const youtubeVideoIds = extractYouTubeVideos(post.content);

    youtubeVideoIds.forEach((videoId) => {
      const videoMetadata = generateBlogVideoMetadata(
        videoId,
        post.title,
        post.excerpt,
        post.date
      );

      videoEntries.push({
        loc: `${siteConfig.url}/blog/${post.slug}`,
        video: {
          thumbnail_loc: videoMetadata.thumbnailUrl,
          title: videoMetadata.title,
          description: videoMetadata.description,
          player_loc: videoMetadata.embedUrl,
          publication_date: videoMetadata.uploadDate,
          family_friendly: "yes",
          tag: post.tags,
        },
      });
    });
  });

  // Process project videos
  projects.forEach((project) => {
    const pageUrl = `${siteConfig.url}/projects/${project.slug}`;

    // Check main project video
    if (project.image && project.image.match(/\.(mp4|webm|ogg|mov)$/i)) {
      const { title: videoTitle } = parseCloudinaryVideoUrl(project.image);

      videoEntries.push({
        loc: pageUrl,
        video: {
          thumbnail_loc: project.image.replace(
            /\.(mp4|webm|ogg|mov)$/i,
            ".jpg"
          ),
          title: videoTitle || `${project.title} - Demo Video`,
          description: `Demo video showcasing ${project.title}: ${project.excerpt}`,
          content_loc: project.image,
          publication_date: project.date,
          family_friendly: "yes",
          tag: project.technologies,
        },
      });
    }

    // Check gallery videos
    if (project.gallery) {
      project.gallery.forEach((media, index) => {
        const isVideo = media.url.match(/\.(mp4|webm|ogg|mov)$/i);
        if (isVideo) {
          const { title: videoTitle } = parseCloudinaryVideoUrl(media.url);

          videoEntries.push({
            loc: pageUrl,
            video: {
              thumbnail_loc: media.url.replace(
                /\.(mp4|webm|ogg|mov)$/i,
                ".jpg"
              ),
              title:
                videoTitle || `${project.title} - Gallery Video ${index + 1}`,
              description:
                media.caption || `Gallery video for ${project.title}`,
              content_loc: media.url,
              publication_date: project.date,
              family_friendly: "yes",
              tag: project.technologies,
            },
          });
        }
      });
    }
  });

  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${videoEntries
  .map(
    (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <video:video>
      <video:thumbnail_loc>${entry.video.thumbnail_loc}</video:thumbnail_loc>
      <video:title><![CDATA[${entry.video.title}]]></video:title>
      <video:description><![CDATA[${
        entry.video.description
      }]]></video:description>
      ${
        entry.video.content_loc
          ? `<video:content_loc>${entry.video.content_loc}</video:content_loc>`
          : ""
      }
      ${
        entry.video.player_loc
          ? `<video:player_loc>${entry.video.player_loc}</video:player_loc>`
          : ""
      }
      <video:publication_date>${
        entry.video.publication_date
      }</video:publication_date>
      <video:family_friendly>${
        entry.video.family_friendly
      }</video:family_friendly>
      ${
        entry.video.tag
          ?.map((tag) => `<video:tag>${tag}</video:tag>`)
          .join("\n      ") || ""
      }
    </video:video>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
    },
  });
}
