export interface ModelConfig {
	name: string
	description: string
	model: string // Local model name / URL to custom model
	type: 'local' | 'custom' // Type of model
	labelMap: string[]
}
