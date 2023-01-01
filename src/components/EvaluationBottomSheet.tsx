import React, { useState } from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { useTailwind } from 'tailwind-rn'
import dayjs from 'dayjs'
import Toast from 'react-native-toast-message'
import RegularText from './texts/RegularText'
import GorhomBottomModal from './GorhomBottomModal'
import { NeonModalButton } from './NeonButton'
import UploadIcon from './icons/UploadIcon'
import { useNavigation } from '@react-navigation/native'
import { EvaluationEntryWithId } from '../../functions/src/shared/EvaluationEntry.interface'
import { Status } from '../../functions/src/shared/Status.enum'
import { useEvaluation } from '../hooks/useEvaluation'

interface EvaluationBottomSheetPayload extends EvaluationEntryWithId {
	isVisible: boolean,
	onDismiss: () => void,
}

const EvaluationBottomSheet: React.FC<EvaluationBottomSheetPayload> = ({
	isVisible,
	onDismiss,
	modelName,
	timestamp,
	type,
	imageUrl,
	evaluatedImageUrl,
	status,
	id
}) => {
	const tailwind = useTailwind()
	const { navigate } = useNavigation()
	const [displayEvaluation, setDisplayEvaluation] = useState(true) 
	const { removeEvaluation } = useEvaluation()

	const handleSourceChange = () => {
		if (status !== Status.SUCCESS) return
		setDisplayEvaluation(!displayEvaluation)
	}

	const handleRemove = () => {
		try {
			removeEvaluation({
				id,
				imageUrl,
				evaluatedImageUrl
			})
			onDismiss()
		} catch (error) {
			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: 'Failed to remove evaluation'
			})
		}
	} 

	return (
		<GorhomBottomModal 
			isVisible={isVisible}
			onDismiss={onDismiss}
		>
			{/* Model name */}
			<RegularText
				style={[
					tailwind('pt-1 text-3xl text-center text-neutral-500 text-sky-500/70')
				]}
			>
				{modelName}
			</RegularText>

			<RegularText
				style={[
					tailwind('pt-1 text-center text-lg text-neutral-500 text-sky-500/70')
				]}
			>
				{type === 'local' ? 'built-in' : 'custom'} model
			</RegularText>

			{/* Model name */}
			<RegularText
				style={[
					tailwind('pt-1 text-sm text-center text-neutral-200 font-light')
				]}
			>
				{dayjs(timestamp).format('DD/MM/YYYY HH:mm:ss')}
			</RegularText>
			<TouchableOpacity
				onPress={handleSourceChange}
			>
				{
					status === Status.SUCCESS && 
						<RegularText
							style={[
								tailwind('pt-4 text-sm text-center text-neutral-500 font-bold')
							]}
						>
							{displayEvaluation ? 'Evaluated image' : 'Source image'} (click to switch source)
						</RegularText>
				}
				<Image
					source={{ uri: displayEvaluation ? evaluatedImageUrl || imageUrl : imageUrl }}
					style={[
						tailwind('w-full rounded-lg mt-2'),
						{ aspectRatio: 1 }
					]}
				/>
			</TouchableOpacity>

			{/* Actions */}
			{
				status !== Status.PENDING &&
					<NeonModalButton 
						text='Remove evaluation'
						onPress={handleRemove}
						color='rose'
						icon={UploadIcon}
					/>
			}
			
		</GorhomBottomModal>
	)
}

export default EvaluationBottomSheet