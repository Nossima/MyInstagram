import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, TextInput } from 'react-native';
import { Message } from '../component/Message';

export const DmConversation: React.VFC<any> = ({ route, navigation }) => {
    const { usrName } = route.params;
    const [input, onChangeInput] = React.useState('');
    
    const Data = [
        <Message txt="Yo mec ça va ?" isOwner={false}/>,
        <Message txt="Bah ecoute trkl" isOwner={true}/>,
        <Message txt="Et toi ?" isOwner={true}/>,
        <Message txt="imotep imotep" isOwner={false}/>,
        <Message txt="d'ailleurs tu connais le lorem ipsum" isOwner={false}/>,
        <Message txt="nope c'est quoi ?" isOwner={true}/>,
        <Message txt="lorem ipsum machin truc tu sais mais apres peut-etre qu'il faut que tu regarde la version complete mais bref c'est juste unlong message" isOwner={false}/>
	];

	const renderItem = (data: any) => {
		return <Message txt={data.item.props.txt} isOwner={data.item.props.isOwner}/>
	}

    const submit = (e: any) => {
        onChangeInput('');
    }

	return <View style={styles.background}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image style={styles.img} source={require('../assets/fleche.png')}/>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
                <Image style={styles.img} source={require('../assets/profileImage.png')}/>
                <Text style={[styles.tWhite, styles.nameTxt, {marginLeft: wp(2)}]}>{usrName}</Text>
            </View>
            <Text style={{width: hp(4)}}>T</Text>
        </View>
        <FlatList data={Data} renderItem={(item: any) => renderItem(item)}/>
        <TextInput style={[styles.input, styles.tWhite]} placeholder="your message.." onChangeText={onChangeInput} value={input} placeholderTextColor='rgba(85, 85, 85, 1)' onSubmitEditing={submit}/>
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
    input: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'rgb(40, 40, 40)',
        margin: hp(1),
        paddingTop: hp(0.5),
        paddingBottom: hp(0.5),
        paddingLeft: wp(2),
        paddingRight: wp(2)
    },
    tWhite: {
        color: 'white'
    }
});