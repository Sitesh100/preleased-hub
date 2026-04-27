import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

type TAuthState = {
  user: {
    user_id: number;
    user_name: string;
    email?: string;
    phone_no?: string;
    role: number;
  } | null;
  token: string | null;
  refreshToken: string | null;
};

const initialState: TAuthState = {
  user: null,
  token: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<TAuthState>>) => {
      const { user, token, refreshToken } = action.payload;
      if (user !== undefined) state.user = user;
      if (token !== undefined) state.token = token;
      if (refreshToken !== undefined) state.refreshToken = refreshToken;
    },
    setLogOut: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
    },
  },
});

export const { setUser, setLogOut } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;