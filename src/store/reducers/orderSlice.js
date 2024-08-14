import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const placeOrder = createAsyncThunk(
  "order/place_order",
  async (
    { price, products, shipping_free, items, shippingInfo, userId, navigate },
    { fulfillWithValue }
  ) => {
    try {
      const { data } = await api.post("/home/order/place-order", {
        price,
        products,
        shipping_free,
        items,
        shippingInfo,
        userId,
        navigate,
      });

      navigate("/payment", {
        state: {
          price: price + shipping_free,
          items,
          orderId: data.orderId,
        },
      });

      return fulfillWithValue(data);
    } catch (err) {
      console.log(err.response);
    }
  }
);

export const getOrder = createAsyncThunk(
  "order/get_orders",
  async ({ customerId, status }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/customer/get_orders/${customerId}/${status}`
      );

      return fulfillWithValue(data);
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const getOrderDetails = createAsyncThunk(
  "order/get_orders_details",
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/customer/get_orders_details/${orderId}`
      );

      return fulfillWithValue(data);
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    myOrders: [],
    myOrder: {},
  },
  reducers: {
    messageClear(state, _) {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers(builder) {
    builder.addCase(placeOrder.fulfilled, (state, action) => {
      state.successMessage = action.payload.message;
    });
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.myOrders = action.payload.order;
    });
    builder.addCase(getOrderDetails.fulfilled, (state, action) => {
      state.myOrder = action.payload;
    });
  },
});

export const { messageClear } = orderSlice.actions;

export default orderSlice.reducer;
