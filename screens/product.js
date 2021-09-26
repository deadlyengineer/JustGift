import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
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
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    bgContainer: {},
    body: {},
    footer: {},
});

export default Product;
