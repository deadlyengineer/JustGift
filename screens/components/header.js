import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Pressable } from 'react-native';
import { Icon } from 'react-native-elements';
import SvgIcon from '../../utils/svg';
import Global from '../../utils/global';

const Header = (props) => {

    return (
        <View style={styles.container}>
            <SvgIcon icon='gift'/>
            <Text style={styles.titleText}>JustGift</Text>
            {
                props.page == 'contact' ?
                    <TouchableOpacity style={styles.addBtn} onPress={props.onClickAdd}>
                        <Icon name='add-circle' type='ionicon' color={Global.COLOR.PRIMARY} size={30}/>
                    </TouchableOpacity>
                :   null
            }
            {
                props.page == 'favorite' ?
                    <Pressable style={styles.backBtn} onPress={props.onClickBack}>
                        <Icon name='arrow-left' type='material-community' size={25}/>
                    </Pressable>
                :   null
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        marginTop: Global.ENV.DEVICE == 'ios' ? 55 : 40,
        marginBottom: 25,
    },
    titleText: {
        fontFamily: 'AvenirBlack',
        fontSize: 30,
        fontWeight: 'bold',
        color: Global.COLOR.TITLE,
        marginLeft: 5,
    },
    addBtn: {
        position: 'absolute',
        right: 40,
        alignSelf: 'center',
    },
    backBtn: {
        position: 'absolute',
        left: 20,
    },
});

export default Header;
