import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { User } from '../component/User';
import { searchService } from '../service/search';

export const SearchScreen: React.VFC<any> = ({ navigation }) => {
    const [input, onChangeInput] = React.useState('');
    const [data, ChangeData] : any[] = React.useState();
	const img = { uri: "https://reactnative.dev/img/tiny_logo.png" };

	const renderItem = (data: any) => {
        if (input !== '' && data.item.props.usrName.includes(input) && data.item.props.usrName != global.username) {
		    return <User usrImg={data.item.props.usrImg} usrName={data.item.props.usrName}/>
        }
        return <View/>;
	}
    
    const submit = async (e: any) => {
        searchService.getListUser()
        .then((accountListOrError) => {
            accountListOrError.cata(
                (err) => {
                    console.log(err);
                },
                (res) => {
                    let newData: any[] = [];
                    for (var i = 0; i < res.length; i++) {
                        newData.push(<User usrImg={res[i].avatar} usrName={res[i].username}/>)
                    }
                    ChangeData(newData);
                }
            )
        })
    }

	return <View style={styles.background}>
        <TextInput style={styles.searchInput} value={input} onChangeText={onChangeInput} placeholder="Search..." placeholderTextColor='white' onSubmitEditing={submit}/>
		<FlatList data={data} renderItem={(item: any) =>  renderItem(item)}/>
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
