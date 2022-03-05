import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Navigation } from './navigation';
import { EditProfileScreen } from '../screens/editProfileScreen';
import { HomeScreen } from '../screens/homeScreen';
import { ProfileScreen } from '../screens/profileScreen';
import { Login } from '../screens/authentification/login';
import { Register } from '../screens/authentification/register';
import { CreatePost } from '../screens/Post/CreatePost';
import React from 'react'

const Stack = createNativeStackNavigator();

export const AppStack = () => {
    return (
        <Stack.Navigator initialRouteName={Navigation.CreatePost} screenOptions={{ headerShown: false}}>
            <Stack.Screen name={Navigation.EditProfile} component={EditProfileScreen} />
            <Stack.Screen name={Navigation.Home} component={HomeScreen} />
            <Stack.Screen name={Navigation.Profile} component={ProfileScreen} />
            <Stack.Screen name={Navigation.Login} component={Login}/>
            <Stack.Screen name={Navigation.Register} component={Register}/>
            <Stack.Screen name={Navigation.CreatePost} component={CreatePost}/>
        </Stack.Navigator>
    );
}