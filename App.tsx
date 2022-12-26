import React from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import TailwindProvider from './src/components/tailwind/TailwindProvider'
import getColor from './src/helpers/getColor'
import utilities from './tailwind.json'
import HomeScreen from './src/screens/HomeScreen'
import store from './src/store'
import { useUserObserver } from './src/hooks/useUserObserver'

const Stack = createStackNavigator()

const App: React.FC = () => {
	useUserObserver()

	const NavigationTheme = {
		...DefaultTheme,
		colors: {
			...DefaultTheme.colors,
			primary: getColor('green', 500)
		}
	}

  return (
		<TailwindProvider utilities={utilities}>
				<NavigationContainer theme={NavigationTheme}>
					<Stack.Navigator>
						<Stack.Screen name="Home" component={HomeScreen} />
					</Stack.Navigator>
				</NavigationContainer>
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