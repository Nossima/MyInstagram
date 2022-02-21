import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image } from 'react-native';
import { Navigation } from '../navigation/navigation';

export const HomeScreen: React.VFC = () => {
	const Navigation = useNavigation();

	return (
		<View>
			<Text>Test</Text>
		</View>
	);
}