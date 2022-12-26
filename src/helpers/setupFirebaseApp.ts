import { Auth, connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { 
	REACT_APP_API_KEY,
	REACT_APP_AUTH_DOMAIN,
	REACT_APP_DATABASE_URL,
	REACT_APP_PROJECT_ID,
	REACT_APP_STORAGE_BUCKET,
	REACT_APP_SENDER_ID,
	REACT_APP_ID,
	REACT_APP_MEASUREMENT_ID
} from '@env'

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth/react-native';
import { FirebaseApp, getApp, getApps, initializeApp } from '@firebase/app'

const firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  databaseURL: REACT_APP_DATABASE_URL,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_SENDER_ID,
  appId: REACT_APP_ID,
  measurementId: REACT_APP_MEASUREMENT_ID
}

// eslint-disable-next-line import/no-mutable-exports
let app: FirebaseApp
// eslint-disable-next-line import/no-mutable-exports
let auth: Auth
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  })
} else {
  app = getApp()
  auth = getAuth()
}
if (__DEV__) {
  const db = getFirestore()
	const functions = getFunctions()
	connectFunctionsEmulator(functions, 'localhost', 5001)
  connectFirestoreEmulator(db, 'localhost', 8080)
  connectAuthEmulator(auth, 'http://localhost:9099')
}

export { auth, app }
