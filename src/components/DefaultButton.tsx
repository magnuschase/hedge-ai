import React from 'react'
import {
	TouchableOpacity,
	ActivityIndicator,
	Text,
	StyleProp,
	ViewStyle
} from 'react-native'
import { useTailwind } from "tailwind-rn"
import getColor from "../helpers/getColor"

type DefaultButtonPayload = {
	text: string,
	onPress: () => void,
	isLoading?: boolean,
	isDisabled?: boolean,
	style?: StyleProp<ViewStyle>
}

export const DefaultButton: React.FC<DefaultButtonPayload> = ({
	text,
	onPress,
	isLoading = false,
	isDisabled = false,
	style
}) => {
	const tailwind = useTailwind()

	return (
		<TouchableOpacity
			style={[
				tailwind('mt-4 w-full py-4 bg-green-900 rounded-full'),
				{
					shadowColor: getColor('green', 900),
					shadowOffset: {width: -2, height: 4},
					shadowOpacity: 0.2,
					shadowRadius: 10,
				},
				isLoading && tailwind('opacity-50'),
				style
			]}
			disabled={isDisabled || isLoading}
			onPress={onPress}
		>
			<Text
				style={[
					tailwind('text-center text-white text-2xl font-light')
				]}
			>
				{
					isLoading ?
					<ActivityIndicator
						size="large"
						color={getColor('warm-gray', 900)}
					/> :
					text
				}
			</Text>
		</TouchableOpacity>
	)
}