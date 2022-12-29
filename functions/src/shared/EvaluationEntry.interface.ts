import { Status } from './Status.enum'

export interface EvaluationEntry {
	modelName: string // User-friendly display name of model
	timestamp: number // UNIX timestamp, in ms
	model: string // Local model name / URL to custom model
	type: 'local' | 'custom' // Type of model
	imageUrl: string // Path to image file stored on GCS
	evaluatedImageUrl?: string // Path to evaluated image file stored on GCS
	status: Status // evaluation status
}
