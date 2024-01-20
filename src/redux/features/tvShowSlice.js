import { createSlice } from "@reduxjs/toolkit";

export const tvShowSlice = createSlice({
  name: "TvShow",
  initialState: {
    tvShowSeason: 0
  },
  reducers: {
    setSeasonState: (state, action) => {
      state.tvShowSeason = action.payload;
    }
  }
});

export const {
  setSeasonState
} = tvShowSlice.actions;

export default tvShowSlice.reducer;