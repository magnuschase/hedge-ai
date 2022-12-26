import React from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import TailwindProvider from './src/components/tailwind/TailwindProvider'
import getColor from './src/helpers/getColor'
import utilities from './tailwind.json'
import HomeScreen from './src/screens/HomeScreen'
import store from './src/store'

const Stack = createStackNavigator()

export default function App() {
	const NavigationTheme = {
		...DefaultTheme,
		colors: {
			...DefaultTheme.colors,
			primary: getColor('green', 500)
		}
	}

  return (
		<TailwindProvider utilities={utilities}>
			<Provider store={store}>
				<NavigationContainer theme={NavigationTheme}>
					<Stack.Navigator>
						<Stack.Screen name="Home" component={HomeScreen} />
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		</TailwindProvider>
  )
}