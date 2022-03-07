import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';


export const User: React.VFC<{usrImg: any, usrName: string}> = ({usrImg, usrName}) => {
	const navigation = useNavigation<any>();

    return <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Profile', { username: usrName })}>
        <Image style={styles.userImg} source={require('../assets/profileImage.png')}/>
        <View style={styles.txtContainer}>
            <Text style={[styles.tWhite]}>{usrName}</Text>
        </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: hp(1),
        paddingBottom: hp(1),
        paddingLeft: wp(2),
        paddingRight: wp(2)
    },
    userImg: {
        height: hp(7),
        width: hp(7),
        resizeMode: 'contain'
    },
    txtContainer: {
        paddingTop: hp(2),
        paddingBottom: hp(1),
        paddingLeft: wp(4),
        paddingRight: wp(4)
    },
    lastMessage: {
        color: 'rgb(160, 160, 160)'
    },
    tWhite: {
        color: 'white'
    }
});