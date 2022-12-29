import React, { useCallback, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView, TouchableOpacity, View, Image } from "react-native"
import { useRoute } from "@react-navigation/native"
import { useTailwind } from "tailwind-rn"
import Toast from 'react-native-toast-message'
import { useNavigation } from "@react-navigation/native"
import * as ImagePicker from "expo-image-picker"
import { ModelConfig } from "../../functions/src/shared/ModelConfig.interface"
import RegularText from "../components/texts/RegularText"
import getColor from "../helpers/getColor"
import UploadIcon from "../components/icons/UploadIcon"
import { NeonButton } from "../components/NeonButton"
import CameraIcon from "../components/icons/CameraIcon"
import SelectIcon from "../components/icons/SelectIcon"
import { useEvaluation } from "../hooks/useEvaluation"

const UploadScreen: React.FC<any> = () => {
	const { params } = useRoute()
	const tailwind = useTailwind()
	const { navigate } = useNavigation()
	const [image, setImage] = useState<string>('')
	const [isLoading, setIsLoading] = useState(false)
	const { addEvaluation } = useEvaluation()

	const { modelConfig } = params as { modelConfig: ModelConfig }

	const selectImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
			allowsMultipleSelection: false
		})

		if (!result.canceled) {
			setImage(result.assets[0].uri)
		}
	}

	const uploadImage = useCallback(async () => {
		if (!image) return
		setIsLoading(true)
		try {
			await addEvaluation({
				imageUrl: image,
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
			navigate('History' as never)
		} catch (error) {
			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: error instanceof Error ? error.message : 'Something went wrong. Please, try again later'
			})
			setIsLoading(false)
		}
	}, [image])


	return (
		<ScrollView
			style={[
				tailwind('px-6')
			]}
		>
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
						tailwind('font-thin text-lg mb-4 text-slate-200 text-center')
					]}
				>
					{modelConfig.type === 'local' ? 'built-in' : modelConfig.type} model
				</RegularText>
				<View
					style={[
						tailwind('flex items-center justify-center w-full pt-8')
					]}
				>
					<TouchableOpacity
						onPress={selectImage}
						style={[
							tailwind(`
								mb-4 rounded-lg w-3/4 flex flex-col items-center
								justify-center h-auto border-2 border-sky-500
							`),
							{
								aspectRatio: 1,
								shadowOpacity: 1,
								shadowColor: getColor('sky', 500),
								shadowRadius: 5,
							}
						]}
					>
						{
							image ? (
								<Image
									source={{uri: image}}
									resizeMode={'cover'}
									style={[
										tailwind('w-full h-full rounded-lg bg-sky-500 border-2 border-sky-500'),
										{
											shadowOpacity: 1,
											shadowColor: getColor('sky', 500),
											shadowRadius: 5
										}
									]}
								/>
							) : (
								<>
									<SelectIcon fill={getColor('sky', 500)}/>

									<RegularText
										style={[
											tailwind('font-bold pt-4 text-sky-500'),
										]}
									>
										Select image
									</RegularText>
								</>
							)
						}
						
					</TouchableOpacity>
				</View>
				<NeonButton 
					text="Upload"
					icon={UploadIcon}
					onPress={uploadImage}
					color='emerald'
					isDisabled={image.length === 0}
					isLoading={isLoading}
				/>
				<NeonButton 
					text="Switch to camera mode"
					icon={CameraIcon}
					onPress={() => navigate('CameraScreen' as never, { modelConfig } as never)}
					color='rose'
				/>
			</SafeAreaView>
		</ScrollView>
	)
}

export default UploadScreen