import React from 'react';
import { AppStack } from './navigation/appNavigator';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';

export let API = axios.create({
    baseURL: "http://192.168.1.18:3000"
});

global.username = '';

export default function App() {
    return <NavigationContainer>
        <AppStack/>
    </NavigationContainer>
}
