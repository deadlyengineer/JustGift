import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import SwipeCards from 'react-native-swipe-cards-deck';
import Global from '../utils/global';
import Loading from './loading';
import GiftCard from './components/giftcard';

const Product = () => {

    const tinderCards = useRef(null);

    const renderCardItem = item => (
        <GiftCard data={item} dotColor={Global.COLOR.PRIMARY}/>
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
                    <TouchableOpacity style={styles.filterBtn}>
                        <LinearGradient colors={['rgba(250, 250, 250, 1)', 'rgba(240, 240, 240, 1)']} style={[styles.gradContainer, { borderRadius: global.SIZE.W_55 / 2 }]}>
                            <Icon name='filter' type='font-awesome-5' color={Global.COLOR.ICON_ACTIVE} size={20}/>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View style={styles.dislikeContainer}>
                    <TouchableOpacity style={styles.roundBtn}>
                        <LinearGradient colors={['rgba(249, 219, 222, 1)', 'white']} style={styles.gradContainer}>
                            <Icon name='close' type='ionicon' color={Global.COLOR.PRIMARY} size={40}/>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View style={styles.likeContainer}>
                    <TouchableOpacity style={styles.roundBtn}>
                        <LinearGradient colors={['rgba(220, 249, 232, 1)', 'white']} style={styles.gradContainer}>
                            <Icon name='heart' type='ionicon' color={Global.COLOR.SECONDARY} size={37}/>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View style={styles.recipientContainer}>
                    <Pressable>
                        
                    </Pressable>
                </View>
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
        width: global.SIZE.W_55,
        height: global.SIZE.W_55,
        borderRadius: global.SIZE.W_55 / 2,
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
        width: global.SIZE.W_60,
        height: global.SIZE.W_60,
        borderRadius: global.SIZE.W_60 / 2,
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
    },
    gradContainer: {
        flex: 1,
        borderRadius: global.SIZE.W_60 / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    recipientContainer: {
        flex: 1,
        paddingTop: 13,
    },
});

export default Product;
