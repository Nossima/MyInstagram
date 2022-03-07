import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, StyleSheet, Image } from "react-native";

export const Message: React.VFC<{txt: string, isOwner: boolean}> = ({txt, isOwner}) => {
    if (isOwner) {
        return <View style={styles.ownerMessage}>
            <Text style={[styles.tWhite, styles.om]}>{txt}</Text>
        </View>
    }
    return <View style={[styles.message, {flexDirection: 'row'}]}>
        <Image style={styles.img} source={require('../assets/profileImage.png')}/>
        <Text style={[styles.tWhite, styles.m]}>{txt}</Text>
    </View>
}

const styles = StyleSheet.create({
    ownerMessage: {
        alignSelf: 'flex-end'
    },
    message: {
        alignSelf: 'flex-start'
    },
    om: {
        maxWidth: wp(56),
        marginTop: hp(0.25),
        marginBottom: hp(0.25),
        marginRight: wp(2),
        textAlign: 'justify',
        borderRadius: 10,
        backgroundColor: 'rgb(40, 40, 40)',
        padding: 10
    },
    m: {
        maxWidth: wp(56),
        marginTop: hp(0.25),
        marginBottom: hp(0.25),
        marginLeft: wp(2),
        textAlign: 'justify',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'rgb(40, 40, 40)',
        padding: 10
    },
    img: {
        marginTop: wp(2),
        height: hp(4),
        width: hp(4),
        resizeMode: 'center'
    },
    tWhite: {
        color: 'white'
    }
});