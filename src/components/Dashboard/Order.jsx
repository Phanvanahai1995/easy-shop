import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrder } from "../../store/reducers/orderSlice";

function Order() {
  const [state, setState] = useState("all");
  const navigate = useNavigate();
  const { userInfo } = useSelector((store) => store.auth);
  const { myOrders } = useSelector((store) => store.order);

  const dispatch = useDispatch();

  const redirect = (order) => {
    let items = 0;
    for (let i = 0; i < order.products.length; i++) {
      items = order.products[i].quantity + items;
    }

    navigate("/payment", {
      state: {
        price: order.price,
        items,
        orderId: order._id,
      },
    });
  };

  useEffect(() => {
    dispatch(getOrder({ status: state, customerId: userInfo.id }));
  }, [state, userInfo]);

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-600">My Orders</h2>
        <select
          onChange={(e) => setState(e.target.value)}
          value={state}
          className="cursor-pointer outline-none px-3 py-1 border rounded-md text-slate-600"
        >
          <option value="all">--order status--</option>
          <option value="placed">Placed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
          <option value="warehouse">Warehouse</option>
        </select>
      </div>
      <div className="pt-4">
        <div className="relative overflow-x-auto rounded-md">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-green-700 uppercase bg-gray-200 ">
              <tr>
                <th className="px-6 py-3" scope="col">
                  Order Id
                </th>
                <th className="px-6 py-3" scope="col">
                  Price
                </th>
                <th className="px-6 py-3" scope="col">
                  Order Status
                </th>
                <th className="px-6 py-3" scope="col">
                  Payment Status
                </th>
                <th className="px-6 py-3" scope="col">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((order) => (
                <tr key={order._id} className="bg-white border-b">
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    {order._id}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    ${order.price}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    {order.delivery_status}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    {order.payment_status}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    <Link to={`/dashboard/order/details/${order._id}`}>
                      <span className="bg-green-200 text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded">
                        View
                      </span>
                    </Link>
                    {order.payment_status !== "paid" && (
                      <span
                        onClick={() => redirect(order)}
                        className="bg-green-200 cursor-pointer text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded"
                      >
                        Pay Now
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Order;
