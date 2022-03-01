import React, { useState, useEffect, VFC } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Button, TouchableOpacityComponent } from "react-native";
import { Camera } from 'expo-camera'
import { BarCodeScanner } from "expo-barcode-scanner";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { PictureButton } from "./PictureButton";
import { SafeAreaView } from "react-native-safe-area-context";
import * as MediaLibrary from 'expo-media-library'

export const MyCamera: VFC<{ isReadingQR?: boolean, exitPost: () => void, openGallery: () => void, setImage: (image: string) => void}> = ({ isReadingQR = false, exitPost, openGallery, setImage}) => {
    const sourceFlashON = require("../../assets/Camera/flashON.png");
    const sourceFlashOFF = require("../../assets/Camera/flashOFF.png");
    const sourceFlashAUTO = require("../../assets/Camera/flashAUTO.png");

    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const barCodeScanner = isReadingQR ? { barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr] } : undefined;

    const [flashModeState, switchFlashMode] = useState(Camera.Constants.FlashMode.off);
    const [flashSource, setFlashSource] = useState(sourceFlashOFF);
    let cameraRef : Camera | null = null;

    useEffect(() => {
        (async () => {
            await MediaLibrary.usePermissions();
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(status === 'granted');
        })();
    }, []);

    const onFlip = () => {
        setType(type === Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back
        );
    }
    const takePicture = async () => {
        if (cameraRef) {
            let photo = await cameraRef.takePictureAsync();
            MediaLibrary.createAssetAsync(photo.uri);
            setImage(photo.uri);
        }
    }

    const SwitchFlashModeState = () => {
        switch (flashModeState) {
            case Camera.Constants.FlashMode.on:
                switchFlashMode(Camera.Constants.FlashMode.auto);
                setFlashSource(sourceFlashAUTO);
                break;
            case Camera.Constants.FlashMode.off:
                switchFlashMode(Camera.Constants.FlashMode.on);
                setFlashSource(sourceFlashON);
                break;
            case Camera.Constants.FlashMode.auto:
                switchFlashMode(Camera.Constants.FlashMode.off);
                setFlashSource(sourceFlashOFF);
                break;
        }
    }
    return (
        <SafeAreaView style={styles.background}>


            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={exitPost}>
                    <Image source={require("../../assets/closeIcon.png")} style={styles.closeIcon} />
                </TouchableOpacity>
                
                <TouchableOpacity onPress={SwitchFlashModeState} >
                    <Image source={flashSource} style={styles.flashIcon} />
                </TouchableOpacity>
            </View>

            <Camera type={type} ref={(ref) => { cameraRef = ref }} style={styles.camera} flashMode={flashModeState} barCodeScannerSettings={barCodeScanner} />

            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={openGallery}>
                    <Image source={require("../../assets/Camera/galleryIcon.png")} style={styles.closeIcon} />
                </TouchableOpacity>
                
                <PictureButton onPress={takePicture} />
                
                <TouchableOpacity onPress={onFlip}>
                    <Image
                        source={require('../../assets/Camera/flipCamera.png')}
                        style={styles.flipCamera} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    background: {
        backgroundColor: 'rgba(0, 0, 0, 1)',
        width: '100%',
        height: '100%',
        paddingTop: '10%'
    },
    camera: {
        justifyContent: 'center',
        height: hp(100-8-8-2),
        width: wp(100)
    },
    button: {
        backgroundColor: 'rgb(211, 211, 211)',
        borderRadius: 30,
        height: hp(7),
        width: hp(7)

    },
    flipCamera: {
        height: hp(7),
        width: hp(7)
    },
    flashIcon: {
        height: hp(8),
        width: hp(8)
    },
    closeIcon: {
        height: hp(7),
        width: hp(7),
    }
});