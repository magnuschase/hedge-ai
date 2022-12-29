import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import { Status } from '../../functions/src/shared/Status.enum'
import { RootState } from '../store'

type AddEvaluationPayload = {
	type: 'local' | 'custom',
	model: string,
	imageUrl: string,
}

type UseEvaluation = {
	uploadImage: (uri: string) => Promise<string>
	addEvaluation: (data: AddEvaluationPayload) => Promise<void>
}

export const useEvaluation = (): UseEvaluation => {
	const bucket = getStorage()
	const db = getFirestore()

	const { firebaseUser } = useSelector((state: RootState) => state.user)

	const uploadImage = useCallback(async (uri: string) => {
		if (!firebaseUser) throw new Error('User not logged in')

		// Explanation as to why we need to use XMLHttpRequest instead of fetch/axios:
		// https://github.com/expo/expo/issues/2402#issuecomment-443726662
		const blob = (await new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest()

			xhr.addEventListener('load', () => {
				resolve(xhr.response)
			})
			xhr.addEventListener('error', () => {
				reject(new TypeError('Network request failed'))
			}) 
			xhr.responseType = 'blob'
			xhr.open('GET', uri, true)
			xhr.send(null)
		})) as any

		const fileRef = ref(bucket, `user_imgs/${firebaseUser.uid}/${uuidv4()}`)
		await uploadBytes(fileRef, blob)

		// We're done with the blob, close and release it
		blob.close() 

		return getDownloadURL(fileRef)
	}, [])

	const addEvaluation = useCallback(async ({
		type,
		model,
		imageUrl
	}: AddEvaluationPayload) => {
		if (!firebaseUser) throw new Error('User not logged in')
		
		const uploadedImageUrl = await uploadImage(imageUrl)

		const evaluationRef = doc(db, `users/${firebaseUser.uid}/evaluations/${uuidv4()}`)

		await setDoc(evaluationRef, {
			type,
			model,
			imageUrl: uploadedImageUrl,
			status: Status.PENDING,
			timestamp: Date.now()
		})
	}, [])

	return { uploadImage, addEvaluation }
}