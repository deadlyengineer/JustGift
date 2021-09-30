import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';
import Global from '../utils/global';
import { useSelector } from 'react-redux';
import GiftCard from './components/giftcard';
import Header from './components/header';
import Avatar from './components/avatar';
import DetailDlg from './components/detail';
import DeleteDlg from './components/delete';

const Favorite = (props) => {

    const userId = useSelector(state => state.user.userId);
    const recipient = useSelector(state => state.user.recipient);
    const [detailVisible, setDetailVisible] = useState(false);
    const [delVisible, setDelVisible] = useState(false);
    const [itemDetail, setItemDetail] = useState({});

    const pressDetailView = () => {
        const detailData = {
            currency: props.navigation.state.params.currency,
            price: props.navigation.state.params.price,
            name: props.navigation.state.params.name,
            description: props.navigation.state.params.description,
            review: props.navigation.state.params.review,
        };
        setItemDetail(detailData);
        setDetailVisible(true);
    }

    const pressBuyAction = () => {
        if(userId == null) {
            props.navigation.navigate('LogIn');
        } else {

        }
    }

    return (
        <View style={styles.bgContainer}>
            <Header page='favorite' onClickBack={() => props.navigation.navigate('FavList')}/>
            <View>
                <GiftCard
                    data={props.navigation.state.params}
                    dotColor={Global.COLOR.SECONDARY}
                    onClickDetail={pressDetailView}
                />
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={[styles.roundBtn, { marginRight: 45 }]} onPress={() => setDelVisible(true)}>
                    <LinearGradient colors={['rgba(239, 90, 103, 1)', 'rgba(236, 56, 72, 1)']} style={styles.gradContainer}>
                        <Icon name='delete' type='material-community' color='white' size={30}/>
                    </LinearGradient>
                </TouchableOpacity>
                <Avatar source={recipient.avatar} size={Global.SIZE.W_60} firstName={recipient.first_name} lastName={recipient.last_name}/>
                <TouchableOpacity style={[styles.roundBtn, { marginLeft: 45 }]} onPress={pressBuyAction}>
                    <LinearGradient  colors={['rgba(125, 234, 169, 1)', 'rgba(59, 224, 126, 1)']} style={styles.gradContainer}>
                        <Icon name='currency-usd' type='material-community' color='white' size={30}/>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            <DetailDlg
                visible={detailVisible}
                onChangeVisible={setDetailVisible}
                data={itemDetail}
            />
            <DeleteDlg
                visible={delVisible}
                onChangeVisible={setDelVisible}
                navigation={props.navigation}
                item={props.navigation.state.params.docId}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    bgContainer: {
        flex: 1,
        backgroundColor: Global.COLOR.BACKGROUND,
        alignItems: 'center',
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 35,
        alignItems: 'center',
    },
    roundBtn: {
        width: Global.SIZE.W_60,
        height: Global.SIZE.W_60,
        borderRadius: Global.SIZE.W_60 / 2,
        backgroundColor: 'white',
        shadowOffset: { width: 2, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.2,
        shadowColor: 'black',
        elevation: 5,
    },
    gradContainer: {
        flex: 1,
        borderRadius: Global.SIZE.W_60 / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Favorite;
