import { useNavigation } from '@react-navigation/native';
<<<<<<< HEAD
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Navigation } from '../navigation/navigation';
import ProfileImage from '../assets/profileImage.png';
import PostImage from '../assets/event.jpg';

let isMe = false;
let isPrivate = true;
let isFollow = false;
let nickname = 'alexandreguichet'
let nbPosts = 13;
let nbFollowers = 83;
let nbFollowing = 86;
let bio = 'Fume la vie avant quelle te fume - Baudelaire';
let postsData = [[0, PostImage], [1, PostImage], [2, PostImage], [3, PostImage], [4, PostImage], [5, PostImage], [6, PostImage], [7, PostImage], [8, PostImage], [9, PostImage], [10, PostImage], [11, PostImage], [12, PostImage]];

const top = () => {
	if (isMe) {
		return (
			<View style={styles.row}>
				<Text style={styles.nickname}>{nickname}</Text>
				<TouchableOpacity activeOpacity={.5}>
					<Icon name={'add-circle-outline'} size={30} color={'#ffffff'} />
				</TouchableOpacity>
			</View>
		);
	}
	return (
		<View style={styles.row}>
			<TouchableOpacity activeOpacity={.5}>
				<Icon name={'chevron-back-outline'} size={30} color={'rgba(255, 255, 255, 1)'} />
			</TouchableOpacity>
			<Text style={styles.nickname}>{nickname}</Text>
			<Icon name={'chevron-back-outline'} size={30} color={'rgba(0, 0, 0, 1)'} />
		</View>
	);
}

