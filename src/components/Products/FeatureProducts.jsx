import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import Rating from "../Rating";
import { Link, useNavigate } from "react-router-dom";
import {
  addToCart,
  addToWishlist,
  messageClear,
} from "../../store/reducers/cartSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";

function FeatureProducts({ products }) {
  const { userInfo } = useSelector((store) => store.auth);
  const { successMessage, errorMessage } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addCart = (id) => {
    if (userInfo) {
      dispatch(addToCart({ userId: userInfo.id, quantity: 1, productId: id }));
    } else {
      navigate("/login");
    }
  };

  const addToWishlistHandle = (product) => {
    dispatch(
      addToWishlist({
        userId: userInfo.id,
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        discount: product.discount,
        rating: product.rating,
        slug: product.slug,
      })
    );
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }

    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="w-[85%] flex flex-warp mx-auto">
      <div className="w-full">
        <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative py-[45px]">
          <h2>Feature Products</h2>
          <div className="w-[100px] h-[2px] bg-[#059473] mt-4"></div>
        </div>
        <div className="w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
          {products?.map((p, i) => (
            <div
              className="border group transition-all duration-300 hover:shadow-md hover:-mt-3"
              key={i}
            >
              <div className="relative overflow-hidden">
                {p?.discount ? (
                  <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                    {p?.discount}%
                  </div>
                ) : (
                  ""
                )}
                <img
                  className="w-full h-[240px] flex justify-center items-center object-contain"
                  src={p?.images[0]}
                  alt=""
                />
                <ul className="flex transition-all justify-center duration-300 -bottom-20 absolute w-full group-hover:bottom-20 gap-3">
                  <li
                    onClick={() => addToWishlistHandle(p)}
                    className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all duration-300"
                  >
                    <FaRegHeart />
                  </li>
                  <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all duration-300">
                    <Link to={`/product/details/${p?.slug}`}>
                      <FaEye />
                    </Link>
                  </li>
                  <li
                    onClick={() => addCart(p?._id)}
                    className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all duration-300"
                  >
                    <FaShoppingBag />
                  </li>
                </ul>
                <div className="py-3 text-slate-600 px-2">
                  <h3 className="font-bold">{p?.name}</h3>
                  <div className="flex justify-start items-center gap-3">
                    <span className="text-md font-semibold">${p?.price}</span>
                    <Rating ratings={p?.rating} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeatureProducts;
