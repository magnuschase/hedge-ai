import React from 'react'
import { useTailwind } from 'tailwind-rn/dist'
import { ModelConfig } from '../../functions/src/shared/ModelConfig.interface'
import RegularText from './texts/RegularText'
import GorhomBottomModal from './GorhomBottomModal'
import LabelMap from './LabelMap'

interface ModelBottomSheetPayload extends ModelConfig {
	isVisible: boolean,
	onDismiss: () => void
}

const ModelBottomSheet: React.FC<ModelBottomSheetPayload> = ({
	isVisible,
	onDismiss,
	name,
	description,
	fileName,
	path,
	labelMap
}) => {
	const tailwind = useTailwind()

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
		</GorhomBottomModal>
	)
}

export default ModelBottomSheet