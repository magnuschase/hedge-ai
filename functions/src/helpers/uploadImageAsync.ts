import * as admin from 'firebase-admin'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'

// Upload image to Google Storage (binary data)
const uploadImageAsync = async (userId: string, image: Buffer) => {
	const bucket = admin.storage().bucket()
	const fileRef = bucket.file(`eval_imgs/${userId}/${uuidv4()}.jpg`)
	await fileRef.save(image)
	const expireDate = dayjs().add(2, 'year').toDate()
	return fileRef.getSignedUrl({
		expires: expireDate,
		action: 'read'
	})
}

export default uploadImageAsync
