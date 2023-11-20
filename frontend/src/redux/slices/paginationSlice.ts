import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    _page: 1,
    _limit: 12,
    _sort: "",
    _order: "",
    _search: "",
    _category: "",
    _filterValue: "5",
    _filterField: "rate_gte",
  },
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state._page = action.payload;
    },
    setLimitPage: (state, action: PayloadAction<number>) => {
      state._limit = action.payload;
    },
    setSort: (state, action: PayloadAction<string>) => {
      state._sort = action.payload;
    },
    setOrder: (state, action: PayloadAction<string>) => {
      state._order = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state._search = action.payload;
    },
    setCategories: (state, action: PayloadAction<string>) => {
      state._category = action.payload;
    },
    setFilterValue: (state, action: PayloadAction<string>) => {
      state._filterValue = action.payload;
    },
    setFilterField: (state, action: PayloadAction<string>) => {
      state._filterField = action.payload;
    },
  },
});
export const {
  setCurrentPage,
  setLimitPage,
  setOrder,
  setSearch,
  setSort,
  setCategories,
} = paginationSlice.actions;
export const paginationReducer = paginationSlice.reducer;
