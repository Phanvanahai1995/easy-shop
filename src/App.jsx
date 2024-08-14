import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./pages/MainLayout";
import Shops from "./pages/Shops";
import Card from "./pages/Card";
import Shipping from "./pages/Shipping";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategory, getProducts } from "./store/reducers/homeSlice";
import CategoryShop from "./pages/CategoryShop";
import SearchProduct from "./pages/SearchProduct";
import { getCartProducts, getWishlist } from "./store/reducers/cartSlice";
import Payment from "./pages/Payment";
import Dashboard from "./pages/Dashboard";
import ProtectUser from "./utils/ProtectUser";
import DashboardCustomer from "./components/Dashboard/DashboardCustomer";
import Order from "./components/Dashboard/Order";
import ChangePassword from "./components/Dashboard/ChangePassword";
import WishList from "./components/Dashboard/WishList";
import OrderDetail from "./components/Dashboard/OrderDetail";
import Chat from "./components/Dashboard/Chat";

function App() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((store) => store.auth);

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getProducts());
    if (userInfo) {
      dispatch(getCartProducts(userInfo.id));
      dispatch(getWishlist(userInfo.id));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/card" element={<Card />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/product/details/:slug" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products?" element={<CategoryShop />} />
          <Route path="/products/search?" element={<SearchProduct />} />
          <Route element={<ProtectUser />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<DashboardCustomer />} />
              <Route path="my-orders" element={<Order />} />
              <Route path="order/details/:orderId" element={<OrderDetail />} />
              <Route path="change-password" element={<ChangePassword />} />
              <Route path="wishlist" element={<WishList />} />
              <Route path="chat" element={<Chat />} />
              <Route path="chat/:sellerId" element={<Chat />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
