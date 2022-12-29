import { useSelector } from "react-redux"
import { useEffect } from 'react'
import { getFirestore, onSnapshot, collection } from "firebase/firestore"
import { RootState, useAppDispatch } from "../store"
import { setEvaluations } from "../store/slices/history"
import { EvaluationEntry, EvaluationEntryWithId } from "../../functions/src/shared/EvaluationEntry.interface"

export const useEvaluationObserver = () => {
	const { firebaseUser } = useSelector((state: RootState) => state.user)
	const dispatch = useAppDispatch()
	const db = getFirestore()

	useEffect(() => {
		if (!firebaseUser) {
			dispatch(setEvaluations([]))
			return
		}

		const unsubscribeHistory = onSnapshot(
			collection(db, `users/${firebaseUser?.uid}/evaluations`),
			(snapshot) => {
				const evaluations: EvaluationEntryWithId[] = []
				snapshot.forEach((doc) => {
					evaluations.push({
						...doc.data() as EvaluationEntry,
						id: doc.id
					})
				})
				dispatch(setEvaluations(evaluations))
			}
		)
		
		return () => unsubscribeHistory()
	}, [firebaseUser])
}
