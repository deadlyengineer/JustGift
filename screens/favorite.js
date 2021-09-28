import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';

const Favorite = () => {

    const userId = useSelector(state => state.user.userId);
    const recipient = useSelector(state => state.user.recipient);

    return (
        <View>

        </View>
    );
}

const styles = StyleSheet.create({

});

export default Favorite;
