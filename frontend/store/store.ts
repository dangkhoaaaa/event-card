import { configureStore } from '@reduxjs/toolkit';
import templatesReducer from './slices/templatesSlice';
import cardsReducer from './slices/cardsSlice';
import guestsReducer from './slices/guestsSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    templates: templatesReducer,
    cards: cardsReducer,
    guests: guestsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

