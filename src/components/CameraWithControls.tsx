import { View } from 'react-native'
import React, { useState, useRef, useMemo, useCallback } from 'react'
import { Camera, CameraType } from 'expo-camera'
import { useTailwind } from 'tailwind-rn'
import { MotiPressable } from 'moti/interactions'
import Toast from 'react-native-toast-message'
import SwitchCameraIcon from './icons/SwitchCameraIcon'
import CameraIcon from './icons/CameraIcon'
import getColor from '../helpers/getColor'

type CameraPayload = {
	setUri: (uri: string) => void
}

const CameraWithControls: React.FC<CameraPayload> = ({ setUri }) => {
	const tailwind = useTailwind()
	const cameraRef = useRef<Camera>(null)
	const [type, setType] = useState<CameraType>(CameraType.back)


	const switchType = () => {
		if (type === CameraType.front) {
			setType(CameraType.back)
			return
		}
		setType(CameraType.front)
	}

	const handleCapture = useCallback(async () => {
		if (!cameraRef.current) return
		try {
			const { uri } = await cameraRef.current.takePictureAsync({
				quality: 0.2
			})
			setUri(uri)
		}	catch (error) {
			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: 'Encountered an error while capturing photo'
			})
		}
	}, [cameraRef])

	return (
		<>
			{/* Camera */}
			<Camera
					ref={cameraRef}
					style={[
						tailwind('w-full rounded-lg relative z-[-1]'),
						{ aspectRatio: 1 }
					]}
					type={type}
					ratio={'1:1'}
				>
					{/* Switch camera button */}
					<View
						style={[
							tailwind('flex-1 w-full flex-row bg-transparent flex items-start justify-end')
						]}
					>
						<MotiPressable
							onPress={switchType}
							style={[
								tailwind('w-16 h-16 p-4 bg-slate-800 flex items-center justify-center'),
								{ borderBottomLeftRadius: 12 }
							]}
							animate={useMemo(
								() => ({ hovered, pressed }) => {
									'worklet'
				
									return {
										scale: hovered || pressed ? 1.1 : 1,
										right: hovered || pressed ? 2 : 0,
										top: hovered || pressed ? 2 : 0,
										opacity: hovered || pressed ? 0.8 : 1,
									}
								},
								[]
							)}
							transition={useMemo(
								() => ({ hovered, pressed }) => {
									'worklet'
				
									return {
										delay: hovered || pressed ? 0 : 100,
										type: 'timing',
										duration: 100,
									}
								},
								[]
							)}
						>
							<SwitchCameraIcon width={24} height={24} stroke={getColor('sky', 500)} />
						</MotiPressable>
					</View>
				</Camera>

				{/* Take picture button */}
				<View style={[
					tailwind('relative w-full flex flex-row justify-center items-center mt-6')
				]}>
					<MotiPressable
						onPress={handleCapture}
						style={[
							tailwind('w-24 h-24 p-4 rounded-full bg-slate-800 flex items-center justify-center')
						]}
						animate={useMemo(
							() => ({ hovered, pressed }) => {
								'worklet'
			
								return {
									opacity: hovered || pressed ? 0.8 : 1,
									scale: hovered || pressed ? 1.2 : 1,
								}
							},
							[]
						)}
						transition={useMemo(
							() => ({ hovered, pressed }) => {
								'worklet'
								return {
									delay: hovered || pressed ? 0 : 100,
									type: 'timing',
									duration: 100,
								}
							},
							[]
						)}
					>
						<CameraIcon width={48} height={48} stroke={getColor('sky', 500)} />
					</MotiPressable>
				</View>
		</>
	)
}

export default CameraWithControls