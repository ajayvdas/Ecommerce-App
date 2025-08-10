import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Change from array to a single object with field and direction
  sortOption: null, // null when no sorting is applied
};

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSortOption: (state, action) => {
      // action.payload should be an object like: { field: 'price', direction: '+' }
      state.sortOption = action.payload;
    },
    clearSort: (state) => {
      state.sortOption = null;
    },
    // You can add toggle functionality if needed
    toggleSortDirection: (state) => {
      if (state.sortOption) {
        state.sortOption.direction = state.sortOption.direction === '+' ? '-' : '+';
      }
    },
  },
});

export const {
  setSortOption,
  clearSort,
  toggleSortDirection,
} = sortSlice.actions;

export const selectActiveSort = (state) => state.sort?.sortOption;

export default sortSlice.reducer;