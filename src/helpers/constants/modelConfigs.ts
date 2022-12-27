import { ModelConfig } from "../../../functions/src/shared/ModelConfig.interface"

export const ASL: ModelConfig = {
	name: "ASL Alphabet",
	description: `This model recognizes letters in the ASL Alphabet.
It was trained using dataset made by a data scientist David Lee, which contains 1728 images and 26 classes.
	`,
	fileName: 'ASL.ptl',
	labelMap: [
		"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
		"N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
	]
}

export const YOLO: ModelConfig = {
	name: "YOLO",
	description: "YOLOv5 🚀 is the world's most loved vision AI, representing Ultralytics open-source research into future vision AI methods, incorporating lessons learned and best practices evolved over thousands of hours of research and development.",
	fileName: 'best.ptl',
	labelMap: [
		"person",
		"bicycle",
		"car",
		"motorcycle",
		"airplane",
		"bus",
		"train",
		"truck",
		"boat",
		"traffic light",
		"fire hydrant",
		"stop sign",
		"parking meter",
		"bench",
		"bird",
		"cat",
		"dog",
		"horse",
		"sheep",
		"cow",
		"elephant",
		"bear",
		"zebra",
		"giraffe",
		"backpack",
		"umbrella",
		"handbag",
		"tie",
		"suitcase",
		"frisbee",
		"skis",
		"snowboard",
		"sports ball",
		"kite",
		"baseball bat",
		"baseball glove",
		"skateboard",
		"surfboard",
		"tennis racket",
		"bottle",
		"wine glass",
		"cup",
		"fork",
		"knife",
		"spoon",
		"bowl",
		"banana",
		"apple",
		"sandwich",
		"orange",
		"broccoli",
		"carrot",
		"hot dog",
		"pizza",
		"donut",
		"cake",
		"chair",
		"couch",
		"potted plant",
		"bed",
		"dining table",
		"toilet",
		"tv",
		"laptop",
		"mouse",
		"remote",
		"keyboard",
		"cell phone",
		"microwave",
		"oven",
		"toaster",
		"sink",
		"refrigerator",
		"book",
		"clock",
		"vase",
		"scissors",
		"teddy bear",
		"hair drier",
		"toothbrush"
	]
}

export const Hedge: ModelConfig = {
	name: "Hedge",
	description: "Simple model for hedgehog race recognition. Because why not! 🦔",
	fileName: 'hedge.ptl',
	labelMap: [
		"pygmy", "european", "african black"
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