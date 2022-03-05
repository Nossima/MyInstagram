import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { TextInputField } from "../../component/TextInputField";
import * as SecureStore from 'expo-secure-store';

import { authentificationService } from "../../service/authentification";

export const Login: React.VFC<any> = ({ navigation }) => {
    let [usernameOrEmail, onChangeUsernameOrEmail] = React.useState('');
    let [password, onChangePassword] = React.useState('');
    let [usernameOrEmailError, changeUsernameOrEmailError] = React.useState('');
    let [passwordError, changePasswordError] = React.useState('');
    let [isUsernameOrEmailError, changeIsUsenameOrEmailError] = React.useState(false);
    let [isPasswordError, changeIsPasswordError] = React.useState(false);

    async function save(key: string, value: any) {
        await SecureStore.setItemAsync(key, value);
    }

    const checkInfo = () => {
        if (usernameOrEmail === '') {
            changeUsernameOrEmailError("The username or email can't be empty");
            changeIsUsenameOrEmailError(true);
        } else {
            changeIsUsenameOrEmailError(false);
        }
        if (password === '') {
            changePasswordError("The password can't be empty");
            changeIsPasswordError(true);
        } else {
            changeIsPasswordError(false);
        }
        if (isUsernameOrEmailError || isPasswordError) {
            return false;
        }
        return login();
    };

    const login = () => {
        authentificationService.login(usernameOrEmail, password)
        .then((tokenOrError) => {
            tokenOrError.cata(
                (err) => {
                    if (err[0].message === "error.login.account") {
                        changeUsernameOrEmailError("This username is invalid");
                        changeIsUsenameOrEmailError(true);
                        changePasswordError("");
                        changeIsPasswordError(false);
                    } else if (err[0].message === "error.login.password") {
                        changeUsernameOrEmailError("");
                        changeIsUsenameOrEmailError(false);
                        changePasswordError("Invalid password");
                        changeIsPasswordError(true);
                    } else {
                        changeUsernameOrEmailError("");
                        changeIsUsenameOrEmailError(true);
                        changePasswordError("Something went wrong, retry later");
                        changeIsPasswordError(true);
                    }
                },
                (res) => {
                    save('bearer_token', res);
                    navigation.navigate('Home');
                }
            )
        });
    }

    return <View style={styles.background}>
        <View style={{alignItems: 'center'}}>
            <Image style={styles.logo} source={require('../../assets/Instagram_icon.png')}/>
            <Text style={[styles.tWhite, styles.title]}>My Instagram</Text>
        </View>
        <TextInputField value={usernameOrEmail} name="Username or email" onChangeText={(text: string) => onChangeUsernameOrEmail(text)} errorMsg={usernameOrEmailError} isError={isUsernameOrEmailError} isHidden={false}/>
        <TextInputField value={password} name="Password" onChangeText={(text: string) => onChangePassword(text)} errorMsg={passwordError} isError={isPasswordError} isHidden={true}/>
        <TouchableOpacity onPress={() => checkInfo()} style={styles.loginBtn}>
            <Text style={[styles.tWhite, {fontSize: 18}]}>Login</Text>
        </TouchableOpacity>
        <View style={styles.redirect}>
            <Text style={styles.tWhite}>Not register yet ?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerText}>Register</Text>
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
    loginBtn: {
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
    registerText: {
        color: '#db2b92'
    },
    tWhite: {
        color: 'white'
    }
});