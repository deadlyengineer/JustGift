import React, { useState } from 'react';
import { StyleSheet, View, Pressable, FlatList } from 'react-native';
import Avatar from './components/avatar';
import Header from './components/header';
import FavItem from './components/favitem';
import Global from '../utils/global';
import { useSelector } from 'react-redux';

const FavList = (props) => {

    const recipient = useSelector(state => state.user.recipient);
    const [data, setData] = useState([]);
    const [pickerVisible, setPickerVisible] = useState(false);

    return (
        <View style={styles.bgContainer}>
            <Header page='favlist'/>
            <View style={styles.body}>
                <Pressable onPress={() => setPickerVisible(true)}>
                    <Avatar source={recipient.avatar} size={Global.SIZE.W_60} firstName={recipient.first_name} lastName={recipient.last_name}/>
                </Pressable>
                <FlatList
                    data={data}
                    renderItem={item => <FavItem key={item.docId} data={item}/>}
                    keyExtractor={item => item.docId}
                    ItemSeparatorComponent={null}
                />
            </View>
            <View style={styles.modalContainer}>

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
    },
    modalContainer: {
        
    },
});

export default FavList;
