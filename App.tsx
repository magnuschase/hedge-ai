import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import Toast from 'react-native-toast-message'
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
import { useEvaluationObserver } from './src/hooks/useEvaluationObserver'
import GetStartedScreen from './src/screens/GetStartedScreen'
import CustomModelScreen from './src/screens/CustomModelScreen'
import HistoryScreen from './src/screens/HistoryScreen'
import BottomNavigation from './src/components/BottomNavigation'
import InfoScreen from './src/screens/InfoScreen'
import CameraScreen from './src/screens/CameraScreen'
import UploadScreen from './src/screens/UploadScreen'

const Stack = createStackNavigator()

SplashScreen.preventAutoHideAsync()

const App: React.FC = () => {
	const { firebaseUser } = useSelector((state: RootState) => state.user)
	const { firebaseLoaded } = useUserObserver()
	useEvaluationObserver()

	const NavigationTheme = {
		...DefaultTheme,
		dark: true,
		colors: {
			...DefaultTheme.colors,
			primary: getColor('sky', 500),
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
								title: 'Edit custom model',
								animationEnabled: false
							}}
						/>
						<Stack.Screen
							name='History'
							component={HistoryScreen}
							options={{
								title: 'Evaluation history',
								animationEnabled: false
							}}
						/>
						<Stack.Screen
							name='Info'
							component={InfoScreen}
							options={{
								title: 'Informations',
								animationEnabled: false
							}}
						/>
						<Stack.Screen
							name='CameraScreen'
							component={CameraScreen}
							options={{
								title: 'Camera',
								animationEnabled: false
							}}
						/>
						<Stack.Screen
							name='UploadScreen'
							component={UploadScreen}
							options={{
								title: 'Upload file',
								animationEnabled: false
							}}
						/>
					</Stack.Navigator>
					<Toast 
						topOffset={50}
					/>
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