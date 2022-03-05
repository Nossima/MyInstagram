import React, { VFC, useState } from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";
import * as Location from 'expo-location';
import { showLocation } from 'react-native-map-link'

export const MyLocation: VFC<{ setMapsLocation : (latitude:number, longitude:number) => void, style:any }> = ({ setMapsLocation, style }) => {    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [loc, setLoc] = useState<Location.LocationGeocodedAddress | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [isPermissionGranted, setisPermissionGranted] = useState(false);

    const onPinOnMap = () => {
        if (location && loc) {
            showLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                title: loc.city + ', ' + loc.country
            });
        }
    }
    const askLocationAutorization = async () => {
        setErrorMsg(null);
        let { status } = await Location.requestForegroundPermissionsAsync();
        setisPermissionGranted(status === 'granted');
        console.log(isPermissionGranted);
        if (status !== 'granted') {
            setErrorMsg("Permission not granted");
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        let loc = await Location.reverseGeocodeAsync({ 'latitude': location.coords.latitude, 'longitude': location.coords.longitude });
        console.log(loc);
        setLoc(loc[0]);
        setLocation(location);
        setMapsLocation(location.coords.latitude, location.coords.longitude);
        console.log(location);
    }
    if (!isPermissionGranted) {
        return (
            <View style={style}>
                <TouchableOpacity onPress={askLocationAutorization} style={{flexDirection: 'row'}}>
                    <Text style={styles.text}>{"Add Location"}</Text>
                    <Image source={require('../../assets/Camera/pin.png')} style={styles.pin}/>
                </TouchableOpacity>
                <Text style={{ color: 'red' }}>{errorMsg}</Text>
            </View>
        );
    } else if (!loc) {
        return (
            <View style={style}>
                <Text style={styles.text}>{'Waiting...'}</Text>
            </View>
        );
    } else {
        return (
            <View style={style}>
                <TouchableOpacity onPress={onPinOnMap} style={{flexDirection: 'row'}}>
                    <Text style={styles.textLink}>{loc.city + ', ' + loc.country}</Text>
                    <Image source={require('../../assets/Camera/pin.png')} style={styles.pin}/>
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    text: {
        color: 'white'
    },
    textLink: {
        color: '#1f93d8',
        textDecorationLine: 'underline'
    },
    pin: {
        marginLeft: wp(1),
        marginTop: hp(0.3),
        height: hp(2),
        width: hp(2)
    }
});