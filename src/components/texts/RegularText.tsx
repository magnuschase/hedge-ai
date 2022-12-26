import { Text, TextStyle, StyleProp } from 'react-native'
import { useTailwind } from 'tailwind-rn'

type RegularTextPayload = {
	children: React.ReactNode,
	style?: StyleProp<TextStyle>
}

const RegularText: React.FC<RegularTextPayload> = ({
	children,
	style
}) => {
	const tailwind = useTailwind()

	return (
		<Text
			style={[
				tailwind('text-slate-50'),
				style
			]}
		>
			{children}
		</Text>
	)
}

export default RegularText