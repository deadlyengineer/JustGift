import React from 'react';
import { StyleSheet, View, Text, Pressable, Modal, Alert } from 'react-native';
import Global from '../../utils/global';
import { useSelector, useDispatch } from 'react-redux';
import { changeRecipient } from '../../store/actions/actions';
import { deleteLocalFavorite } from '../../utils/db';

const DeleteDlg = (props) => {

    const userId = useSelector(state => state.user.userId);
    const recipient = useSelector(state => state.user.recipient);
    const dispatch = useDispatch();

    const pressDeleteAction = () => {
        if(userId == null) {
            deleteLocalFavorite(recipient, props.item).then(result => {
                if(result) {
                    let target = recipient;
                    const idx = target.favorites.findIndex(element => element == props.item);
                    if(idx > -1) {
                        target.favorites.splice(idx, 1);
                        dispatch(changeRecipient(target));
                    }
                    props.onChangeVisible(false);
                    props.navigation.navigate('FavList');
                } else {
                    Alert.alert('Failed to delete the item');
                }
            }).catch(err => console.log(err));
        } else {

        }
    }

    return (
        <Modal
            animationType='fade'
            visible={props.visible}
            transparent
            onShow={() => {}}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <Text style={styles.warnText}>Would you like to delete this item?</Text>
                    </View>
                    <Pressable style={styles.button} onPress={pressDeleteAction}>
                        <Text style={styles.delText}>Delete</Text>
                    </Pressable>
                </View>
                <Pressable style={[styles.button, { borderRadius: 10 }]} onPress={() => props.onChangeVisible(false)}>
                    <Text style={styles.noText}>Cancel</Text>
                </Pressable>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        width: Global.SIZE.WIDTH,
        height: Global.SIZE.HEIGHT,
        backgroundColor: Global.COLOR.BLACK_40,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 40,
    },
    container: {
        width: Global.SIZE.W_374,
        height: Global.SIZE.W_110,
        borderRadius: 10,
        backgroundColor: 'white',
        marginBottom: 10,
        overflow: 'hidden',
    },
    button: {
        width: Global.SIZE.W_374,
        height: Global.SIZE.W_60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.3,
        borderBottomColor: 'gray',
    },
    warnText: {
        fontSize: 14,
        color: Global.COLOR.TXT_DESC,
    },
    delText: {
        fontSize: 20,
        color: 'rgba(254, 59, 49, 1)',
        fontWeight: 'bold',
    },
    noText: {
        fontSize: 20,
        color: 'rgba(0, 122, 255, 1)',
        fontWeight: 'bold',
    },
});

export default DeleteDlg;
