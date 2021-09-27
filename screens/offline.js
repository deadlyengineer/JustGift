import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import LottieView from 'lottie-react-native';
import Global from '../utils/global';

const Offline = (props) => {

    return (
        <View style={styles.bgContainer}>
            <LottieView
                source={Global.ANIMATION.OFFLINE}
                style={{ width: 200, height: 200 }}
                autoPlay
                loop
            />
            <Text style={styles.titleText}>NO INTERNET</Text>
            <TouchableOpacity style={styles.tryButton} onPress={props.onClickTry}>
                {
                    props.isConnecting ?
                        <ActivityIndicator size='large' color='white'/>
                    :   <Text style={styles.buttonText}>TRY CONNECTION</Text>
                }
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    bgContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        fontFamily: 'AvenirHeavy',
        fontSize: 18,
        marginVertical: 30,
    },
    tryButton: {
        position: 'absolute',
        bottom: 60,
        width: 250,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'purple',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default Offline;
