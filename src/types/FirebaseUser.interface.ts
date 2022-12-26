import { User as FireUser } from 'firebase/auth'

export interface FirebaseUser extends FireUser {
  email: string
  uid: string
  lastLoginAt: string
	createdAt: string
}
