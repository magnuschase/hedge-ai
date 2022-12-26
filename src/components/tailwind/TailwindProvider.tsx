import React from 'react'
import { ColorSchemeName } from 'react-native'
import { TailwindProvider, Utilities } from "tailwind-rn"

/*
 As default, TailwindProvider is a React.FC, but it doesn't have a children prop
 even though it is required. This file is a workaround to fix this built-in issue.
*/

type PropsType = {
	utilities: Utilities,
	colorScheme?: ColorSchemeName;
	children: React.ReactNode
}
const Provider = TailwindProvider as React.FC<PropsType>

export default Provider
