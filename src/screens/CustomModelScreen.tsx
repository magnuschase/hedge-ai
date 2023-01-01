import React, { useState, useMemo, useCallback } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import Toast from 'react-native-toast-message'
import { ScrollView } from "react-native"
import { useSelector } from "react-redux"
import { useTailwind } from 'tailwind-rn'
import { useNavigation } from "@react-navigation/native"
import { getFirestore, doc, updateDoc } from "firebase/firestore"
import { RootState } from "../store"
import RegularText from "../components/texts/RegularText"
import EditIcon from "../components/icons/EditIcon"
import RegularTextInput from "../components/RegularTextInput"
import LabelMap from "../components/LabelMap"
import LabelIcon from "../components/icons/LabelIcon"
import NeuronIcon from '../components/icons/NeuronIcon'
import { NeonButton } from "../components/NeonButton"
import SaveIcon from "../components/icons/SaveIcon"

const CustomModelScreen: React.FC = () => {
	const tailwind = useTailwind()
	const db = getFirestore()
	const { reset } = useNavigation()
	const { user, firebaseUser } = useSelector((state: RootState) => state.user)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [name, setName] = useState<string>(user?.customModel.name || 'Custom')
	const [modelUrl, setModelUrl] = useState<string>(user?.customModel.model || '')
	const [description, setDescription] = useState<string>(user?.customModel.description || '')
	const [labelMap, setLabelMap] = useState<string[]>(user?.customModel.labelMap || [])
	const [newLabel, setNewLabel] = useState<string>('')

	const addLabel = () => {
		if (newLabel === '') return
		setLabelMap([...labelMap, newLabel])
		setNewLabel('')
	}

	const removeLabel = (index: number) => {
		const newLabelMap = labelMap.filter((_, i) => i !== index)
		setLabelMap(newLabelMap)
	}

	const buttonDisabled = useMemo(() => {
		if (name === '') return true
		if (modelUrl === '') return true
		return modelUrl.toLowerCase().startsWith('https://') ? false : true
	}, [name, modelUrl])

	const handleSave = useCallback(async () => {
		if (!firebaseUser || !user) return
		setIsLoading(true)
		try {
			const userRef = doc(db, `users/${firebaseUser.uid}`)
			const newData = {
				type: 'custom',
				name,
				description,
				model: modelUrl,
				labelMap
			}
			await updateDoc(userRef, {
				customModel: newData
			})

			setIsLoading(false)

			Toast.show({
				type: 'success',
				text1: 'Success',
				text2: 'Your custom model has been saved'
			})
			reset({
				index: 0,
				routes: [
					{ name: 'Home' as never }
				]
			})
		} catch (error) {
			setIsLoading(false)

			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: 'Error occured while saving your custom model'
			})
		}
	}, [
		db,
		buttonDisabled,
		name,
		modelUrl,
		description,
		labelMap]
	)

	return (
		<ScrollView style={[
			tailwind('px-6')
		]}>
			<SafeAreaView>
				{/* Model name */}
				<RegularTextInput 
					label={'Model name'}
					value={name}
					onChangeText={setName}
					icon={EditIcon}
					charLimit={20}
					style={[tailwind('mb-4')]}
					required
				/>

				{/* Description */}
				<RegularTextInput 
					label={'Description'}
					value={description}
					onChangeText={setDescription}
					icon={EditIcon}
					charLimit={120}
					style={[tailwind('mb-4')]}
					numLines={5}
				/>

				{/* Label map */}
				<RegularTextInput 
					label={'Label map (press enter to add)'}
					value={newLabel}
					onChangeText={setNewLabel}
					icon={LabelIcon}
					onSubmit={addLabel}
				/>
				<LabelMap 
					labelMap={labelMap}
					onElementPress={removeLabel}
					style={[tailwind('mb-4')]}
				/>

				{/* Model file */}
				<RegularTextInput 
					label={'Model URL [direct download]'}
					value={modelUrl}
					onChangeText={setModelUrl}
					icon={NeuronIcon}
					required
					isInvalid={modelUrl.startsWith('https://') ? false : true}
					placeholder='https://example.com/model.pt'
				/>

				<RegularText
					style={[
						tailwind('text-xs text-rose-500 pt-2 pb-8')
					]}
				>
					Only models trained on YOLOv5 and exported to .pt format are supported at the moment.
				</RegularText>

				{/* Save button */}

				<NeonButton
					text='Save'
					onPress={handleSave}
					isDisabled={buttonDisabled}
					isLoading={isLoading}
					color='sky'
					icon={SaveIcon}
				/>
			</SafeAreaView>
		</ScrollView>
	)
}

export default CustomModelScreen