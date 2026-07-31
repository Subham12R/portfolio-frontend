import type { ReactElement } from "react";

type ShareCardProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function ShareCard({ eyebrow, title, description }: ShareCardProps): ReactElement {
  return (
    <div
      style={{
        background: "#0e0e0e",
        color: "#f8fafc",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        padding: "64px",
        position: "relative",
      }}
    >
      <div
        style={{
          border: "1px solid rgba(255,255,255,0.14)",
          borderRadius: "28px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "space-between",
          overflow: "hidden",
          padding: "48px",
          position: "relative",
        }}
      >
        <div style={{ color: "#a1a1aa", display: "flex", fontSize: "24px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          {eyebrow}
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "940px" }}>
          <div style={{ fontSize: title.length > 54 ? "64px" : "78px", fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 1.02 }}>
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
      <div style={{ background: "#60a5fa", borderRadius: "999px", height: "12px", left: "112px", position: "absolute", top: "64px", width: "140px" }} />
    </div>
  );
}
