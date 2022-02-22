import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, TextInput, StyleSheet } from "react-native";

// interface Props {
//     name: string,
//     value: string
// }

// export const TextInputField: React.VFC<Props> = (props:Props) => {
//     return <View style={styles.container}>
//         <Text style={[styles.name, styles.tWhite, styles.t20]}>{props.name}</Text>
//         <TextInput style={styles.input} placeholder={props.name}/>
//     </View>
// }

export const TextInputField: React.VFC<{name: string, value: string, onChangeText: any, errorMsg: string, isError: boolean}> = ({name, value, onChangeText, errorMsg, isError}) => {
    if (isError) {
        return <View style={styles.container}>
            <TextInput style={styles.inputError} value={value} onChangeText={onChangeText} placeholder={name} placeholderTextColor='red'/>
            <Text style={styles.textError}>{errorMsg}</Text>
        </View>
    }
    return <View style={styles.container}>
        <TextInput style={styles.input} value={value} onChangeText={onChangeText} placeholder={name} placeholderTextColor='rgba(85, 85, 85, 1)'/>
    </View>
}

const styles = StyleSheet.create({
    container: {
        marginTop: hp(3),
        marginRight: wp(5),
        marginLeft: wp(5)
    },
    name: {
        marginLeft: wp(2),
        marginBottom: wp(1)
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'rgba(85, 85, 85, 1)',
        height: hp(5),
        paddingLeft: hp(1),
        color: 'white',
    },
    inputError: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'red',
        height: hp(5),
        paddingLeft: hp(1),
        color: 'red',
    },
    textError: {
        color: 'red',
        fontSize: 12
    }
});