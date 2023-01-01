import React, { useEffect, useState, useCallback } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import Toast from 'react-native-toast-message'
import { View, Image } from "react-native"
import { requestCameraPermissionsAsync, CameraCapturedPicture } from 'expo-camera'
import { useNavigation, useRoute } from "@react-navigation/native"
import { useTailwind } from "tailwind-rn"
import CameraWithControls from "../components/CameraWithControls"
import getColor from "../helpers/getColor"
import { NeonButton } from "../components/NeonButton"
import CameraIcon from "../components/icons/CameraIcon"
import UploadIcon from "../components/icons/UploadIcon"
import { useEvaluation } from "../hooks/useEvaluation"
import { ModelConfig } from "../../functions/src/shared/ModelConfig.interface"
import RegularText from "../components/texts/RegularText"

const CameraScreen: React.FC<any> = () => {
	const { reset } = useNavigation()
	const tailwind = useTailwind()
	const [uri, setUri] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { addEvaluation } = useEvaluation()
	const { params } = useRoute()
	const { modelConfig } = params as { modelConfig: ModelConfig }

	const getCameraPermissions = async () => {
		const { status } = await requestCameraPermissionsAsync()
		if (status !== 'granted') {
			Toast.show({
				type: 'error',
				text1: 'Camera permissions not granted',
				text2: 'Please enable camera permissions in your device settings'
			})
			reset({
				index: 0,
				routes: [{ name: 'Home' as never }]
			})
		}
	}

	useEffect(() => {
		getCameraPermissions()
	}, [])

	const uploadImage = useCallback(async () => {
		if (!uri) return
		setIsLoading(true)
		try {
			await addEvaluation({
				imageUrl: uri,
				type: modelConfig.type,
				model: modelConfig.model,
				modelName: modelConfig.name
			})
			Toast.show({
				type: 'success',
				text1: 'Pending',
				text2: 'Your evaluation request was added to the queue.'
			})
			setIsLoading(false)
			reset({
				index: 0,
				routes: [{ name: 'History' as never }]
			})
		} catch (error) {
			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: error instanceof Error ? error.message : 'Something went wrong. Please, try again later'
			})
			setIsLoading(false)
		}
	}, [uri])


	return (
		<View style={[
			tailwind('px-6')
		]}>
			<SafeAreaView>
				<RegularText
					style={[
						tailwind('font-light text-3xl mb-2 text-slate-500 text-center')
					]}
				>
					{modelConfig.name}
				</RegularText>
				<RegularText
					style={[
						tailwind('font-thin text-lg mb-4 text-slate-200 text-center pb-4')
					]}
				>
					{modelConfig.type === 'local' ? 'built-in' : modelConfig.type} model
				</RegularText>
				{
					uri !== '' ? (
						<>
							<Image
								source={{ uri }}
								resizeMode={'cover'}
								style={[
									tailwind('w-full rounded-lg bg-sky-500 border-2 border-sky-500'),
									{
										shadowOpacity: 1,
										shadowColor: getColor('sky', 500),
										shadowRadius: 5,
										aspectRatio: 1
									}
								]}
							/>
							<NeonButton 
								text='Retake'
								onPress={() => setUri('')}
								color='rose'
								isDisabled={isLoading}
								icon={CameraIcon}
							/>
							<NeonButton 
								text='Evaluate'
								onPress={uploadImage}
								color='sky'
								icon={UploadIcon}
								isLoading={isLoading}
							/>
						</>
					) : (
						<CameraWithControls setUri={setUri}/>
					)
				}
				

			</SafeAreaView>
		</View>
	)
}

export default CameraScreen