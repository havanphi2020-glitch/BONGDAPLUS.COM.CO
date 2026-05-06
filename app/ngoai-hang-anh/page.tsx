import CategoryPage from "../components/CategoryPage";
import CategoryPageMobile from "../components/CategoryPageMobile";

export default function Page() {
  return (
    <>
      <div className="desktop-category">
        <CategoryPage
          title="Ngoại hạng Anh"
          categorySlug="ngoai-hang-anh"
        />
      </div>

      <div className="mobile-category">
        <CategoryPageMobile
          title="Ngoại hạng Anh"
        />
      </div>
    </>
  );
}