import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useAppDispatch } from '../store'
import { setFirebaseUser } from '../store/slices/user'
import { FirebaseUser } from '../types/FirebaseUser.interface'
import { reset } from '../helpers/NavigationHelper'
import { auth } from '../helpers/setupFirebaseApp'

export const useUserObserver = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		const unsubscribeAuth = onAuthStateChanged(auth, (newUser) => {
			if (newUser) {
				const newFirebaseUser = newUser.toJSON() as FirebaseUser
				dispatch(setFirebaseUser(newFirebaseUser))
				reset({
					index: 0,
					routes: [{ name: 'Home' }]
				})
			}
		})

		return () => unsubscribeAuth()
	}, [])
}