import { FaEye, FaRegHeart, FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";
import Rating from "../Rating";

function EasyShop({ modelProducts, product }) {
  return (
    <div className="w-3/12 md-lg:w-full pl-3 md-lg:pl-0">
      <h2 className="bg-[#e2e8f0] w-full py-2 text-start px-3 rounded-sm font-bold">
        From {product?.shopName}
      </h2>
      <div className="flex flex-col gap-5 mt-3 border p-3">
        {modelProducts?.map((p, i) => (
          <div
            className="group transition-all duration-300 hover:shadow-md hover:-mt-3"
            key={p?._id}
          >
            <div className="relative overflow-hidden">
              {p?.discount && (
                <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                  {p?.discount}%
                </div>
              )}
              <img
                className="w-full h-[240px] object-contain"
                src={p?.images[0]}
                alt=""
              />
              <ul className="flex transition-all justify-center duration-300 -bottom-20 absolute w-full group-hover:bottom-20 gap-3">
                <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all duration-300">
                  <FaRegHeart />
                </li>
                <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all duration-300">
                  <Link to={`/product/details/${p?.slug}`}>
                    <FaEye />
                  </Link>
                </li>
                <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all duration-300">
                  <FaShoppingBag />
                </li>
              </ul>
              <div className="py-3 text-slate-600 px-2">
                <h3 className="font-bold">{p?.name}</h3>
                <div className="flex justify-start items-center gap-3">
                  <span className="text-md font-semibold">${p?.price}</span>
                  <Rating ratings={4.6} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EasyShop;
