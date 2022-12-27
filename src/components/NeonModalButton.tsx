import React from 'react'
import {
	TouchableOpacity,
	ActivityIndicator,
	Text,
	StyleProp,
	ViewStyle
} from 'react-native'
import { SvgProps } from 'react-native-svg'
import { useTailwind } from "tailwind-rn"
import getColor from "../helpers/getColor"
import RegularText from './texts/RegularText'
import { useBottomSheet } from '@gorhom/bottom-sheet'

type NeonButtonPayload = {
	text: string,
	onPress: () => void,
	isLoading?: boolean,
	isDisabled?: boolean,
	style?: StyleProp<ViewStyle>,
	color: string,
	icon: React.FC<SvgProps>,
}

export const NeonModalButton: React.FC<NeonButtonPayload> = ({
	text,
	onPress,
	isLoading = false,
	isDisabled = false,
	style,
	color,
	icon: IconComponent,
}) => {
	const tailwind = useTailwind()
	const { close } = useBottomSheet()

	const colorHex = getColor(color, 500)

	const handlePress = () => {
		onPress()
		close()
	}

	return (
		<TouchableOpacity
			style={[
				tailwind('mt-4 w-full py-3 px-4 border-2 rounded-lg flex flex-row justify-between'),
				{
					shadowOpacity: 1,
					borderColor: colorHex,
					shadowColor: colorHex,
					shadowRadius: 5,
				},
				isLoading && tailwind('opacity-50'),
				style
			]}
			disabled={isDisabled || isLoading}
			onPress={handlePress}
		>
			<RegularText
				style={[
					tailwind('text-left text-xl font-light'),
					{ color: colorHex }
				]}
			>
				{
					isLoading ?
					<ActivityIndicator
						size="large"
						color={colorHex}
					/> :
					text
				}
			</RegularText>

			<IconComponent width={24} height={24} fill={colorHex} />
		</TouchableOpacity>
	)
}