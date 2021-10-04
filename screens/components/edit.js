import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Modal, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import Avatar from './avatar';
import Global from '../../utils/global';
import { useSelector } from 'react-redux';
import { getStringFromDate } from '../../utils/helper';
import { updateLocalContact, deleteLocalContact } from '../../utils/db';
import { deleteContact, updateContact, uploadImage } from '../../firebase/crud';

const EditDlg = (props) => {

    const userId = useSelector(state => state.user.userId);
    const recipient = useSelector(state => state.user.recipient);

    const [avatar, setAvatar] = useState(Global.IMAGE.UNKNOWN.uri);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [occasion, setOccasion] = useState('');
    const [date, setDate] = useState(null);
    const [dateVisible, setDateVisible] = useState(false);
    const [isEnabled, setEnabled] = useState(false);

    useEffect(() => {
        if(firstName != '' && lastName != '' && occasion != '' && date != null)
            setEnabled(true);
        else
            setEnabled(false);
    }, [firstName, lastName, occasion, date]);

    const initStates = () => {
        setAvatar(props.data.avatar);
        setFirstName(props.data.first_name);
        setLastName(props.data.last_name);
        setOccasion(props.data.occasion);
        setDate(new Date(props.data.date));
    }

    const compressImage = async(uri) => {
        const manipResult = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { width: 100, height: 100 } }],
            { compress: 1, format: ImageManipulator.SaveFormat.PNG }
        );
        return manipResult;
    }

    const pressGalleryAction = () => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if(status !== 'granted') {
                Alert.alert('Sorry, we need this permission to access your media!');
            } else {
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                });
    
                if(!result.cancelled)
                    compressImage(result.uri).then(res => {
                        setAvatar(res.uri);
                    });
            }
        })();
    }

    const handleConfirmDate = date => {
        setDate(date);
        setDateVisible(false);
    }

    const pressSubmitAction = () => {
        const data = {
            avatar: avatar,
            first_name: firstName,
            last_name: lastName,
            occasion: occasion,
            date: date,
        };
        if(userId == null) {
            updateLocalContact(props.data, data).then(result => {
                if(result)
                    props.onChangeVisible(false);
                else
                    Alert.alert('Failed to update the event');
            }).catch(err => console.log(err));
        } else {
            if(avatar != props.data.avatar) {
                uploadImage(avatar, userId).then(fileUrl => {
                    if(fileUrl == null)
                        Alert.alert('Failed to upload your photo');
                    else {
                        const data = {
                            avatar: fileUrl,
                            first_name: firstName,
                            last_name: lastName,
                            occasion: occasion,
                            date: date.toString(),
                        };
                        updateContact(props.data.docId, data).then(result => {
                            if(result)
                                props.onChangeVisible(false);
                            else
                                Alert.alert('Failed to update the event');
                        }).catch(err => console.log(err));
                    }
                }).catch(err => console.log(err));
            } else {
                const data = {
                    avatar: avatar,
                    first_name: firstName,
                    last_name: lastName,
                    occasion: occasion,
                    date: date.toString(),
                };
                updateContact(props.data.docId, data).then(result => {
                    if(result)
                        props.onChangeVisible(false);
                    else
                        Alert.alert('Failed to update the event');
                }).catch(err => console.log(err));
            }
        }
    }

    const pressDeleteAction = () => {
        Alert.alert('Are you sure?', 'Do you really want to delete it?',
        [
            {
                text: 'No',
                onPress: () => { return; }
            },
            {
                text: 'Yes',
                onPress: () => {
                    if(props.data.first_name == recipient.first_name && props.data.last_name == recipient.last_name) {
                        Alert.alert('This user is in selection now');
                        return;
                    }
                    if(userId == null) {
                        deleteLocalContact(props.data).then(result => {
                            if(result)
                                props.onChangeVisible(false);
                            else
                                Alert.alert('Failed to delete the event');
                        }).catch(err => console.log(err));
                    } else {
                        deleteContact(props.data.docId).then(result => {
                            if(result)
                                props.onChangeVisible(false);
                            else
                                Alert.alert('Failed to delete the event');
                        }).catch(err => console.log(err));
                    }
                }
            }
        ]);
    }

    return (
        <Modal
            animationType='slide'
            visible={props.visible}
            transparent
            onShow={initStates}
        >
            <View style={styles.overlay}>
                <View style={styles.avatarContainer}>
                    <View style={styles.btnGroup}>
                        <TouchableOpacity style={styles.cancelBtn} onPress={pressDeleteAction}>
                            <Text style={styles.btnText}>Delete</Text>
                        </TouchableOpacity>
                        <Text style={styles.titleText}>Edit Event</Text>
                        <TouchableOpacity style={styles.doneBtn} onPress={pressSubmitAction} disabled={!isEnabled}>
                            <Text style={[styles.btnText, { color: isEnabled ? Global.COLOR.BTN_ACTIVE : Global.COLOR.BTN_INACTIVE }]}>Save</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.imgContainer}>
                        <Avatar source={avatar} size={Global.SIZE.W_170 - 45} firstName={firstName} lastName={lastName}/>
                        <TouchableOpacity style={{ marginTop: 10 }} onPress={pressGalleryAction}>
                            <Text style={styles.btnText}>Add Photo</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <KeyboardAwareScrollView style={styles.inputContainer} keyboardShouldPersistTaps={'always'}>
                    <TextInput
                        style={styles.input}
                        placeholder='First name'
                        value={firstName}
                        onChangeText={text => setFirstName(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Last name'
                        value={lastName}
                        onChangeText={text => setLastName(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Occasion (e.g. Birthday)'
                        value={occasion}
                        onChangeText={text => setOccasion(text)}
                    />
                    <Pressable onPress={() => setDateVisible(true)}>
                        <TextInput
                            style={styles.input}
                            placeholder='Date'
                            value={getStringFromDate(date)}
                            editable={false}
                            pointerEvents='none'
                        />
                    </Pressable>
                </KeyboardAwareScrollView>
                <DateTimePickerModal
                    isVisible={dateVisible}
                    mode='date'
                    onConfirm={date => handleConfirmDate(date)}
                    onCancel={() => setDateVisible(false)}
                />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        width: Global.SIZE.WIDTH,
        height: Global.SIZE.H_763 + 15,
        top: Global.SIZE.HEIGHT - Global.SIZE.H_763 - 15,
        backgroundColor: 'white',
    },
    avatarContainer: {
        width: '100%',
        height: Global.SIZE.W_282 - 45,
        backgroundColor: 'rgba(242, 241, 246, 1)',
        alignItems: 'center',
        paddingHorizontal: Global.SIZE.W_20,
        paddingTop: 15,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    btnGroup: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    cancelBtn: {
        position: 'absolute',
        left: 1,
    },
    doneBtn: {
        position: 'absolute',
        right: 1,
    },
    btnText: {
        fontSize: 16,
        color: Global.COLOR.BTN_ACTIVE,
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    imgContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: Global.SIZE.W_170 - 45,
        height: Global.SIZE.W_170 - 45,
        borderRadius: (Global.SIZE.W_170 - 45) / 2,
        //resizeMode: 'contain',
    },
    inputContainer: {
        flex: 1,
        paddingLeft: Global.SIZE.W_20,
    },
    input: {
        height: 45,
        width: '100%',
        borderBottomWidth: 0.3,
        borderBottomColor: 'gray',
        paddingVertical: 10,
        fontFamily: 'AvenirBlack',
        fontSize: 23,
    },
});

export default EditDlg;