const viewButtons = () => {
	if (isMe) {
		return (
			<View style={{ marginTop: '4%' }}>
				<TouchableOpacity style={styles.buttonBorder} activeOpacity={.5}>
=======
import { Navigation } from '../navigation/navigation';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';

import ProfileImage from '../assets/profileImage.png';
import PostImage from '../assets/event.jpg';
import { profileService } from "../service/profile/index";
import { authentificationService } from "../service/authentification/";

let isMe = true;
let isPrivate = false;
let isFollow = false;
let bio = 'Fume la vie avant quelle te fume - Baudelaire';
let postsData = [[0, PostImage], [1, PostImage], [2, PostImage], [3, PostImage], [4, PostImage], [5, PostImage], [6, PostImage], [7, PostImage], [8, PostImage], [9, PostImage], [10, PostImage], [11, PostImage], [12, PostImage]];

const viewButtons = () => {
	const navigation = useNavigation<any>();

	if (isMe) {
		return (
			<View style={styles.buttons}>
				<TouchableOpacity style={styles.buttonBorder} activeOpacity={.5} onPress={ () => navigation.navigate(Navigation.EditProfile) }>
>>>>>>> profile
					<Text style={[styles.txt, { paddingVertical: '1.5%' }]}>Edit profile</Text>
				</TouchableOpacity>
			</View>
		);
	}
	if (!isFollow && isPrivate) {
		return (
<<<<<<< HEAD
			<View style={{ marginTop: '4%' }}>
=======
			<View style={styles.buttons}>
>>>>>>> profile
				<TouchableOpacity style={[styles.buttonBorder, { backgroundColor: 'rgba(0, 140, 255, 1)' }]} activeOpacity={.5}>
					<Text style={[styles.txt, { paddingVertical: '1.5%' }]}>Follow</Text>
				</TouchableOpacity>
			</View>
		);
	}
	if (!isFollow) {
		return (
<<<<<<< HEAD
			<View style={[styles.row, { marginTop: '4%' }]}>
=======
			<View style={[styles.row, styles.buttons]}>
>>>>>>> profile
				<TouchableOpacity style={[styles.buttonBorder, { backgroundColor: 'rgba(0, 140, 255, 1)', width: '49%' }]} activeOpacity={.5}>
					<Text style={[styles.txt, { paddingVertical: '3%' }]}>Follow</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.buttonBorder, { width: '49%' }]} activeOpacity={.5}>
					<Text style={[styles.txt, { paddingVertical: '3%' }]}>Message</Text>
				</TouchableOpacity>
			</View>
		);
	}
	return (
<<<<<<< HEAD
		<View style={[styles.row, { marginTop: '4%' }]}>
=======
		<View style={[styles.row, styles.buttons]}>
>>>>>>> profile
			<TouchableOpacity style={[styles.buttonBorder, { width: '49%' }]} activeOpacity={.5} onPress={() => isFollow = false}>
				<Text style={[styles.txt, { paddingVertical: '3%' }]}>Following</Text>
			</TouchableOpacity>
			<TouchableOpacity style={[styles.buttonBorder, { width: '49%' }]} activeOpacity={.5}>
				<Text style={[styles.txt, { paddingVertical: '3%' }]}>Message</Text>
			</TouchableOpacity>
		</View>
	);
}

const posts = () => {
	let row = [];
	let viewPosts = [];

	if (postsData.length == 0) {
		return;
	}

	for (let i = 0; i < postsData.length; i++) {
		row.push(<TouchableOpacity style={styles.post} key={i % 3}><Image style={styles.postPicture} source={postsData[i][1]} /></TouchableOpacity>);

		if (i % 3 == 2) {
			viewPosts.push(<View style={[styles.row, { marginTop: '0.5%' }]} key={i / 3}>{row}</View>);
			row = [];
		}
	}

	if (postsData.length % 3 != 0) {
		viewPosts.push(<View style={[styles.row, { marginTop: '0.5%' }]} key={postsData.length / 3}>{row}</View>);
	}

	return (<ScrollView style={{ marginTop: '4%' }}>{viewPosts}</ScrollView>);
}

export const ProfileScreen: React.VFC = () => {
	const navigation = useNavigation<any>();
<<<<<<< HEAD

	return (
		<View style={styles.background}>
			{top()}
=======
	const [data, setData]: any[] = useState([]);
	const route = useRoute();
	let username = route.params.username;

	const top = (nickname: string) => {
		if (isMe) {
			return (
				<View style={[styles.row, { paddingHorizontal: '2%' }]}>
					<Text style={styles.nickname}>{nickname}</Text>
					<TouchableOpacity activeOpacity={.5}>
						<Icon name={'add-circle-outline'} size={30} color={'#ffffff'} />
					</TouchableOpacity>
				</View>
			);
		}
		return (
			<View style={[styles.row, { paddingHorizontal: '2%' }]}>
				<TouchableOpacity activeOpacity={.5}>
					<Icon name={'chevron-back-outline'} size={30} color={'rgba(255, 255, 255, 1)'} />
				</TouchableOpacity>
				<Text style={styles.nickname}>{nickname}</Text>
				<Icon name={'chevron-back-outline'} size={30} color={'rgba(0, 0, 0, 1)'} />
			</View>
		);
	}

	useEffect(() => {
		let tmpData: any[] = [];

		profileService.profile(username)
			.then((res) => {
				res.cata(
					(error) => {
						console.log("error : " + error);
					},
					(response) => {
						console.log(response);
						tmpData[0] = response.username;
						tmpData[1] = response.followedBy;
						tmpData[2] = response.following;
						tmpData[3] = response.posts;

						setData(tmpData);
					}
				)
			});
	}, []);

	if (data[0] == undefined) {
		return (<View></View>);
	}

	return (
		<View style={styles.background}>
			{top(data[0])}
>>>>>>> profile
			<View style={[styles.row, styles.data]}>
				<Image source={ProfileImage} style={styles.profilePicture} />
				<View style={[styles.row, { width: '60%' }]}>
					<View>
<<<<<<< HEAD
						<Text style={styles.txt}>{nbPosts}</Text>
						<Text style={styles.txt}>Posts</Text>
					</View>
					<View>
						<Text style={styles.txt}>{nbFollowers}</Text>
						<Text style={styles.txt}>Followers</Text>
					</View>
					<View>
						<Text style={styles.txt}>{nbFollowing}</Text>
						<Text style={styles.txt}>Following</Text>
=======
						<Text style={styles.txt}>{data[3].length}</Text>
						<Text style={styles.txt}>Posts</Text>
					</View>
					<View>
						<TouchableOpacity activeOpacity={.5} onPress={() => navigation.navigate(Navigation.Follow) }>
							<Text style={styles.txt}>{data[1].length}</Text>
							<Text style={styles.txt}>Followers</Text>
						</TouchableOpacity>
					</View>
					<View>
						<TouchableOpacity activeOpacity={.5} onPress={() => navigation.navigate(Navigation.Follow) }>
							<Text style={styles.txt}>{data[2].length}</Text>
							<Text style={styles.txt}>Following</Text>
						</TouchableOpacity>
>>>>>>> profile
					</View>
				</View>
			</View>
			<Text style={[styles.txt, styles.bio]}>{bio}</Text>
			{viewButtons()}
			{posts()}
		</View>
	);
}

const styles = StyleSheet.create({
	background: {
		backgroundColor: 'rgba(0, 0, 0, 1)',
		width: '100%',
		height: '100%',
<<<<<<< HEAD
		paddingTop: '10%',
=======
		paddingTop: '12%',
>>>>>>> profile
	},
	nickname: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 23,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	data: {
		marginTop: '4%',
		height: '15%',
		alignItems: 'center',
<<<<<<< HEAD
	},
	profilePicture: {
		height: '100%',
		width: '27%',
=======
		paddingHorizontal: '2%',
	},
	profilePicture: {
		height: '100%',
		width: '30%',
>>>>>>> profile
	},
	txt: {
		fontSize: 16,
		color: 'white',
		textAlign: 'center',
	},
	bio: {
		marginTop: '4%',
		textAlign: 'left',
<<<<<<< HEAD
	},
=======
		paddingHorizontal: '2%',
	},
	buttons: {
		marginTop: '4%',
		paddingHorizontal: '2%',
    },
>>>>>>> profile
	buttonBorder: {
		borderWidth: 1,
		borderColor: 'rgba(85, 85, 85, 1)',
		borderRadius: 5,
	},
	post: {
		width: '33%',
		aspectRatio: 1,
	},
	postPicture: {
		width: '100%',
		flex: 1,
	},
});