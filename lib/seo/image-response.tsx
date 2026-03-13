import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

const palette = {
  background: "#090909",
  panel: "#111111",
  border: "rgba(255, 255, 255, 0.12)",
  accent: "#ff7737",
  accentSoft: "#ffb059",
  text: "#f7f3ee",
  muted: "rgba(247, 243, 238, 0.75)",
};

type BrandImageResponseInput = {
  width: number;
  height: number;
  eyebrow?: string;
  title: string;
  description: string;
};

export function createBrandImageResponse({
  width,
  height,
  eyebrow = siteConfig.shortName,
  title,
  description,
}: BrandImageResponseInput) {
  const compact = width <= 240;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: `linear-gradient(135deg, ${palette.background} 0%, ${palette.panel} 100%)`,
          color: palette.text,
          padding: compact ? 36 : 72,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top left, rgba(255,119,55,0.26), transparent 40%), radial-gradient(circle at bottom right, rgba(161,28,33,0.22), transparent 34%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: compact ? 24 : 40,
            right: compact ? 24 : 40,
            width: compact ? 84 : 180,
            height: compact ? 84 : 180,
            borderRadius: 999,
            border: `1px solid ${palette.border}`,
            opacity: 0.5,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: compact ? -30 : -50,
            left: compact ? -30 : -50,
            width: compact ? 160 : 260,
            height: compact ? 160 : 260,
            borderRadius: 999,
            background: "rgba(255,176,89,0.08)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            borderRadius: compact ? 28 : 44,
            border: `1px solid ${palette.border}`,
            padding: compact ? 28 : 44,
            background: "rgba(9,9,9,0.42)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: compact ? 14 : 20,
              maxWidth: compact ? "100%" : 860,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: compact ? 10 : 14,
                fontSize: compact ? 24 : 28,
                letterSpacing: compact ? 4 : 6,
                textTransform: "uppercase",
                color: palette.accentSoft,
              }}
            >
              <span>{eyebrow}</span>
              {!compact ? (
                <span
                  style={{
                    width: 56,
                    height: 1,
                    background: "rgba(255,176,89,0.7)",
                  }}
                />
              ) : null}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: compact ? 12 : 18,
              }}
            >
              <div
                style={{
                  fontSize: compact ? 78 : 98,
                  lineHeight: 0.92,
                  fontWeight: 700,
                  letterSpacing: compact ? -4 : -5,
                }}
              >
                {title}
              </div>
              <div
                style={{
                  fontSize: compact ? 24 : 34,
                  lineHeight: 1.35,
                  color: palette.muted,
                  maxWidth: compact ? "100%" : 900,
                }}
              >
                {description}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: compact ? 12 : 24,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: compact ? 6 : 10,
              }}
            >
              <div
                style={{
                  fontSize: compact ? 28 : 38,
                  fontWeight: 700,
                }}
              >
                {siteConfig.name}
              </div>
              <div
                style={{
                  fontSize: compact ? 18 : 24,
                  textTransform: "uppercase",
                  letterSpacing: compact ? 3 : 4,
                  color: palette.muted,
                }}
              >
                {siteConfig.tagline}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: compact ? 64 : 96,
                height: compact ? 64 : 96,
                borderRadius: compact ? 18 : 24,
                background: palette.accent,
                color: "#120e0b",
                fontSize: compact ? 28 : 38,
                fontWeight: 800,
              }}
            >
              {siteConfig.shortName}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width,
      height,
    },
  );
}

export function createBrandIconResponse(width: number, height = width) {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: `linear-gradient(135deg, ${palette.background} 0%, ${palette.panel} 100%)`,
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top left, rgba(255,119,55,0.28), transparent 42%), radial-gradient(circle at bottom right, rgba(161,28,33,0.24), transparent 34%)",
          }}
        />
        <div
          style={{
            display: "flex",
            width: "76%",
            height: "76%",
            borderRadius: width <= 192 ? 34 : 76,
            background: palette.accent,
            color: "#120e0b",
            alignItems: "center",
            justifyContent: "center",
            fontSize: width <= 192 ? 72 : 208,
            fontWeight: 800,
            letterSpacing: width <= 192 ? -6 : -12,
            boxShadow: "0 24px 80px rgba(0, 0, 0, 0.26)",
          }}
        >
          {siteConfig.shortName}
        </div>
      </div>
    ),
    {
      width,
      height,
    },
  );
}
