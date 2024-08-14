import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const getDashboardIndexData = createAsyncThunk(
  "dashboard/get_dashboard_index_data",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/customer/get-dashboard-data/${userId}`
      );
      return fulfillWithValue(data);
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    successMessage: "",
    errorMessage: "",
    recentOrders: [],
    totalOrder: 0,
    pendingOrder: 0,
    cancelledOrder: 0,
  },
  reducers: {
    messageClear(state, _) {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers(builder) {
    builder.addCase(getDashboardIndexData.fulfilled, (state, action) => {
      state.recentOrders = action.payload.recentOrders;
      state.totalOrder = action.payload.totalOrder;
      state.pendingOrder = action.payload.pendingOrder;
      state.cancelledOrder = action.payload.cancelledOrder;
    });
  },
});

export const { messageClear } = dashboardSlice.actions;

export default dashboardSlice.reducer;
