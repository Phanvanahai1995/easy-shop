import { RiShoppingCart2Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDashboardIndexData } from "../../store/reducers/dashboard";

function DashboardCustomer() {
  const { userInfo } = useSelector((store) => store.auth);
  const { recentOrders, pendingOrder, totalOrder, cancelledOrder } =
    useSelector((store) => store.dashboard);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    dispatch(getDashboardIndexData(userInfo.id));
  }, []);

  return (
    <div>
      <div className="grid grid-cols-3 md:grid-cols-1 gap-5">
        <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
          <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <RiShoppingCart2Fill className="text-xl text-green-800" />
          </div>
          <div className="flex flex-col justify-start items-start text-slate-600">
            <h2 className="text-3xl font-bold">{totalOrder}</h2>
            <span>Orders</span>
          </div>
        </div>
        <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
          <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <RiShoppingCart2Fill className="text-xl text-green-800" />
          </div>
          <div className="flex flex-col justify-start items-start text-slate-600">
            <h2 className="text-3xl font-bold">{pendingOrder}</h2>
            <span>Pending Orders</span>
          </div>
        </div>
        <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
          <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <RiShoppingCart2Fill className="text-xl text-green-800" />
          </div>
          <div className="flex flex-col justify-start items-start text-slate-600">
            <h2 className="text-3xl font-bold">{cancelledOrder}</h2>
            <span>Cancelled Orders</span>
          </div>
        </div>
      </div>
      <div className="bg-white p-5 mt-5 rounded-md">
        <h2>Recent Orders</h2>
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
                {recentOrders.map((order) => (
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
    </div>
  );
}

export default DashboardCustomer;
