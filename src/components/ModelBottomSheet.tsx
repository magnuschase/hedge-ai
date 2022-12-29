import React from 'react'
import { useTailwind } from 'tailwind-rn/dist'
import { ModelConfig } from '../../functions/src/shared/ModelConfig.interface'
import RegularText from './texts/RegularText'
import GorhomBottomModal from './GorhomBottomModal'
import LabelMap from './LabelMap'
import { NeonModalButton } from './NeonButton'
import CameraIcon from './icons/CameraIcon'
import UploadIcon from './icons/UploadIcon'
import { useNavigation } from '@react-navigation/native'

interface ModelBottomSheetPayload extends ModelConfig {
	isVisible: boolean,
	onDismiss: () => void
}

const ModelBottomSheet: React.FC<ModelBottomSheetPayload> = ({
	isVisible,
	onDismiss,
	name,
	description,
	model,
	type,
	labelMap
}) => {
	const tailwind = useTailwind()
	const { navigate } = useNavigation()

	const handleButtonPress = (screenName: string) => {
		navigate(
			screenName as never,
			{
				modelConfig: {
					name,
					description,
					model,
					type,
					labelMap
				}
			} as never
		)
	}

	return (
		<GorhomBottomModal 
			isVisible={isVisible}
			onDismiss={onDismiss}
		>
			{/* Name */}
			<RegularText
				style={[
					tailwind('font-light text-3xl text-neutral-500')
				]}
			>
				{name}
			</RegularText>

			{/* Description */}
			<RegularText
				style={[
					tailwind('text-neutral-200 pt-4 text-neutral-500')
				]}
			>
				{description}
			</RegularText>

			{/* Label map */}
			<RegularText
				style={[
					tailwind('font-thin text-2xl text-neutral-200 pt-2')
				]}
			>
				Classes:
			</RegularText>
			<LabelMap
				labelMap={labelMap}
			/>

			{/* Actions */}
			<RegularText
				style={[
					tailwind('font-thin text-2xl text-neutral-200 pt-2')
				]}
			>
				Use model:
			</RegularText>
			<NeonModalButton 
				text='Camera'
				onPress={() => handleButtonPress('CameraScreen')}
				color='teal'
				icon={CameraIcon}
			/>
			<NeonModalButton 
				text='Upload file'
				onPress={() => handleButtonPress('UploadScreen')}
				color='sky'
				icon={UploadIcon}
			/>
		</GorhomBottomModal>
	)
}

export default ModelBottomSheet