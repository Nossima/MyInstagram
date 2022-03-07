import React, { useState, useEffect, VFC } from "react";
import { View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { MyCamera } from "./MyCamera";

export const TakePicture : VFC<{navigation : any, setChosenPicture: (image: any) => void}> = ({ navigation, setChosenPicture }) => {
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
                mediaTypes: ImagePicker.MediaTypeOptions.Images
            }
        );
        setIsInGallery(false);

        if (result && !result.cancelled) {
            setChosenPicture(result);
        }
    };

    if (!isInGallery) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <MyCamera exitPost={() => { navigation.navigate('Home') }}
                    openGallery={() => { pickImage() }}
                    setImage={(image) => { setChosenPicture(image) }} />
            </View>
        );
    } else {
        return (
            <View/>
        );
    }
};
