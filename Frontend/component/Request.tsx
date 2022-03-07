import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { requestService } from '../service/request';


export const Request: React.VFC<{ accountImg: any, accountName: string, accountID: string }> = ({ accountImg, accountName, accountID}) => {
	const navigation = useNavigation<any>();
    const [isVisible, setIsVisible] = React.useState(true);

    const acceptRequest = (id: string, bool: boolean) => {
        requestService.acceptrequest(id, bool)
            .then((res) => {
                if (res.status === 200)
                    setIsVisible(false);
            })
    }

    if (!isVisible)
        return <View></View>
    return <View style={styles.View} >
        <View style={styles.ViewImg}>
            <TouchableOpacity style={styles.Account} onPress={() => navigation.navigate('Profile')}>
                <Image style={styles.accountImg} source={{ uri: accountImg}}/>
                <Text style={[styles.tWhite, styles.accountName]}>{accountName}</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.ViewBtn} >
            <TouchableOpacity onPress={() => acceptRequest(accountID, true)}>
                <Image style={styles.btn} source={require('../assets/check.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => acceptRequest(accountID, false)}>
                <Image style={styles.btn} source={require('../assets/x.png')} />
            </TouchableOpacity>
        </View>
    </View>
}

const styles = StyleSheet.create({
    View: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: wp(1),
        marginRight: wp(1),
        width: '100%'
    },
    Account: {
        display: 'flex',
        flexDirection: 'row'
    },
    ViewImg: {
        width: '50%',
        display: 'flex',
        flexDirection: 'row'
    },
    ViewBtn: {
        width: '50%',
        justifyContent: 'flex-end',
        display: 'flex',
        flexDirection: 'row'
    },
    accountImg: {
        height: hp(4),
        width: hp(4),
        borderRadius: hp(4),
        resizeMode: 'center',
        marginLeft: wp(2)
    },
    accountName: {
        fontSize: hp(2),
        marginTop: hp(0.5),
        marginLeft: wp(1)
    },
    btn: {
		width: wp(6),
		height: hp(6),
        resizeMode: 'center',
        marginLeft: wp(2),
        marginRight: wp(2),
        marginTop: hp(-1)
	},
    tWhite: {
        color: 'white'
    }
});