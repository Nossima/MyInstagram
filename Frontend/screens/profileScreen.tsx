import { useNavigation } from '@react-navigation/native';
import { Navigation } from '../navigation/navigation';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';

import ProfileImage from '../assets/profileImage.png';
import PostImage from '../assets/event.jpg';
import { profileService } from "../service/profile/index";

let isFollow = false;
let postsData = [[0, PostImage], [1, PostImage], [2, PostImage], [3, PostImage], [4, PostImage], [5, PostImage], [6, PostImage], [7, PostImage], [8, PostImage], [9, PostImage], [10, PostImage], [11, PostImage], [12, PostImage]];

export const ProfileScreen: React.VFC = () => {
	const navigation = useNavigation<any>();
	const [data, setData]: any[] = useState([]);
	const route = useRoute();

	const viewButtons = () => {
		const navigation = useNavigation<any>();

		if (data[0] == global.username) {
			return (
				<View style={styles.buttons}>
					<TouchableOpacity style={styles.buttonBorder} activeOpacity={.5} onPress={() => navigation.navigate(Navigation.EditProfile, {username: data[0], bio: data[4], isPrivate: data[5]})}>
						<Text style={[styles.txt, { paddingVertical: '1.5%' }]}>Edit profile</Text>
					</TouchableOpacity>
				</View>
			);
		}
		if (!isFollow && data[5]) {
			return (
				<View style={styles.buttons}>
					<TouchableOpacity style={[styles.buttonBorder, { backgroundColor: 'rgba(0, 140, 255, 1)' }]} activeOpacity={.5}>
						<Text style={[styles.txt, { paddingVertical: '1.5%' }]}>Follow</Text>
					</TouchableOpacity>
				</View>
			);
		}
		if (!isFollow) {
			return (
				<View style={[styles.row, styles.buttons]}>
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
			<View style={[styles.row, styles.buttons]}>
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

	const top = (nickname: string) => {
		if (data[0] == global.username) {
			return (
				<View style={[styles.row, { paddingHorizontal: '2%' }]}>
					<Text style={styles.nickname}>{nickname}</Text>
					<TouchableOpacity activeOpacity={.5} onPress={() => navigation.navigate(Navigation.Home)}>
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
		let tmpUsername = '';

		if (route.params.username == undefined) {
			tmpUsername = 'alexandreguichet';
		} else {
			tmpUsername = route.params.username;
		}

		profileService.profile(tmpUsername)
			.then((res) => {
				res.cata(
					(error) => {
						console.log("error : " + error);
					},
					(response) => {
						console.log(response);
						let newTmpData = {
							username: response.username,
						};
						tmpData[0] = response.username;
						tmpData[1] = response.followedBy;
						tmpData[2] = response.following;
						tmpData[3] = response.posts;
						tmpData[4] = response.bio;
						tmpData[5] = response.private;
						setData(tmpData);
					}
				)
			});
	}, []);

	if (data[0] == undefined) {
		return (<View></View>);
	}
	
						console.log(data[0]);
	return (
		<View style={styles.background}>
			{top(data[0])}
			<View style={[styles.row, styles.data]}>
				<Image source={ProfileImage} style={styles.profilePicture} />
				<View style={[styles.row, { width: '60%' }]}>
					<View>
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
					</View>
				</View>
			</View>
			<Text style={[styles.txt, styles.bio]}>{data[4]}</Text>
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
		paddingTop: '12%',
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
		paddingHorizontal: '2%',
	},
	profilePicture: {
		height: '100%',
		width: '30%',
	},
	txt: {
		fontSize: 16,
		color: 'white',
		textAlign: 'center',
	},
	bio: {
		marginTop: '4%',
		textAlign: 'left',
		paddingHorizontal: '2%',
	},
	buttons: {
		marginTop: '4%',
		paddingHorizontal: '2%',
    },
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