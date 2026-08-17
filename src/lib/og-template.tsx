export const OG_SIZE = { width: 1200, height: 630 };

export function OgCard({
  eyebrow,
  title,
  description,
  siteName = "Sartho Pramanik",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  siteName?: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#0f1a3d",
        padding: "80px",
        color: "#e6edf7",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {eyebrow ? (
          <div
            style={{
              display: "flex",
              fontFamily: "IBM Plex Mono",
              fontWeight: 600,
              fontSize: 28,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "#5b8fff",
            }}
          >
            {eyebrow}
          </div>
        ) : null}
        <div
          style={{
            display: "flex",
            fontFamily: "IBM Plex Mono",
            fontWeight: 700,
            fontSize: 64,
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            maxWidth: 980,
          }}
        >
          {title}
        </div>
        {description ? (
          <div
            style={{
              display: "flex",
              fontFamily: "IBM Plex Sans",
              fontWeight: 500,
              fontSize: 30,
              lineHeight: 1.4,
              color: "#8fa2c2",
              maxWidth: 900,
            }}
          >
            {description}
          </div>
        ) : null}
      </div>
      <div
        style={{
          display: "flex",
          fontFamily: "IBM Plex Mono",
          fontWeight: 600,
          fontSize: 26,
          color: "#8792a0",
        }}
      >
        {siteName}
      </div>
    </div>
  );
}
