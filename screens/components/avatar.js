import React from 'react';
import TextAvatar from 'react-native-text-avatar';
import FastImage from 'expo-fast-image';

const Avatar = (props) => {
    
    if(props.source == null)
        return (
            <TextAvatar
                backgroundColor={'gray'}
                textColor={'white'}
                size={props.size}
                type={'circle'}
            >{props.firstName + ' ' + props.lastName}</TextAvatar>
        );

    return (
        <FastImage source={{ uri: props.source }} style={{ width: props.size, height: props.size, borderRadius: props.size / 2 }}/>
    );
}

export default Avatar;
