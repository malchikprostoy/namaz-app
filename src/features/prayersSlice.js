import { createSlice } from "@reduxjs/toolkit";

const prayersSlice = createSlice({
  name: "prayers",
  initialState: {},
  reducers: {
    markPrayer: (state, action) => {
      const { date, prayer } = action.payload;
      if (!state[date]) {
        state[date] = {};
      }
      state[date][prayer] = !state[date][prayer];
    },
    // Optional: add a clear function to reset prayers
    clearPrayers: (state) => {
      return {};
    },
  },
});

export const { markPrayer, clearPrayers } = prayersSlice.actions;
export default prayersSlice.reducer;
