import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useAppDispatch } from '../store'
import { setFirebaseUser, setUser } from '../store/slices/user'
import { FirebaseUser } from '../types/FirebaseUser.interface'
import { User } from '../../functions/src/shared/User.interface'
import { reset } from '../helpers/NavigationHelper'
import { auth } from '../helpers/setupFirebaseApp'
import { onSnapshot, doc, getFirestore } from 'firebase/firestore'

type UseUserObserver = {
	firebaseLoaded: boolean
}

export const useUserObserver = (): UseUserObserver => {
	const [firebaseLoaded, setFirebaseLoaded] = useState(false)
	const dispatch = useAppDispatch()
	const db = getFirestore()
	let unsubscribeUser: null | (() => void) = null

	useEffect(() => {
		const unsubscribeAuth = onAuthStateChanged(auth, (newUser) => {
			if (newUser) {
				const newFirebaseUser = newUser.toJSON() as FirebaseUser
				dispatch(setFirebaseUser(newFirebaseUser))
				reset({
					index: 0,
					routes: [{ name: 'Home' }]
				})
				unsubscribeUser = onSnapshot(
					doc(db, `users/${newFirebaseUser.uid}`),
					(snapshot) => {
						const newUser = snapshot.data() as User
						dispatch(setUser(newUser))
						setFirebaseLoaded(true)
					}
				)
			} else {
				if (unsubscribeUser) {
					unsubscribeUser()
					dispatch(setUser())
				}
				dispatch(setFirebaseUser())
				setFirebaseLoaded(true)
			}
		})
		
		return () => unsubscribeAuth()
	}, [])

	return { firebaseLoaded }
}