import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  username: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      console.log("LOGIN ACTION:", action.payload);
      state.token = action.payload.token;
      state.username = action.payload.username;
    },
    logout(state) {
      state.token = null;
      state.username = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
