import React, { useMemo, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import {
	Dimensions,
	ScrollView,
} from "react-native"
import { MotiView, MotiText } from 'moti'
import { signInAnonymously } from "firebase/auth"
import { auth } from "../helpers/setupFirebaseApp"
import { useTailwind } from "tailwind-rn"
import Toast from 'react-native-toast-message'
import HedgehogIcon from "../components/icons/HedgehogIcon"
import { DefaultButton } from "../components/DefaultButton"
import RegularText from "../components/texts/RegularText"
import getColor from "../helpers/getColor"

const GetStartedScreen: React.FC = () => {
	const tailwind = useTailwind()
	const [isLoading, setIsLoading] = useState(false)

	const hedgehogIconDimensions = useMemo(() => {
		return Dimensions.get('window').width * 0.75
	}, [Dimensions])

	const handleGetStartedPress = async () => {
		setIsLoading(true)
		try {
			const firebaseCredential = await signInAnonymously(auth)
			if (!firebaseCredential || !firebaseCredential.user)
				throw new Error('Something went wrong. Please, try again later.')
		} catch (error) {
			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: error instanceof Error ? error.message : 'Unknown error'
			})
		}
		setIsLoading(false)
	}

	return (
		<ScrollView style={[tailwind('py-6 px-6')]}>
			<SafeAreaView>
				<RegularText style={[tailwind('text-right text-sm pb-2 text-slate-500')]}>
					Don't know what that object is?{'\n'}Don't worry, we got you covered.
				</RegularText>
				<MotiText
					from={{
						shadowColor: getColor('green', 500)
					}}
					animate={{
						shadowColor: getColor('pink', 500)
					}}
					transition={{
						loop: true,
						type: 'timing',
						duration: 1500,
						delay: 100,
					}}
					style={[
						tailwind('text-xl font-bold text-center text-slate-500 text-right mb-16'),
						{
							shadowOpacity: 0.5,
							shadowRadius: 7.5,
						},
					]}
				>
					Here. Right in your pocket.
				</MotiText>
				<MotiView
					style={[tailwind('flex justify-center items-center my-8')]}
				>
					<MotiView
						from={{
							scale: 1,
							rotate: '0deg'
						}}
						animate={{
							scale: 1.25,
							rotate: 360
						}}
						transition={{
							loop: true,
							type: 'timing',
							duration: 2000,
							delay: 250,
						}}
					>
						<HedgehogIcon
						height={hedgehogIconDimensions}
						width={hedgehogIconDimensions}
					/>
					</MotiView>
					
				</MotiView>
				
				<DefaultButton
					text="Get Started"
					onPress={handleGetStartedPress}
					isLoading={isLoading}
					style={[tailwind('mt-24')]}
				/>
			</SafeAreaView>
		</ScrollView>
	)
}

export default GetStartedScreen