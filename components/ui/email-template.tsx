import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ firstName }) => {
  return (
    <div style={{ fontFamily: "Helvetica, Arial, sans-serif", padding: "24px", backgroundColor: "#f9fafb", color: "#111827" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "#ffffff", padding: "32px", borderRadius: "12px", boxShadow: "0 0 10px rgba(0,0,0,0.05)" }}>
        <h1 style={{ fontSize: "24px", marginBottom: "16px", color: "#1e40af" }}>
          🎉 Welcome to DeepNext, {firstName}!
        </h1>
        <p style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "24px" }}>
          We're thrilled to have you on board! You’re now on the early-access waitlist for the most curated Next.js resource hub on the internet.
        </p>
        <p style={{ fontSize: "16px", marginBottom: "24px" }}>
          Each week, you'll receive <strong>Deep Picks</strong> — hand-selected tutorials, open-source tools, videos, and jobs to boost your dev workflow.
        </p>
        <p style={{ fontSize: "16px", marginBottom: "32px" }}>
          We’ll let you know when we launch. Until then, feel free to follow us on Twitter for sneak peeks and progress updates.
        </p>
        <a
          href="https://twitter.com/deepnext" // replace with actual handle
          style={{
            display: "inline-block",
            padding: "12px 24px",
            backgroundColor: "#1e40af",
            color: "#ffffff",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Follow @deepnext
        </a>
        <p style={{ fontSize: "12px", marginTop: "40px", color: "#6b7280" }}>
          No longer interested? You can safely ignore this email — no further action is required.
        </p>
      </div>
    </div>
  );
};
