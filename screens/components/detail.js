import React from 'react';
import { StyleSheet, View, Text, Image, Modal, TouchableOpacity, ScrollView } from 'react-native';
import Global from '../../utils/global';

const DetailDlg = (props) => {

    return (
        <Modal
            animationType='slide'
            visible={props.visible}
            transparent
            onShow={() => {}}
        >
            <View style={styles.overlay}>
                <View style={styles.bgContainer}>
                    <View style={styles.introContainer}>
                        <View style={styles.row}>
                            <Text style={styles.priceText}>{(props.data.currency == 0 ? '£' : '$') + props.data.price}</Text>
                            <Text style={styles.nameText}>{props.data.name}</Text>
                        </View>
                        <Text style={styles.descText}>{props.data.description}</Text>
                    </View>
                    <ScrollView style={styles.reviewContainer}>
                        <Text style={styles.reviewText}>
                            {props.data.review}
                        </Text>
                    </ScrollView>
                </View>
                <TouchableOpacity style={styles.downBtn} onPress={() => props.onChangeVisible(false)}>
                    <Image source={Global.IMAGE.DOWN} style={styles.btnImg}/>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        width: Global.SIZE.WIDTH,
        height: Global.SIZE.H_360,
        backgroundColor: 'transparent',
        paddingTop: 25,
        top: Global.SIZE.HEIGHT - Global.SIZE.H_360,
    },
    downBtn: {
        position: 'absolute',
        right: Global.SIZE.W_20,
        width: 50,
        height: 50,
    },
    btnImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    bgContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopColor: 'gray',
        borderTopWidth: 0.2,
        paddingBottom: 40,
    },
    introContainer: {
        height: 80,
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    priceText: {
        fontFamily: 'AvenirBook',
        fontSize: 19,
        marginRight: 10,
        color: Global.COLOR.TXT_PRICE,
    },
    nameText: {
        fontFamily: 'AvenirBlack',
        fontSize: 19,
        color: 'black',
    },
    descText: {
        fontFamily: 'AvenirBook',
        fontSize: 14,
        lineHeight: 16,
        color: Global.COLOR.TXT_DESC,
        marginTop: 3,
    },
    reviewContainer: {
        padding: 20,
    },
    reviewText: {
        fontSize: 20,
        lineHeight: 22,
        color: Global.COLOR.BTN_MORE,
        marginBottom: 30,
    },
});

export default DetailDlg;
