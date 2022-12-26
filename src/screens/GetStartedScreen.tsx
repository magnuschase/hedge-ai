import React, { useMemo, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import {
	Dimensions,
	ScrollView,
	View,
	Text,
} from "react-native"
import { signInAnonymously } from "firebase/auth"
import { auth } from "../helpers/setupFirebaseApp"
import { useTailwind } from "tailwind-rn"
import Toast from 'react-native-toast-message'
import HedgehogIcon from "../components/icons/HedgehogIcon"
import { DefaultButton } from "../components/DefaultButton"

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
		<ScrollView style={[tailwind('py-6 px-6 bg-amber-50')]}>
			<SafeAreaView>
				<View
					style={[tailwind('flex justify-center items-center mb-8')]}
				>
					<HedgehogIcon
						height={hedgehogIconDimensions}
						width={hedgehogIconDimensions}
					/>
				</View>
				<Text style={[tailwind('text-xl font-bold text-center')]}>
					Pocket-sized object recognition powerhouse
				</Text>
				<DefaultButton
					text="Get Started"
					onPress={handleGetStartedPress}
					isLoading={isLoading}
					style={[tailwind('mt-12')]}
				/>
			</SafeAreaView>
		</ScrollView>
	)
}

export default GetStartedScreen