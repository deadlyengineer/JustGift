import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { firebase } from '../firebase/config';
import Global from '../utils/global';
import SvgIcon from '../utils/svg';

const SignIn = (props) => {

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [isKB, setKB] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKB(true));
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKB(false));

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        }
    }, []);

    const pressLogInAction = () => {

    }

    const pressRegisterAction = () => {
        
    }

    return (
        <View style={styles.bgContainer}>
            <View style={styles.giftImg}>
                <SvgIcon icon='logo'/>
            </View>
            <Text style={styles.title}>Find Your Perfect Gift!</Text>
            { isKB ? null : <Text style={styles.indication}>{'Are you ready to find your perfect gift?' + '\n' + 'Browse through a selection of cool gifts today!'}</Text> }
            <TextInput
                style={styles.input}
                placeholder='Enter your Email'
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder='Enter your Password'
                value={pwd}
                secureTextEntry
                onChangeText={text => setPwd(text)}
            />
            <TouchableOpacity style={styles.submitBtn} onPress={pressLogInAction}>
                <Text style={styles.submitText}>Log in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.extraBtn} onPress={pressRegisterAction}>
                <Text style={styles.submitText}>Register</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    bgContainer: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 55,
    },
    giftImg: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontFamily: 'AvenirBlack',
        fontSize: 29,
        color: Global.COLOR.PRIMARY,
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    indication: {
        fontFamily: 'AvenirBook',
        fontSize: 16,
        lineHeight: 21,
        color: Global.COLOR.GRAY74,
        textAlign: 'center',
        //marginTop: 20,
        marginBottom: 30,
    },
    submitBtn: {
        width: 200,
        height: 50,
        borderRadius: 12,
        marginTop: 30,
        backgroundColor: Global.COLOR.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitText: {
        fontFamily: 'AvenirHeavy',
        fontSize: 20,
        color: 'white',
    },
    inputContainer: {
        paddingBottom: 10,
    },
    input: {
        width: 300,
        height: 50,
        borderRadius: 12,
        paddingHorizontal: 20,
        marginTop: 15,
        backgroundColor: 'white',
        shadowOffset: { width: 0, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        fontSize: 18,
    },
    extraBtn: {
        width: 200,
        height: 50,
        borderRadius: 12,
        marginTop: 20,
        backgroundColor: Global.COLOR.SECONDARY,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SignIn;
