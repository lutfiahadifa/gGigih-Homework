import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: "access_token",
    initialState: {
    value: "",
  },

  reducers: {
    setAccessToken: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setAccessToken } = slice.actions;
export default slice.reducer;