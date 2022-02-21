import { StyleSheet } from 'react-native';
import { AppStack } from './navigation/appNavigator';
import React from 'react';
import { Navigation } from './navigation/navigation';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
    return (
        <NavigationContainer style={ styles.container }>
            <AppStack />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
