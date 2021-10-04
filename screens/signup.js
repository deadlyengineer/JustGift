import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { firebase } from '../firebase/config';
import { getLocalContacts } from '../utils/db';
import { createContact, uploadImage } from '../firebase/crud';
import Global from '../utils/global';
import SvgIcon from '../utils/svg';

const SignUp = (props) => {

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [repwd, setRepwd] = useState('');
    const [isKB, setKB] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKB(true));
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKB(false));

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        }
    }, []);

    const migrateDB = (userId) => {
        getLocalContacts().then(contacts => {
            contacts.forEach(contact => {
                if(contact.avatar == null) {
                    const data = {
                        ...contact,
                        user_id: userId,
                    };
                    createContact(data);
                } else {
                    uploadImage(contact.avatar, userId).then(fileUrl => {
                        const data = {
                            ...contact,
                            avatar: fileUrl,
                            user_id: userId,
                        }
                    }).catch(err => console.log(err));
                }
            });
        }).catch(err => console.log(err));
    }

    const pressRegisterAction = () => {
        if(pwd == '' || email == '') {
            Alert.alert("Email or password can't be empty");
            return;
        }
        if(pwd != repwd) {
            Alert.alert("Passwords don't match");
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email, pwd).then(res => {
            Alert.alert('User account is created successfully.');
            //console.log(res.user.uid);
            migrateDB(res.user.uid);
            props.navigation.navigate('Main');
        }).catch(err => {
            if(err.code == 'auth/email-already-in-use')
                Alert.alert('The email address is already in use.');
            if(err.code == 'auth/invalid-email')
                Alert.alert('The email address is invalid.');
        });
    }

    const pressLogInAction = () => {
        props.navigation.navigate('SignIn');
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
            <TextInput
                style={[styles.input, { marginBottom: isKB ? 60 : 0 }]}
                placeholder='Confirm your Password'
                value={repwd}
                secureTextEntry
                onChangeText={text => setRepwd(text)}
            />
            <TouchableOpacity style={styles.submitBtn} onPress={pressRegisterAction}>
                <Text style={styles.submitText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.extraBtn} onPress={pressLogInAction}>
                <Text style={styles.submitText}>Log in</Text>
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
    },
    title: {
        fontFamily: 'AvenirBlack',
        fontSize: 29,
        color: Global.COLOR.PRIMARY,
        marginTop: 40,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    indication: {
        fontFamily: 'AvenirBook',
        fontSize: 16,
        lineHeight: 21,
        color: Global.COLOR.GRAY74,
        textAlign: 'center',
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

export default SignUp;
