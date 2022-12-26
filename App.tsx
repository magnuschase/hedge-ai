import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import TailwindProvider from './src/components/tailwind/TailwindProvider'
import utilities from './tailwind.json'
import HomeScreen from './src/screens/HomeScreen'

const Stack = createStackNavigator()

export default function App() {
  return (
		<TailwindProvider utilities={utilities}>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Home" component={HomeScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</TailwindProvider>
  );
}
