// darkModeSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./types";

interface GeneralState {
  isLoading: boolean;
  socket_id: string | null;
}


const initialState: GeneralState = {
  isLoading: false,
  socket_id: null
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setLoader: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSocketId: (state, action: PayloadAction<string | null>) => {
      state.socket_id = action.payload
    }
  }
});




export const { setLoader,setSocketId } = generalSlice.actions;

export const selectIsLoading = (state: RootState) => state.general.isLoading;

export default generalSlice.reducer;