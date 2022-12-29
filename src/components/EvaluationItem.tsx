import { View, Image, TouchableOpacity } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useTailwind } from 'tailwind-rn'
import dayjs from 'dayjs'
import { EvaluationEntryWithId } from '../../functions/src/shared/EvaluationEntry.interface'
import RegularText from './texts/RegularText'
import { Status } from '../../functions/src/shared/Status.enum'
import getColor from '../helpers/getColor'
import EvaluationBottomSheet from './EvaluationBottomSheet'

const EvaluationItem: React.FC<EvaluationEntryWithId> = ({
	timestamp,
	model,
	type,
	imageUrl,
	evaluatedImageUrl,
	status,
	modelName,
	id
}) => {
	const tailwind = useTailwind()
	const [isVisible, setIsVisible] = useState(false)

	const statusName = useMemo(() => {
		switch (status) {
			case Status.SUCCESS:
				return 'Successfully evaluated'
			case Status.FAILURE:
				return 'Evaluation failed'
			case Status.PENDING:
				return 'Evaluation pending'
		}
	}, [status])

	const statusColor = useMemo(() => {
		switch (status) {
			case Status.SUCCESS:
				return getColor('green', 400)
			case Status.FAILURE:
				return getColor('rose', 400)
			case Status.PENDING:
				return getColor('sky', 400)
		}
	}, [status])
	return (
		<>
			<TouchableOpacity
				style={[
					tailwind(`w-full bg-slate-800 rounded-lg py-4 px-4 flex flex-row mb-4`),
				]}
				onPress={() => setIsVisible(true)}
			>
				<Image 
					source={{ uri: evaluatedImageUrl || imageUrl }}
					style={[
						tailwind('rounded-xl w-16'),
						{ aspectRatio: 1}
					]}
				/>
				<View 
					style={[
						tailwind('pl-4 flex-col items-end justify-center flex-1')
					]}
				>
					<RegularText
						style={[
							tailwind(`text-xs font-thin text-slate-200 `),
						]}
					>
						{dayjs(timestamp).format('DD/MM/YYYY HH:mm:ss')}
					</RegularText>
					<RegularText
						style={[
							tailwind(`text-sm text-slate-300 font-light `),
						]}
					>
						{type === 'custom' ? 'Custom: ': ''}{modelName}
					</RegularText>
					
					<RegularText
						style={[
							tailwind(`text-sm`),
							{ color: statusColor }
						]}
					>
						{statusName}
					</RegularText>
				</View>
			</TouchableOpacity>

			<EvaluationBottomSheet
				isVisible={isVisible}
				onDismiss={() => setIsVisible(false)}
				timestamp={timestamp}
				model={model}
				type={type}
				imageUrl={imageUrl}
				evaluatedImageUrl={evaluatedImageUrl}
				status={status}
				modelName={modelName}
				id={id}
			/>
		</>
	)
}

export default EvaluationItem