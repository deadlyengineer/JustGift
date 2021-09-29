import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, Alert } from 'react-native';
import SwitchToggle from 'react-native-switch-toggle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '../firebase/config';
import * as FileSystem from 'expo-file-system';
import Header from './components/header';
import Global from '../utils/global';
import { useSelector, useDispatch } from 'react-redux';
import { changeNotify } from '../store/actions/actions';

const Setting = (props) => {

    const userId = useSelector(state => state.user.userId);
    const dispatch = useDispatch();
    const [isToggle, setToggle] = useState(useSelector(state => state.setting.notifyStatus));
    const fileDir = FileSystem.documentDirectory + 'justgift.db';

    useEffect(() => {
        AsyncStorage.setItem('notification', isToggle ? '1' : '0').then(() => {
            dispatch(changeNotify(isToggle));
        }).catch(err => {
            console.log(err);
            Alert.alert('Failed to change notification status');
        });
    }, [isToggle]);

    const pressLogoutAction = () => {
        Alert.alert('Are you sure?', 'Do you really want to ' + (userId == null ? 'clear all data?' : 'sign out?'),
        [
            {
                text: 'No',
                onPress: () => { return; }
            },
            {
                text: 'Yes',
                onPress: () => {
                    firebase.auth().signOut().then(() => {
                        FileSystem.writeAsStringAsync(fileDir, '').then(() => {
                            props.navigation.navigate('Auth');
                        }).catch(err => {
                            console.log(err);
                            Alert.alert('Failed to sign out. Please try again.');
                        });
                    });
                }
            }
        ]);
    }

    return (
        <View style={styles.bgContainer}>
            <Header page='setting'/>
            <View style={styles.body}>
                <Pressable style={styles.btn}>
                    <Text style={[styles.btnText, { fontSize: 20 }]}>Email: ben.m.rosenfeld@gmail.com</Text>
                </Pressable>
                <Pressable style={[styles.btn, { alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start' }]}>
                    <Text style={styles.btnText}>Push Notifications</Text>
                    <SwitchToggle
                        switchOn={isToggle}
                        onPress={() => setToggle(!isToggle)}
                        circleColorOn='white'
                        circleColorOff='white'
                        backgroundColorOn={Global.COLOR.SECONDARY}
                        backgroundColorOff={Global.COLOR.BTN_INACTIVE}
                        containerStyle={styles.switchTrack}
                        circleStyle={styles.switchThumb}
                    />
                </Pressable>
                <Pressable style={styles.btn}>
                    <Text style={styles.btnText}>Privacy Policy</Text>
                </Pressable>
                <Pressable style={styles.btn}>
                    <Text style={styles.btnText}>Help and Support</Text>
                </Pressable>
                <Pressable style={styles.btn}>
                    <Text style={styles.btnText}>Terms of Service</Text>
                </Pressable>
            </View>
            <View style={styles.footer}>
                <Pressable style={{ alignItems: 'center', justifyContent: 'center'}} onPress={pressLogoutAction}>
                    <Text style={styles.btnText}>{userId == null ? 'Clear all data' : 'Log out'}</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    bgContainer: {
        flex: 1,
        backgroundColor: Global.COLOR.BACKGROUND,
    },
    body: {
        marginTop: 65,
        paddingHorizontal: 30,
    },
    btn: {
        width: '100%',
        height: 60,
        borderTopWidth: 0.5,
        borderTopColor: Global.COLOR.BORDER,
        justifyContent: 'center',
    },
    btnText: {
        fontFamily: 'AvenirHeavy',
        fontSize: 25,
        fontWeight: 'bold',
    },
    switchTrack: {
        width: 50,
        height: 30,
        borderRadius: 15,
        padding: 2,
        marginLeft: 35,
    },
    switchThumb: {
        width: 26,
        height: 26,
        borderRadius: 13,
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 60,
    },
});

export default Setting;
