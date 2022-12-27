import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useAppDispatch } from '../store'
import { setFirebaseUser } from '../store/slices/user'
import { FirebaseUser } from '../types/FirebaseUser.interface'
import { reset } from '../helpers/NavigationHelper'
import { auth } from '../helpers/setupFirebaseApp'

type UseUserObserver = {
	firebaseLoaded: boolean
}

export const useUserObserver = (): UseUserObserver => {
	const [firebaseLoaded, setFirebaseLoaded] = useState(false)
	const dispatch = useAppDispatch()

	useEffect(() => {
		const unsubscribeAuth = onAuthStateChanged(auth, (newUser) => {
			if (newUser) {
				const newFirebaseUser = newUser.toJSON() as FirebaseUser
				dispatch(setFirebaseUser(newFirebaseUser))
				setFirebaseLoaded(true)
				reset({
					index: 0,
					routes: [{ name: 'Home' }]
				})
			} else {
				dispatch(setFirebaseUser())
				setFirebaseLoaded(true)
			}
		})
		
		return () => unsubscribeAuth()
	}, [])

	return { firebaseLoaded }
}