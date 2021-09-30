import React, { useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
import { Picker } from 'react-native-wheel-pick';
import { Icon } from 'react-native-elements';
import Global from '../../utils/global';
import { getRecipientList, getCurrentRecipient } from '../../utils/helper';
import { useSelector, useDispatch } from 'react-redux';
import { changeRecipient } from '../../store/actions/actions';

const PickerDlg = (props) => {

    const recipient = useSelector(state => state.user.recipient);
    const dispatch = useDispatch();
    const picker = useRef(null);

    const pressSubmitAction = () => {
        //console.log(picker.current);
        const list = getRecipientList(props.data);
        const current = picker.current.state.selectedValue;
        const idx = list.findIndex(element => element === current);
        if(idx > -1)
            dispatch(changeRecipient(props.data[idx]));
        props.onChangeVisible(false);
    }

    const pressSelectAction = flag => {
        //console.log(picker.current);
        const list = getRecipientList(props.data);
        const current = picker.current.state.selectedValue;
        const idx = list.findIndex(element => element === current);
        if(idx > -1) {
            if(flag == 'left') {
                if(idx > 0) {
                    dispatch(changeRecipient(props.data[idx-1]));
                    picker.current.state.selectedValue = props.data[idx-1].first_name + ' ' + props.data[idx-1].last_name;
                }
            } else {
                if(idx < list.length - 1) {
                    dispatch(changeRecipient(props.data[idx+1]));
                    picker.current.state.selectedValue = props.data[idx+1].first_name + ' ' + props.data[idx+1].last_name;
                }
            }
        }
    }

    return (
        <Modal
            animationType='slide'
            visible={props.visible}
            transparent
            onShow={() => {}}
        >
            <View style={styles.overlay}>
                <View style={styles.bgContainer}>
                    <View style={styles.header}>
                        <TouchableOpacity style={{ marginRight: 30 }} onPress={() => pressSelectAction('left')}>
                            <Icon name='chevron-left' type='material-community' size={30} color={Global.COLOR.BTN_ACTIVE}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => pressSelectAction('right')}>
                            <Icon name='chevron-right' type='material-community' size={30} color={Global.COLOR.BTN_ACTIVE}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ position: 'absolute', right: 30 }} onPress={pressSubmitAction}>
                            <Text style={styles.btnText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                    <Picker
                        ref={picker}
                        style={styles.picker}
                        selectedValue={getCurrentRecipient(recipient)}
                        pickerData={getRecipientList(props.data)}
                        onValueChange={value => {console.log(value)}}
                    />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        width: Global.SIZE.WIDTH,
        height: Global.SIZE.HEIGHT,
        backgroundColor: 'transparent',
    },
    bgContainer: {
        width: Global.SIZE.WIDTH,
        height: Global.SIZE.W_273,
        backgroundColor: 'white',
        top: Global.SIZE.HEIGHT - Global.SIZE.W_273,
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        height: Global.SIZE.W_46,
        alignItems: 'center',
        paddingHorizontal: 30,
        backgroundColor: Global.COLOR.BACKGROUND,
        borderColor: 'gray',
        borderBottomWidth: 0.2,
        borderTopWidth: 0.2,
    },
    picker: {
        flex: 1,
        backgroundColor: 'white',
    },
    btnText: {
        fontSize: 18,
        color: Global.COLOR.BTN_ACTIVE,
    },
});

export default PickerDlg;
