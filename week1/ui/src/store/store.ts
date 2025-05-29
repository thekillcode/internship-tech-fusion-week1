import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./darkModeSlice";
import authReducer from "./authSlice";
import genralReducer from "./generalSlice";

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    auth: authReducer,
    general: genralReducer,
  },
});


