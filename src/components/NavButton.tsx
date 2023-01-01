import React, { useMemo } from 'react'
import { TouchableOpacity } from 'react-native'
import { SvgProps } from "react-native-svg"
import { useTailwind } from 'tailwind-rn'
import * as Haptics from 'expo-haptics'
import { useNavigation, useNavigationState } from '@react-navigation/native'
import RegularText from './texts/RegularText'
import getColor from '../helpers/getColor'

type NavButtonPayload = {
	text: string,
	icon: React.FC<SvgProps>,
	screenName: string
}

const NavButton: React.FC<NavButtonPayload> = ({
	text,
	icon: IconComponent,
	screenName
}) => {
	const tailwind = useTailwind()
	const { reset } = useNavigation()
  const currentRoute = useNavigationState((state) => state?.routes[(state?.routes.length || 1) - 1].name)

	const active = useMemo(() => currentRoute === screenName, [currentRoute])

	const onPress = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
		reset({
			index: 0,
			routes: [
				{ name: screenName as never }
			]
		})
	}

	return (
		<TouchableOpacity
			style={[
				tailwind(`
					py-4 px-6 rounded-lg flex items-center justify-center
					${active ? 'bg-gray-900/20' : 'bg-gray-900/5' }
				`)
			]}
			onPress={onPress}
		>
			<IconComponent
				fill={getColor('slate', active ? 50 : 500)}
				width={24}
				height={24}
			/>
			<RegularText
				style={[
					tailwind(`
						pt-2 text-xs
						${active ? 'text-slate-50' : 'font-light text-slate-500'}
					`)
				]}
			>
				{text}
			</RegularText>
		</TouchableOpacity>
	)
}

export default NavButton