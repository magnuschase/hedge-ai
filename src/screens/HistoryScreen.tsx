import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { FlatList, View } from "react-native"
import dayjs from 'dayjs'
import { useSelector } from "react-redux"
import { useTailwind } from "tailwind-rn"
import { RootState } from "../store"
import EvaluationItem from "../components/EvaluationItem"
import { EvaluationEntry, EvaluationEntryWithId } from "../../functions/src/shared/EvaluationEntry.interface"
import RegularText from "../components/texts/RegularText"

const HistoryScreen: React.FC = () => {
	const tailwind = useTailwind()
	const { evaluations } = useSelector((state: RootState) => state.history)

	const renderEvaluationEntry = (({
			item,
			index
		}: { item: EvaluationEntryWithId, index: number }) => {
		const previousDate = dayjs(evaluations[index - 1]?.timestamp)
		const currentDate = dayjs(item.timestamp)
		const isSameDay = previousDate.isSame(currentDate, 'day')
		const isYesterday = currentDate.isSame(dayjs().subtract(1, 'day'), 'day')
		const isToday = currentDate.isSame(dayjs(), 'day')
		return (
			<>
				{!isSameDay || index === 0 && (
					<RegularText
						style={[
							tailwind('pb-4 text-lg font-light text-slate-300')
						]}
					>
						{isToday && 'Today'}
						{isYesterday && 'Yesterday'}
						{!isToday && !isYesterday && currentDate.format('DD/MM/YYYY')}
					</RegularText>
				)}
				<EvaluationItem {...item} />
			</>
		)
	
	})

	return (
		<View style={[tailwind('px-6')]}>
			<SafeAreaView>
				<FlatList
					data={evaluations}
					keyExtractor={(item) => item.id}
					renderItem={renderEvaluationEntry}
					numColumns={1}
					ListFooterComponent={<View style={[tailwind('h-48')]} />}
				/>
			</SafeAreaView>
		</View>
	)
}

export default HistoryScreen