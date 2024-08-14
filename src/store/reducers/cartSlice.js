import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const addToCart = createAsyncThunk(
  "cart/add_to_cart",
  async (product, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/home/products/add-cart", product);

      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCartProducts = createAsyncThunk(
  "cart/get_cart_product",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/products/get_cart_product/${userId}`
      );

      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteCart = createAsyncThunk(
  "cart/delete_cart_product",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(
        `/home/products/delete_cart_product/${id}`
      );

      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const incrementCart = createAsyncThunk(
  "cart/increment_cart_product",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.patch(
        `/home/products/increment_cart_product/${id}`
      );

      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const decrementCart = createAsyncThunk(
  "cart/decrement_cart_product",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.patch(
        `/home/products/decrement_cart_product/${id}`
      );

      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "cart/add_to_wishlist",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/home/products/add-to-wishlist`, info);

      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getWishlist = createAsyncThunk(
  "cart/get-wishlists",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/products/get-wishlist/${userId}`);

      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const removeWishlist = createAsyncThunk(
  "cart/remove-wishlists",
  async (wishlistId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(
        `/home/products/remove-wishlist/${wishlistId}`
      );

      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "card",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    cart: [],
    cart_product_count: 0,
    wishlist_count: 0,
    wishlist: [],
    price: 0,
    shipping_free: 0,
    outOfStock_products: [],
    buy_product_item: 0,
  },
  reducers: {
    messageClear(state, _) {
      state.successMessage = "";
      state.errorMessage = "";
    },
    buyNow(state, action) {
      state.cart = action.payload.products;
      state.shipping_free = action.payload.shipping_free;
      state.buy_product_item = action.payload.buy_product_item;
      state.price = action.payload.price;
    },
  },
  extraReducers(builder) {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.loader = false;
      state.successMessage = action.payload.message;
      state.cart_product_count = state.cart_product_count + 1;
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.loader = false;
      state.errorMessage = action.payload.message;
    });
    builder.addCase(getCartProducts.fulfilled, (state, action) => {
      state.cart = action.payload.cart_products;
      state.price = action.payload.price;
      state.cart_product_count = action.payload.cart_product_count;
      state.outOfStock_products = action.payload.outOfStockProduct;
      state.shipping_free = action.payload.shipping_free;
      state.buy_product_item = action.payload.buy_product_item;
    });
    builder.addCase(deleteCart.pending, (state, action) => {
      state.loader = true;
    });
    builder.addCase(deleteCart.rejected, (state, action) => {
      state.loader = false;
      state.errorMessage = action.payload.message;
    });
    builder.addCase(deleteCart.fulfilled, (state, action) => {
      state.loader = false;
      state.successMessage = action.payload.message;
    });
    builder.addCase(incrementCart.rejected, (state, action) => {
      state.errorMessage = action.payload.message;
    });
    builder.addCase(incrementCart.fulfilled, (state, action) => {
      state.successMessage = action.payload.message;
    });
    builder.addCase(decrementCart.rejected, (state, action) => {
      state.errorMessage = action.payload.message;
    });
    builder.addCase(decrementCart.fulfilled, (state, action) => {
      state.successMessage = action.payload.message;
    });
    builder.addCase(addToWishlist.rejected, (state, action) => {
      state.errorMessage = action.payload.message;
    });
    builder.addCase(addToWishlist.fulfilled, (state, action) => {
      state.successMessage = action.payload.message;
      state.wishlist_count = state.wishlist_count + 1;
    });
    builder.addCase(getWishlist.fulfilled, (state, action) => {
      state.wishlist_count = action.payload.wishlist_count;
      state.wishlist = action.payload.wishlist;
    });
    builder.addCase(removeWishlist.rejected, (state, action) => {
      state.errorMessage = action.payload.message;
    });
    builder.addCase(removeWishlist.fulfilled, (state, action) => {
      state.successMessage = action.payload.message;
    });
  },
});

export const { messageClear, buyNow } = cartSlice.actions;

export default cartSlice.reducer;
