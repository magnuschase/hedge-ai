import * as admin from 'firebase-admin'
import dayjs from 'dayjs'

// Upload image to Google Storage (binary data)
const uploadImageAsync = async (image: Buffer) => {
	const bucket = admin.storage().bucket()
	const fileRef = bucket.file(`${crypto.randomUUID()}.jpg`)
	await fileRef.save(image)
	const expireDate = dayjs().add(2, 'year').toDate()
	return fileRef.getSignedUrl({
		expires: expireDate,
		action: 'read'
	})
}

export default uploadImageAsync
