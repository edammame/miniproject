import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  id: 0,
  name: "",
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    functionLogin: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        ...action.payload,
      };
    },
    functionLogout: (state) => {
      localStorage.removeItem("users");
      return initialState;
    },
  },
});

export const { functionLogin, functionLogout } = userSlice.actions;
export default userSlice.reducer;
