import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import userReducer from './userSlice';
import cartReducer from './cartSlice';
import hashReducer from './hashSlice';

import storage from '@react-native-async-storage/async-storage';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const cartPersistConfig = {
  key: 'cart',
  storage,
  version: 1,
};

const userPersistConfig = {
  key: 'auth',
  storage,
  version: 1,
};

const hashPersistConfig = {
  key: 'hash',
  storage,
  version: 1,
};

const userPersistedReducer = persistReducer(userPersistConfig, userReducer);
const persistedReducer = persistReducer(cartPersistConfig, cartReducer);
const hashPersistedReducer = persistReducer(hashPersistConfig, hashReducer);

export const store = configureStore({
  reducer: {
    auth: userPersistedReducer,
    cart: persistedReducer,
    hash: hashPersistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
