import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { View, FlatList } from "react-native"
import ModelCard from "../components/ModelCard"
import { useTailwind } from "tailwind-rn"
import RegularText from "../components/texts/RegularText"
import { CONFIG_ARR } from "../helpers/constants/modelConfigs"
import { ModelConfig } from "../../functions/src/shared/ModelConfig.interface"
import AslIcon from '../components/icons/AslIcon'
import YoloIcon from '../components/icons/YoloIcon'
import HedgeIcon from '../components/icons/HedgeIcon'
import NeuronIcon from '../components/icons/NeuronIcon'

const HomeScreen: React.FC<any> = () => {
	const tailwind = useTailwind()

	const renderModelCard = ({item, index}: { item: ModelConfig, index: number}) => {
		let icon: React.FC = NeuronIcon
		
		switch(item.name) {
			case "ASL Alphabet":
				icon = AslIcon
				break
			case "YOLO":
				icon = YoloIcon
				break
			case "Hedge":
				icon = HedgeIcon
				break
		}
		return (
			<ModelCard
				index={index}
				IconComponent={icon}
				{...item}
			/>
		)
	}

	return (
		<View style={[tailwind('px-6')]}>
			<SafeAreaView>
				<RegularText
					style={[tailwind('font-thin text-slate-200 text-3xl mb-4')]}
				>
					Choose your model!
				</RegularText>
				<FlatList
					data={CONFIG_ARR}
					keyExtractor={(item) => item.name}
					renderItem={(item) => renderModelCard(item)}
					numColumns={2}
					style={[tailwind('pt-4 pb-16')]}
					ListFooterComponent={(
						<View
							style={[
								tailwind('h-48 w-full')
							]}
						/>
					)}
				/>
			</SafeAreaView>
		</View>
	)
}

export default HomeScreen