import CategoryPage from "../components/CategoryPage";
import CategoryPageMobile from "../components/CategoryPageMobile";

export default function Page() {
  return (
    <>
      <div className="desktop-category">
        <CategoryPage title="Bóng đá Thế giới" />
      </div>

      <div className="mobile-category">
        <CategoryPageMobile title="Bóng đá Thế giới" />
      </div>
    </>
  );
}