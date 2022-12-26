import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { UserRecord } from 'firebase-admin/lib/auth/user-record'
import { ModelConfig } from './shared/ModelConfig.interface'
import { User } from './shared/User.interface'

admin.initializeApp()
const db = admin.firestore()

// AUTH TRIGGER (userCreate): create a new user document in firestore
export const createUserProfile = functions.auth
	.user()
	.onCreate(async (user: UserRecord) => {
		const userData = {
			customModels: [] as ModelConfig[]
		} as User
		const userDoc = db.collection('users').doc(user.uid)
		await userDoc.set(userData)
	})
