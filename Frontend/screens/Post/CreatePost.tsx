import React, { useState, useEffect, VFC } from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { InsertPostInformation } from "./InsertPostInformation";
import { TakePicture } from "./TakePicture";
import { createPostService } from "../../service/createPost";
import * as FileSystem from 'expo-file-system';

export const CreatePost: VFC<any> = ({ navigation }) => {
    let token: any;
    const [image, setImage]: any = useState({
        "height": 4608,
        "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Finstagram-f1d96c19-d040-4aa9-a9e4-c8635fb7e68d/Camera/b9c0f6b3-e163-466e-99dc-0e4630960941.jpg",
        "width": 3456,
    });
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
        console.log(img);
        setIsPictureSelected(true);
    }

    const onPost = async (caption: string, location: { latitude: number, longitude: number } | null) => {

        console.log('openning file...');
        console.log(image);
        let data = new FormData();
        data.append('ls', '');
        data.append('title', caption);
        data.append('location', location);
        // let content = await FileSystem.readAsStringAsync(image.uri, {encoding: FileSystem.EncodingType.UTF8})
        // console.log(content);
        // console.log(content.length);
        // if (content) {
        createPostService.createPost(token, data)
            .then((res) => {
                console.log(res);
            });
    // navigation.navigate('Home');
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
