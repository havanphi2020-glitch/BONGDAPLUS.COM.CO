"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const featuredPosts = [
  {
    title: "Tin nóng bóng đá hôm nay",
    desc: "Cập nhật nhanh những tin tức bóng đá đáng chú ý trong ngày.",
    href: "/bong-da-viet-nam",
  },
  {
    title: "Ngoại hạng Anh mới nhất",
    desc: "Lịch thi đấu, kết quả và các diễn biến nổi bật.",
    href: "/ngoai-hang-anh",
  },
  {
    title: "Bóng đá thế giới",
    desc: "Tin quốc tế, chuyển nhượng và phân tích chuyên sâu.",
    href: "/bong-da-the-gioi",
  },
];

const categories = [
  { title="🔥 TEST DEPLOY OK 🔥", href: "/bong-da-viet-nam" },
  { title: "Bóng đá thế giới", href: "/bong-da-the-gioi" },
  { title: "Ngoại hạng Anh", href: "/ngoai-hang-anh" },
  { title: "Bất động sản", href: "/bat-dong-san" },
  { title: "Biến động mỗi ngày", href: "/bien-dong-moi-ngay" },
  { title: "Vinanext", href: "/vinanext" },
];

type Post = {
  id?: string | number;
  title: string;
  slug?: string;
  category?: string;
  categorySlug?: string;
  image?: string;
  desc?: string;
  excerpt?: string;
  content?: string;
  createdAt?: string;
  date?: string;
};

function toSlug(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function cleanText(html?: string) {
  return html ? html.replace(/<[^>]+>/g, "").slice(0, 140) : "";
}

export default function HomePage() {
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);

  useEffect(() => {
    try {
      const savedPosts = localStorage.getItem("posts");

      if (savedPosts) {
        const adminPosts = JSON.parse(savedPosts).map((item: any) => ({
          ...item,
          slug: item.slug || toSlug(item.title || ""),
          desc:
            item.desc ||
            item.excerpt ||
            cleanText(item.content) ||
            "Chưa có mô tả bài viết.",
        }));

        setLatestPosts(adminPosts.reverse());
      }
    } catch (error) {
      console.error("Lỗi đọc bài viết localStorage:", error);
    }
  }, []);

  return (
    <main className="home-page">
      <h1 className="home-title">BONGDAPLUS.COM.CO - NƠI BÙNG NỔ CẢM XÚC</h1>

      <section className="home-top-grid">
        <aside className="home-banner">
          <span>Banner trái</span>
        </aside>

        <section className="home-video-box">
          <div className="home-video-ratio">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Video nổi bật"
              allowFullScreen
            />
          </div>
        </section>

        <aside className="home-banner">
          <span>Banner phải</span>
        </aside>
      </section>

      <section className="home-desc-box">
        <h2>Giới thiệu trang chủ</h2>

        <p>
          Đây là trang tổng hợp các tin tức mới nhất về bóng đá, thị trường và
          những biến động đáng chú ý mỗi ngày.
        </p>

        <p>
          Người đọc có thể theo dõi video nổi bật, các bài viết mới và những
          phân tích chuyên sâu được cập nhật liên tục.
        </p>

        <p>
          Giao diện được thiết kế theo dạng báo điện tử hiện đại, giúp người đọc
          dễ dàng theo dõi thông tin nhanh chóng và trực quan.
        </p>
      </section>

      <section className="home-section">
        <h2 className="home-section-title">Bài viết mới nhất</h2>

        {latestPosts.length === 0 ? (
          <p>Chưa có bài viết nào được đăng từ admin.</p>
        ) : (
          <div className="home-post-grid">
            {latestPosts.map((post) => (
              <Link
                key={post.id || post.slug || post.title}
                href={`/bai-viet/${post.slug || toSlug(post.title)}`}
                className="home-post-card"
              >
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="home-post-img"
                  />
                ) : (
                  <div className="home-post-image">Ảnh bài viết</div>
                )}

                <h3>{post.title}</h3>

                <p>
                  {post.desc ||
                    post.excerpt ||
                    cleanText(post.content) ||
                    "Chưa có mô tả bài viết."}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="home-section">
        <h2 className="home-section-title">Bài viết nổi bật</h2>

        <div className="home-post-grid">
          {featuredPosts.map((post) => (
            <Link key={post.title} href={post.href} className="home-post-card">
              <div className="home-post-image">Ảnh bài viết</div>

              <h3>{post.title}</h3>

              <p>{post.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section">
        <h2 className="home-section-title">Chuyên mục</h2>

        <div className="home-category-grid">
          {categories.map((item) => (
            <Link key={item.title} href={item.href} className="home-category">
              {item.title}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}