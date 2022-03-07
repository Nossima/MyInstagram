import React from 'react';
import { AppStack } from './navigation/appNavigator';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';

export let API = axios.create({
    baseURL: "http://192.168.1.136:3000"
});

export default function App() {
    return <NavigationContainer>
        <AppStack/>
    </NavigationContainer>
}
