import React, { useState, useEffect, VFC } from "react";
import { View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { MyCamera } from "./MyCamera";

export const TakePicture : VFC<{navigation : any, setChosenPicture: (uri: string) => void}> = ({ navigation, setChosenPicture }) => {
    const [isInGallery, setIsInGallery] = useState(false);

    const pickImage = async () => {
        setIsInGallery(true);
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
                quality: 1,
            }
        );
        setIsInGallery(false);
            
        console.log(result);
        if (result && !result.cancelled) {
            setChosenPicture(result.uri);
        }
    };

    if (!isInGallery) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <MyCamera exitPost={() => { navigation.navigate('Home') }}
                    openGallery={() => { pickImage() }}
                    setImage={(uri: string) => { setChosenPicture(uri) }} />
            </View>
        );
    } else {
        return (
            <View/>
        );
    }
};
