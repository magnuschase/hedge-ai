import React, { useMemo, useState } from 'react'
import { useTailwind } from 'tailwind-rn'
import { SvgProps } from 'react-native-svg'
import RegularText from './texts/RegularText'
import { ModelConfig } from '../../functions/src/shared/ModelConfig.interface'
import getColor from '../helpers/getColor'
import { TouchableOpacity } from 'react-native'
import ModelBottomSheet from './ModelBottomSheet'

interface ModelCardPayload extends ModelConfig {
	index: number,
	IconComponent: React.FC<SvgProps>
}

const ModelCard: React.FC<ModelCardPayload> = ({
	name,
	description,
	model,
	type,
	labelMap,
	IconComponent,
	index
}) => {
	const tailwind = useTailwind()
	const [isVisible, setIsVisible] = useState(false)

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
		<>
			<TouchableOpacity
				onPress={() => setIsVisible(!isVisible)}
				style={[
					tailwind(`
						mb-4 rounded-lg w-[40%] flex flex-col items-center
						mx-[5%] justify-center h-auto border-2
					`),
					{
						aspectRatio: 1,
						shadowOpacity: 1,
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
			</TouchableOpacity>
			
			<ModelBottomSheet 
				isVisible={isVisible}
				onDismiss={() => setIsVisible(false)}
				name={name}
				description={description}
				model={model}
				type={type}
				labelMap={labelMap}
			/>
		</>
	)
}

export default ModelCard