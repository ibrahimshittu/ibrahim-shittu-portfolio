import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { siteConfig } from "@/lib/seo";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || siteConfig.title;
    const subtitle = searchParams.get("subtitle") || "Software engineer";

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#0a0a0b",
            color: "#ededec",
            padding: "90px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontSize: "24px",
              color: "#8c8b86",
              letterSpacing: "0.04em",
            }}
          >
            <div
              style={{ width: "36px", height: "2px", backgroundColor: "#8c8b86" }}
            />
            {siteConfig.author.name}
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: title.length > 48 ? "62px" : "78px",
                fontWeight: 600,
                lineHeight: 1.04,
                letterSpacing: "-0.035em",
                color: "#ededec",
              }}
            >
              {title}
            </div>
            <div
              style={{
                marginTop: "28px",
                fontSize: "32px",
                lineHeight: 1.3,
                color: "#8c8b86",
                maxWidth: "900px",
              }}
            >
              {subtitle}
            </div>
          </div>

          <div style={{ fontSize: "22px", color: "#5c5b56" }}>
            ibrahimshittu.com
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e) {
    console.log(e instanceof Error ? e.message : String(e));
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
