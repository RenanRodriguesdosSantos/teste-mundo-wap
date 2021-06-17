import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import AuthenticatedReducer from '../service/auth';
import WidgetsReducer from '../componentes/dashboard/reducer';

export const store = configureStore({
  reducer: {
    auth: AuthenticatedReducer,
    widgets: WidgetsReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
