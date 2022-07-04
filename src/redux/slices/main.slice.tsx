import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTrendings, searchGif } from "../../api/giphy";

const trendings: any = createAsyncThunk("trendings", async () => {
  const response: any = await getTrendings();
  const { data } = response;
  return data;
});

const search: any = createAsyncThunk("search", async(searchData) => {
  const response: any = await searchGif(searchData);
  const { data } = response;
  return data;
});

export const getTrendingsAction = () => {
  return async (dispatch: any) => {
    dispatch(trendings());
  };
};

export const searchGifActions = (searchData: any) => {
  return async (dispatch: any) => {
    dispatch(search(searchData));
  };
};

export const mainSlice = createSlice({
  name: "main",
  initialState: {
    status: "loading",
    memory: {},
    images: [],
    pagination: {},
  },
  reducers: {},
  extraReducers: {
    [trendings.pending]: (state, action) => {
      state.status = "loading";
    },
    [trendings.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.images = payload.data;
    },
    [trendings.rejected]: (state, action) => {
      state.status = "failed";
    },
    [search.pending]: (state, action) => {
      state.status = "loading";
    },
    [search.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.images = payload.data;
      state.pagination = payload.pagination;
    },
    [search.rejected]: (state, action) => {
      state.status = "failed";
    }
  },
});

export const mainReducer = mainSlice.reducer;
