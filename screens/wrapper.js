import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { firebase } from '../firebase/config';
import { useDispatch } from 'react-redux';
import { changeUser, changeGuest } from '../store/actions/actions';
import Loading from './location';

const AppWrapper = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(user => {
            console.log(user.uid);
            if(user) {
                dispatch(changeUser(user.uid));
            } else {
                dispatch(changeUser(null));
            }
        });

        return subscriber;
    }, []);

    return (<Loading/>);
}

export default AppWrapper;
