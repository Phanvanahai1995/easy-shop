import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  decrementCart,
  deleteCart,
  getCartProducts,
  incrementCart,
  messageClear,
} from "../../store/reducers/cartSlice";
import toast from "react-hot-toast";

function CardBody() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((store) => store.auth);
  const {
    cart,
    price,
    cart_product_count,
    outOfStock_products,
    shipping_free,
    buy_product_item,
    errorMessage,
    successMessage,
  } = useSelector((store) => store.cart);

  const redirect = () => {
    navigate("/shipping");
  };

  const deleteCartProducts = (cartId) => {
    dispatch(deleteCart(cartId));
  };

  const incrementCartHandler = (cartId) => {
    dispatch(incrementCart(cartId));
  };

  const decrementCartHandler = (cartId) => {
    dispatch(decrementCart(cartId));
  };

  useEffect(() => {
    dispatch(getCartProducts(userInfo.id));
  }, [userInfo.id]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }

    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());

      dispatch(getCartProducts(userInfo.id));
    }
  }, [successMessage, errorMessage]);

  return (
    <section className="bg-[#eee]">
      <div className="w-[85%] lg:w-[90%] mx-auto py-16 flex flex-wrap">
        {cart.length > 0 || outOfStock_products.length > 0 ? (
          <div className="w-[67%] md-lg:w-full">
            {cart.length > 0 && (
              <div className="pr-3 md-lg:pr-0">
                <div className="flex flex-col gap-3">
                  <div className="bg-white p-4">
                    <h3 className="text-md text-green-500 font-semibold">
                      Stock Products {cart_product_count}
                    </h3>
                  </div>
                  {cart.map((p, i) => (
                    <div key={i} className="flex bg-white p-4 flex-col gap-2">
                      <div className="flex justify-start items-center">
                        <h3 className="text-md text-slate-600 font-bold">
                          {cart.shopName}
                        </h3>
                      </div>
                      {p.products.map((item, i) => (
                        <div key={i} className="w-full flex flex-wrap">
                          <div className="flex sm:w-full gap-2 w-7/12">
                            <div className="flex gap-2 justify-start items-center">
                              <img
                                className="w-[80px] h-[80px] object-contain"
                                src={item.productInfo.images[0]}
                                alt=""
                              />
                              <div className="pr-4 flex flex-col text-slate-600">
                                <span className="text-md font-semibold">
                                  {item.productInfo.name}
                                </span>
                                <span className="text-sm">
                                  Brand: {item.productInfo.brand}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between w-5/12 sm:w-full sm:mt-3">
                            <div className="pl-4 sm:pl-0 flex flex-col">
                              <span className="text-lg text-orange-500">
                                $
                                {item.productInfo.price -
                                  (item.productInfo.price *
                                    item.productInfo.discount) /
                                    100}
                              </span>
                              <span className="line-through text-lg">
                                ${item.productInfo.price}
                              </span>
                              <span>-{item.productInfo.discount}%</span>
                            </div>
                            <div className="flex flex-col gap-2">
                              <div className="flex bg-slate-200 h-[30px] justify-center items-center text-xl">
                                <span
                                  onClick={() => decrementCartHandler(item._id)}
                                  className="px-3 cursor-pointer"
                                >
                                  -
                                </span>
                                <span className="px-3">{item.quantity}</span>
                                <span
                                  onClick={() => incrementCartHandler(item._id)}
                                  className="px-3 cursor-pointer"
                                >
                                  +
                                </span>
                              </div>
                              <button
                                onClick={() => deleteCartProducts(item._id)}
                                className="px-5 py-[3px] bg-red-500 text-white"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {outOfStock_products.length > 0 && (
              <div className="pr-3 md-lg:pr-0 mt-3">
                <div className="flex flex-col gap-3">
                  <div className="bg-white p-4">
                    <h3 className="text-md text-red-500 font-semibold">
                      Out of Stock {outOfStock_products.length}
                    </h3>
                  </div>
                  <div className="bg-white p-4">
                    {outOfStock_products.map((items, i) =>
                      items.products.map((item) => (
                        <div key={item._id} className="w-full flex flex-wrap">
                          <div className="flex sm:w-full gap-2 w-7/12">
                            <div className="flex gap-2 justify-start items-center">
                              <img
                                className="w-[80px] h-[80px] object-contain"
                                src={item.images[0]}
                                alt=""
                              />
                              <div className="pr-4 flex flex-col text-slate-600">
                                <span className="text-md font-semibold">
                                  {item.name}
                                </span>
                                <span className="text-sm">
                                  Brand: {item.brand}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between w-5/12 sm:w-full sm:mt-3">
                            <div className="pl-4 sm:pl-0 flex flex-col">
                              <span className="text-lg text-orange-500">
                                $
                                {item.price -
                                  (item.price * item.discount) / 100}
                              </span>
                              <span className="line-through text-lg">
                                ${item.price}
                              </span>
                              <span>-{item.discount}%</span>
                            </div>
                            <div className="flex flex-col gap-2">
                              <div className="flex bg-slate-200 h-[30px] justify-center items-center text-xl">
                                <span
                                  onClick={() =>
                                    decrementCartHandler(items._id)
                                  }
                                  className="px-3 cursor-pointer"
                                >
                                  -
                                </span>
                                <span className="px-3">{items.quantity}</span>
                                <span className="px-3 cursor-pointer">+</span>
                              </div>
                              <button
                                onClick={() => deleteCartProducts(items._id)}
                                className="px-5 py-[3px] bg-red-500 text-white"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <Link to="/shops" className="px-4 py-1 bg-indigo-500 text-white">
              Shop now
            </Link>
          </div>
        )}
        <div className="w-[33%] md-lg:w-full">
          <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
            {cart.length > 0 && (
              <div className="w-full bg-white p-4 flex flex-col gap-3">
                <h3 className="text-xl font-bold text-slate-600">
                  Order Summary
                </h3>
                <div className="flex justify-between items-center">
                  <span>{buy_product_item} Items</span>
                  <span>${price.toFixed(1)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Shipping</span>
                  <span>${shipping_free}</span>
                </div>
                <div className="flex justify-between gap-2 items-center">
                  <input
                    className="w-full py-2 px-3 border border-slate-200 focus:border-[#059473] outline-none rounded-sm"
                    type="text"
                    placeholder="Voucher..."
                  />
                  <button className="py-2 px-3 hover:shadow-green-500/50 bg-[#059473] text-white uppercase font-bold rounded-sm">
                    Apply
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span>Total</span>
                  <span className="text-lg text-[#059473]">
                    ${(price + shipping_free).toFixed(1)}
                  </span>
                </div>
                <button
                  onClick={redirect}
                  className="cursor-pointer uppercase text-lg bg-red-500 transition-all duration-300 rounded-sm shadow-lg py-1.5 text-white hover:shadow-red-500/50"
                >
                  Process To Check Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CardBody;
