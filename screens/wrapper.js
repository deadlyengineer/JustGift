import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { firebase } from '../firebase/config';
import { useDispatch } from 'react-redux';
import { changeUser } from '../store/actions/actions';
import { initDB } from '../utils/db';
import AppNavigator from '../navigations/auth';
import Splash from './splash';
import Offline from './offline';

const AppWrapper = () => {

    const dispatch = useDispatch();
    const [isLoaded, setLoaded] = useState(false);
    const [isOnline, setOnline] = useState(false);
    const [isConnecting, setConnecting] = useState(false);

    useEffect(() => {
        NetInfo.fetch().then(state => {
            if(state.isConnected)
                setOnline(true);
            setLoaded(true);
        });

        initDB().then(result => {
            //console.log(result);
            if(!result)
                Alert.alert('Failed to load DB file');
        });

        const subscriber = firebase.auth().onAuthStateChanged(user => {
            //console.log(user.uid);
            if(user)
                dispatch(changeUser(user.uid));
            else
                dispatch(changeUser(null));
        });

        return subscriber;
    }, []);

    const pressTryConnection = () => {
        setConnecting(true);
        NetInfo.fetch().then(state => {
            if(state.isConnected) {
                setConnecting(false);
                setOnline(true);
            } else {
                setConnecting(false);
                Alert.alert('Failed to connect to internet');
            }
        });
    }

    if(!isLoaded)
        return (<Splash/>);

    if(!isOnline)
        return (<Offline isConnecting={isConnecting} onClickTry={pressTryConnection}/>)

    return (<AppNavigator/>);
}

export default AppWrapper;
