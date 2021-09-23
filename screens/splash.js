import React from 'react';
import { View, Image } from 'react-native';
import Global from '../utils/global';

const Splash = () => {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
                source={Global.IMAGE.SPLASH}
                style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
            />
        </View>
    );
}

export default Splash;
