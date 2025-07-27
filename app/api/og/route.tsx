import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { siteConfig } from "@/lib/seo";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || siteConfig.title;
    const subtitle = searchParams.get("subtitle") || "Senior Software Engineer";

    return new ImageResponse(
      (
        <div
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            fontFamily: "Inter",
            color: "white",
            padding: "60px",
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              borderRadius: "20px",
              padding: "40px",
              width: "100%",
              textAlign: "center",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <h1
              style={{
                fontSize: title.length > 50 ? "48px" : "64px",
                fontWeight: "bold",
                margin: "0 0 20px 0",
                lineHeight: "1.1",
                textAlign: "center",
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: "32px",
                margin: "0 0 30px 0",
                opacity: 0.9,
                textAlign: "center",
              }}
            >
              {subtitle}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
                fontSize: "24px",
                opacity: 0.8,
              }}
            >
              <span>{siteConfig.author.name}</span>
              <span>•</span>
              <span>{siteConfig.url.replace("https://", "")}</span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
