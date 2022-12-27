import React, {
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react'
import {
	BottomSheetModal,
	BottomSheetBackdrop,
	BottomSheetView,
	useBottomSheetDynamicSnapPoints
} from '@gorhom/bottom-sheet'
import { useTailwind } from 'tailwind-rn'
import { View } from 'react-native'

type BottomSheetModalPayload = {
	children: React.ReactNode,
	isVisible: boolean,
	onDismiss: () => void
}

const GorhomBottomModal: React.FC<BottomSheetModalPayload> = ({
	children,
	isVisible,
	onDismiss
}) => {
	const tailwind = useTailwind()

	const [forceRenderCount, setForceRenderCount] = useState(0)
	const bottomSheetModalRef = useRef<BottomSheetModal>(null)
	const initialSnapPoints = useMemo(() => {
    return ['20%', 'CONTENT_HEIGHT', '85%']
  }, [])
  const {
		animatedHandleHeight,
		animatedSnapPoints,
		animatedContentHeight,
		handleContentLayout
	} = useBottomSheetDynamicSnapPoints(initialSnapPoints)

	useEffect(() => {
		if (!bottomSheetModalRef) return
		if (isVisible) {
			bottomSheetModalRef.current?.present()
			setTimeout(() => {
				bottomSheetModalRef.current?.present()
			}, 20)
		} else {
			bottomSheetModalRef.current?.dismiss()
		}
	}, [isVisible])
	
	useEffect(() => {
		setForceRenderCount(forceRenderCount + 1)
	}, [])

	return (
		<BottomSheetModal
			ref={bottomSheetModalRef}
			index={1}
			snapPoints={animatedSnapPoints}
			handleHeight={animatedHandleHeight}
			contentHeight={animatedContentHeight}
			backdropComponent={(backdropProps) => (
				<BottomSheetBackdrop
					{...backdropProps}
					enableTouchThrough
					disappearsOnIndex={0}
				/>
			)}
			backgroundStyle={[tailwind('bg-neutral-900')]}
			onDismiss={onDismiss}
		>
			<BottomSheetView
        onLayout={handleContentLayout}
        style={[
          tailwind('w-full pb-4 pt-2 px-8')
        ]}
      >
        <View
          style={[
            tailwind('mt-2 w-full pb-16'),
          ]}
        >
          {children}
        </View>
      </BottomSheetView>
		</BottomSheetModal>	
	)
}

export default GorhomBottomModal