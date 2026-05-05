import Link from "next/link";
import { posts } from "../data/posts";

export default function PostsPage() {
  return (
    <main className="posts-page">
      <h1 className="posts-title">Bài viết mới nhất</h1>

      <div className="posts-grid">
        {posts.map((post) => (
          <Link key={post.slug} href={`/bai-viet/${post.slug}`} className="post-card">
            <div className="post-image">
              {post.image ? (
                <img src={post.image} alt={post.title} />
              ) : (
                <span>Ảnh bài viết</span>
              )}
            </div>

            <div className="post-category">{post.category}</div>
            <h2>{post.title}</h2>
            <p>{post.desc}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}