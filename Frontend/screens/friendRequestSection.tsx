import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Request } from '../component/Request';
import { requestService } from '../service/request';

export const FriendRequestSection: React.VFC<any> = ({ navigation }) => {
    let [RData, changeRData]: any[] = React.useState();

    const renderItem = (data: any) => {
        return <Request accountImg={data.item.props.accountImg} accountName={data.item.props.accountName} accountID={data.item.props.accountID} />
    }

    const getRequest = () => {
        requestService.getrequest()
        .then((res) => {
            let newRData:any[] = []
            for (let i = 0; res.data[i]; i++) {
                let av = "../assets/profileImage.png"
                if (res.data[i].avatar)
                    av = res.data[i].avatar
                let tmp = <Request accountImg={av} accountName={res.data[i].username} accountID={res.data[i]._id} />
                newRData.push(tmp);
            }
            changeRData(newRData)
        })
    }
    getRequest()

    return <View style={styles.background}>
        <View style={styles.header}>
            <View style={styles.icView}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Image style={styles.icImg} source={require('../assets/fleche.png')} />
                </TouchableOpacity>
            </View>
        </View>
        <FlatList data={RData} renderItem={(item: any) => renderItem(item)} />
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
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    brandName: {
        marginTop: hp(2),
        marginLeft: wp(2),
        fontSize: hp(3)
    },
    icView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp(18),
        marginLeft: wp(2),
        marginRight: wp(2)
    },
    icImg: {
        width: wp(8),
        height: hp(8),
        resizeMode: 'center'
    },
    tWhite: {
        color: 'white'
    }
});