import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, StyleSheet, TouchableOpacity, Image, Switch } from "react-native";
import { TextInputField } from "../../component/TextInputField";
import * as SecureStore from 'expo-secure-store';

import { authentificationService } from "../../service/authentification/";

export const Register: React.VFC<any> = ({ navigation }) => {
    let [username, onChangeUsername] = React.useState('');
    let [email, onChangeEmail] = React.useState('');
    let [password, onChangePassword] = React.useState('');
    let [checkPassword, onChangeCheckPassword] = React.useState('');
    let [isPrivate, setIsPrivate] = React.useState(false);
    let [usernameError, changeUsernameError] = React.useState('');
    let [emailError, changeEmailError] = React.useState('');
    let [passwordError, changePasswordError] = React.useState('');
    let [checkPasswordError, changeCheckPasswordError] = React.useState('');
    let [isUsernameError, changeIsUsernameError] = React.useState(false);
    let [isEmailError, changeIsEmailError] = React.useState(false);
    let [isPasswordError, changeIsPasswordError] = React.useState(false);
    let [isCheckPasswordError, changeIsCheckPasswordError] = React.useState(false);

    const checkInfo = () => {
        if (username === '') {
            changeUsernameError("The username can't be empty");
            changeIsUsernameError(true);
        } else {
            changeIsUsernameError(false);
        }
        if (email === '') {
            changeEmailError("The email can't be empty");
            changeIsEmailError(true);
        } else {
            changeIsEmailError(false);
        }
        if (password === '') {
            changePasswordError("The password can't be empty");
            changeIsPasswordError(true);
        } else {
            changeIsPasswordError(false);
        }
        if (checkPassword === '') {
            changeCheckPasswordError("The password can't be empty");
            changeIsCheckPasswordError(true);
        } else {
            changeIsCheckPasswordError(false);
        }
        if (password !== '' && checkPassword !== '' && password !== checkPassword) {
            changeIsPasswordError(true);
            changeIsCheckPasswordError(true);
            changePasswordError("");
            changeCheckPasswordError("The confirm password and the password has to be identical");
        }
        if (isUsernameError || isEmailError || isPasswordError || isCheckPasswordError) {
            return false;
        }
        return register();
    };

    const register = () => {
        authentificationService.register(username, email, password, isPrivate)
        .then(errorOrAccount => {
            errorOrAccount.cata(
                (err) => {
                    if (err[0].message === "error.register.username.used") {
                        changeUsernameError("username already used");
                        changeIsUsernameError(true);
                        changeEmailError("");
                        changeIsEmailError(false);
                        changePasswordError("");
                        changeIsPasswordError(false);
                        changeCheckPasswordError("");
                        changeIsCheckPasswordError(false);
                    } else if (err[0].message === "error.register.email.used") {
                        changeUsernameError("");
                        changeIsUsernameError(false);
                        changeEmailError("email already used");
                        changeIsEmailError(true);
                        changePasswordError("");
                        changeIsPasswordError(false);
                        changeCheckPasswordError("");
                        changeIsCheckPasswordError(false);
                    } else {
                        changeUsernameError("");
                        changeIsUsernameError(true);
                        changeEmailError("");
                        changeIsEmailError(true);
                        changePasswordError("");
                        changeIsPasswordError(true);
                        changeCheckPasswordError("Something went wrong, retry later");
                        changeIsCheckPasswordError(true);
                    }
                },
                (res) => {
                    authentificationService.login(res.username, password)
                    .then(errorOrToken => {
                        errorOrToken.cata(
                            (err) => {

                            },
                            (res2) => {
                                SecureStore.setItemAsync('bearer_token', res2.token);
                                navigation.navigate('Home');
                            }
                        )
                    });
                }
            )
        });
    }

    return <View style={styles.background}>
        <View style={{alignItems: 'center'}}>
            <Image style={styles.logo} source={require('../../assets/Instagram_icon.png')}/>
            <Text style={[styles.tWhite, styles.title]}>My Instagram</Text>
        </View>
        <TextInputField value={username} name="Username" onChangeText={(text: string) => onChangeUsername(text)} errorMsg={usernameError} isError={isUsernameError} isHidden={false}/>
        <TextInputField value={email} name="Email" onChangeText={(text: string) => onChangeEmail(text)} errorMsg={emailError} isError={isEmailError} isHidden={false}/>
        <TextInputField value={password} name="Password" onChangeText={(text: string) => onChangePassword(text)} errorMsg={passwordError} isError={isPasswordError} isHidden={true}/>
        <TextInputField value={checkPassword} name="Confirm password" onChangeText={(text: string) => onChangeCheckPassword(text)} errorMsg={checkPasswordError} isError={isCheckPasswordError} isHidden={true}/>
        <View style={styles.switchContainer}>
            <Text style={[{paddingTop: hp(1.5)}, styles.tWhite]}>Private account : </Text>
            <Switch value={isPrivate} onValueChange={setIsPrivate} trackColor={{ true: '#db2b92', false: 'rgba(0, 0, 0, 1)'}} thumbColor={isPrivate ? "#FFFFFF" : "rgba(85, 85, 85, 1)"}/>
        </View>
        <TouchableOpacity onPress={() => checkInfo()} style={styles.registerBtn}>
            <Text style={[styles.tWhite, {fontSize: 18}]}>Register</Text>
        </TouchableOpacity>
        <View style={styles.redirect}>
            <Text style={styles.tWhite}>Already register ?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
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
    switchContainer: {
        flexDirection: 'row',
        marginTop: hp(3),
        marginLeft: wp(30),
        width: wp(40),
        justifyContent: 'space-around'
    },
    registerBtn: {
        backgroundColor: '#db2b92',
        width: wp(30),
        height: hp(5),
        marginTop: hp(3),
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