import React, { useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Post } from '../component/Post';

import { feedService } from '../service/feed';

export const HomeScreen: React.VFC<any> = ({ navigation }) => {
	const img = { uri: "https://reactnative.dev/img/tiny_logo.png" };

	const feedData = [
		<Post creatorImg={img} creatorTxt="creator1" img={img} name="image1" description="lorem ipsum trop bien on est la et voila"/>,
		<Post creatorImg={img} creatorTxt="creator2" img={img} name="image2" description="lorem ipsum trop bien on est la et voila"/>,
		<Post creatorImg={img} creatorTxt="creator3" img={img} name="image3" description="lorem ipsum trop bien on est la et voila"/>,
		<Post creatorImg={img} creatorTxt="creator4" img={img} name="image4" description="lorem ipsum trop bien on est la et voila"/>
	];

	const renderItem = (data: any) => {
		return <Post creatorImg={data.item.props.creatorImg} creatorTxt={data.item.props.creatorTxt} img={data.item.props.imgUrl} name={data.item.props.name} description={data.item.props.description}/>
	}

	useEffect(() => {
		/*feedService.getToken()
		.then((res) => {
			if (res === null) {
				navigation.navigate('Login');
			}
		})*/
		getFeed(1);
	}, []);

	const getFeed = (number: number) => {
		feedService.getfeed(1, 1)
		.then((res) => {
			console.log(res)
		})
	}

	return <View style={styles.background}>
		<View style={styles.header}>
			<Text style={[styles.tWhite, styles.brandName]}>MyInstagram</Text>
			<View style={styles.icView}>
				<TouchableOpacity onPress={() => navigation.navigate('FriendRequestSection')}>
    				<Image style={styles.icImg} source={require('../assets/heart.png')} />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate('Dm')}>
    				<Image style={styles.icImg} source={require('../assets/letter.png')} />
				</TouchableOpacity>
			</View>
		</View>
		<FlatList data={feedData} renderItem={(item: any) => renderItem(item)}/>
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
    tWhite: {
        color: 'white'
    }
});