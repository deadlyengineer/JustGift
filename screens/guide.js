import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, Pressable, TouchableOpacity } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Pagination from 'react-native-dots-pagination';
import { SimpleAnimation } from 'react-native-simple-animations';
import Global from '../utils/global';
import Loading from './loading';
import { useSelector } from 'react-redux';

const Guide = (props) => {

    const isFirstRun = useSelector(state => state.setting.isFirstRun);
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(false);
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        if(isFirstRun)
            setLoaded(true);
        else
            props.navigation.navigate('Main');
    }, []);

    const handleSwipeLeft = () => {
        setDirection(false);
        if(activeIndex < 2)
            setActiveIndex(activeIndex => activeIndex + 1);
    }

    const handleSwipeRight = () => {
        setDirection(true);
        if(activeIndex > 0)
            setActiveIndex(activeIndex => activeIndex - 1);
    }

    if(!isLoaded)
        return (<Loading/>);

    return (
        <View style={styles.bgContainer}>
            <GestureRecognizer
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
                style={styles.animContainer}
                config={{
                    velocityThreshold: 0.3,
                    directionalOffsetThreshold: 80,
                }}
            >
                <SimpleAnimation
                    delay={100}
                    duration={1000}
                    movementType='slide'
                    direction={direction ? 'right' : 'left'}
                    distance={Global.SIZE.WIDTH}
                    fade={false}
                    animateOnUpdate
                    style={styles.imgContainer}
                >
                    <Pressable onPress={handleSwipeLeft}>
                        {
                            activeIndex == 0 ?
                                <Image source={Global.IMAGE.GUIDE1} style={styles.bgImage}/>
                            : activeIndex == 1 ?
                                <Image source={Global.IMAGE.GUIDE2} style={styles.bgImage}/>
                            :   <Image source={Global.IMAGE.GUIDE3} style={styles.bgImage}/>
                        }
                    </Pressable>
                </SimpleAnimation>
            </GestureRecognizer>
            <View style={styles.bottomContainer}>
                <Pagination
                    length={3}
                    active={activeIndex}
                    marginHorizontal={10}
                    activeDotWidth={10}
                    activeDotHeight={10}
                    passiveDotWidth={10}
                    passiveDotHeight={10}
                    activeColor={Global.COLOR.WHITE_100}
                    passiveColor={Global.COLOR.WHITE_40}
                    alignDotsOnXAxis
                />
                <TouchableOpacity style={styles.submitBtn} onPress={() => props.navigation.navigate('Location')}>
                    <Text style={styles.btnText}>Get started</Text>
                </TouchableOpacity>
                <Text style={styles.labelText}>
                    By tapping 'Get started' and using the JustGift app, you're agreeing to our terms of service and privacy policy.
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    bgContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Global.COLOR.PRIMARY,
    },
    animContainer: {
        width: '100%',
        height: '100%',
    },
    imgContainer: {
        width: '100%',
        height: '100%',
    },
    bgImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        paddingHorizontal: Global.SIZE.W_20,
    },
    submitBtn: {
        width: '100%',
        height: 50,
        backgroundColor: Global.COLOR.START_BTN,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 30,
        marginBottom: 20,
    },
    btnText: {
        fontSize: 17,
        color: 'white',
    },
    labelText: {
        fontSize: 13,
        textAlign: 'center',
        letterSpacing: -0.5,
        lineHeight: 18,
        color: 'white',
    },
});

export default Guide;
