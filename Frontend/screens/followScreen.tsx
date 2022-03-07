import { useNavigation } from '@react-navigation/native';
import { Navigation } from '../navigation/navigation';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import ProfileImage from '../assets/profileImage.png';

export const FollowScreen: React.VFC = () => {
	const navigation = useNavigation<any>();
	let username = 'alexandreguichet'
	const [isFollowers, setIsFollowers] = useState(true);
	const [followers, setFollowers] = useState([[0, ProfileImage, 'luke0'], [1, ProfileImage, 'luke1'], [2, ProfileImage, 'luke2'], [3, ProfileImage, 'luke3'], [4, ProfileImage, 'luke4']]);
	const [following, setFollowing] = useState([[0, ProfileImage, 'luke'], [1, ProfileImage, 'luke'], [2, ProfileImage, 'luke'], [3, ProfileImage, 'luke']]);
	const [theList, setTheList] = useState(followers);
	const [listUser, setListUser] = useState([<View></View>]);

	const buttonList = (i: number) => {
		if (isFollowers) {
			return (
				<TouchableOpacity style={styles.removeUser} activeOpacity={.5}>
					<Text style={styles.txt}>Unfollow</Text>
				</TouchableOpacity >
			);
		}
		return (
			<TouchableOpacity style={styles.removeUser} activeOpacity={.5} onPress={() => removeUser(i)}>
				<Text style={styles.txt}>Remove</Text>
			</TouchableOpacity >
		);
		return (
			<TouchableOpacity style={styles.removeUser} activeOpacity={.5} onPress={() => removeUser(i)}>
				<Text style={styles.txt}>Following</Text>
			</TouchableOpacity >
		);
		return (
			<TouchableOpacity style={[styles.removeUser, { backgroundColor: 'rgba(0, 140, 255, 1)' }]} activeOpacity={.5} onPress={() => removeUser(i)}>
				<Text style={styles.txt}>Follow</Text>
			</TouchableOpacity >
		);
	}

	const removeUser = (i: number) => {
		let newArray;

		if (!isFollowers) {
			newArray = followers;
			newArray.splice(i, 1);
			setFollowers(newArray);
		} else {
			newArray = following;
			newArray.splice(i, 1);
			setFollowing(newArray);
		}

		list(newArray);

		return;
	}

	const list = (theList: any[]) => {
		let tmpList = [];

		if (theList.length == 0) {
			setListUser([<View></View>]);
			return;
		}

		for (let i = 0; i < theList.length; i++) {
			tmpList.push(
				<View style={styles.user} key={i}>
					<TouchableOpacity style={styles.userTouch} activeOpacity={.5} onPress={() => navigation.navigate(Navigation.Profile)}>
						<Image source={theList[i][1]} style={styles.profilePicture} />
						<Text style={styles.txt}>{theList[i][2]}</Text>
						{buttonList(i)}
					</TouchableOpacity>
				</View>
			);
		}

		setListUser(tmpList);
	}

	const changeCategory = () => {
		setIsFollowers(!isFollowers);

		if (isFollowers) {
			list(following);
		} else {
			list(followers);
		}

	}

	if (isFollowers) {
		list(followers);
	} else {
		list(following);
    }

	return (
		<View style={styles.background}>
			<View style={[styles.row, styles.top]}>
				<TouchableOpacity activeOpacity={.5} onPress={() => navigation.navigate(Navigation.Profile)}>
					<Icon name={'chevron-back-outline'} size={30} color={'rgba(255, 255, 255, 1)'} />
				</TouchableOpacity>
				<Text style={styles.username}>{username}</Text>
				<Icon name={'chevron-back-outline'} size={30} color={'rgba(0, 0, 0, 1)'} />
			</View>
			<View style={[styles.row, styles.categories]}>
				<View style={[styles.box, isFollowers ? { borderBottomWidth: 1 } : {}]}>
					<TouchableOpacity activeOpacity={.5} onPress={() => changeCategory()}>
						<Text style={styles.txt}>{followers.length} Followers</Text>
					</TouchableOpacity>
				</View>
				<View style={[styles.box, !isFollowers ? { borderBottomWidth: 1 } : {}]}>
					<TouchableOpacity activeOpacity={.5} onPress={() => changeCategory()}>
						<Text style={styles.txt}>{following.length} Following</Text>
					</TouchableOpacity>
				</View>
			</View>
			{listUser}
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
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	top: {
		marginTop: '4%',
		paddingHorizontal: '2%',
		alignItems: 'center',
    },
	username: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 16,
	},
	categories: {
		height: '7%',
    },
	box: {
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: 'white',
		width: '50%',
	},
	txt: {
		color: 'white',
		fontSize: 16,
	},
	user: {
		height: '8%',
		marginTop: '2%',
	},
	userTouch: {
		height: '100%',
		paddingHorizontal: '2%',
		alignItems: 'center',
		flexDirection: 'row',
	},
	profilePicture: {
		height: '100%',
		width: '17%',
		marginRight: '3%',
	},
	removeUser: {
		borderColor: 'grey',
		borderWidth: 1,
		borderRadius: 3,
		padding: 5,
		marginLeft: '50%',
	},
});