import Product from "./Product";

import "react-multi-carousel/lib/styles.css";

function ProductTop({ latest_product, topRated_product, discount_product }) {
  return (
    <div className="py-10">
      <div className="w-[85%] flex flex-wrap mx-auto">
        <div className="grid w-full grid-cols-3 md-lg:grid-cols-2 sm:grid-cols-1 gap-7">
          <div className="overflow-hidden">
            <Product title="Latest Product" products={latest_product} />
          </div>
          <div className="overflow-hidden">
            <Product title="Top Rated Product" products={topRated_product} />
          </div>
          <div className="overflow-hidden">
            <Product title="Discount Product" products={discount_product} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductTop;
