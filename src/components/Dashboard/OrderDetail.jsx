import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOrderDetails } from "../../store/reducers/orderSlice";

function OrderDetail() {
  const { orderId } = useParams();
  const { myOrder } = useSelector((store) => store.order);
  const { userInfo } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [orderId]);

  return (
    <div className="bg-white p-5">
      <h2 className="text-slate-600 font-semibold">
        {myOrder?._id}, <span className="pl-1">{myOrder?.date}</span>
      </h2>
      <div className="grid grid-cols-2 gap-3 md-lg:grid-cols-1">
        <div className="flex flex-col gap-1">
          <h3 className="text-slate-600 font-semibold font-sans">
            Deliver To: {myOrder?.shippingInfo?.name}
          </h3>
          <div>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2 py-2 rounded">
              Home
            </span>
            <span className="text-slate-600 text-sm">
              {myOrder?.shippingInfo?.address} {myOrder?.shippingInfo?.province}{" "}
              {myOrder?.shippingInfo?.city}
            </span>
          </div>
          <div className="text-slate-600 text-md font-semibold">
            Email To {userInfo?.email}
          </div>
        </div>
        <div className="text-slate-600">
          <h3 className="font-mono">
            Price: ${myOrder?.price} Include Shipping
          </h3>
          <div className="font-mono">
            Payment Status:{" "}
            <span
              className={`py-[3px] text-xs px-3 ${
                myOrder?.payment_status === "paid"
                  ? "bg-green-300 text-green-800"
                  : "bg-red-300 text-red-800"
              } rounded-md`}
            >
              {myOrder?.payment_status}
            </span>
          </div>
          <div className="font-mono">
            Order Status:{" "}
            <span
              className={`py-[3px] text-xs px-3 ${
                myOrder?.delivery_status === "paid"
                  ? "bg-green-300 text-green-800"
                  : "bg-red-300 text-red-800"
              } rounded-md`}
            >
              {myOrder?.delivery_status}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-slate-600 text-lg pb-2 font-sans font-bold">
          Orders Products
        </h2>
        <div className="flex gap-5 flex-col">
          {myOrder?.products?.map((p) => (
            <div key={p._id}>
              <div className="flex gap-5 justify-start items-center text-slate-600">
                <div className="flex gap-2">
                  <img
                    className="h-[55px] w-[55px] object-contain"
                    src={p?.images[0]}
                    alt=""
                  />
                  <div className="flex text-sm flex-col justify-start items-start">
                    <Link>{p?.name}</Link>
                    <span>Bran: {p?.brand}</span>
                    <span>Quantity: {p?.quantity}</span>
                  </div>
                </div>
                <div className="pl-4 flex flex-col">
                  <span className="text-md text-green-800">
                    ${p?.price - (p?.price * p?.discount) / 100}
                  </span>
                  <span className="line-through">${p?.price}</span>
                  <span className="">{p?.discount}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
