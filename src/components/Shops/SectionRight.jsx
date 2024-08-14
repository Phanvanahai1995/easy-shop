import { useState } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import ShopProduct from "./ShopProduct";

function SectionRight({
  products,
  setSortPrice,
  pageNumber,
  setPageNumber,
  parPage,
  totalProduct,
  sortPrice,
}) {
  const [styles, setStyles] = useState("grid");

  return (
    <div className="w-9/12 md-lg:w-8/12 md:w-full md:mt-6">
      <div className="pl-8 md:pl-0">
        {/* Top */}
        <div className="py-4 bg-white mb-10 px-3 rounded-md flex justify-between items-center border">
          <h3 className="text-lg font-medium text-slate-600 sm:text-sm">
            {totalProduct} Products
          </h3>
          <div className="flex justify-center items-center gap-3">
            <select
              value={sortPrice}
              onChange={(e) => setSortPrice(e.target.value)}
              className="outline-none border py-2 px-3 sm:px-0"
            >
              <option value="">Sort By</option>
              <option value="low-to-high">Low to High Price</option>
              <option value="hight-to-low">Hight to Low Price</option>
            </select>
            <div className="flex justify-center items-start gap-4 md-lg:hidden">
              <div
                onClick={() => setStyles("grid")}
                className={`p-2 ${
                  styles === "grid" ? "bg-slate-300" : ""
                } text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm`}
              >
                <BsFillGridFill />
              </div>
              <div
                onClick={() => setStyles("list")}
                className={`p-2 ${
                  styles === "list" ? "bg-slate-300" : ""
                } text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm`}
              >
                <FaThList />
              </div>
            </div>
          </div>
        </div>
        {/* Bottom */}
        <ShopProduct
          styles={styles}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          products={products}
          parPage={parPage}
          totalProduct={totalProduct}
        />
      </div>
    </div>
  );
}

export default SectionRight;
