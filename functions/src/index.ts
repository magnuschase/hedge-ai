import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import axios from 'axios'
import { UserRecord } from 'firebase-admin/lib/auth/user-record'
import { ModelConfig } from './shared/ModelConfig.interface'
import { User } from './shared/User.interface'
import { EvaluationEntry } from './shared/EvaluationEntry.interface'
import { Status } from './shared/Status.enum'
import uploadImageAsync from './helpers/uploadImageAsync'

if (process.env.FIREBASE_DEBUG_MODE) {
	const serviceAccount = require('../service_account.json')
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		storageBucket: 'hedgeai.appspot.com'
	})
} else {
	admin.initializeApp()
}

const db = admin.firestore()

// EVALUATION TRIGGER (onCreate): send a request to the evaluation function
// and save the response to the Firestore
export const evaluate = functions
	.runWith({ memory: '1GB', timeoutSeconds: 540 })
	.firestore
	.document('users/{userId}/evaluations/{evaluationId}')
	.onCreate(async (snapshot, context) => {
		// Get the evaluation entry, ref and endpoint URL
		const { imageUrl, model, type } = snapshot.data() as EvaluationEntry
		const URL = `${functions.config().api.url}/predict`
		const ref = snapshot.ref

		try {
			// Evaluate the image
			const response = await axios.post(
				URL,
				{
					imageUrl,
					modelPath: model,
					modelType: type
				},
				{
					responseType: 'arraybuffer'
				}
			)
			// Upload the evaluated image to GCS
			const { data } = response
			const [newImageUrl] = await uploadImageAsync(
				context.params.userId || 'generic',
				Buffer.from(data, 'binary')
			)

			// Update the evaluation entry
			ref.update({
				evaluatedImageUrl: newImageUrl,
				status: Status.SUCCESS
			})
		} catch (error) {
			console.log(error)
			ref.update({ status: Status.FAILURE })
		}

		return null
	})

// AUTH TRIGGER (userCreate): create a new user document in firestore
export const createUserProfile = functions.auth
	.user()
	.onCreate(async (user: UserRecord) => {
		const userData = {
			customModel: {
				name: '',
				description: '',
				labelMap: [],
				model: '',
				type: 'custom'
			} as ModelConfig
		} as User
		const userDoc = db.collection('users').doc(user.uid)
		await userDoc.set(userData)
	})
