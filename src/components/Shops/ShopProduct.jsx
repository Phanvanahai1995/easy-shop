import { FaEye, FaRegHeart, FaShoppingBag } from "react-icons/fa";
import Rating from "../Rating";
import Pagination from "../Pagination";

import { Link } from "react-router-dom";

function ShopProduct({
  styles,
  products,
  pageNumber,
  setPageNumber,
  parPage,
  totalProduct,
}) {
  return (
    <div
      className={`w-full grid ${
        styles === "grid"
          ? "grid-cols-3 md-lg:grid-cols-2 sm:grid-cols-1"
          : "grid-cols-1 md-lg:grid-cols-2"
      } gap-3`}
    >
      {products.map((p) => (
        <div
          key={p._id}
          className={`transition-all duration-300 hover:shadow-md hover:-translate-y-3 ${
            styles === "grid"
              ? "flex-col justify-start items-start"
              : "justify-start items-center md-lg:flex-col md-lg:justify-start md-lg:items-start w-full gap-4 bg-white p-1 rounded-md"
          }`}
        >
          <div
            className={
              styles === "grid"
                ? "w-full relative group overflow-hidden"
                : "md-lg:w-full relative group overflow-hidden"
            }
          >
            {p.discount ? (
              <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                {p.discount}%
              </div>
            ) : (
              ""
            )}
            <img
              className={`h-[240px] md:h-[270px] xs:h-[170px] ${
                styles === "grid" ? "mx-auto" : "mx-0"
              } object-contain`}
              src={p.images[0]}
              alt=""
            />
            <ul
              className={`flex transition-all ${
                styles === "grid" ? "justify-center" : "justify-start ml-14"
              }  duration-300 -bottom-20 absolute w-full group-hover:bottom-20 gap-3`}
            >
              <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all duration-300">
                <FaRegHeart />
              </li>
              <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all duration-300">
                <Link to={`/product/details/${p._id}`}>
                  {" "}
                  <FaEye />
                </Link>
              </li>
              <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all duration-300">
                <FaShoppingBag />
              </li>
            </ul>
            <div className="py-3 text-slate-600 px-2">
              <h3 className="font-bold">{p.name}</h3>
              <div className="flex justify-start items-center gap-3">
                <span className="text-md font-semibold">${p.price}</span>
                <Rating ratings={p.rating} />
              </div>
            </div>
          </div>
        </div>
      ))}
      {totalProduct > parPage && (
        <Pagination
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          totalItem={totalProduct}
          parPage={parPage}
          showItem={Math.floor(totalProduct / parPage)}
        />
      )}
    </div>
  );
}

export default ShopProduct;
