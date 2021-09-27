import React from 'react';
import { StyleSheet, View, Image, Text, Pressable } from 'react-native';

const FavItem = (props) => {

    return (
        <View key={props.key} style={styles.container}>
            <Pressable style={styles.item}>
                <View style={{ flex: 6 }}>
                    <Text style={styles.priceText}>{(props.data.currency == '0' ? '£' : '$') + props.data.price}</Text>
                    <Text style={styles.nameText}>{props.data.name}</Text>
                </View>
                <View style={{ flex: 4 }}>
                    <Image source={{ uri: props.data.img_1 }} style={styles.image}/>
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
        marginBottom: 15,
    },
    item: {
        flexDirection: 'row',
        width: global.SIZE.W_380,
        height: global.SIZE.W_115,
        borderRadius: 10,
        marginHorizontal: 15,
        paddingHorizontal: 35,
        paddingVertical: 10,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceText: {
        fontFamily: 'AvenirBook',
        fontSize: 17,
    },
    nameText: {
        fontFamily: 'AvenirBlack',
        fontSize: 17,
        marginTop: 5,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        alignSelf: 'center',
    },
});

export default FavItem;
