import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';


export const Comment: React.VFC<{creatorImg: any, creatorTxt: string, comment: string}> = ({creatorImg, creatorTxt, comment}) => {
	const navigation = useNavigation<any>();

    return <View>
		<TouchableOpacity style={styles.creatorView} onPress={() => console.log('press')}>
            <Image style={styles.creatorImg} source={require('../assets/profileImage.png')}/>
            <Text style={[styles.tWhite, styles.creatorTxt]}>{creatorTxt}</Text>
		</TouchableOpacity>
        <Text style={[styles.tWhite, styles.comment]}>{comment}</Text>
    </View>
}

const styles = StyleSheet.create({
    creatorView: {
        display: 'flex',
        flexDirection: 'row'
    },
    creatorImg: {
        height: hp(4),
        width: hp(4),
        borderRadius: hp(4),
        resizeMode: 'center',
        marginLeft: wp(2)
    },
    creatorTxt: {
        fontSize: hp(2),
        marginTop: hp(0.5),
        marginLeft: wp(1)
    },
    comment: {
        marginLeft: wp(2),
        marginRight: wp(2),
        fontSize: hp(1.5),
        color: 'rgb(160, 160, 160)',
        marginBottom: hp(1),
        textAlign: 'justify'
    },
    tWhite: {
        color: 'white'
    }
});