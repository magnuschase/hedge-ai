export interface ModelConfig {
	name: string,
	createdAt: string,
	description: string,
	fileName?: string, // for models stored locally
	path?: string, // for models stored on GCS
	labelMap: string[]
}