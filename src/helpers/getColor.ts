import tailwindBuiltInColors from "./constants/tailwindBuiltInColors"

// This function is used to get the hex value from Tailwind's color palette
const getColor = (
	color: string,
	brightness: number
): string => {
	// Check if color exists in Tailwind's color palette
 	const keys = Object.keys(tailwindBuiltInColors)
 	if (!keys.includes(color)) throw new Error('Color not found')

 	const child = tailwindBuiltInColors[color as 'black' | 'pink']
	if (typeof child === 'string') return child

	const hex = child[brightness as 200]
	if (!hex) throw new Error('Brightness not found')

 	return hex
}

export default getColor
