import { createStore, combineReducers } from 'redux';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { AuthReducer } from './auth';
import { loadState, saveState } from './localstorage';

const rootReducer = combineReducers({
  auth: AuthReducer,
});

const persistedState = loadState();

const store = createStore(rootReducer, persistedState);

store.subscribe(() => {
  saveState({
    auth: store.getState().auth
  });
});

export type AppState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;

export default store;