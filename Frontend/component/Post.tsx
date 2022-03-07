import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';


export const Post: React.VFC<{creatorImg: any, creatorTxt: string, img: any, name: string, description: string}> = ({creatorImg, creatorTxt, img, name, description}) => {
	const navigation = useNavigation<any>();

    return <View>
<<<<<<< HEAD
		<TouchableOpacity style={styles.creatorView} onPress={() => console.log('press')}>
=======
        <TouchableOpacity style={styles.creatorView} onPress={() => navigation.navigate('Profile', { username: creatorTxt })}>
>>>>>>> profile
            <Image style={styles.creatorImg} source={require('../assets/profileImage.png')}/>
            <Text style={[styles.tWhite, styles.creatorTxt]}>{creatorTxt}</Text>
		</TouchableOpacity>
        <Image style={styles.img} source={require('../assets/event.jpg')}/>
		<View style={styles.icView}>
			<TouchableOpacity onPress={() => console.log('press')}>
				<Image style={styles.icImg} source={require('../assets/heart.png')} />
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate('CommentSection')}>
    			<Image style={styles.icImg} source={require('../assets/comment.png')} />
			</TouchableOpacity>
			<TouchableOpacity onPress={() => console.log('press')}>
    			<Image style={styles.icImg} source={require('../assets/letter.png')} />
			</TouchableOpacity>
		</View>
        <Text style={[styles.tWhite, styles.title]}>{name}</Text>
        <Text style={[styles.tWhite, styles.description]}>{description}</Text>
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
    img: {
        height: hp(35),
        width: wp(100),
        resizeMode: "center"
    },
    title: {
        marginLeft: wp(2),
        fontSize: hp(2)
    },
    description: {
        marginLeft: wp(2),
        marginRight: wp(2),
        fontSize: hp(1.5),
        color: 'rgb(160, 160, 160)',
        marginBottom: hp(1)
    },
	icView: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: wp(28),
		marginLeft: wp(2),
		marginRight: wp(2)
	},
	icImg: {
		width: wp(8),
		height: hp(8),
		resizeMode: 'center'
	},
    tWhite: {
        color: 'white'
    }
});