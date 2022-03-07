import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Onboarding from 'react-native-onboarding-swiper';

const Dots: React.VFC<any> = ({ selected }) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.3)';

    return (
        <View
            style={{
                width: 6,
                height: 6,
                marginHorizontal: 3,
                borderRadius: 15,
                backgroundColor
            }}
        />
    );
}

const Skip = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: 10 }}
        {...props}
    >
        <Text style={styles.button}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: 10 }}
        {...props}
    >
        <Text style={styles.button}>Next</Text>
    </TouchableOpacity>
);

const Done = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: 10 }}
        {...props}
    >
        <Text style={styles.button}>Done</Text>
    </TouchableOpacity>
);

export const OnBoardingScreen: React.VFC<any> = ({ navigation }) => {
    return (
        <Onboarding
            SkipButtonComponent={Skip}
            NextButtonComponent={Next}
            DoneButtonComponent={Done}
            DotComponent={Dots}
            onSkip={() => navigation.replace("Home")}
            onDone={() => navigation.navigate("Home")}
            pages={[
                {
                    backgroundColor: 'rgba(0, 0, 0, 1)',
                    image: <Image style={styles.image} source={require('../assets/post_onboard.png')} />,
                    title: <Text style={styles.title}>Post and share pictures</Text>,
                    subtitle: <Text style={styles.text}>Share your adventures with the world !</Text>,
                },
                {
                    backgroundColor: 'rgba(0, 0, 0, 1)',
                    image: <Image style={styles.image} source={require('../assets/comment_onboard.png')} />,
                    title: <Text style={styles.title}>Comment and like your friends post</Text>,
                    subtitle: <Text style={styles.text}>A new way to connect with friends</Text>,
                },
                {
                    backgroundColor: 'rgba(0, 0, 0, 1)',
                    image: <Image style={styles.image} source={require('../assets/add_onboard.png')} />,
                    title: <Text style={styles.title}>Add friends and build a comunity</Text>,
                    subtitle: <Text style={styles.text}>Now you can become the star !</Text>,
                },
            ]}
        />
    );
};

const styles = StyleSheet.create({
    image: {
        width: hp(40),
        height: hp(32),
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 30,
        color: 'white',
        marginBottom: 15,
        marginLeft: 15,
        marginRight: 15,
        textAlign: 'center'
    },
    text: {
        fontSize: 24,
        color: '#bababa',
        marginLeft: 15,
        marginRight: 15,
        textAlign: 'center'
    },
    button: {
        fontSize: 18,
        color: '#bababa'
    }
});