"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const categories = [
  "Tất cả",
  "Bóng đá Việt Nam",
  "Bóng đá Thế giới",
  "Ngoại hạng Anh",
  "Bất động sản",
  "Biến động mỗi ngày",
  "Vinanext",
];

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

type Post = {
  id: string;
  title: string;
  slug: string;
  category: string;
  categorySlug: string;
  content: string;
  keywords: string;
  createdAt: string;
};

export default function AdminPage() {
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);
  const [filterCategory, setFilterCategory] = useState("Tất cả");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [previewPost, setPreviewPost] = useState<Post | null>(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [keywords, setKeywords] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("admin_login");

    if (!loggedIn) {
      router.push("/login");
      return;
    }

    const savedPosts = localStorage.getItem("posts");

    if (savedPosts) {
      const parsedPosts = JSON.parse(savedPosts).map(
        (post: any, index: number) => ({
          id: post.id || `${Date.now()}-${index}`,
          title: post.title || "",
          slug: post.slug || toSlug(post.title || ""),
          category: post.category || "",
          categorySlug: post.categorySlug || toSlug(post.category || ""),
          content: post.content || "",
          keywords: post.keywords || "",
          createdAt: post.createdAt || "Chưa có ngày",
        })
      );

      setPosts(parsedPosts);
      localStorage.setItem("posts", JSON.stringify(parsedPosts));
    }
  }, [router]);

  function resetForm() {
    setEditingId(null);
    setTitle("");
    setCategory("");
    setKeywords("");
    setContent("");
  }

  function savePosts(updatedPosts: Post[]) {
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  }

  function handlePost() {
    if (!title || !category || !content) {
      alert("Vui lòng nhập tiêu đề, chuyên mục và nội dung bài viết");
      return;
    }

    if (editingId) {
      const updatedPosts = posts.map((post) =>
        post.id === editingId
          ? {
              ...post,
              title,
              slug: toSlug(title),
              category,
              categorySlug: toSlug(category),
              keywords,
              content,
            }
          : post
      );

      savePosts(updatedPosts);
      alert("Đã cập nhật bài viết");
      resetForm();
      return;
    }

    const newPost: Post = {
      id: Date.now().toString(),
      title,
      slug: toSlug(title),
      category,
      categorySlug: toSlug(category),
      content,
      keywords,
      createdAt: new Date().toLocaleDateString("vi-VN"),
    };

    const updatedPosts = [newPost, ...posts];

    savePosts(updatedPosts);
    alert("Đăng bài thành công");
    resetForm();
  }

  function editPost(post: Post) {
    setEditingId(post.id);
    setTitle(post.title);
    setCategory(post.category);
    setKeywords(post.keywords);
    setContent(post.content);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function deletePost(id: string) {
    const confirmDelete = confirm("Bạn có chắc muốn xóa bài viết này không?");
    if (!confirmDelete) return;

    const updatedPosts = posts.filter((post) => post.id !== id);
    savePosts(updatedPosts);
  }

  function logout() {
    localStorage.removeItem("admin_login");
    router.push("/login");
  }

  const filteredPosts =
    filterCategory === "Tất cả"
      ? posts
      : posts.filter((post) => post.categorySlug === toSlug(filterCategory));

  const categoryCount = filteredPosts.length;

  return (
    <main className="admin-page">
      <div className="admin-top">
        <h1>Quản trị website</h1>

        <button onClick={logout}>Đăng xuất</button>
      </div>

      <section className="admin-box">
        <h2>{editingId ? "Chỉnh sửa bài viết" : "Đăng bài viết"}</h2>

        <input
          placeholder="Tiêu đề bài viết"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Chọn chuyên mục</option>
          <option value="Bóng đá Việt Nam">Bóng đá Việt Nam</option>
          <option value="Bóng đá Thế giới">Bóng đá Thế giới</option>
          <option value="Ngoại hạng Anh">Ngoại hạng Anh</option>
          <option value="Bất động sản">Bất động sản</option>
          <option value="Biến động mỗi ngày">Biến động mỗi ngày</option>
          <option value="Vinanext">Vinanext</option>
        </select>

        <input
          placeholder="Từ khóa bài viết"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />

        <textarea
          rows={10}
          placeholder="Nội dung bài viết..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="admin-action-row">
          <button onClick={handlePost}>
            {editingId ? "Cập nhật bài viết" : "Đăng bài"}
          </button>

          {editingId && (
            <button className="admin-cancel-btn" onClick={resetForm}>
              Hủy sửa
            </button>
          )}
        </div>
      </section>

      <section className="admin-box">
        <h2>Thống kê bài viết</h2>

        <div className="admin-filter-row">
          <label>Chọn chuyên mục:</label>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <strong>Số bài đăng: {categoryCount}</strong>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Bài viết</th>
                <th>Chuyên mục đăng</th>
                <th>Số bài đăng</th>
                <th>Ngày đăng</th>
                <th>Từ khóa bài viết</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>
              {filteredPosts.length === 0 && (
                <tr>
                  <td colSpan={6}>Chưa có bài viết nào.</td>
                </tr>
              )}

              {filteredPosts.map((post) => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>{post.category}</td>
                  <td>{categoryCount}</td>
                  <td>{post.createdAt}</td>
                  <td>{post.keywords || "Chưa có từ khóa"}</td>
                  <td>
                    <div className="admin-table-actions">
                      <button
                        onClick={() => router.push(`/bai-viet/${post.slug}`)}
                      >
                        Xem
                      </button>

                      <button onClick={() => editPost(post)}>Sửa</button>

                      <button
                        className="admin-delete-btn"
                        onClick={() => deletePost(post.id)}
                      >
                        Xóa
                      </button>

                      <button onClick={() => setPreviewPost(post)}>
                        Xem nhanh
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {previewPost && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <button
              className="admin-modal-close"
              onClick={() => setPreviewPost(null)}
            >
              Đóng
            </button>

            <h2>{previewPost.title}</h2>

            <p>
              <strong>Chuyên mục:</strong> {previewPost.category}
            </p>

            <p>
              <strong>Slug bài viết:</strong> {previewPost.slug}
            </p>

            <p>
              <strong>Slug chuyên mục:</strong> {previewPost.categorySlug}
            </p>

            <p>
              <strong>Ngày đăng:</strong> {previewPost.createdAt}
            </p>

            <p>
              <strong>Từ khóa:</strong>{" "}
              {previewPost.keywords || "Chưa có từ khóa"}
            </p>

            <div className="admin-preview-content">
              {previewPost.content.split("\n").map((line, index) =>
                line.trim() ? <p key={index}>{line}</p> : null
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}