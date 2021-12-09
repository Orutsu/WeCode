import authSlice from './slice.ts';

export const {
  setTaskIdToEdit,
  setTaskResultIdToWatch,
  setTaskIdToComplete,
  setIsAdmin,
  setIsAuth,
  setUser,
  resetAuthState
} = authSlice.actions;

export const AuthReducer = authSlice.reducer;