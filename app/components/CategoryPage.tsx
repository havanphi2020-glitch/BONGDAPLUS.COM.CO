type Props = {
  title: string;
  videoUrl: string;
};

export default function CategoryPage({ title, videoUrl }: Props) {
  return (
    <main style={{ maxWidth: 1450, margin: "0 auto", padding: 24 }}>
      <h1
        style={{
          fontSize: 42,
          fontWeight: "bold",
          color: "#0f766e",
          textAlign: "center",
          marginBottom: 28,
          borderBottom: "4px solid #38bdf8",
          paddingBottom: 14,
        }}
      >
        {title}
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "280px 720px 280px",
          gap: 28,
          alignItems: "start",
          justifyContent: "center",
        }}
      >
        <div style={sideBoxStyle}>
          <Article title="Bài viết mới nhất 1" />
          <Article title="Bài viết mới nhất 2" />
        </div>

        <section>
          {/* KHUNG VIDEO RIÊNG */}
          <div style={videoBoxStyle}>
            <div style={videoRatioStyle}>
              <iframe
                src={videoUrl}
                title={title}
                allowFullScreen
                style={iframeStyle}
              />
            </div>
          </div>

          {/* KHUNG VĂN BẢN RIÊNG */}
          <div style={descBoxStyle}>
            <h2 style={descTitleStyle}>Giới thiệu chuyên mục</h2>

            <p style={descTextStyle}>
              Đây là chuyên mục tổng hợp những nội dung mới nhất, hấp dẫn và
              đáng chú ý. Tại đây bạn có thể theo dõi video nổi bật cùng các bài
              viết được cập nhật liên tục.
            </p>

            <p style={descTextStyle}>
              Nội dung được chọn lọc nhằm mang đến trải nghiệm tốt nhất cho
              người xem, giúp bạn nắm bắt thông tin nhanh chóng và trực quan.
            </p>
          </div>
        </section>

        <div style={sideBoxStyle}>
          <Article title="Bài viết mới nhất 3" />
          <Article title="Bài viết mới nhất 4" />
        </div>
      </div>
    </main>
  );
}

function Article({ title }: { title: string }) {
  return (
    <article style={articleStyle}>
      <h3 style={articleTitleStyle}>{title}</h3>
      <p style={articleTextStyle}>Mô tả ngắn bài viết...</p>
    </article>
  );
}

const videoBoxStyle = {
  background: "linear-gradient(145deg, #e0f7ff, #ffffff)",
  border: "3px solid #38bdf8",
  borderRadius: 24,
  padding: 18,
  marginBottom: 24,
  boxShadow:
    "0 20px 45px rgba(14, 165, 233, 0.35), inset 0 2px 8px rgba(255,255,255,0.9)",
  transform: "perspective(900px) rotateX(2deg)",
} as const;

const videoRatioStyle = {
  position: "relative",
  width: "100%",
  aspectRatio: "16 / 9",
  overflow: "hidden",
  borderRadius: 16,
  background: "#000",
} as const;

const iframeStyle = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  border: "none",
} as const;

const descBoxStyle = {
  background: "linear-gradient(145deg, #f0f9ff, #e0f7ff)",
  border: "2px solid #38bdf8",
  borderRadius: 20,
  padding: 22,
  boxShadow: "0 10px 28px rgba(14, 165, 233, 0.22)",
} as const;

const descTitleStyle = {
  fontSize: 24,
  fontWeight: "bold",
  color: "#075985",
  marginBottom: 12,
} as const;

const descTextStyle = {
  color: "#0f766e",
  lineHeight: 1.7,
  marginBottom: 10,
} as const;

const sideBoxStyle = {
  background: "#f0f9ff",
  border: "1px solid #7dd3fc",
  borderRadius: 18,
  padding: 14,
  boxShadow: "0 8px 22px rgba(14, 165, 233, 0.18)",
} as const;

const articleStyle = {
  background: "#e0f7ff",
  border: "1px solid #38bdf8",
  borderRadius: 14,
  padding: 16,
  marginBottom: 16,
} as const;

const articleTitleStyle = {
  fontSize: 20,
  fontWeight: "bold",
  color: "#075985",
  marginBottom: 8,
} as const;

const articleTextStyle = {
  color: "#0f766e",
  lineHeight: 1.5,
} as const;