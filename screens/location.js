import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ImageBackground, TouchableOpacity, Pressable, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import Global from '../utils/global';
import Loading from './loading';

const LocationPermission = (props) => {

    const [isClicked, setClicked] = useState(false);
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await Location.getForegroundPermissionsAsync();
            if(status !== 'granted')
                setLoaded(true);
            else
                props.navigation.navigate('Notification');
        })();
    }, []);

    const pressSubmitAction = () => {
        setClicked(true);
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if(status !== 'granted') {
                Alert.alert('Your location permission is denied');
                setClicked(false);
            } else {
                props.navigation.navigate('Notification');
            }
        })();
    }

    if(!isLoaded)
        return (<Loading/>);

    return (
        <ImageBackground source={Global.IMAGE.LOCATION} style={styles.bgContainer}>
            <TouchableOpacity>
                <LinearGradient>
                    {
                        isClicked ? <ActivityIndicator size='large' color='white'/>
                                  : <Text>ALLOW LOCATION</Text>
                    }
                </LinearGradient>
            </TouchableOpacity>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    bgContainer: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-end',
        alignItems: 'center',
        bottom: 40,
    },
});

export default LocationPermission;
