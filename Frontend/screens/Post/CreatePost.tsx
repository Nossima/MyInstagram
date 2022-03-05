import React, { useState, useEffect, VFC } from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { InsertPostInformation } from "./InsertPostInformation";
import { TakePicture } from "./TakePicture";

export const CreatePost: VFC<any> = ({ navigation }) => {
    let image: string = "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Finstagram-f1d96c19-d040-4aa9-a9e4-c8635fb7e68d/ImagePicker/221ed439-a2ed-4edf-b7e2-8a8d61a9e4df.jpg";
    const [isPictureSelected, setIsPictureSelected] = useState(true);

    const setChosenImage = (uri: string) => {
        image = uri;
        setIsPictureSelected(true);
    }

    if (!isPictureSelected) {
        return (
            <TakePicture navigation={navigation} setChosenPicture={setChosenImage} />
        );
    } else {
        return (
            <InsertPostInformation navigation={navigation} selectedImage={image} backToPictureSelection={() => {setIsPictureSelected(false)}}/>
        );
    }
};
