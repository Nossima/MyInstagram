import React, { VFC } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const PictureButton: VFC<{onPress?: () => void}> = ({onPress}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.buttonBackground}>
                <View style={styles.buttonCircle}>
                    <View style={styles.buttonInner}/>
                </View>
            </View>
        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    buttonBackground: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 30,
        height: hp(8),
        width: hp(8)
    },
    buttonCircle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        borderRadius: 30,
        height: hp(5.5),
        width: hp(5.5)
    },
    buttonInner: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 30,
        height: hp(5.3),
        width: hp(5.3)
    }
});