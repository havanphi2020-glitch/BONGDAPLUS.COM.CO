import CategoryPage from "../components/CategoryPage";
import CategoryPageMobile from "../components/CategoryPageMobile";

export default function Page() {
  return (
    <>
      <div className="desktop-category">
        <CategoryPage
          title="Vinanext"
          categorySlug="vinanext"
        />
      </div>

      <div className="mobile-category">
        <CategoryPageMobile
          title="Vinanext"
        />
      </div>
    </>
  );
}