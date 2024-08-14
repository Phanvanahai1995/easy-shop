import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";

export const createCustomer = createAsyncThunk(
  "auth/customer_register",
  async (userInfo, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/customer/customer-register", userInfo);

      localStorage.setItem("customerToken", JSON.stringify(data.token));

      // console.log(data);

      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const customerLogin = createAsyncThunk(
  "auth/customer_login",
  async (userInfo, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/customer/customer-login", userInfo);

      localStorage.setItem("customerToken", JSON.stringify(data.token));

      // console.log(data);

      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const decodeToken = (token) => {
  if (token) {
    const userInfo = jwtDecode(token);
    return userInfo;
  } else {
    return "";
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    userInfo: decodeToken(localStorage.getItem("customerToken")),
  },
  reducers: {
    messageClear(state, _) {
      state.successMessage = "";
      state.errorMessage = "";
    },
    logout(state, _) {
      localStorage.removeItem("customerToken");
      state.userInfo = "";
    },
  },
  extraReducers(builder) {
    builder.addCase(createCustomer.pending, (state, action) => {
      state.loader = true;
    });
    builder.addCase(createCustomer.fulfilled, (state, action) => {
      state.userInfo = jwtDecode(action.payload.token);
      state.loader = false;
      state.successMessage = action.payload.message;
    });
    builder.addCase(createCustomer.rejected, (state, action) => {
      state.loader = false;
      state.errorMessage = action.payload.message;
    });
    builder.addCase(customerLogin.pending, (state, action) => {
      state.loader = true;
    });
    builder.addCase(customerLogin.fulfilled, (state, action) => {
      state.loader = false;
      state.successMessage = action.payload.message;
      state.userInfo = jwtDecode(action.payload.token);
    });
    builder.addCase(customerLogin.rejected, (state, action) => {
      state.loader = false;
      state.errorMessage = action.payload.message;
    });
  },
});

export const { messageClear, logout } = authSlice.actions;

export default authSlice.reducer;
