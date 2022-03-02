import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { Dm } from '../component/Dm';

export const DmList: React.VFC<any> = ({ navigation }) => {
    let user = "Username";

    const Data = [
        <Dm usrImg={{}} usrName="user1" lastMessage="bien ta vu"/>,
        <Dm usrImg={{}} usrName="user2" lastMessage="en vrai react native lourd"/>,
        <Dm usrImg={{}} usrName="user3" lastMessage="pense a rechanger l'ip"/>,
        <Dm usrImg={{}} usrName="user4" lastMessage="est ce qu'on aura assez de temps"/>,
	];

	const renderItem = (data: any) => {
		return <Dm usrImg={data.item.props.usrImg} usrName={data.item.props.usrName} lastMessage={data.item.props.lastMessage}/>
	}

	return <View style={styles.background}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image style={styles.img} source={require('../assets/fleche.png')}/>
            </TouchableOpacity>
            <Text style={[styles.tWhite, styles.nameTxt]}>{user}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('UserList')}>
                <Image style={styles.img} source={require('../assets/newConv.png')}/>
            </TouchableOpacity>
        </View>
        <FlatList data={Data} renderItem={(item: any) => renderItem(item)}/>
	</View>
}

const styles = StyleSheet.create({
    background: {
		backgroundColor: 'rgba(0, 0, 0, 1)',
        width: '100%',
        height: '100%',
        paddingTop: '10%'
    },
    header: {
        marginLeft: wp(2),
        width: wp(96),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp(2)
    },
    img: {
        height: hp(4),
        width: hp(4),
        resizeMode: 'center'
    },
    nameTxt: {
        fontSize: hp(2.4),
        marginTop: hp(0.2)
    },
    tWhite: {
        color: 'white'
    }
});