import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Input from "./Input";

import {
  decrementCart,
  getCartProducts,
  incrementCart,
  messageClear,
} from "../../store/reducers/cartSlice";
import { messageClear as orderMessageClear } from "../../store/reducers/orderSlice";
import toast from "react-hot-toast";
import { placeOrder } from "../../store/reducers/orderSlice";

function ShippingBody() {
  const { userInfo } = useSelector((store) => store.auth);
  const {
    errorMessage,
    successMessage,
    price,
    cart: products,
    shipping_free,
    buy_product_item: items,
  } = useSelector((store) => store.cart);

  const { successMessage: orderSuccessMessage } = useSelector(
    (store) => store.order
  );

  const [res, setRes] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [info, setInfo] = useState({
    name: "",
    address: "",
    phone: "",
    province: "",
    post: "",
    area: "",
    city: "",
  });

  const incrementCartHandler = (cartId) => {
    dispatch(incrementCart(cartId));
  };

  const decrementCartHandler = (cartId) => {
    dispatch(decrementCart(cartId));
  };

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, address, phone, post, province, city, area } = info;

    if (name && address && phone && post && province && area && city) {
      setRes(true);
    }
  };

  const placeOrderHandler = () => {
    dispatch(
      placeOrder({
        price,
        products,
        shipping_free,
        items,
        shippingInfo: info,
        userId: userInfo.id,
        navigate,
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

      dispatch(getCartProducts(userInfo.id));
    }

    if (orderSuccessMessage) {
      dispatch(orderMessageClear());

      dispatch(getCartProducts(userInfo.id));
    }
  }, [successMessage, errorMessage, orderSuccessMessage]);

  return (
    <section className="bg-[#eee]">
      <div className="w-[85%] lg:w-[90%] mx-auto py-16 flex flex-wrap">
        <div className="w-[67%] md-lg:w-full">
          <div className="p-4 bg-white rounded-md">
            <h3 className="text-lg text-slate-600 font-bold mb-2">
              Shipping Information
            </h3>
            {!res && (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex justify-between gap-4 md:flex-col">
                  <Input
                    onChange={handleChange}
                    type="text"
                    name="name"
                    label="Name"
                    title="Name"
                    value={info.name}
                  />
                  <Input
                    value={info.address}
                    onChange={handleChange}
                    type="text"
                    name="address"
                    label="House no / building / street / area"
                    title="Address"
                  />
                </div>
                <div className="flex justify-between gap-4 md:flex-col">
                  <Input
                    value={info.phone}
                    onChange={handleChange}
                    type="tel"
                    name="phone"
                    label="Phone"
                    title="Phone"
                  />
                  <Input
                    value={info.post}
                    onChange={handleChange}
                    type="text"
                    name="post"
                    label="Post"
                    title="Post"
                  />
                </div>
                <div className="flex justify-between gap-4 md:flex-col">
                  <Input
                    value={info.province}
                    onChange={handleChange}
                    type="text"
                    name="province"
                    label="Province"
                    title="Province"
                  />
                  <Input
                    value={info.city}
                    onChange={handleChange}
                    type="text"
                    name="city"
                    label="City"
                    title="City"
                  />
                </div>
                <div className="flex justify-between gap-4 md:flex-col">
                  <Input
                    value={info.area}
                    onChange={handleChange}
                    type="text"
                    name="area"
                    label="Area"
                    title="Area"
                  />
                  <button className="bg-[#54d67d] hover:shadow-green-500/50 shadow-md transition-all duration-500 mt-3 w-full h-[40px] flex justify-center items-center text-white rounded-sm ">
                    Save Changes
                  </button>
                </div>
              </form>
            )}
            {res && (
              <div className="flex flex-col gap-1 mt-4">
                <h3 className="text-md text-slate-600 font-semibold">
                  Deliver to {info.name}
                </h3>
                <div>
                  <span className="bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2 py-1 rounded">
                    Home
                  </span>
                  <span>
                    address: {info.address}, province: {info.province}, city:{" "}
                    {info.city}
                  </span>
                  <span
                    onClick={() => setRes(false)}
                    className="text-indigo-500 cursor-pointer"
                  >
                    Change
                  </span>
                </div>
                <span className="text-slate-600 text-sm">
                  Email to phanvanhai1995@gmail.com
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3 mt-3">
            {products.map((p, i) => (
              <div key={i} className="flex bg-white p-4 flex-col gap-2">
                <div className="flex justify-start items-center">
                  <h3 className="text-md text-slate-600 font-bold">
                    {p.shopName}
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
                        {!res && (
                          <>
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
                            <button className="px-5 py-[3px] bg-red-500 text-white">
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="w-[33%] md-lg:w-full">
          <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
            {products.length > 0 && (
              <div className="w-full bg-white p-4 flex flex-col gap-3">
                <h3 className="text-xl font-semibold text-slate-600">
                  Order Summary
                </h3>
                <div className="flex justify-between items-center text-slate-500 font-semibold">
                  <span>Items Total ({items})</span>
                  <span>${price.toFixed(1)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-500 font-semibold">
                  <span>Delivery Free</span>
                  <span>${shipping_free}</span>
                </div>

                <div className="flex justify-between items-center text-slate-500 font-semibold">
                  <span>Total Payment</span>
                  <span>${(price + shipping_free).toFixed(1)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-500 font-semibold">
                  <span>Total</span>
                  <span>${(price + shipping_free).toFixed(1)}</span>
                </div>
                <button
                  onClick={placeOrderHandler}
                  disabled={res ? false : true}
                  className={`uppercase text-lg transition-all duration-300 rounded-sm  ${
                    !res
                      ? "bg-[#fdba74] cursor-not-allowed"
                      : "bg-[#ef4444] pointer-events-auto cursor-pointer"
                  } shadow-lg py-1.5 text-white hover:shadow-orange-400/50`}
                >
                  Place order
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShippingBody;
