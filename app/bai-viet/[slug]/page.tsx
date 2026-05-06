"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { posts as demoPosts } from "../../data/posts";

type Post = {
  id?: string | number;
  slug?: string;
  title: string;
  category?: string;
  categorySlug?: string;
  image?: string;
  desc?: string;
  excerpt?: string;
  content?: string;
  keywords?: string | string[];
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
  return html ? html.replace(/<[^>]+>/g, "").slice(0, 120) : "";
}

export default function PostDetailPage() {
  const params = useParams();
  const currentSlug = decodeURIComponent(params.slug as string);

  const [post, setPost] = useState<Post | null>(null);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let adminPosts: Post[] = [];

    try {
      const savedPosts = localStorage.getItem("posts");

      if (savedPosts) {
        adminPosts = JSON.parse(savedPosts).map((item: any) => ({
          ...item,
          slug: item.slug || toSlug(item.title || ""),
          categorySlug: item.categorySlug || toSlug(item.category || ""),
          content: item.content || "",
          desc:
            item.desc ||
            item.excerpt ||
            cleanText(item.content) ||
            "",
        }));
      }
    } catch (error) {
      console.error("Lỗi đọc localStorage:", error);
    }

    const fixedDemoPosts: Post[] = demoPosts.map((item: any) => ({
      ...item,
      slug: item.slug || toSlug(item.title || ""),
      categorySlug: item.categorySlug || toSlug(item.category || ""),
      content: item.content || "",
      desc:
        item.desc ||
        item.excerpt ||
        cleanText(item.content) ||
        "",
    }));

    const mergedPosts = [...adminPosts, ...fixedDemoPosts];

    const foundPost = mergedPosts.find((item) => {
      const itemSlug = item.slug || toSlug(item.title || "");

      return (
        itemSlug === currentSlug ||
        toSlug(item.title || "") === currentSlug ||
        String(item.id) === currentSlug
      );
    });

    setAllPosts(mergedPosts);
    setPost(foundPost || null);
    setLoaded(true);
  }, [currentSlug]);

  if (!loaded) {
    return (
      <main className="post-detail-page">
        <article className="post-detail-card">
          <h1>Đang tải bài viết...</h1>
        </article>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="post-detail-page">
        <article className="post-detail-card">
          <h1>Không tìm thấy bài viết</h1>
          <p>Bài viết này chưa tồn tại hoặc đã bị xóa.</p>
          <p>Slug đang mở: {currentSlug}</p>
          <Link href="/bai-viet">Quay lại danh sách bài viết</Link>
        </article>
      </main>
    );
  }
const postTextLength = (post.content || "")
  .replace(/<[^>]+>/g, "")
  .length;

const sidePostLimit =
  postTextLength < 900
    ? 1
    : postTextLength < 1800
    ? 2
    : postTextLength < 3000
    ? 3
    : Math.ceil(postTextLength / 800);
  const relatedPosts = allPosts
    .filter(
      (item) =>
        (item.slug || toSlug(item.title || "")) !==
          (post.slug || toSlug(post.title || "")) &&
        item.categorySlug === post.categorySlug
    )
.slice(0, sidePostLimit);
  const otherPosts = allPosts
    .filter(
      (item) =>
        (item.slug || toSlug(item.title || "")) !==
        (post.slug || toSlug(post.title || ""))
    )
.slice(0, sidePostLimit);
  return (
    <main className="post-detail-layout">
      <aside className="post-side-box">
        <h3>Bài cùng chuyên mục</h3>

        {relatedPosts.length === 0 && <p>Chưa có bài cùng chuyên mục.</p>}

{relatedPosts.map((item) => (          <Link
            key={item.id || item.slug || item.title}
            href={`/bai-viet/${item.slug || toSlug(item.title)}`}
            className="post-side-item"
          >
            <strong>{item.title}</strong>
            <span>{item.createdAt || item.date || item.category || ""}</span>
          </Link>
        ))}
      </aside>

      <article className="post-detail-card">
        <Link
          href={post.categorySlug ? `/${post.categorySlug}` : "/"}
          className="post-detail-back"
        >
          ← Quay lại chuyên mục {post.category || ""}
        </Link>

        <div className="post-detail-category">
          {post.category || post.categorySlug}
        </div>

        <h1>{post.title}</h1>

        {(post.createdAt || post.date) && (
          <div className="post-detail-date">
            {post.createdAt || post.date}
          </div>
        )}

        {post.image && (
          <img
            className="post-detail-image"
            src={post.image}
            alt={post.title}
          />
        )}

        {post.desc && <p className="post-detail-desc">{post.desc}</p>}

        <div
          className="post-detail-content"
          dangerouslySetInnerHTML={{
            __html: post.content || "",
          }}
        />
      </article>

      <aside className="post-side-box">
        <h3>Bài viết khác</h3>

        {otherPosts.length === 0 && <p>Chưa có bài viết khác.</p>}

        {otherPosts.map((item) => (
          <Link
            key={item.id || item.slug || item.title}
            href={`/bai-viet/${item.slug || toSlug(item.title)}`}
            className="post-side-item"
          >
            <strong>{item.title}</strong>
            <span>{item.category || ""}</span>
          </Link>
        ))}
      </aside>
    </main>
  );
}