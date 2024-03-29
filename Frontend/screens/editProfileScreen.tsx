import { useNavigation } from '@react-navigation/native';
import { Navigation } from '../navigation/navigation';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { CheckBox } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { useRoute } from '@react-navigation/native';

import ProfileImage from '../assets/profileImage.png';
import { profileService } from "../service/profile/index";

export const EditProfileScreen: React.VFC = () => {
	const navigation = useNavigation<any>();
	const [profileImage, setProfileImage] = useState(ProfileImage);
	const route = useRoute();
	let username = route.params.username;
	let bio = route.params.bio;
	const [isPrivate, setIsPrivate] = useState(route.params.isPrivate);

	const saveEdit = () => {
		profileService.editProfile(username, bio, isPrivate);

		navigation.navigate(Navigation.Home, { username: username });
	}

	const pickImage = async () => {
		let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (permissionResult.granted === false) {
			alert("Permission to access camera roll is required!");
			return;
		}

		let result = await ImagePicker.launchImageLibraryAsync(
			{
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				quality: 1,
			}
		);

		if (!result.cancelled) {
			setProfileImage(result.uri);
		}
	};

	const renderProfileImage = () => {
		if (profileImage == ProfileImage) {
			return (<Image source={profileImage} style={styles.profilePicture} />);
		}
		return (<Image source={{ uri: profileImage }} style={styles.profilePicture} />);
	}

	return (
		<View style={styles.background}>
			<View style={[styles.row, { paddingHorizontal: '2%' }]}>
				<TouchableOpacity activeOpacity={.5} onPress={() => navigation.navigate(Navigation.Profile)}>
					<Text style={{color: 'white', fontSize: 19}}>Cancel</Text>
				</TouchableOpacity>
				<Text style={{ color: 'white', fontSize: 19, fontWeight: 'bold' }}>Edit profile</Text>
				<TouchableOpacity activeOpacity={.5} onPress={() => saveEdit()}>
					<Text style={{ color: 'rgba(0, 140, 255, 1)', fontSize: 19, fontWeight: 'bold' }}>Done</Text>
				</TouchableOpacity>
			</View>
			{renderProfileImage()}
			<Text style={styles.txtChangePicture} onPress={() => pickImage()}>Change profile photo</Text>
			<View style={styles.editUsername}>
				<Text style={[styles.txtEdit, { width: '32%' }]}>Username</Text>
				<TextInput
					style={[styles.txtEdit, styles.input]}
					onChangeText={(val) => username = val}
					placeholder={'Username'}
					placeholderTextColor={'#5c5c5c'}
					underlineColorAndroid='transparent'
					defaultValue={username}
				/>
			</View>
			<View style={styles.editBio}>
				<Text style={[styles.txtEdit, { width: '32%' }]}>Bio</Text>
				<TextInput
					style={[styles.txtEdit, styles.input]}
					onChangeText={(val) => bio = val}
					placeholder={'Bio'}
					placeholderTextColor={'#5c5c5c'}
					underlineColorAndroid='transparent'
					multiline
					defaultValue={ bio }
				/>
			</View>
			<CheckBox
				title="Private"
				checked={isPrivate}
				iconRight
				onPress={() => setIsPrivate(!isPrivate)}
				containerStyle={styles.containerCheckbox}
				textStyle={[styles.txtEdit, { width: '30%' }]}
			/>
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
	profilePicture: {
		height: '15%',
		width: '30%',
		marginTop: '4%',
		alignSelf: 'center',
		borderRadius: 100,
	},
	txtChangePicture: {
		color: 'rgba(0, 140, 255, 1)',
		fontSize: 14,
		alignSelf: 'center',
		marginTop: '4%',
		fontWeight: 'bold',
	},
	editUsername: {
		marginTop: '8%',
		paddingHorizontal: '5%',
		flexDirection: 'row',
	},
	editBio: {
		marginTop: '4%',
		paddingHorizontal: '5%',
		flexDirection: 'row',
	},
	txtEdit: {
		color: 'white',
		fontSize: 17,
		fontWeight: 'normal',
	},
    input: {
		paddingLeft: '2%',
		width: '67%',
	},
	containerCheckbox: {
		marginTop: '4%',
		backgroundColor: 'transparent',
		borderWidth: 0,
		padding: 0,
	},
});