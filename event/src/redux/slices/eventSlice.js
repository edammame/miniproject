import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  eventname: "",
  eventtype: "",
  eventlocation: "",
  eventcategory: "",
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    eventname: (state, action) => {
      return { ...state, eventname: action.payload };
    },
    eventtype: (state, action) => {
      return { ...state, eventtype: action.payload };
    },
    eventlocation: (state, action) => {
      return { ...state, eventlocation: action.payload };
    },
  },
});

export const { eventname, eventtype, eventlocation } = eventSlice.actions;
export default eventSlice.reducer;
