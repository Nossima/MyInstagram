import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, StyleSheet } from 'react-native';

export const FriendRequestSection: React.VFC<any> = ({ navigation }) => {

	return <View style={styles.background}>
        <Text style={styles.tWhite}>FriendRequestSection</Text>
	</View>
}

const styles = StyleSheet.create({
    background: {
		backgroundColor: 'rgba(0, 0, 0, 1)',
        width: '100%',
        height: '100%',
        paddingTop: '10%'
    },
    tWhite: {
        color: 'white'
    }
});