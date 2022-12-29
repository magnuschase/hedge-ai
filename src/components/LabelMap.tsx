import { View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native'
import React, { useMemo } from 'react'
import { useTailwind } from 'tailwind-rn'
import RegularText from './texts/RegularText'
import { COLOR_GEN_DARK, COLOR_GEN_LIGHT } from '../helpers/colorsGenerator'

type LabelMapPayload = {
	labelMap: string[],
	onElementPress?: (index: number) => void,
	style?: StyleProp<ViewStyle>
}

const LabelMap: React.FC<LabelMapPayload> = ({
	labelMap,
	onElementPress,
	style
}) => {
	const tailwind = useTailwind()

	const cutLabelMap = useMemo(() => {
		if (labelMap.length <= 29) return labelMap
		return labelMap.slice(0, 29).concat('...')
	}, [labelMap])

	return (
		<View
			style={[
				tailwind('w-full flex flex-row flex-wrap justify-start pt-2'),
				style
			]}
		>
			{cutLabelMap.map((label, index) => (
				<TouchableOpacity
					style={[
						tailwind('flex items-center justify-center mx-2 my-2 rounded-full'),
						{ backgroundColor: COLOR_GEN_DARK.hex(label) }
					]}
					key={label}
					onPress={onElementPress ? () => onElementPress(index) : undefined}
				>
					<RegularText
						key={index}
						style={[
							tailwind('text-neutral-200 py-1 px-3 text-white'),
							{ color: COLOR_GEN_LIGHT.hex(label)}
						]}
					>
						{label}
					</RegularText>
				</TouchableOpacity>
			))}
		</View>			
	)
}

export default LabelMap