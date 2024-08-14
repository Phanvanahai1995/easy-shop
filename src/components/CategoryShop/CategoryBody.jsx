import { useState, useEffect } from "react";
import { Range } from "react-range";
import { AiFillStar } from "react-icons/ai";
import { CiStar } from "react-icons/ci";

import Product from "../Products/Product";
import SectionRight from "../../components/Shops/SectionRight.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  price_range_product,
  query_products,
} from "../../store/reducers/homeSlice.js";
import { useSearchParams } from "react-router-dom";

function CategoryBody() {
  const { latest_product, products, priceRange, totalProduct, parPage } =
    useSelector((store) => store.home);

  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");

  const dispatch = useDispatch();

  const [filter, setFilter] = useState(true);
  const [rating, setRating] = useState("");
  const [state, setState] = useState({
    values: [priceRange?.low, priceRange?.high],
  });

  const [sortPrice, setSortPrice] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const reset = () => {
    setRating("");
    setState({
      values: [priceRange?.low, priceRange?.high],
    });

    dispatch(
      query_products({
        low: state.values[0],
        high: state.values[1],
        rating: "",
        category: "",
        sortPrice,
        pageNumber: 1,
      })
    );
  };

  useEffect(() => {
    dispatch(price_range_product());
  }, []);

  useEffect(() => {
    setState({
      values: [priceRange?.low, priceRange?.high],
    });
  }, [priceRange]);

  useEffect(() => {
    dispatch(
      query_products({
        low: state.values[0] || "",
        high: state.values[1] || "",
        rating,
        category,
        sortPrice,
        pageNumber,
      })
    );
  }, [
    state.values[0],
    state.values[1],
    category,
    rating,
    sortPrice,
    pageNumber,
  ]);

  return (
    <div className="py-16">
      <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
        <div className={`md:block hidden ${!filter ? "mb-6" : "mb-0"}`}>
          <button
            onClick={() => setFilter((prev) => !prev)}
            className="text-center w-full py-2 px-3 bg-indigo-500 text-white"
          >
            Filter Product
          </button>
        </div>
        <div className="w-full flex flex-wrap">
          {/* Left */}
          <div
            className={`w-3/12 md-lg:w-4/12 md:w-full pr-8 md:pr-0 ${
              filter
                ? "md:h-0 md:overflow-hidden md:mb-6"
                : "md:h-auto md:overflow-auto md:mb-0"
            }`}
          >
            <div>
              <h2 className="text-3xl md:text-xl font-bold mb-3 text-slate-600">
                Price
              </h2>

              <Range
                step={5}
                min={priceRange.low}
                max={priceRange.high}
                values={state.values}
                onChange={(values) => setState({ values })}
                renderTrack={({ props, children }) => (
                  <div
                    className="w-full md:w-[90%] md:ml-2 h-[6px] bg-slate-200 rounded-full cursor-pointer"
                    {...props}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props, children }) => (
                  <div
                    className="w-[15px] h-[15px] rounded-full bg-[#059473]"
                    {...props}
                  >
                    {children}
                  </div>
                )}
              />

              <span className="mt-4 block font-bold text-slate-800 text-lg">
                ${Math.floor(state.values[0])} - ${Math.floor(state.values[1])}{" "}
              </span>
            </div>
            <div className="mt-5">
              <h2 className="text-3xl md:text-xl font-bold mb-3 text-slate-600">
                Rating
              </h2>
              <div className="flex flex-col gap-3">
                <div
                  onClick={() => setRating(5)}
                  className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer"
                >
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                </div>
                <div
                  onClick={() => setRating(4)}
                  className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer"
                >
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <CiStar />
                </div>
                <div
                  onClick={() => setRating(3)}
                  className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer"
                >
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <CiStar />
                  <CiStar />
                </div>
                <div
                  onClick={() => setRating(2)}
                  className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer"
                >
                  <AiFillStar />
                  <AiFillStar />
                  <CiStar />
                  <CiStar />
                  <CiStar />
                </div>
                <div
                  onClick={() => setRating(1)}
                  className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer"
                >
                  <AiFillStar />
                  <CiStar />
                  <CiStar />
                  <CiStar />
                  <CiStar />
                </div>
                <div
                  onClick={reset}
                  className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer"
                >
                  <CiStar />
                  <CiStar />
                  <CiStar />
                  <CiStar />
                  <CiStar />
                </div>
              </div>
            </div>
            <div className="mt-5">
              <Product title="Latest Product" products={latest_product} />
            </div>
          </div>
          {/* Right */}
          <SectionRight
            setSortPrice={setSortPrice}
            products={products}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            parPage={parPage}
            totalProduct={totalProduct}
            sortPrice={sortPrice}
          />
        </div>
      </div>
    </div>
  );
}

export default CategoryBody;
