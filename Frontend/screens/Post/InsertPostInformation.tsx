import React, { useRef, useState } from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView  } from "react-native";
import { MyLocation } from "./MyLocation";
import { SafeAreaView } from "react-native-safe-area-context";

export const InsertPostInformation: React.VFC<{ navigation: any, selectedImage: string, backToPictureSelection: () => void }> = ({ navigation, selectedImage, backToPictureSelection }) => {
    const [caption, setCaption] = useState("");
    const [captionColor, setCaptionColor] = useState("white");
    const [location, setMapLocation] = useState<{ latitude: number, longitude: number } | null>(null);

    const onCaptionChange = (newCaption: string) => {
        setCaptionColor('white');
        setCaption(newCaption);
    }

    const onVerifyCaption = () => {
        if (caption.trim() === "")
            setCaptionColor('red');
        // Call back
        // navigation.navigate('Home');
    }

    return (
        <ScrollView  style={styles.background}>
            <View style={styles.header}>
                <TouchableOpacity onPress={backToPictureSelection}>
                    <Image source={require("../../assets/Camera/check.png")} style={styles.icone} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignContent: 'flex-end' }}>
                    <Text style={[styles.title, { width: wp(70) }]}>{"New post"}</Text>
                    <TouchableOpacity onPress={onVerifyCaption}>
                        <Image source={require("../../assets/Camera/check.png")} style={styles.icone} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.body}>
                <Image source={{ uri: selectedImage }} style={styles.image} />
                <TextInput onChangeText={onCaptionChange} value={caption} placeholder="Write a caption..." placeholderTextColor={captionColor} style={styles.caption} multiline={true} />
                <MyLocation setMapsLocation={(latitude, longitude) => { setMapLocation({ latitude: latitude, longitude: longitude }) }} style={styles.location}/>
            </View>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'rgba(0, 0, 0, 1)',
        width: '100%',
        height: '100%',
        paddingTop: '10%'
    },
    header: {
        flexDirection: 'row',
        marginLeft: wp(2),
        width: wp(96)
    },
    body: {
        paddingTop: hp(2),
        paddingBottom: hp(2),
        alignItems: 'center',
    },
    image: {
        width: hp(40),
        height: hp(40)
    },
    icone: {
        width: hp(4),
        height: hp(4)
    },
    title: {
        color: 'white',
        marginLeft: wp(10),
        fontSize: hp(2.4)
    },
    caption: {
        color: 'white',
        fontSize: hp(2),
        minHeight: hp(5),
        width: wp(90),
        borderWidth: 1,
        borderColor: 'white',
        paddingLeft: wp(2),
        paddingBottom: hp(1),
        paddingTop: hp(0.5),
        paddingRight: wp(1),
        marginTop: hp(5)
    },
    location: {
        marginTop: hp(5)
    }
});