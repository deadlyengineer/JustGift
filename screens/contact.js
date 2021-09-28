import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import Header from './components/header';
import ContactItem from './components/contactitem';
import Global from '../utils/global';
import { useSelector } from 'react-redux';

const Contact = () => {

    const userId = useSelector(state => state.user.userId);

    const [addVisible, setAddVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const [data, setData] = useState([]);

    const pressContactItem = item => {
        setSelectedItem(item);
        setEditVisible(true);
    }

    return (
        <View style={{ flex: 1, backgroundColor: Global.COLOR.BACKGROUND, alignItems: 'center' }}>
            <Header page='contact' onClickAdd={() => setAddVisible(true)}/>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={data}
                    renderItem={(item, index) => <ContactItem key={`${index}`} data={item} onClickItem={() => pressContactItem(item)}/>}
                    keyExtractor={(item, index) => item.first_name + item.last_name + index}
                    ItemSeparatorComponent={null}
                />
            </View>
        </View>
    );
}

export default Contact;
