import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Navigation } from './navigation';
import { StartScreen } from '../screens/startScreen';
import { HomeScreen } from '../screens/homeScreen';
import { ProfileScreen } from '../screens/profileScreen';

const Stack = createNativeStackNavigator();

export const AppStack = () => {
    return (
        <Stack.Navigator initialRouteName={Navigation.Profile} screenOptions={{ headerShown: false}}>
            <Stack.Screen name={Navigation.Start} component={StartScreen} />
            <Stack.Screen name={Navigation.Home} component={HomeScreen} />
            <Stack.Screen name={Navigation.Profile} component={ProfileScreen} />
        </Stack.Navigator>
    );
}