import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const getCategory = createAsyncThunk(
  "product/get_category",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `${import.meta.env.VITE_BASE_URL_API}/home/category-get`
      );

      return fulfillWithValue(data);
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.message);
    }
  }
);

export const getProducts = createAsyncThunk(
  "product/get_product",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `${import.meta.env.VITE_BASE_URL_API}/home/products-get`
      );

      return fulfillWithValue(data);
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.message);
    }
  }
);

export const price_range_product = createAsyncThunk(
  "/product/price_range_product",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `${import.meta.env.VITE_BASE_URL_API}/home/price-range-latest-product`
      );

      return fulfillWithValue(data);
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.message);
    }
  }
);

export const query_products = createAsyncThunk(
  "/product/query_products",
  async (query, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `${import.meta.env.VITE_BASE_URL_API}/home/query_products?category=${
          query.category
        }&&rating=${query.rating}&&lowPrice=${query.low}&&highPrice=${
          query.high
        }&&sortPrice=${query.sortPrice}&&pageNumber=${
          query.pageNumber
        }&&searchValue=${query.searchValue ? query.searchValue : ""}`
      );

      return fulfillWithValue(data);
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.message);
    }
  }
);

export const getProductDetails = createAsyncThunk(
  "product/get_product_details",
  async (slug, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `${import.meta.env.VITE_BASE_URL_API}/home/get-product-details/${slug}`
      );

      return fulfillWithValue(data);
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.message);
    }
  }
);

export const customerSendReview = createAsyncThunk(
  "review/customer_review",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        `${import.meta.env.VITE_BASE_URL_API}/home/customer-review`,
        info
      );

      return fulfillWithValue(data);
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.message);
    }
  }
);

export const getReviews = createAsyncThunk(
  "review/get_customer_review",
  async ({ productId, pageNumber }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `${
          import.meta.env.VITE_BASE_URL_API
        }/home/get-customer-review/${productId}?page=${pageNumber}`
      );

      return fulfillWithValue(data);
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.message);
    }
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState: {
    loader: false,
    categories: [],
    products: [],
    latest_product: [],
    topRated_product: [],
    discount_product: [],
    priceRange: { low: 0, high: 100 },
    totalProduct: 0,
    parPage: 3,
    product: {},
    relatedProducts: [],
    modelProducts: [],
    successMessage: "",
    errorMessage: "",
    total_review: 0,
    rating_review: [],
    reviews: [],
  },
  reducers: {
    messageClear(state, _) {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers(builder) {
    builder.addCase(getCategory.pending, (state, action) => {
      state.loader = true;
    });
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.loader = false;
      state.categories = action.payload;
    });
    builder.addCase(getCategory.rejected, (state, action) => {
      state.loader = false;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loader = false;
      state.products = action.payload.products;
      state.latest_product = action.payload.latest_product;
      state.topRated_product = action.payload.topRated_product;
      state.discount_product = action.payload.discount_product;
    });
    builder.addCase(price_range_product.fulfilled, (state, action) => {
      state.loader = false;
      state.priceRange = action.payload.priceRange;
      state.latest_product = action.payload.latest_product;
    });
    builder.addCase(query_products.fulfilled, (state, action) => {
      state.loader = false;
      state.products = action.payload.products;
      state.parPage = action.payload.parPage;
      state.totalProduct = action.payload.totalProduct;
    });
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      state.product = action.payload.product;
      state.modelProducts = action.payload.modelProducts;
      state.relatedProducts = action.payload.relatedProducts;
    });
    builder.addCase(customerSendReview.fulfilled, (state, action) => {
      state.successMessage = action.payload.message;
    });
    builder.addCase(customerSendReview.rejected, (state, action) => {
      state.errorMessage = action.payload.message;
    });
    builder.addCase(getReviews.fulfilled, (state, action) => {
      state.reviews = action.payload.reviews;
      state.total_review = action.payload.total_review;
      state.rating_review = action.payload.rating_review;
    });
  },
});

export const { messageClear } = homeSlice.actions;

export default homeSlice.reducer;
