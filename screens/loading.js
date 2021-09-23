import React from 'react';
import { Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import Global from '../utils/global';

const Loading = () => {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <LottieView
                source={Global.ANIMATION.LOADING}
                style={{ width: 300, height: 300 }}
                autoPlay
                loop
            />
            <Text style={{ fontFamily: 'AvenirHeavy', fontSize: 18 }}>LOADING ...</Text>
        </View>
    );
}

export default Loading;
