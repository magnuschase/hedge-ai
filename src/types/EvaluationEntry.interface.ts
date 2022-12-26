import { Model } from "./enums/Model.enum"

export interface EvaluationEntry {
	timestamp: number // UNIX timestamp, in ms
	model: Model, // Model used to evaluate image
	path: string // Path to image file stored on GCS
}