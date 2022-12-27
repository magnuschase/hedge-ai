import { View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { useTailwind } from 'tailwind-rn'
import { RootState } from '../store'
import { useNavigationState } from '@react-navigation/native'
import NavButton from './NavButton'
import HomeIcon from './icons/HomeIcon'
import NeuronIcon from './icons/NeuronIcon'
import HistoryIcon from './icons/HistoryIcon'
import InfoIcon from './icons/InfoIcon'

const BottomNavigation: React.FC = () => {
  const { firebaseUser } = useSelector((state: RootState) => state.user)
	const tailwind = useTailwind()

  return (
    <View
      style={[tailwind('absolute top-0 w-full h-full')]}
      pointerEvents='box-none'
    >
      {firebaseUser && (
				<View
					style={[
						tailwind('absolute bottom-0 pt-4 pb-6 px-4 bg-gray-800 w-full flex-row justify-between')
					]}
					>
						<NavButton 
							screenName="Home"
							text="Home"
							icon={HomeIcon}
						/>
						<NavButton 
							screenName="CustomModel"
							text="Custom"
							icon={NeuronIcon}
						/>
						<NavButton 
							screenName="Info"
							text="Info"
							icon={InfoIcon}
						/>
						<NavButton 
							screenName="History"
							text="History"
							icon={HistoryIcon}
						/>
				</View>
      )}
    </View>
  )
}

export default BottomNavigation
