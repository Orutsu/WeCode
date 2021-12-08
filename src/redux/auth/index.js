import authSlice from './slice.ts';

export const {
  setTaskResultIdToWatch,
  setTaskIdToComplete,
  setIsAdmin,
  setIsAuth,
  setUser,
  resetAuthState
} = authSlice.actions;

export const AuthReducer = authSlice.reducer;