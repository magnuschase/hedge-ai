import { configureStore, PreloadedState } from '@reduxjs/toolkit'
import {
	useDispatch
} from 'react-redux'
import { historySlice } from './slices/history'
import { userSlice } from './slices/user'

export function setupStore(preloadedState?: PreloadedState<any>) {
  return configureStore({
    reducer: {
			user: userSlice.reducer,
			history: historySlice.reducer,
		},
    preloadedState
  })
}

const store = setupStore()

export type RootState = ReturnType<typeof store.getState>

export type AppStore = ReturnType<typeof setupStore>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store