type Props = {
  title: string;
  videoUrl: string;
};

export default function CategoryPage({ title, videoUrl }: Props) {
  return (
    <main style={{ maxWidth: 1200, margin: "0 auto", padding: 20 }}>
      <h1 style={{ marginBottom: 20 }}>{title}</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr 1fr",
          gap: 20,
          alignItems: "start",
        }}
      >
        {/* CỘT TRÁI */}
        <div>
          <Article title="Bài viết mới nhất 1" />
          <Article title="Bài viết mới nhất 2" />
        </div>

        {/* VIDEO GIỮA */}
        <div>
          <iframe
            width="100%"
            height="360"
            src={videoUrl}
            title={title}
            allowFullScreen
            style={{ border: 0 }}
          />
        </div>

        {/* CỘT PHẢI */}
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
        border: "1px solid #ddd",
        padding: 12,
        marginBottom: 15,
        background: "#fff",
      }}
    >
      <h3 style={{ fontSize: 18 }}>{title}</h3>
      <p style={{ color: "#666" }}>Mô tả ngắn bài viết...</p>
    </div>
  );
}