import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { Dm } from '../component/Dm';
import { User } from '../component/User';

export const SearchScreen: React.VFC<any> = ({ navigation }) => {
    const [input, onChangeInput] = React.useState('');
	const img = { uri: "https://reactnative.dev/img/tiny_logo.png" };

    const Data = [
        <User usrImg={{}} usrName="Martin"/>,
        <User usrImg={{}} usrName="Bernard "/>,
        <User usrImg={{}} usrName="Thomas "/>,
        <User usrImg={{}} usrName="Petit "/>,
        <User usrImg={{}} usrName="Robert "/>,
        <User usrImg={{}} usrName="Richard "/>,
        <User usrImg={{}} usrName="Durand "/>,
        <User usrImg={{}} usrName="Dubois"/>,
        <User usrImg={{}} usrName="Moreau"/>,
        <User usrImg={{}} usrName="Laurent"/>,
        <User usrImg={{}} usrName="Simon"/>,
        <User usrImg={{}} usrName="Michel"/>,
        <User usrImg={{}} usrName="Lefebre"/>,
        <User usrImg={{}} usrName="Leroy"/>,
        <User usrImg={{}} usrName="Roux"/>,
        <User usrImg={{}} usrName="David"/>
	];

	const renderItem = (data: any) => {
        if (input !== '' && data.item.props.usrName.includes(input)) {
		    return <User usrImg={data.item.props.usrImg} usrName={data.item.props.usrName}/>
        } else if (input === '') {
		    return <User usrImg={data.item.props.usrImg} usrName={data.item.props.usrName}/>
        }
        return <View/>;
	}
    
    const submit = (e: any) => {
    }

	return <View style={styles.background}>
        <TextInput style={styles.searchInput} value={input} onChangeText={onChangeInput} placeholder="Search..." placeholderTextColor='white' onSubmitEditing={submit}/>
		<FlatList data={Data} renderItem={(item: any) =>  renderItem(item)}/>
		<View style={styles.navBarBottom}>
			<TouchableOpacity onPress={() => navigation.navigate('Home')}>
    			<Image style={styles.icImg} source={require('../assets/home.png')} />
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate('Search')}>
    			<Image style={styles.icImg} source={require('../assets/zoom_filled.png')} />
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate('Profile')}>
    			<Image style={styles.icImg} source={require('../assets/profileImage.png')} />
			</TouchableOpacity>
		</View>
	</View>
}

const styles = StyleSheet.create({
    background: {
		backgroundColor: 'rgba(0, 0, 0, 1)',
        width: '100%',
        height: '100%',
        paddingTop: '10%'
    },
    searchInput: {
        backgroundColor: 'rgba(60, 60, 60, 1)',
        marginLeft: wp(2),
        height: hp(5),
        width: wp(96),
        borderRadius: 15,
        paddingLeft: wp(2),
        paddingRight: wp(2),
        color: 'white'
    },
	icImg: {
		width: wp(8),
		height: hp(8),
		resizeMode: 'center'
	},
	navBarBottom: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
    tWhite: {
        color: 'white'
    }
});
