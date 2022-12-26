import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FirebaseUser } from '../../types/FirebaseUser.interface'

interface UserState {
	firebaseUser?: FirebaseUser
}

const initialState: UserState = {
  firebaseUser: undefined
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setFirebaseUser: (state, action: PayloadAction<FirebaseUser | undefined>) => {
      state.firebaseUser = action.payload
    }
  }
})

export const { setFirebaseUser } = userSlice.actions
