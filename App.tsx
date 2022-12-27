import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import { 
	useFonts,
	Lato_100Thin,
	Lato_300Light,
	Lato_400Regular,
	Lato_700Bold,
	Lato_900Black
} from '@expo-google-fonts/lato'
import * as SplashScreen from 'expo-splash-screen'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import TailwindProvider from './src/components/tailwind/TailwindProvider'
import getColor from './src/helpers/getColor'
import utilities from './tailwind.json'
import HomeScreen from './src/screens/HomeScreen'
import store, { RootState } from './src/store'
import { useUserObserver } from './src/hooks/useUserObserver'
import GetStartedScreen from './src/screens/GetStartedScreen'
import CustomModelScreen from './src/screens/CustomModelScreen'
import HistoryScreen from './src/screens/HistoryScreen'
import BottomNavigation from './src/components/BottomNavigation'

const Stack = createStackNavigator()

SplashScreen.preventAutoHideAsync()

const App: React.FC = () => {
	const { firebaseUser } = useSelector((state: RootState) => state.user)
	const { firebaseLoaded } = useUserObserver()

	const NavigationTheme = {
		...DefaultTheme,
		dark: true,
		colors: {
			...DefaultTheme.colors,
			primary: getColor('green', 900),
			card: getColor('gray', 800),
			text: getColor('slate', 50),
			border: getColor('slate', 800),
			background: getColor('gray', 900)
		}
	}

	const [ fontsLoaded ] = useFonts({
		Lato_100Thin,
		Lato_300Light,
		Lato_400Regular,
		Lato_700Bold,
		Lato_900Black
	})

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded && firebaseLoaded) {
			// This tells the splash screen to hide immediately! If we call this after
			// `setAppIsReady`, then we may see a blank screen while the app is
			// loading its initial state and rendering its first pixels. So instead,
			// we hide the splash screen once we know the root view has already
			// performed layout.
			await SplashScreen.hideAsync()
		}
	}, [fontsLoaded, firebaseLoaded])

	if (!fontsLoaded || !firebaseLoaded) {
		return null
	}

  return (
		<TailwindProvider utilities={utilities}>
			<BottomSheetModalProvider>
				<NavigationContainer
					onReady={onLayoutRootView}
					theme={NavigationTheme}
				>
					<Stack.Navigator>
						<Stack.Screen
							name="Home"
							component={firebaseUser ? HomeScreen : GetStartedScreen}
							options={
								firebaseUser ? {
									title: 'Choose model',
									animationEnabled: false,
								} : {
									header: () => null
								}
							}
						/>
						<Stack.Screen
							name='CustomModel'
							component={CustomModelScreen}
							options={{
								title: 'Edit custom model'
							}}
						/>
						<Stack.Screen
							name='History'
							component={HistoryScreen}
							options={{
								title: 'Evaluation history'
							}}
						/>
						<Stack.Screen
							name='Info'
							component={HomeScreen}
							options={{
								title: 'Informations'
							}}
						/>
					</Stack.Navigator>
					<BottomNavigation/>
				</NavigationContainer>
			</BottomSheetModalProvider>
		</TailwindProvider>
  )
}

const AppWrapper = () => {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	)
}

export default AppWrapper