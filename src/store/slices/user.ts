import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../../functions/src/shared/User.interface'
import { FirebaseUser } from '../../types/FirebaseUser.interface'

interface UserState {
	firebaseUser?: FirebaseUser,
	user?: User
}

const initialState: UserState = {
  firebaseUser: undefined,
	user: undefined
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setFirebaseUser: (state, action: PayloadAction<FirebaseUser | undefined>) => {
      state.firebaseUser = action.payload
    },
		setUser: (state, action: PayloadAction<User | undefined>) => {
			state.user = action.payload
		}
  }
})

export const { setFirebaseUser, setUser } = userSlice.actions
