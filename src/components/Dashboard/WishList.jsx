import { FaEye, FaRegHeart, FaShoppingBag } from "react-icons/fa";
import Rating from "../Rating";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getWishlist,
  messageClear,
  removeWishlist,
} from "../../store/reducers/cartSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";

function WishList() {
  const { wishlist, successMessage, errorMessage } = useSelector(
    (store) => store.cart
  );
  const { userInfo } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const handleRemoveWishlist = (wishlistId) => {
    dispatch(removeWishlist(wishlistId));
  };

  useEffect(() => {
    dispatch(getWishlist(userInfo.id));
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(getWishlist(userInfo.id));
      dispatch(messageClear());
    }

    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
      {wishlist.map((p, i) => (
        <div
          className="border bg-white group transition-all duration-300 hover:shadow-md hover:-mt-3"
          key={p?._id}
        >
          <div className="relative overflow-hidden">
            {p?.discount && (
              <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                {p?.discount}%
              </div>
            )}

            <img
              className="w-full h-[240px] flex justify-center items-center object-contain"
              src={p?.image}
              alt=""
            />
            <ul className="flex transition-all justify-center duration-300 -bottom-20 absolute w-full group-hover:bottom-20 gap-3">
              <li
                onClick={() => handleRemoveWishlist(p?._id)}
                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all duration-300"
              >
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
                <Rating ratings={p?.rating} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WishList;
