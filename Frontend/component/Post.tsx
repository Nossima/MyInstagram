import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { feedService } from "../service/feed";


export const Post: React.VFC<{creatorImg: any, creatorTxt: string, img: any, caption: string, isLike: boolean, comments: Array<string>}> = ({creatorImg, creatorTxt, img, caption, isLike, comments}) => {
	const navigation = useNavigation<any>();

    return <View>
		<TouchableOpacity style={styles.creatorView} onPress={() => console.log('press')}>
            <Image style={styles.creatorImg} source={require('../assets/profileImage.png')}/>
            <Text style={[styles.tWhite, styles.creatorTxt]}>{creatorTxt}</Text>
		</TouchableOpacity>
        <Image style={styles.img} source={require('../assets/event.jpg')}/>
		<View style={styles.icView}>
			<TouchableOpacity onPress={() => {
                feedService.like(isLike);
                isLike = !isLike;
            }}>
				<Image style={styles.icImg} source={isLike ? require('../assets/heart_filled.png') : require('../assets/heart.png')} />
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate('CommentSection', { comments })}>
    			<Image style={styles.icImg} source={require('../assets/comment.png')} />
			</TouchableOpacity>
		</View>
        <Text style={[styles.tWhite, styles.title]}>{caption}</Text>
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