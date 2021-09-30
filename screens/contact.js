import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import Header from './components/header';
import ContactItem from './components/contactitem';
import Global from '../utils/global';
import { useSelector } from 'react-redux';
import { getLocalContacts } from '../utils/db';
import Loading from './loading';
import NewDlg from './components/new';
import EditDlg from './components/edit';

const Contact = () => {

    const userId = useSelector(state => state.user.userId);

    const [addVisible, setAddVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const [data, setData] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        if(!addVisible && !editVisible) {
            setLoaded(false);
            if(userId == null) {
                getLocalContacts().then(result => {
                    if(result != null) {
                        if(result.length < 1)
                            setAddVisible(true);
                        else
                            setData(result);
                        setLoaded(true);
                    }
                }).catch(err => console.log(err));
            } else {
                
            }
        }
    }, [addVisible, editVisible]);

    const pressContactItem = item => {
        setSelectedItem(item);
        setEditVisible(true);
    }

    if(!isLoaded)
        return (<Loading/>);

    return (
        <View style={{ flex: 1, backgroundColor: Global.COLOR.BACKGROUND, alignItems: 'center' }}>
            <Header page='contact' onClickAdd={() => setAddVisible(true)}/>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={data}
                    renderItem={({item, index}) => <ContactItem diffKey={`${index}`} data={item} onClickItem={() => pressContactItem(item)}/>}
                    keyExtractor={(item, index) => item.first_name + item.last_name + index}
                    ItemSeparatorComponent={null}
                />
            </View>
            <NewDlg
                visible={addVisible}
                onChangeVisible={setAddVisible}
                required={false}
            />
            <EditDlg
                visible={editVisible}
                onChangeVisible={setEditVisible}
                data={selectedItem}
            />
        </View>
    );
}

export default Contact;
