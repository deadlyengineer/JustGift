import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Global from '../utils/global';
import { useSelector } from 'react-redux';

const Instruction = (props) => {

    const isFirstRun = useSelector(state => state.setting.isFirstRun);
    const [direction, setDirection] = useState(false);
    const animator = useRef(null);

    useEffect(() => {
        if(direction)
            animator.current.play();
    }, [direction]);

    const handleSwipeLeft = () => {
        //console.log('Left Swiped');
        if(direction) {
            if(isFirstRun)
                AsyncStorage.setItem('firstrun', '1', err => {
                    if(err) {
                        console.log('Error');
                        throw err;
                    } else {
                        props.navigation.navigate('Main');
                    }
                }).catch(err => {
                    console.log(err);
                });
        }
    }

    const handleSwipeRight = () => {
        //console.log('Right Swiped');
        if(!direction)
            setDirection(true);
    }

    return (
        <View>
            <Image source={direction ? Global.IMAGE.LEFT : Global.IMAGE.RIGHT} style={styles.bgImage}/>
            <GestureRecognizer
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
                style={styles.gestureContainer}
                config={{
                    velocityThreshold: 0.3,
                    directionalOffsetThreshold: 80
                }}
            >
                <LottieView
                    ref={animator}
                    source={direction ? Global.ANIMATION.SWIPE_LEFT : Global.ANIMATION.SWIPE_RIGHT}
                    style={styles.animContainer}
                    autoPlay
                    loop
                />
            </GestureRecognizer>
        </View>
    );
}

const styles = StyleSheet.create({
    bgContainer: {
        flex: 1,
        alignItems: 'center',
    },
    bgImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    gestureContainer: {
        position: 'absolute',
        width: Global.SIZE.W_363,
        height: Global.SIZE.W_522,
        top: 115,
        left: (Global.SIZE.WIDTH - Global.SIZE.W_363) / 2,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    animContainer: {
        width: 150,
        height: 150,
        marginBottom: 150,
    },
});

export default Instruction;
