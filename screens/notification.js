import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, Text, TouchableOpacity, Pressable, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Notifications from 'expo-notifications';
import Global from '../utils/global';
import Loading from './loading';

const NotificationPermission = (props) => {

    const [isClicked, setClicked] = useState(false);
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            const response = await Notifications.getPermissionsAsync();
            if(response.ios.status !== Notifications.IosAuthorizationStatus.AUTHORIZED)
                setLoaded(true);
            else
                props.navigation.navigate('Instruction');
        })();
    }, []);

    const pressSubmitAction = () => {
        setClicked(true);
        (async () => {
            const response = await Notifications.requestPermissionsAsync({
                ios: {
                    allowAlert: true,
                    allowBadge: true,
                    allowSound: true,
                    allowAnnouncements: true,
                },
            });
            if(response.ios.status != Notifications.IosAuthorizationStatus.AUTHORIZED) {
                Alert.alert('Your notification permission is denied');
                setClicked(false);
            } else {
                props.navigation.navigate('Instruction');
            }
        })();
    }

    if(!isLoaded)
        return (<Loading/>);

    return (
        <ImageBackground source={Global.IMAGE.NOTIFY} style={styles.bgContainer}>
            <TouchableOpacity onPress={pressSubmitAction}>
                <LinearGradient
                    colors={['rgba(232, 64, 125, 1)', 'rgba(238, 127, 94, 1)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradient}
                >
                    {
                        isClicked ? <ActivityIndicator size='large' color='white'/>
                                  : <Text style={styles.btnText}>I WANT TO BE NOTIFIED</Text>
                    }
                </LinearGradient>
            </TouchableOpacity>
            <Pressable style={styles.moreBtn} onPress={() => props.navigation.navigate('Instruction')}>
                <Text style={styles.moreText}>NOT NOW</Text>
            </Pressable>
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
    gradient: {
        width: Global.SIZE.W_260,
        height: Global.SIZE.W_60,
        borderRadius: Global.SIZE.W_60 / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontSize: 19,
        letterSpacing: -0.5,
        fontWeight: 'bold',
        color: 'white',
    },
    moreBtn: {
        marginTop: 20,
    },
    moreText: {
        fontSize: 17,
        color: Global.COLOR.BTN_MORE
    },
});

export default NotificationPermission;
