import Link from "next/link";
import { posts } from "../data/posts";

type Props = {
  title: string;
  categorySlug: string;
  videoUrl?: string;
};

export default function CategoryPage({
  title,
  categorySlug,
  videoUrl = "https://www.youtube.com/embed/bqYujsXxT8I",
}: Props) {

  /* LỌC BÀI THEO CHUYÊN MỤC */
  const categoryPosts = posts.filter(
    (post) => post.categorySlug === categorySlug
  );

  return (
    <main style={{ maxWidth: 1450, margin: "0 auto", padding: 24 }}>
      <h1 style={titleStyle}>{title}</h1>

      {/* TOP GRID */}
      <div style={layoutStyle}>

        {/* SIDEBAR LEFT */}
        <aside style={sideBoxStyle}>
          {categoryPosts.slice(0, 2).map((post) => (
            <Article
              key={post.slug}
              title={post.title}
              desc={post.desc}
            />
          ))}
        </aside>

        {/* VIDEO */}
        <section style={videoBoxStyle}>
          <div style={videoRatioStyle}>
            <iframe
              src={videoUrl}
              title={title}
              allowFullScreen
              style={iframeStyle}
            />
          </div>
        </section>

        {/* SIDEBAR RIGHT */}
        <aside style={sideBoxStyle}>
          {categoryPosts.slice(2, 4).map((post) => (
            <Article
              key={post.slug}
              title={post.title}
              desc={post.desc}
            />
          ))}
        </aside>

        {/* GIỚI THIỆU */}
        <section style={descBoxStyle}>
          <h2 style={descTitleStyle}>Giới thiệu chuyên mục</h2>

          <p style={descTextStyle}>
            Đây là chuyên mục tổng hợp những nội dung mới nhất, hấp dẫn và đáng
            chú ý. Tại đây bạn có thể theo dõi video nổi bật cùng các bài viết
            được cập nhật liên tục.
          </p>

          <p style={descTextStyle}>
            Nội dung được trình bày rõ ràng, cân đối với giao diện hai bên,
            phù hợp cho trang chuyên mục tin tức hoặc video nổi bật.
          </p>
        </section>
      </div>

      {/* DANH SÁCH BÀI VIẾT */}
      <section style={{ marginTop: 40 }}>
        <h2 style={descTitleStyle}>Bài viết mới nhất</h2>

        <div className="home-post-grid">
          {categoryPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/bai-viet/${post.slug}`}
              className="home-post-card"
            >
              <div className="home-post-image">

                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: 14,
                    }}
                  />
                ) : (
                  "Ảnh bài viết"
                )}

              </div>

              <h3>{post.title}</h3>
              <p>{post.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

/* CARD SIDEBAR */
function Article({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <article style={articleStyle}>
      <h3 style={articleTitleStyle}>{title}</h3>
      <p style={articleTextStyle}>{desc}</p>
    </article>
  );
}

/* STYLES */

const titleStyle = {
  fontSize: 42,
  fontWeight: "bold",
  color: "#0f766e",
  textAlign: "center",
  marginBottom: 28,
  borderBottom: "4px solid #38bdf8",
  paddingBottom: 14,
} as const;

const layoutStyle = {
  display: "grid",
  gridTemplateColumns: "280px 720px 280px",
  gap: 28,
  justifyContent: "center",
  alignItems: "start",
} as const;

const videoBoxStyle = {
  background: "linear-gradient(145deg, #e0f7ff, #ffffff)",
  border: "3px solid #38bdf8",
  borderRadius: 24,
  padding: 18,
  boxShadow:
    "0 20px 45px rgba(14,165,233,0.35), inset 0 2px 8px rgba(255,255,255,0.9)",
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

const sideBoxStyle = {
  background: "#f0f9ff",
  border: "1px solid #7dd3fc",
  borderRadius: 18,
  padding: 16,
  boxShadow: "0 8px 22px rgba(14,165,233,0.18)",
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
  textAlign: "center",
} as const;

const articleTextStyle = {
  color: "#0f766e",
  lineHeight: 1.5,
  textAlign: "center",
} as const;

const descBoxStyle = {
  gridColumn: "1 / 4",
  background: "linear-gradient(145deg, #f0f9ff, #e0f7ff)",
  border: "2px solid #38bdf8",
  borderRadius: 20,
  padding: 28,
  boxShadow: "0 10px 28px rgba(14,165,233,0.22)",
} as const;

const descTitleStyle = {
  fontSize: 26,
  fontWeight: "bold",
  color: "#075985",
  marginBottom: 14,
  textAlign: "center",
} as const;

const descTextStyle = {
  color: "#0f766e",
  fontSize: 18,
  lineHeight: 1.8,
  marginBottom: 12,
  textAlign: "center",
} as const;