import React, { useState, useEffect, VFC } from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { InsertPostInformation } from "./InsertPostInformation";
import { TakePicture } from "./TakePicture";
import { createPostService } from "../../service/createPost";
import * as FileSystem from 'expo-file-system';

export const CreatePost: VFC<any> = ({ navigation }) => {
    let token: any;
    const [image, setImage]: any = useState(null);
    const [isPictureSelected, setIsPictureSelected] = useState(image !== null);


    useEffect(() => {
        createPostService.getToken()
            .then((res) => {
                if (res === null) {
                    navigation.navigate('Login');
                }
                token = res;
            })
    }, []);

    const setChosenImage = (img: any) => {
        setImage(img);
        setIsPictureSelected(true);
    }

    const onPost = async (caption: string, location: { latitude: number, longitude: number } | null) => {
        // const source = {filename: image.uri, type: image.type, uri: image.fileSize};
        // let data = new FormData();
        // data.append('image',  source);
        // data.append('title', caption);
        // data.append('location', location);
        // let content = await FileSystem.readAsStringAsync(image.uri, {encoding: FileSystem.EncodingType.UTF8})
        // console.log(content);
        // console.log(content.length);
        // if (content) {
        createPostService.createPost(caption, image.uri, location)
            .then((res) => {
                console.log(res);
                navigation.navigate('Home');
            });
    }

    if (!isPictureSelected) {
        return (
            <TakePicture navigation={navigation} setChosenPicture={setChosenImage} />
        );
    } else {
        return (
            <InsertPostInformation navigation={navigation} selectedImage={image.uri} onPost={onPost} backToPictureSelection={() => { setIsPictureSelected(false) }} />
        );
    }
};
