// darkModeSlice.ts
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./types";
import { Api } from "@/lib/api";
import Cookies from "js-cookie";

interface AuthStateI {
  id: number | null;
  email: string;
  username: string;
  role: string;
  status: boolean;
}



const initialState: AuthStateI = {
  id: null,
  email: "",
  username: "",
  role: "",
  status: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthStateI>) => {
      state.id = action.payload.id
      state.username = action.payload.username
      state.email = action.payload.email
      state.role = action.payload.role
      state.status = action.payload.status
    },
    clearUser: (state) => {
      state.id = null
      state.email = ""
      state.username = ""
      state.role = ""
      state.status = false
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.id = action.payload.id
        state.username = action.payload.username
        state.email = action.payload.email
        state.role = action.payload.role
        state.status = action.payload.status
      }
    })
  },

});

export const { setUser, clearUser } = authSlice.actions;

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await Api.get<AuthStateI>('/user/me')
      return response.data
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
)
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    // Remove token cookie
    Cookies.remove('token');
    // Clear user data from state
    dispatch(clearUser());
    // You can add additional cleanup here if needed
  }
);


export const getUser = (state: RootState) => state.auth;
export const isLoggedIn = (state: RootState) => state.auth.id !== null;

export default authSlice.reducer;