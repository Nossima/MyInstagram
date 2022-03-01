import React, { useState, useEffect, VFC } from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { MyCamera } from "./MyCamera";

export const InsertPicutre: VFC<any> = ({ navigation }) => {
    let [image, setImage] = useState("");
    const pickImage = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync(
            {
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3], // TODO à voir avec l'affichage dans le feed
                quality: 1,
            }
        );

        console.log(result);

        if (result && !result.cancelled) {
            InsertPostInformation(result.uri);
        }
    };

    const InsertPostInformation = (image: string) => {
        setImage(image)
        // navigation.navigate()
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <MyCamera exitPost={() => { navigation.navigate('Home') }}
                openGallery={() => { pickImage() }}
                setImage={(image: string) => { InsertPostInformation(image) }} />
        </View>
    );
};
