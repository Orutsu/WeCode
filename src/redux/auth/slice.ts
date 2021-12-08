import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
  taskIdToComplete: Number,
  taskResultIdToWatch: Number,
  isAuth: boolean;
  isAdmin: boolean;
  user: any;
};

const initialState: AuthState = {
    taskIdToComplete: 0,
    taskResultIdToWatch: 0,
    isAuth: false,
    isAdmin: false,
    user: {}
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTaskResultIdToWatch(state, action: PayloadAction<number>) {
      state.taskResultIdToWatch = action.payload;
      return state;
    },
    setTaskIdToComplete(state, action: PayloadAction<number>) {
      state.taskIdToComplete = action.payload;
      return state;
    },
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
      return state;
    },
    setIsAdmin(state, action: PayloadAction<boolean>) {
        state.isAdmin = action.payload;
        return state;
    },
    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload;
      return state;
    },
    resetAuthState(state) {
      state = initialState;
      return state;
    },
  },
});

export default authSlice;