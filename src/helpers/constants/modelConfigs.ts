import { ModelConfig } from "../../../functions/src/shared/ModelConfig.interface"

export const ASL: ModelConfig = {
	name: "ASL Alphabet",
	description: "ASL is a model that uses a convolutional neural network to classify American Sign Language gestures.",
	fileName: 'ASL.ptl',
	labelMap: [
		"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
		"N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
	]
}

export const YOLO: ModelConfig = {
	name: "YOLO",
	description: "ASL is a model that uses a convolutional neural network to classify American Sign Language gestures.",
	fileName: 'ASL.ptl',
	labelMap: [
		"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
		"N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
	]
}

export const Hedge: ModelConfig = {
	name: "Hedge",
	description: "ASL is a model that uses a convolutional neural network to classify American Sign Language gestures.",
	fileName: 'ASL.ptl',
	labelMap: [
		"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
		"N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
	]
}

export const Custom: ModelConfig = {
	name: "Custom",
	description: "",
	fileName: 'ASL.ptl',
	labelMap: [
		"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
		"N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
	]
}

export const CONFIG_ARR = [ASL, YOLO, Hedge, Custom]