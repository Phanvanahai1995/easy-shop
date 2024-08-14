import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const add_friend = createAsyncThunk(
  "chat/add_friend",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        "/chat/customer/add-customer-friend",
        info
      );

      //   console.log(data);

      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const send_message = createAsyncThunk(
  "chat/send-message-to-seller",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        "/chat/customer/send-message-to-seller",
        info
      );

      //   console.log(data);

      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const chatSlice = createSlice({
  name: "auth",
  initialState: {
    my_friends: [],
    currentFd: "",
    successMessage: "",
    errorMessage: "",
    fb_messages: [],
  },
  reducers: {
    messageClear(state, action) {
      (state.successMessage = ""), (state.errorMessage = "");
    },
    updateMessage(state, { payload }) {
      state.fb_messages = [...state.fb_messages, payload];
    },
  },
  extraReducers(builder) {
    builder.addCase(add_friend.fulfilled, (state, { payload }) => {
      state.fb_messages = payload.messages;
      state.currentFd = payload.currentFd;
      state.my_friends = payload.MyFriends;
    });
    builder.addCase(send_message.fulfilled, (state, { payload }) => {
      let tempFriends = state.my_friends;
      let index = tempFriends.find(
        (f) => f.fdId === payload.message.receiverId
      );

      while (index > 0) {
        let temp = tempFriends[index];
        tempFriends[index] = tempFriends[index - 1];
        tempFriends[index - 1] = temp;

        index--;
      }
      state.fb_messages = [...state.fb_messages, payload.message];
      state.my_friends = tempFriends;
      state.successMessage = "Send Message Success";
    });
  },
});

export const { messageClear, updateMessage } = chatSlice.actions;

export default chatSlice.reducer;
