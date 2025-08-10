// src/redux/slices/filterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeFilters: {
    brand: [],
    category: []
  }, // An object to store active filters like { brand: ['Apple', 'Sony'], category: ['Electronics'] }
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    addFilterValue: (state, action) => {
      const { filterType, value } = action.payload;
      if (!state.activeFilters[filterType]) {
        state.activeFilters[filterType] = [];
      }
      if (!state.activeFilters[filterType].includes(value)) {
        state.activeFilters[filterType].push(value);
      }
    },
    removeFilterValue: (state, action) => {
      const { filterType, value } = action.payload;
      if (state.activeFilters[filterType]) {
        state.activeFilters[filterType] = state.activeFilters[filterType].filter(
          (v) => v !== value
        );
        // Clean up the array if it becomes empty
        if (state.activeFilters[filterType].length === 0) {
          delete state.activeFilters[filterType];
        }
      }
    },
    setFilterValues: (state, action) => {
      const { filterType, values } = action.payload;
      state.activeFilters[filterType] = values;
    },
    clearFilter: (state, action) => {
      delete state.activeFilters[action.payload];
    },
    clearAllFilters: (state) => {
      state.activeFilters = {
    brand: [],
    category: []
  };
    },
  },
});

export const {
  addFilterValue,
  removeFilterValue,
  setFilterValues,
  clearFilter,
  clearAllFilters,
} = filterSlice.actions;

export const selectActiveFilters = (state) => state.filters?.activeFilters;

export default filterSlice.reducer;