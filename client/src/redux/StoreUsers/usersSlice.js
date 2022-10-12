import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loggedUser: {},
  },
  reducers: {
    getAllUsers: (state, action) => {
      state.users = action.payload;
    },
    getLoggedUserData: (state, action) => {
      state.loggedUser = action.payload;
    },
    setEmptyLoggedUser: (state) => {
      state.loggedUser = {};
    },
  },
});

export const { getAllUsers, getLoggedUserData, setEmptyLoggedUser } =
  usersSlice.actions;
export default usersSlice.reducer;
