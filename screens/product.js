import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import SwipeCards from 'react-native-swipe-cards-deck';
import Avatar from './components/avatar';
import Global from '../utils/global';
import Header from './components/header';
import Loading from './loading';
import GiftCard from './components/giftcard';
import { getProducts } from '../firebase/crud';
import { useSelector } from 'react-redux';
import FilterDlg from './components/filter';

const Product = (props) => {

    const userId = useSelector(state => state.user.userId);
    const recipient = useSelector(state => state.user.recipient);

    const [isLoaded, setLoaded] = useState(false);
    const [detailVisible, setDetailVisible] = useState(false);
    const [filterVisible, setFilterVisible] = useState(false);
    const [contactVisible, setContactVisible] = useState(false);
    const [pickerVisible, setPickerVisible] = useState(false);
    const [productData, setProductData] = useState(false);
    const [itemDetail, setItemDetail] = useState({});
    const [filterOption, setFilterOption] = useState({ price: 0, age: 9, gender: 2 });
    const tinderCards = useRef(null);

    useEffect(() => {
        //const listener = props.navigation.addListener('focus', () => {
        //    console.log('focused');
        //});
        
        //return () => listener.remove();
    }, []);

    useEffect(() => {
        setLoaded(false);
        getProducts(filterOption).then(result => {
            setProductData(result);
            setLoaded(true);
        }).catch(err => console.log(err));
    }, [filterOption]);

    const handleNope = () => {
        return true;
    }
    
    const handleYup = card => {
        addToFavorite(card);
        return true;
    }

    const pressDislikeAction = () => {
        tinderCards.current.swipeNope();
    }

    const pressLikeAction = () => {
        addToFavorite(tinderCards.current.state.card);
        tinderCards.current.swipeYup();
    }

    const pressDetailView = item => {
        const detailData = {
            currency: item.currency,
            price: item.price,
            name: item.name,
            description: item.description,
            review: item.review,
        };
        setItemDetail(detailData);
        setDetailVisible(true);
    }

    const addToFavorite = item => {

    }

    if(!isLoaded)
        return (<Loading/>);

    const renderCardItem = item => (
        <GiftCard data={item} dotColor={Global.COLOR.PRIMARY} onClickDetail={() => pressDetailView(item)}/>
    );

    const renderNoCardItem = () => (
        <View>
            <Text style={styles.noText}>No more gifts ...</Text>
        </View>
    );
    
    return (
        <View style={styles.bgContainer}>
            <Header page='product'/>
            <View style={styles.body}>
                <SwipeCards
                    ref={tinderCards}
                    cards={productData}
                    renderCard={renderCardItem}
                    keyExtractor={item => item.id}
                    renderNoMoreCards={renderNoCardItem}
                    actions={{
                        nope: { onAction: handleNope, show: false },
                        yup: { onAction: handleYup, show: false }
                    }}
                    smoothTransition={true}
                    hasMaybeAction={false}
                    stack={true}
                    stackOffsetX={0}
                    cardRemoved={() => {}}
                    loop={true}
                />
            </View>
            <View style={styles.footer}>
                <View style={styles.filterContainer}>
                    <TouchableOpacity style={styles.filterBtn} onPress={() => setFilterVisible(true)}>
                        <LinearGradient colors={['rgba(250, 250, 250, 1)', 'rgba(240, 240, 240, 1)']} style={[styles.gradContainer, { borderRadius: Global.SIZE.W_55 / 2 }]}>
                            <Icon name='filter' type='font-awesome-5' color={Global.COLOR.ICON_ACTIVE} size={20}/>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View style={styles.dislikeContainer} onPress={pressDislikeAction}>
                    <TouchableOpacity style={styles.roundBtn}>
                        <LinearGradient colors={['rgba(249, 219, 222, 1)', 'white']} style={styles.gradContainer}>
                            <Icon name='close' type='ionicon' color={Global.COLOR.PRIMARY} size={40}/>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View style={styles.likeContainer}>
                    <TouchableOpacity style={styles.roundBtn} onPress={pressLikeAction}>
                        <LinearGradient colors={['rgba(220, 249, 232, 1)', 'white']} style={styles.gradContainer}>
                            <Icon name='heart' type='ionicon' color={Global.COLOR.SECONDARY} size={37}/>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View style={styles.recipientContainer}>
                    <Pressable onPress={() => setPickerVisible(true)}>
                        {
                            recipient == null ?
                                <Image source={Global.IMAGE.UNKNOWN} style={styles.avatar}/>
                            :   <Avatar source={recipient.avatar} size={Global.SIZE.W_55} firstName={recipient.first_name} lastName={recipient.last_name}/>
                        }
                    </Pressable>
                </View>
            </View>
            <FilterDlg
                visible={filterVisible}
                data={filterOption}
                onChangeVisible={setFilterVisible}
                onChangeValue={setFilterOption}
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
    body: {
        width: '100%',
        height: Global.SIZE.W_522,
    },
    noText: {
        fontFamily: 'AvenirBlack',
        fontSize: 22,
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: Global.SIZE.W_20,
        paddingTop: Global.SIZE.W_20,
    },
    filterContainer: {
        flex: 1,
        paddingTop: 13,
    },
    filterBtn: {
        width: Global.SIZE.W_55,
        height: Global.SIZE.W_55,
        borderRadius: Global.SIZE.W_55 / 2,
        backgroundColor: 'white',
        shadowOffset: { width: 2, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.2,
        shadowColor: 'black',
        elevation: 5,
    },
    dislikeContainer: {
        flex: 1,
        paddingTop: 30,
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
    likeContainer: {
        flex: 1,
        paddingTop: 30,
        alignItems: 'flex-end',
    },
    gradContainer: {
        flex: 1,
        borderRadius: Global.SIZE.W_60 / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    recipientContainer: {
        flex: 1,
        paddingTop: 13,
        alignItems: 'flex-end',
    },
    avatar: {
        width: Global.SIZE.W_55,
        height: Global.SIZE.W_55,
        borderRadius: Global.SIZE.W_55 / 2,
    },
});

export default Product;
