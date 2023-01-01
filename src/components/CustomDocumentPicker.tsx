import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn'
import { getDocumentAsync } from 'expo-document-picker'
import RegularText from './texts/RegularText'


type DocumentPickerPayload = {
	extension: string,
	type?: string,
	uri: string,
	setUri: (uri: string) => void,
	label?: string
}

const CustomDocumentPicker: React.FC<DocumentPickerPayload> = ({
	extension = '.pt',
	type,
	label,
	uri,
	setUri
}) => {
	const tailwind = useTailwind()

	const handleDocumentSelect = async () => {
		const result = await getDocumentAsync({ type: "*/*" })

		if (result.type === 'success' && result.name.endsWith(extension)) {
			setUri(result.uri)
		}
	}

	return (
		<View>
			<RegularText
				style={[
					tailwind('uppercase text-left text-xs text-slate-500')
				]}
			>
				{label}
			</RegularText>
			<TouchableOpacity 
				style={[
					tailwind(`mt-1 border border-slate-800 font-light w-full rounded-md p-4 pr-12 text-slate-300 bg-slate-800`),
				]}
				onPress={handleDocumentSelect}
			>
				<RegularText>
					{uri ? uri : 'Select a file'}
				</RegularText>
			</TouchableOpacity>
		</View>
	)
}

export default CustomDocumentPicker