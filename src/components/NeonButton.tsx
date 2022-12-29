import React from 'react'
import {
	TouchableOpacity,
	ActivityIndicator,
	StyleProp,
	ViewStyle
} from 'react-native'
import { SvgProps } from 'react-native-svg'
import { useTailwind } from "tailwind-rn"
import getColor from "../helpers/getColor"
import RegularText from './texts/RegularText'

type NeonButtonPayload = {
	text: string,
	onPress: () => void,
	isLoading?: boolean,
	isDisabled?: boolean,
	style?: StyleProp<ViewStyle>,
	color: string,
	icon: React.FC<SvgProps>,
}

export const NeonButton: React.FC<NeonButtonPayload> = ({
	text,
	onPress,
	isLoading = false,
	isDisabled = false,
	style,
	color,
	icon: IconComponent,
}) => {
	const tailwind = useTailwind()
	const colorHex = getColor(color, 600)

	return (
		<TouchableOpacity
			style={[
				tailwind('mt-4 w-full py-3 px-4 border-2 rounded-lg flex flex-row items-center justify-between'),
				{
					shadowOpacity: 1,
					borderColor: colorHex,
					shadowColor: colorHex,
					shadowRadius: 5,
				},
				(isLoading || isDisabled) && tailwind('opacity-50'),
				style
			]}
			disabled={isDisabled || isLoading}
			onPress={onPress}
		>
			{
				isLoading ? (
					<ActivityIndicator 
						size={28}
						color={colorHex}
					/>
				) : (
					<RegularText
						style={[
							tailwind('text-right text-xl font-light'),
							{ color: colorHex }
						]}
					>
						{text}
					</RegularText>
				)
			}

			<IconComponent width={24} height={24} fill={colorHex} />
		</TouchableOpacity>
	)
}