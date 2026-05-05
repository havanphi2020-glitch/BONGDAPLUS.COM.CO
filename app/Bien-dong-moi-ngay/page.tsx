import CategoryPage from "../components/CategoryPage";
import CategoryPageMobile from "../components/CategoryPageMobile";

export default function Page() {
  return (
    <>
      <div className="desktop-category">
        <CategoryPage
          title="Biến động mỗi ngày"
          videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
        />
      </div>
    </>
  );
}