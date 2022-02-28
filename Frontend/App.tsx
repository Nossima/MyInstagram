import React from 'react';
import { AppStack } from './navigation/appNavigator';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';

<<<<<<< HEAD
export let API = axios.create({
    baseURL: "http://192.168.1.18:3000"
});

=======
>>>>>>> 5fb8671d14ad796f07910ea0d1eb7c67f15e66cb
export default function App() {
    return <NavigationContainer>
        <AppStack/>
    </NavigationContainer>
}