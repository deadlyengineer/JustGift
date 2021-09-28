import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Divider from 'react-native-divider';
import Global from '../utils/global';
import SvgIcon from '../utils/svg';

const LogIn = (props) => {

    const logInApple = () => {

    }

    const logInFacebook = () => {

    }

    const logInGoogle = () => {

    }

    const logInEmail = () => {
        props.navigation.navigate('SignIn');
    }

    return (
        <View style={styles.bgContainer}>
            <View style={styles.giftImg}>
                <SvgIcon icon='logo'/>
            </View>
            <Text style={styles.title}>Find Your Perfect Gift!</Text>
            <Text style={styles.indication}>{'Are you ready to find your perfect gift?' + '\n' + 'Browse through a selection of cool gifts today!'}</Text> 
            <TouchableOpacity style={styles.appleBtn} onPress={logInApple}>
                <SvgIcon icon='apple'/>
                <Text style={styles.appleText}>Continue with Apple</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.facebookBtn} onPress={logInFacebook}>
                <SvgIcon icon='facebook'/>
                <Text style={styles.facebookText}>Continue with Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.googleBtn} onPress={logInGoogle}>
                <SvgIcon icon='google'/>
                <Text style={styles.googleText}>Continue with Google</Text>
            </TouchableOpacity>
            <Divider orientation='center' borderColor={Global.COLOR.GRAY74} color={Global.COLOR.GRAY74}>or</Divider>
            <TouchableOpacity style={styles.emailBtn} onPress={logInEmail}>
                <Text style={styles.emailText}>Continue with email</Text>
            </TouchableOpacity>
            <Text style={{ marginTop: 10, alignSelf: 'flex-start' }}>
                <Text style={styles.textNormal}>By continuing you agree to our </Text>
                <Text style={styles.textEm}>T&Cs. </Text>
                <Text style={styles.textNormal}>Please also check out our </Text>
                <Text style={styles.textEm}>Privacy Policy.</Text>
            </Text>
            <Text style={{ marginTop: 10, alignSelf: 'flex-start' }}>
                <Text style={styles.textNormal}>We use your data to offer you a personalized experience and to better understand and improve our services. For more information </Text>
                <Text style={styles.textEm}>see here.</Text>
            </Text>
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
        fontWeight: 'bold',
    },
    indication: {
        fontFamily: 'AvenirBook',
        fontSize: 16,
        lineHeight: 21,
        color: Global.COLOR.GRAY74,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    appleBtn: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        backgroundColor: 'black',
        borderRadius: 5,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    facebookBtn: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        backgroundColor: Global.COLOR.FACEBOOK,
        borderRadius: 5,
        marginHorizontal: 20,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    googleBtn: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        borderRadius: 5,
        borderColor: Global.COLOR.BUTTON_BORDER,
        borderWidth: 2,
        marginHorizontal: 20,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emailBtn: {
        marginTop: 10,
        marginBottom: 20,
    },
    appleText: {
        fontSize: 18,
        color: 'white',
        marginLeft: 8,
        fontWeight: 'bold',
    },
    facebookText: {
        fontSize: 17,
        color: 'white',
        marginLeft: 8,
    },
    googleText: {
        fontSize: 17,
        marginLeft: 8,
        fontWeight: 'bold',
    },
    emailText: {
        fontSize: 17,
        color: Global.COLOR.TEXT_EM,
    },
    textNormal: {
        fontSize: 11,
        color: Global.COLOR.GRAY74,
        letterSpacing: -0.4,
    },
    textEm: {
        fontSize: 12,
        color: Global.COLOR.TEXT_EM,
        fontWeight: 'bold',
    },
});

export default LogIn;
