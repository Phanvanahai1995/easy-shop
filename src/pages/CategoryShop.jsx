import CategoryBody from "../components/CategoryShop/CategoryBody";
import SectionBG from "../components/Shops/SectionBG";

function CategoryShop() {
  return (
    <div>
      <SectionBG page="Category Page" to="Shop" />
      <CategoryBody />
    </div>
  );
}

export default CategoryShop;
