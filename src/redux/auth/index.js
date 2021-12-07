import authSlice from './slice.ts';

export const {
  setIsAdmin,
  setIsAuth,
  setUser,
  resetAuthState
} = authSlice.actions;

export const AuthReducer = authSlice.reducer;