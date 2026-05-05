type Props = {
  title: string;
  videoUrl?: string;
};

const posts = [
  "Bài viết mới nhất 1",
  "Bài viết mới nhất 2",
  "Bài viết mới nhất 3",
  "Bài viết mới nhất 4",
];

export default function CategoryPageMobile({
  title,
  videoUrl = "https://www.youtube.com/embed/bqYujsXxT8I",
}: Props) {
  return (
    <main style={mainStyle}>
      <h1 style={titleStyle}>{title}</h1>

      <section style={videoBoxStyle}>
        <div style={videoRatioStyle}>
          <iframe
            src={videoUrl}
            title={title}
            loading="lazy"
            allowFullScreen
            style={iframeStyle}
          />
        </div>
      </section>

      <section style={descBoxStyle}>
        <h2 style={descTitleStyle}>Giới thiệu chuyên mục</h2>

        <p style={descTextStyle}>
          Đây là chuyên mục tổng hợp những nội dung mới nhất, hấp dẫn và đáng
          chú ý. Người đọc có thể theo dõi video nổi bật cùng các bài viết được
          cập nhật liên tục.
        </p>
      </section>

      <section style={postSectionStyle}>
        <h2 style={postHeadingStyle}>Bài viết mới nhất</h2>

        {posts.map((post) => (
          <article key={post} style={articleStyle}>
            <h3 style={articleTitleStyle}>{post}</h3>
            <p style={articleTextStyle}>Mô tả ngắn bài viết...</p>
          </article>
        ))}
      </section>
    </main>
  );
}

const mainStyle = {
  maxWidth: 520,
  margin: "0 auto",
  padding: "16px 12px 28px",
} as const;

const titleStyle = {
  fontSize: 28,
  fontWeight: "bold",
  color: "#0f766e",
  textAlign: "center",
  marginBottom: 18,
  borderBottom: "3px solid #38bdf8",
  paddingBottom: 10,
} as const;

const videoBoxStyle = {
  background: "linear-gradient(145deg, #e0f7ff, #ffffff)",
  border: "2px solid #38bdf8",
  borderRadius: 18,
  padding: 8,
  boxShadow: "0 10px 24px rgba(14,165,233,0.25)",
} as const;

const videoRatioStyle = {
  position: "relative",
  width: "100%",
  aspectRatio: "16 / 9",
  overflow: "hidden",
  borderRadius: 12,
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
  marginTop: 16,
  background: "linear-gradient(145deg, #f0f9ff, #e0f7ff)",
  border: "2px solid #38bdf8",
  borderRadius: 18,
  padding: 16,
  boxShadow: "0 8px 20px rgba(14,165,233,0.2)",
} as const;

const descTitleStyle = {
  fontSize: 22,
  fontWeight: "bold",
  color: "#075985",
  marginBottom: 10,
  textAlign: "center", // 👈 thêm dòng này
} as const;

const descTextStyle = {
  color: "#0f766e",
  fontSize: 16,
  lineHeight: 1.7,
} as const;

const postSectionStyle = {
  marginTop: 18,
} as const;

const postHeadingStyle = {
  fontSize: 22,
  fontWeight: "bold",
  color: "#075985",
  marginBottom: 12,
  textAlign: "center", // 👈 thêm
} as const;

const articleStyle = {
  background: "#e0f7ff",
  border: "1px solid #38bdf8",
  borderRadius: 14,
  padding: 14,
  marginBottom: 12,
} as const;

const articleTitleStyle = {
  fontSize: 18,
  fontWeight: "bold",
  color: "#075985",
  marginBottom: 6,
  textAlign: "center", // 👈 thêm
} as const;

const articleTextStyle = {
  color: "#0f766e",
  fontSize: 15,
  lineHeight: 1.5,
} as const;