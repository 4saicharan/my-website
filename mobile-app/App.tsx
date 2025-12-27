import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './screens/HomeScreen';
import WeatherScreen from './screens/WeatherScreen';
import NewsScreen from './screens/NewsScreen';
import WorldClockScreen from './screens/WorldClockScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0f172a',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'TorqueTech' }}
        />
        <Stack.Screen 
          name="Weather" 
          component={WeatherScreen}
          options={{ title: 'Weather Forecast' }}
        />
        <Stack.Screen 
          name="News" 
          component={NewsScreen}
          options={{ title: 'News' }}
        />
        <Stack.Screen 
          name="WorldClock" 
          component={WorldClockScreen}
          options={{ title: 'World Clock' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

