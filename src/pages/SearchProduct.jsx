import SearchProductBody from "../components/SearchProduct/SearchProductBody";
import SectionBG from "../components/Shops/SectionBG";

function SearchProduct() {
  return (
    <div>
      <SectionBG page="Category Page" to="Shop" />
      <SearchProductBody />
    </div>
  );
}

export default SearchProduct;
