import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView } from "react-native"
import RegularText from "../components/texts/RegularText"
import { useTailwind } from "tailwind-rn"

const InfoScreen: React.FC<any> = () => {
	const tailwind = useTailwind()
	return (
		<ScrollView style={[tailwind('px-6')]}>
			<SafeAreaView>
				<RegularText
					style={[
						tailwind('font-light text-3xl mb-4 text-slate-200')
					]}
				>
					Our story
				</RegularText>
				<RegularText
					style={[
						tailwind('font-light text-lg mb-4 text-slate-500')
					]}
				>
					Object recognition is a key technology, that is likely to play an increasingly important role in the future world.
					That's why we decided to create an app that can help people to identify objects around them.
				</RegularText>
				<RegularText
					style={[
						tailwind('font-light text-lg mb-4 text-slate-400')
					]}
				>
					We're not creating the next Google Lens, but we're trying to make your phone a little bit smarter.
					Out of the box we provide you with a few basic models, that recognise letters from ASL, general objects, and our favorite, hedgehogs 🦔
				</RegularText>
				<RegularText
					style={[
						tailwind('text-lg mb-4 text-slate-500')
					]}
				>
					But the best part is that you can upload your own model to use in the app. Just follow the instructions on the 'Custom' screen.
				</RegularText>
				<RegularText
					style={[
						tailwind('text-xl font-bold text-slate-400')
					]}
				>
					We hope you'll enjoy using our app as much as we enjoyed creating it.
				</RegularText>
			</SafeAreaView>
		</ScrollView>
	)
}

export default InfoScreen