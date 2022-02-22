import React, { useEffect } from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Image, DrawerLayoutAndroidBase } from "react-native";
import { TextInputField } from "../../component/TextInputField";

export const Register: React.VFC = () => {
	const Navigation = useNavigation();

    let [username, onChangeUsername] = React.useState('');
    let [email, onChangeEmail] = React.useState('');
    let [password, onChangePassword] = React.useState('');
    let [confirmPassword, onChangeConfirmPassword] = React.useState('');
    
    let usernameError = '';
    let emailError = '';
    let passwordError = '';
    let checkPasswordError = '';
    let isUsernameError = false;
    let isEmailError = false;
    let isPasswordError = false;
    let isCheckPasswordError = false;

    const checkInfo = () => {
        console.log('test');
        if (username === '') {
            usernameError = "The username can't be empty";
            isUsernameError = true;
            console.log(usernameError)
        }
        if (email === '') {
            isEmailError = true;
        }
        if (password === '') {
            isPasswordError = true;
        }
        if (isUsernameError || isEmailError || isPasswordError || isCheckPasswordError) {
            return false;
        }
        return true;
    };

    console.log('Render');
    return <View style={styles.background}>
        <View style={{alignItems: 'center'}}>
            <Image style={styles.logo} source={require('../../assets/Instagram_icon.png')}/>
            <Text style={[styles.tWhite, styles.title]}>My Instagram</Text>
        </View>
        <TextInputField value={username} name="Username" onChangeText={(text: string) => onChangeUsername(text)} errorMsg={usernameError} isError={isUsernameError}/>
        <TextInputField value={email} name="Email" onChangeText={(text: string) => onChangeEmail(text)} errorMsg={emailError} isError={isEmailError}/>
        <TextInputField value={password} name="Password" onChangeText={(text: string) => onChangePassword(text)} errorMsg={passwordError} isError={isPasswordError}/>
        <TextInputField value={confirmPassword} name="Confirm password" onChangeText={(text: string) => onChangeConfirmPassword(text)} errorMsg={checkPasswordError} isError={isCheckPasswordError}/>
        <TouchableOpacity onPress={() => checkInfo()} style={styles.registerBtn}>
            <Text style={[styles.tWhite, {fontSize: 18}]}>Register</Text>
        </TouchableOpacity>
        <View style={styles.redirect}>
            <Text style={styles.tWhite}>Already register ?</Text>
            <TouchableOpacity>
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
        </View>
    </View>
};

const styles = StyleSheet.create({
    background: {
		backgroundColor: 'rgba(0, 0, 0, 1)',
        width: '100%',
        height: '100%',
        paddingTop: '10%'
    },
    logo: {
        height: hp(15),
        width: hp(15),
        marginTop: hp(8)
    },
    title: {
        marginTop: hp(2),
        fontSize: 30,
        marginBottom: hp(5)
    },
    registerBtn: {
        backgroundColor: '#db2b92',
        width: wp(30),
        height: hp(5),
        marginTop: hp(8),
        marginLeft: wp(35),
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 5
    },
    redirect: {
        flexDirection: 'row',
        marginTop: hp(5),
        marginLeft: wp(30),
        width: wp(40),
        justifyContent: 'space-around'
    },
    loginText: {
        color: '#db2b92'
    },
    tWhite: {
        color: 'white'
    }
});