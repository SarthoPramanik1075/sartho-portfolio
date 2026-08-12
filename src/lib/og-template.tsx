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
        backgroundColor: "#0a0a0a",
        padding: "80px",
        color: "#fafafa",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {eyebrow ? (
          <div
            style={{
              display: "flex",
              fontFamily: "Geist",
              fontSize: 28,
              fontWeight: 500,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "#a1a1aa",
            }}
          >
            {eyebrow}
          </div>
        ) : null}
        <div
          style={{
            display: "flex",
            fontFamily: "Fraunces",
            fontWeight: 700,
            fontSize: 68,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            maxWidth: 980,
          }}
        >
          {title}
        </div>
        {description ? (
          <div
            style={{
              display: "flex",
              fontFamily: "Geist",
              fontWeight: 500,
              fontSize: 30,
              lineHeight: 1.4,
              color: "#d4d4d8",
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
          fontFamily: "Geist",
          fontWeight: 500,
          fontSize: 28,
          color: "#71717a",
        }}
      >
        {siteName}
      </div>
    </div>
  );
}
