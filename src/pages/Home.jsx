import Banner from "../components/Banner";
import Categories from "../components/Categories";
import FeatureProducts from "../components/Products/FeatureProducts";
import ProductTop from "../components/Products/ProductTop";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/reducers/homeSlice";
import { useEffect } from "react";

function Home() {
  const { products, latest_product, topRated_product, discount_product } =
    useSelector((store) => store.home);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div className="w-full">
      <Banner />
      <Categories />
      <FeatureProducts products={products} />
      <ProductTop
        latest_product={latest_product}
        topRated_product={topRated_product}
        discount_product={discount_product}
      />
    </div>
  );
}

export default Home;
