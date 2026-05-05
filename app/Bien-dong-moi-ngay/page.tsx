type Props = {
  title: string;
  videoUrl: string;
};

export default function CategoryPage({ title, videoUrl }: Props) {
  return (
    <main style={{ maxWidth: 1250, margin: "0 auto", padding: 24 }}>
      <h1
        style={{
          fontSize: 32,
          fontWeight: "bold",
          marginBottom: 24,
          color: "#0f766e",
          borderBottom: "3px solid #38bdf8",
          paddingBottom: 10,
        }}
      >
        {title}
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "280px 1fr 280px",
          gap: 24,
          alignItems: "start",
        }}
      >
        <div>
          <Article title="Bài viết mới nhất 1" />
          <Article title="Bài viết mới nhất 2" />
        </div>

        <div
          style={{
            background: "#e0f2fe",
            border: "2px solid #38bdf8",
            borderRadius: 14,
            padding: 12,
            boxShadow: "0 8px 20px rgba(14, 165, 233, 0.25)",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingTop: "56.25%",
              overflow: "hidden",
              borderRadius: 10,
              background: "#000",
            }}
          >
            <iframe
              src={videoUrl}
              title={title}
              allowFullScreen
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                border: 0,
              }}
            />
          </div>
        </div>

        <div>
          <Article title="Bài viết mới nhất 3" />
          <Article title="Bài viết mới nhất 4" />
        </div>
      </div>
    </main>
  );
}

function Article({ title }: { title: string }) {
  return (
    <div
      style={{
        background: "#e0f7ff",
        border: "1px solid #38bdf8",
        borderRadius: 12,
        padding: 16,
        marginBottom: 18,
        boxShadow: "0 4px 12px rgba(14, 165, 233, 0.18)",
      }}
    >
      <h3
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#075985",
          marginBottom: 8,
        }}
      >
        {title}
      </h3>
      <p style={{ color: "#0f766e", lineHeight: 1.5 }}>
        Mô tả ngắn bài viết...
      </p>
    </div>
  );
}