import React, { useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Post } from '../component/Post';

import { feedService } from '../service/feed';

export const HomeScreen: React.VFC<any> = ({ navigation }) => {
	let token: any;

	let Data: any = [];

	const renderItem = (data: any) => {
		return <Post creatorImg={data.item.props.creatorImg} creatorTxt={data.item.props.creatorTxt} img={data.item.props.imgUrl} caption={data.item.props.caption} isLike={data.item.props.isLike} comments={data.item.props.comments}/>
	}

	useEffect(() => {
		feedService.getToken()
		.then((res) => {
			if (res === null) {
				navigation.navigate('Login');
			}
			token = res;
			getFeed(1);
		})
	}, []);

	const getFeed = (number: number) => {
		feedService.getfeed(token, 1, 1)
		.then((arrayOrError) => {
			arrayOrError.cata(
				(err) => {
					console.log('such a quiet place');
				},
				(res) => {
					console.log(res);
					for (var i = 0; i < res.length; i++) {
						Data.push(<Post creatorImg={res[i].author} creatorTxt={res[i].author} img={res[i].image.data} caption={res[i].title} isLike={isLike(res[i].isLike)} comments={res[i].comments}/>);
					}
				}
			)
		})
	}

	const isLike = (arr: string[]) => {
		return true;
	}

	return <View style={styles.background}>
		<View style={styles.header}>
			<Text style={[styles.tWhite, styles.brandName]}>MyInstagram</Text>
			<View style={styles.icView}>
				<TouchableOpacity onPress={() => navigation.navigate('FriendRequestSection')}>
    				<Image style={styles.icImg} source={require('../assets/heart.png')} />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate('DmList')}>
    				<Image style={styles.icImg} source={require('../assets/letter.png')} />
				</TouchableOpacity>
			</View>
		</View>
		<FlatList data={Data} renderItem={(item: any) => renderItem(item)}/>
		<View style={styles.navBarBottom}>
			<TouchableOpacity onPress={() => navigation.navigate('Home')}>
    			<Image style={styles.icImg} source={require('../assets/home_filled.png')} />
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate('Home')}>
    			<Image style={styles.icImg} source={require('../assets/zoom.png')} />
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate('Profile')}>
    			<Image style={styles.icImg} source={require('../assets/profileImage.png')} />
			</TouchableOpacity>
		</View>
	</View>
}

const styles = StyleSheet.create({
    background: {
		backgroundColor: 'rgba(0, 0, 0, 1)',
        width: '100%',
        height: '100%',
        paddingTop: '10%'
    },
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	brandName: {
		marginTop: hp(2),
		marginLeft: wp(2),
		fontSize: hp(3)
	},
	icView: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: wp(18),
		marginLeft: wp(2),
		marginRight: wp(2)
	},
	icImg: {
		width: wp(8),
		height: hp(8),
		resizeMode: 'center'
	},
	navBarBottom: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
    tWhite: {
        color: 'white'
    }
});
