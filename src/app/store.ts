import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import AuthenticatedUserReducer from '../service/auth';
import WidgetsReducer from '../componentes/dashboard/reducer';

export const store = configureStore({
  reducer: {
    authUser: AuthenticatedUserReducer,
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
