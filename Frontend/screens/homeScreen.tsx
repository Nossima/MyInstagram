import React, { useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Post } from '../component/Post';

import { feedService } from '../service/feed';

export const HomeScreen: React.VFC<any> = ({ navigation }) => {
	let token: any;
	const img = { uri: "https://reactnative.dev/img/tiny_logo.png" };

	const [data, changeData]: any[] = React.useState([]);

	const feedData = [
		<Post creatorImg={img} creatorTxt="creator1" img={img} name="image1" description="lorem ipsum trop bien on est la et voila"/>,
		<Post creatorImg={img} creatorTxt="creator2" img={img} name="image2" description="lorem ipsum trop bien on est la et voila"/>,
		<Post creatorImg={img} creatorTxt="creator3" img={img} name="image3" description="lorem ipsum trop bien on est la et voila"/>,
		<Post creatorImg={img} creatorTxt="creator4" img={img} name="image4" description="lorem ipsum trop bien on est la et voila"/>
	];

	const renderItem = (data: any) => {
		return <Post creatorImg={{}} creatorTxt={data.item.author} img={{}} name={data.item.author} description={data.item.title}/>
	}

	useEffect(() => {
		feedService.getToken()
		.then((res) => {
			if (!res || res === null || res === undefined) {
				navigation.navigate('Login');
			}
			token = res;
			getFeed(1);
		})
	}, []);

	const getFeed = (number: number) => {
		feedService.getfeed(token, 10, 0)
		.then((resOrError) =>
			resOrError.cata(
				(err) => {
				},
				(res) => {
					var newData: any[] = [];
					for (var i = 0; i < res.length; i++) {
						newData.push(res[i]);
					}
					changeData(newData);
				}
			)
		)
	}

	return <View style={styles.background}>
		<View style={styles.header}>
			<Text style={[styles.tWhite, styles.brandName]}>MyInstagram</Text>
			<View style={styles.icView}>
				<TouchableOpacity onPress={() => navigation.navigate('CreatePost')}>
    				<Image style={styles.icImg} source={require('../assets/newConv.png')} />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate('FriendRequestSection', {})}>
    				<Image style={styles.icImg} source={require('../assets/heart.png')} />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate('DmList')}>
    				<Image style={styles.icImg} source={require('../assets/letter.png')} />
				</TouchableOpacity>
			</View>
		</View>
		<FlatList data={data} renderItem={(item: any) => renderItem(item)}/>
		<View style={styles.navBarBottom}>
			<TouchableOpacity onPress={() => navigation.navigate('Home')}>
    			<Image style={styles.icImg} source={require('../assets/home_filled.png')} />
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate('Search')}>
    			<Image style={styles.icImg} source={require('../assets/zoom.png')} />
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate('Profile', { username: global.username })}>
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
		width: wp(28),
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
