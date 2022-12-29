import {
	View,
	TextInput,
	StyleProp,
	ViewStyle,
	NativeSyntheticEvent,
	TextInputKeyPressEventData
} from 'react-native'
import React, { useMemo } from 'react'
import { SvgProps } from 'react-native-svg'
import { useTailwind } from 'tailwind-rn'
import getColor from '../helpers/getColor'
import RegularText from './texts/RegularText'


type TextInputPayload = {
	placeholder?: string,
	value: string,
	onChangeText: (text: string) => void,
	required?: boolean,
	charLimit?: number,
	icon?: React.FC<SvgProps>,
	label?: string,
	style?: StyleProp<ViewStyle>,
	numLines?: number,
	onKeyPress?: (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => void,
	onPressOut?: () => void,
	onSubmit?: () => void
}
const RegularTextInput: React.FC<TextInputPayload> = ({
	placeholder,
	value,
	onChangeText,
	required = false,
	charLimit,
	icon: IconComponent,
	label,
	style,
	numLines,
	onKeyPress,
	onPressOut,
	onSubmit
}) => {
	const tailwind = useTailwind()

	const onChange = (text: string) => {
		if (charLimit && text.length > charLimit) {
			onChangeText(text.slice(0, charLimit))
			return
		}
		onChangeText(text)
	}

	const isMultiline = useMemo(() => {
		if (!numLines || numLines === 1) return undefined
		return true
	}, [numLines])

	return (
		<View
			style={[
				tailwind('flex-grow flex justify-center w-full'),
				style
			]}
		>
			<View
				style={[
					tailwind('flex flex-row justify-between items-center')
				]}
			>
				{label && 
					<RegularText
						style={[tailwind('uppercase text-left text-xs text-slate-500')]}
					>
						{label} {required && '(required)'}
					</RegularText>
				}
				{
					charLimit && 
					<RegularText
						style={[tailwind('text-right uppercase text-xs text-slate-500')]}
					>
						Characters: {value.length}/{charLimit}
					</RegularText>
				}				
			</View>
			
			<View style={[tailwind('relative flex items-center justify-center w-full')]}>
				{
					IconComponent && (
						<View
							style={[
								tailwind('absolute right-0 mr-4 z-20 flex items-center justify-center'),
							]}
						>
							<IconComponent
								width={22}
								height={22}
								fill={getColor(required && value.length === 0 ? 'red' : 'slate', 500)}
							/>
						</View>
					)
				}
				
				<TextInput 
					placeholder={placeholder || ''}
					value={value}
					onChangeText={onChange}
					style={[
						tailwind(`mt-1 border border-slate-800 font-light w-full rounded-md p-4 pr-12 text-slate-300 bg-slate-800`),
						required && value.length === 0 && tailwind('border-red-500'),
					]}
					returnKeyType='done'
					placeholderTextColor={getColor('slate', 500)}
					multiline={isMultiline}
					numberOfLines={isMultiline && numLines}
					onSubmitEditing={onSubmit}
					onKeyPress={onKeyPress}
					onPressOut={onPressOut}
				/>
			</View>
		</View>
	)
}

export default RegularTextInput