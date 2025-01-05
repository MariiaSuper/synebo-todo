import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { todosSlice } from './features/todos';
import { filterSlice } from './features/filter';

const persistConfig = {
  key: 'synebo-todo-redux-store',
  storage
};

const rootReducer = combineSlices(todosSlice, filterSlice);
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
