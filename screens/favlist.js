import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, View, Text, Pressable, FlatList } from 'react-native';
import LottieView from 'lottie-react-native';
import Avatar from './components/avatar';
import Header from './components/header';
import FavItem from './components/favitem';
import Global from '../utils/global';
import { useSelector } from 'react-redux';
import Loading from './loading';

const FavList = (props) => {

    const recipient = useSelector(state => state.user.recipient);
    const [data, setData] = useState([]);
    const [pickerVisible, setPickerVisible] = useState(false);
    const [isLoaded, setLoaded] = useState(true);
    const [isEmpty, setEmpty] = useState(false);

    useLayoutEffect(() => {
        const listener = props.navigation.addListener('didFocus', () => {
            
        });
    }, []);

    useEffect(() => {
        if(data.length < 1)
            setEmpty(true);
    }, [data]);

    if(!isLoaded)
        return (<Loading/>);

    return (
        <View style={styles.bgContainer}>
            <Header page='favlist'/>
            <View style={styles.body}>
                <Pressable onPress={() => setPickerVisible(true)}>
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
                            renderItem={item => <FavItem diffKey={item.docId} data={item}/>}
                            keyExtractor={item => item.docId}
                            ItemSeparatorComponent={null}
                        />
                }
            </View>
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
