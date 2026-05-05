import { notFound } from "next/navigation";
import { posts } from "../../data/posts";

type Props = {
  params: {
    slug: string;
  };
};

export default function PostDetailPage({ params }: Props) {
  const post = posts.find((item) => item.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="post-detail-page">
      <article className="post-detail-card">
        <div className="post-detail-category">{post.category}</div>

        <h1>{post.title}</h1>

        {post.image && (
          <img className="post-detail-image" src={post.image} alt={post.title} />
        )}

        <p className="post-detail-desc">{post.desc}</p>

        <div className="post-detail-content">
          {post.content.split("\n").map((line, index) =>
            line.trim() ? <p key={index}>{line}</p> : null
          )}
        </div>
      </article>
    </main>
  );
}