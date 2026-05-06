import CategoryPage from "../components/CategoryPage";
import CategoryPageMobile from "../components/CategoryPageMobile";

export default function Page() {
  return (
    <>
      <div className="desktop-category">
        <CategoryPage
          title="Bất động sản"
          categorySlug="bat-dong-san"
        />
      </div>

      <div className="mobile-category">
        <CategoryPageMobile
          title="Bất động sản"
        />
      </div>
    </>
  );
}