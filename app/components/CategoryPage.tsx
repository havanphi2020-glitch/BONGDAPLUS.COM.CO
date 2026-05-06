"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { posts as demoPosts } from "../data/posts";

type Props = {
  title: string;
  categorySlug: string;
  videoUrl?: string;
};

type Post = {
  id?: string;
  slug: string;
  title: string;
  category?: string;
  categorySlug: string;
  image?: string;
  desc?: string;
  content: string;
};

function toSlug(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function categoryToSlug(category: string) {
  const map: Record<string, string> = {
    "Bóng đá Việt Nam": "bong-da-viet-nam",
    "Bóng đá Thế giới": "bong-da-the-gioi",
    "Ngoại hạng Anh": "ngoai-hang-anh",
    "Bất động sản": "bat-dong-san",
    "Biến động mỗi ngày": "bien-dong-moi-ngay",
    Vinanext: "vinanext",
  };

  return map[category] || toSlug(category);
}

export default function CategoryPage({
  title,
  categorySlug,
  videoUrl = "https://www.youtube.com/embed/bqYujsXxT8I",
}: Props) {
  const [allPosts, setAllPosts] = useState<Post[]>(demoPosts as Post[]);

  useEffect(() => {
    const savedPosts = localStorage.getItem("posts");

    if (savedPosts) {
      const adminPosts = JSON.parse(savedPosts).map((post: any) => ({
        id: post.id,
        slug: post.slug || toSlug(post.title),
        title: post.title,
        category: post.category,
        categorySlug: post.categorySlug || categoryToSlug(post.category),
        image: post.image || "",
        desc: post.desc || post.content?.slice(0, 120) + "...",
        content: post.content,
      }));

      setAllPosts([...adminPosts, ...(demoPosts as Post[])]);
    }
  }, []);

  const categoryPosts = allPosts.filter(
    (post) => post.categorySlug === categorySlug
  );

  return (
    <main style={{ maxWidth: 1450, margin: "0 auto", padding: 24 }}>
      <h1 style={titleStyle}>{title}</h1>

      <div style={layoutStyle}>
        <aside style={sideBoxStyle}>
          {categoryPosts.slice(0, 2).map((post) => (
            <Article key={post.slug} post={post} />
          ))}
        </aside>

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

        <aside style={sideBoxStyle}>
          {categoryPosts.slice(2, 4).map((post) => (
            <Article key={post.slug} post={post} />
          ))}
        </aside>

        <section style={descBoxStyle}>
          <h2 style={descTitleStyle}>Giới thiệu chuyên mục</h2>

          <p style={descTextStyle}>
            Đây là chuyên mục tổng hợp những nội dung mới nhất, hấp dẫn và đáng
            chú ý. Bài viết sẽ được cập nhật liên tục.
          </p>
        </section>
      </div>

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

function Article({ post }: { post: Post }) {
  return (
    <Link href={`/bai-viet/${post.slug}`} style={articleLinkStyle}>
      <article style={articleStyle}>
        <h3 style={articleTitleStyle}>{post.title}</h3>
        <p style={articleTextStyle}>{post.desc}</p>
      </article>
    </Link>
  );
}

const articleLinkStyle = {
  textDecoration: "none",
  display: "block",
} as const;

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
} as const;

const videoRatioStyle = {
  position: "relative",
  width: "100%",
  aspectRatio: "16 / 9",
  overflow: "hidden",
  borderRadius: 16,
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
  textAlign: "center",
} as const;

const descBoxStyle = {
  gridColumn: "1 / 4",
  background: "#f0f9ff",
  border: "2px solid #38bdf8",
  borderRadius: 20,
  padding: 28,
  marginTop: 20,
} as const;

const descTitleStyle = {
  fontSize: 28,
  fontWeight: "bold",
  color: "#075985",
  marginBottom: 16,
  textAlign: "center",
} as const;

const descTextStyle = {
  color: "#0f766e",
  fontSize: 18,
  textAlign: "center",
  marginBottom: 12,
} as const;