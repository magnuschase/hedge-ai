import { View } from 'react-native'
import { MotiView } from 'moti'
import React, { useMemo } from 'react'
import RegularText from './texts/RegularText'
import { ModelConfig } from '../../functions/src/shared/ModelConfig.interface'
import { useTailwind } from 'tailwind-rn'
import getColor from '../helpers/getColor'
import { SvgProps } from 'react-native-svg'

interface ModelCardPayload extends ModelConfig {
	index: number,
	IconComponent: React.FC<SvgProps>
}

const ModelCard: React.FC<ModelCardPayload> = ({
	name,
	description,
	fileName,
	path,
	labelMap,
	IconComponent,
	index
}) => {
	const tailwind = useTailwind()

	const color = useMemo(() => {
		switch(index) {
			case 0:
				return 'red'
			case 1:
				return 'green'
			case 2:
				return 'yellow'
			case 3:
				return 'sky'
			default:
				return 'teal'
		}
	}, [index])

	const [lighterColor, darkerColor] = useMemo(() => {
		return [
			getColor(color, 300),
			getColor(color, 400)
		]
	}, [color])

	return (
		<MotiView
			from={{
				shadowOpacity: 0.5
			}}
			animate={{
				shadowOpacity: 1,
			}}
			transition={{
				loop: true,
				type: 'timing',
				duration: 1000,
				delay: 500,
			}}
			style={[
				tailwind(`
					mb-4 rounded-lg w-[40%] flex flex-col items-center
					mx-[5%] justify-center h-auto border-2
				`),
				{
					aspectRatio: 1,
					borderColor: darkerColor,
					shadowColor: darkerColor,
					shadowRadius: 5,
				},
			]}
		>
			<IconComponent fill={darkerColor}/>

			<RegularText
				style={[
					tailwind('font-bold pt-4'),
					{ color: darkerColor }
				]}
			>
				{ name }
			</RegularText>			
		</MotiView>
	)
}

export default ModelCard