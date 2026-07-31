import type { ReactElement } from "react";

type ShareCardProps = {
  eyebrow: string;
  title: string;
  description: string;
};

const DOTS = Array.from({ length: 252 }, (_, index) => ({
  left: 42 + (index % 28) * 42,
  top: 42 + Math.floor(index / 28) * 62,
}));

export function ShareCard({ eyebrow, title, description }: ShareCardProps): ReactElement {
  const titleSize = title.length > 70 ? "56px" : title.length > 54 ? "64px" : "78px";

  return (
    <div
      style={{
        backgroundColor: "#0c0c0c",
        color: "#f8fafc",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        padding: "64px",
        position: "relative",
      }}
    >
      {DOTS.map((dot, index) => (
        <div
          key={index}
          style={{
            backgroundColor: "#292929",
            borderRadius: "999px",
            height: "3px",
            left: `${dot.left}px`,
            position: "absolute",
            top: `${dot.top}px`,
            width: "3px",
          }}
        />
      ))}
      <div
        style={{
          borderRadius: "28px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "space-between",
          overflow: "hidden",
          padding: "48px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ color: "#b4b4ba", display: "flex", fontSize: "24px", fontWeight: 500, letterSpacing: "-0.01em" }}>
          {eyebrow}
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "940px" }}>
          <div
            style={{
              fontSize: titleSize,
              fontWeight: 700,
              letterSpacing: "-0.045em",
              lineHeight: 1.02,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {title}
          </div>
          <div style={{ color: "#c4c4c8", display: "flex", fontSize: "28px", lineHeight: 1.35, marginTop: "28px", maxWidth: "820px" }}>
            {description}
          </div>
        </div>
        <div style={{ alignItems: "center", color: "#d4d4d8", display: "flex", fontSize: "22px", justifyContent: "space-between" }}>
          <span>Subham12r · subham12r.me</span>
          <span>© {new Date().getFullYear()} Subham Karmakar</span>
        </div>
      </div>
    </div>
  );
}