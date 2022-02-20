import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Navigation } from '../navigation/navigation';
import ProfileImage from '../assets/profileImage.png';
import PostImage from '../assets/event.jpg';

let isMe = true;
let isPrivate = false;
let isFollow = true;
let nbPosts = 7;
let nbFollowers = 83;
let nbFollowing = 86;
let bio = 'Fume la vie avant quelle te fume - Baudelaire';
let postsData = [[0, PostImage], [1, PostImage], [2, PostImage], [3, PostImage], [4, PostImage], [5, PostImage], [6, PostImage]];

const top = () => {
	if (isMe) {
		return (
			<View style={styles.row}>
				<Text style={styles.nickname}>alexandreguichet</Text>
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
			<Text style={styles.nickname}>alexandreguichet</Text>
			<Icon name={'chevron-back-outline'} size={30} color={'rgba(0, 0, 0, 1)'} />
		</View>
	);
}

const viewButtons = () => {
	if (isMe) {
		return (
			<View style={{ marginTop: '4%' }}>
				<TouchableOpacity style={styles.buttonBorder} activeOpacity={.5}>
					<Text style={[styles.txt, styles.txtButton]}>Edit profile</Text>
				</TouchableOpacity>
			</View>
		);
	}
	if (!isFollow && isPrivate) {
		return (
			<View style={{ marginTop: '4%' }}>
				<TouchableOpacity style={styles.buttonBorder} activeOpacity={.5}>
					<Text style={[styles.txt, styles.txtButton, { backgroundColor: 'rgba(0, 140, 255, 1)' }]}>Follow</Text>
				</TouchableOpacity>
			</View>
		);
	}
	if (!isFollow) {
		return (
			<View style={[styles.row, { marginTop: '4%' }]}>
				<TouchableOpacity style={[styles.buttonBorder, { width: '49%' }]} activeOpacity={.5}>
					<Text style={[styles.txt, styles.txtButton, { backgroundColor: 'rgba(0, 140, 255, 1)', paddingVertical: '3%' }]}>Follow</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.buttonBorder, { width: '49%' }]} activeOpacity={.5}>
					<Text style={[styles.txt, styles.txtButton, { paddingVertical: '3%' }]}>Message</Text>
				</TouchableOpacity>
			</View>
		);
	}
	return (
		<View style={[styles.row, { marginTop: '4%' }]}>
			<TouchableOpacity style={[styles.buttonBorder, { width: '49%' }]} activeOpacity={.5} onPress={() => isFollow = false}>
				<Text style={[styles.txt, styles.txtButton, { paddingVertical: '3%' }]}>Following</Text>
			</TouchableOpacity>
			<TouchableOpacity style={[styles.buttonBorder, { width: '49%' }]} activeOpacity={.5}>
				<Text style={[styles.txt, styles.txtButton, { paddingVertical: '3%' }]}>Message</Text>
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

	return (<View style={{ marginTop: '4%' }}>{viewPosts}</View>);
}

export const ProfileScreen: React.VFC = () => {
	const navigation = useNavigation<any>();

	return (
		<View style={styles.background}>
			{top()}
			<View style={[styles.row, styles.data]}>
				<Image source={ProfileImage} style={styles.profilePicture} />
				<View style={[styles.row, { width: '60%' }]}>
					<View>
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
		paddingTop: '10%',
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
	},
	profilePicture: {
		height: '100%',
		width: '27%',
	},
	txt: {
		fontSize: 16,
		color: 'white',
		textAlign: 'center',
	},
	bio: {
		marginTop: '4%',
		textAlign: 'left',
	},
	buttonBorder: {
		borderWidth: 1,
		borderColor: 'rgba(85, 85, 85, 1)',
		borderRadius: 5,
	},
	txtButton: {
		paddingVertical: '1.5%',
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