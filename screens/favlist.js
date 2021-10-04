import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, View, Text, Pressable, FlatList } from 'react-native';
import LottieView from 'lottie-react-native';
import Avatar from './components/avatar';
import Header from './components/header';
import FavItem from './components/favitem';
import Global from '../utils/global';
import { useSelector } from 'react-redux';
import { getLocalContacts } from '../utils/db';
import { getProducts, getContacts } from '../firebase/crud';
import Loading from './loading';
import PickerDlg from './components/picker';

const FavList = (props) => {

    const userId = useSelector(state => state.user.userId);
    const recipient = useSelector(state => state.user.recipient);
    const [data, setData] = useState([]);
    const [productData, setProductData] = useState([]);
    const [contactData, setContactData] = useState([]);
    const [pickerVisible, setPickerVisible] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [isFirstLoaded, setFirstLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isEmpty, setEmpty] = useState(false);

    useLayoutEffect(() => {
        const listener = props.navigation.addListener('didFocus', () => {
            setLoaded(false);
            if(userId == null) {
                getLocalContacts().then(result => {
                    if(result != null) {
                        setContactData(result);
                        setLoaded(true);
                    }
                }).catch(err => console.log(err));
            } else {
                
            }
        });

        return () => listener.remove();
    }, []);

    useEffect(() => {
        getProducts({ price: 0, age: 9, gender: 2 }).then(result => {
            setProductData(result);
            setFirstLoaded(true);
        }).catch(err => console.log(err));
    }, []);

    useEffect(() => {
        if(data.length < 1 && isLoaded)
            setEmpty(true);
        else
            setEmpty(false);
    }, [data]);

    useEffect(() => {
        if(isLoaded && isFirstLoaded) {
            setLoading(true);
            const idx = contactData.findIndex(element => element.first_name == recipient.first_name && element.last_name == recipient.last_name);
            if(idx > -1) {
                let items = [];
                contactData[idx].favorites.forEach(item => {
                    const pos = productData.findIndex(element => element.docId == item);
                    if(pos > -1)
                        items.push(productData[pos]);
                });
                setData(items);
            }
            setLoading(false);
        }
    }, [recipient, isLoaded, isFirstLoaded]);

    const pressItemAction = item => {
        props.navigation.navigate('Favorite', item);
    }

    if(!isLoaded || !isFirstLoaded)
        return (<Loading/>);

    return (
        <View style={styles.bgContainer}>
            <Header page='favlist'/>
            <View style={styles.body}>
                <Pressable onPress={() => setPickerVisible(true)} style={{ marginTop: 10 }}>
                    <Avatar source={recipient.avatar} size={Global.SIZE.W_60} firstName={recipient.first_name} lastName={recipient.last_name}/>
                </Pressable>
                {
                    isEmpty ?
                        <View style={styles.emptyContainer}>
                            <LottieView
                                source={Global.ANIMATION.CART}
                                style={{ width: 200, height: 200 }}
                                autoPlay
                                loop
                            />
                            <Text style={styles.emptyText}>No favorite gifts ...</Text>
                        </View>
                    :   <FlatList
                            data={data}
                            renderItem={({item}) => <FavItem diffKey={item.docId} data={item} onClickItem={() => pressItemAction(item)}/>}
                            keyExtractor={item => item.docId}
                            refreshing={loading}
                            onRefresh={() => {}}
                            ItemSeparatorComponent={null}
                        />
                }
            </View>
            <PickerDlg
                visible={pickerVisible}
                onChangeVisible={setPickerVisible}
                data={contactData}
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
        flex: 1,
        flexDirection: 'column-reverse',
        paddingBottom: 30,
        alignItems: 'center',
    },
    emptyContainer: {
        flex : 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontFamily: 'AvenirBlack',
        fontSize: 22,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default FavList;
