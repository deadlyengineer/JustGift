import React from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import Global from '../../utils/global';
import { getOccasionFromDate } from '../../utils/helper';

const ContactItem = (props) => {

    return (
        <View key={props.diffKey} style={styles.container}>
            <Pressable style={styles.item} onPress={props.onClickItem}>
                <Image source={props.data.avatar == null ? Global.IMAGE.UNKNOWN : { uri: props.data.avatar }} style={styles.avatar}/>
                <View style={styles.infoContainer}>
                    <Text style={styles.nameText}>{props.data.first_name + ' ' + props.data.last_name}</Text>
                    <Text>
                        <Text style={styles.indexText}>{props.data.occasion + ': '}</Text>
                        <Text style={styles.dateText}>{getOccasionFromDate(props.data.date)}</Text>
                    </Text>
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        shadowOpacity: 0.2,
        shadowColor: 'black',
        elevation: 5,
        marginBottom: 12,
    },
    item: {
        flexDirection: 'row',
        width: Global.SIZE.W_355,
        height: Global.SIZE.W_88,
        borderRadius: 23,
        paddingHorizontal: 30,
        marginHorizontal: 30,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    avatar: {
        height: Global.SIZE.W_60,
        width: Global.SIZE.W_60,
        borderRadius: Global.SIZE.W_60 / 2,
    },
    infoContainer: {
        marginLeft: 20,
        justifyContent: 'center',
    },
    nameText: {
        fontFamily: 'AvenirBlack',
        fontSize: 16,
        color: 'rgba(49, 49, 49, 1)',
        marginBottom: 5,
    },
    indexText: {
        fontFamily: 'AvenirBook',
        fontSize: 14,
        color: 'rgba(206, 206, 206, 1)',
    },
    dateText: {
        fontFamily: 'AvenirBlack',
        fontSize: 14,
        color: 'rgba(206, 206, 206, 1)',
        fontWeight: 'bold',
    },
});

export default ContactItem;
