import authReducer from "./reducers/authSlice";
import homeReducer from "./reducers/homeSlice";
import cartReducer from "./reducers/cartSlice";
import orderReducer from "./reducers/orderSlice";
import dashboardReducer from "./reducers/dashboard";
import chatReducer from "./reducers/charSlice";

const rootReducers = {
  auth: authReducer,
  home: homeReducer,
  cart: cartReducer,
  order: orderReducer,
  dashboard: dashboardReducer,
  chat: chatReducer,
};

export default rootReducers;
