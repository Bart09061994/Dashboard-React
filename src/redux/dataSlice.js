import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdHJpbmciLCJleHAiOjE2OTcyMjcxODUsImlhdCI6MTY5NzIwOTE4NX0.5FW-pWK_WGX3cp3w0b3GyNa68Tlet2RcenMken6_F8fwq2tEQ-Ywa6MvXrvgEC0lMHU5enCsXW_8THXalb1bmw";

export const fetchStores = createAsyncThunk(
  "api/fetchStores",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:8089/shop", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createStore = createAsyncThunk(
  "api/createStore",
  async (storeData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:8089/shop",
        storeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteStore = createAsyncThunk(
  "api/deleteStore",
  async (storeId, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:8089/shop/${storeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return storeId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateStore = createAsyncThunk(
  "api/updateStore",
  async ({ storeId, updatedData }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `http://localhost:8089/shop/${storeId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const apiSlice = createSlice({
  name: "apiData",
  initialState: { data: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStores.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createStore.pending, (state) => {
        state.loading = true;
      })
      .addCase(createStore.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload];
      })
      .addCase(createStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteStore.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStore.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((store) => store.id !== action.payload);
      })
      .addCase(deleteStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateStore.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStore.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.map((store) =>
          store.id === action.payload.id ? action.payload : store
        );
      })
      .addCase(updateStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default apiSlice.reducer;
