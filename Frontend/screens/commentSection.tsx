import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { Comment } from '../component/Comment';

export const CommentSection: React.VFC<any> = ({ navigation }) => {
    let [commentInput, onChangeCommentInput] = React.useState('');

	const img = { uri: "https://reactnative.dev/img/tiny_logo.png" };

	const feedData = [
        <Comment creatorImg={img} creatorTxt="creator1" comment="ceci est un premier commentaire qui a l'air de marcher et en plus le text est même justifier on arrete pas le progrès"/>,
        <Comment creatorImg={img} creatorTxt="creator2" comment="ouais ouais cool ta vie"/>,
        <Comment creatorImg={img} creatorTxt="creator3" comment="lorem ipsum etc etc..."/>,
        <Comment creatorImg={img} creatorTxt="creator1" comment="ouais ouais bla bla bla"/>,
	];

	const renderItem = (data: any) => {
		return <Comment creatorImg={data.item.props.creatorImg} creatorTxt={data.item.props.creatorTxt} comment={data.item.props.comment}/>
	}

	return <View style={styles.background}>
        <View style={styles.header}>
		    <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image style={styles.img} source={require('../assets/fleche.png')}/>
		    </TouchableOpacity>
            <Text style={[styles.tWhite, styles.commentaryTxt]}>Commentary</Text>
            <Text style={{width: hp(4)}}>T</Text>
        </View>
		<FlatList data={feedData} renderItem={(item: any) => renderItem(item)}/>
        <View style={styles.inputView}>
            <TextInput style={styles.input} value={commentInput} onChangeText={onChangeCommentInput} placeholder="Type a comment..." placeholderTextColor='rgba(85, 85, 85, 1)'/>
            <TouchableOpacity onPress={() => console.log('press')}>
                <Text style={[styles.tWhite, styles.submitComment]}>Comment</Text>
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
    commentaryTxt: {
        fontSize: hp(2.4),
        marginTop: hp(0.2)
    },
    inputView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'rgba(85, 85, 85, 1)',
        height: hp(5),
        width: wp(72),
        color: 'white',
        paddingLeft: wp(1),
        paddingRight: wp(1),
        marginLeft: wp(2),
        marginBottom: hp(1),
        marginTop: hp(1)
    },
    submitComment: {
        backgroundColor: '#db2b92',
        width: wp(22),
        height: hp(5),
        paddingLeft: wp(1),
        paddingRight: wp(1),
        marginRight: wp(2),
        marginBottom: hp(1),
        marginTop: hp(1),
        borderRadius: 5,
        textAlign: 'center',
        paddingTop: hp(1)
    },
    tWhite: {
        color: 'white'
    }
});