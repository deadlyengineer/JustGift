import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import LottieView from 'lottie-react-native';
import { Icon } from 'react-native-elements';
import Pagination from 'react-native-dots-pagination';
import { Video } from 'expo-av';
import Global from '../../utils/global';

const GiftCard = (props) => {

    const [activeIndex, setActiveIndex] = useState(0);
    const [movStatus, setMovStatus] = useState(false);
    const [isMovLoaded, setMovLoaded] = useState(false);
    const videoPlayer = useRef(null);

    const pressCardImage = () => {
        setActiveIndex(activeIndex => (activeIndex + 1) % 3);
    }

    const pressPlayAction = () => {
        movStatus ? videoPlayer.current.pauseAsync() : videoPlayer.current.playAsync();
    }

    return (
        <View style={styles.bgContainer}>
            <View style={styles.container}>
                <View style={styles.body}>
                    <Pressable style={styles.imgContainer} onPress={pressCardImage}>
                        {
                            activeIndex == 0 ?
                                <Image source={{ uri: props.data.img_1 }} style={styles.productImg}/>
                            : activeIndex == 1 ?
                                <Image source={{ uri: props.data.img_2 }} style={styles.productImg}/>
                            :   <View style={styles.movContainer}>
                                    <Video
                                        ref={videoPlayer}
                                        source={{ uri: props.data.mov }}
                                        style={styles.productMov}
                                        resizeMode='cover'
                                        isLooping
                                        onPlaybackStatusUpdate={status => setMovStatus(() => status.isPlaying)}
                                        onReadyForDisplay={() => setMovLoaded(true)}
                                    />
                                    {
                                        isMovLoaded ?
                                            <Pressable style={movStatus ? styles.pauseBtn : styles.playBtn} onPress={pressPlayAction}>
                                                {
                                                    movStatus ? <Icon name='pause' type='material-community' color='white' size={30}/>
                                                              : <Icon name='play' type='material-community' color='white' size={50}/>
                                                }
                                            </Pressable>
                                        :   <View style={styles.waitingContainer}>
                                                <LottieView
                                                    source={Global.ANIMATION.WAITING}
                                                    style={{ width: 200, height: 200 }}
                                                    autoPlay
                                                    loop
                                                />
                                            </View>
                                    }
                                </View>
                        }
                    </Pressable>
                </View>
                <View style={styles.footer}>
                    <Pressable onPress={props.onClickDetail}>
                        <Icon name='information' type='material-community' color='black' size={30}/>
                    </Pressable>
                    <View style={styles.infoContainer}>
                        <View style={styles.row}>
                            <Text style={styles.priceText}>{(props.data.currency == 0 ? '£' : '$') + props.data.price}</Text>
                            <Text style={styles.nameText}>{props.data.name}</Text>
                        </View>
                        <Text style={styles.descriptionText}>{props.data.description}</Text>
                    </View>
                </View>
                <View style={styles.pagination}>
                    <Pagination
                        length={3}
                        active={activeIndex}
                        marginHorizontal={6}
                        paddingHorizontal={1}
                        activeDotWidth={Global.SIZE.W_90}
                        activeDotHeight={3}
                        passiveDotWidth={Global.SIZE.W_90}
                        passiveDotHeight={3}
                        activeColor={props.dotColor}
                        passiveColor={Global.COLOR.DOT_INACTIVE}
                        alignDotsOnXAxis
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    bgContainer: {
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        shadowColor: 'black',
        shadowOpacity: 0.3,
        elevation: 5,
    },
    container: {
        width: Global.SIZE.W_363,
        height: Global.SIZE.W_522,
        borderRadius: 10,
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'white',
    },
    body: {
        width: '100%',
        height: Global.SIZE.W_433,
    },
    imgContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    productImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    movContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    productMov: {
        width: '100%',
        height: '100%',
    },
    playBtn: {
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Global.COLOR.BTN_INACTIVE,
        top: Global.SIZE.W_433 / 2 - 40,
        left: Global.SIZE.W_363 / 2 - 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pauseBtn: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Global.COLOR.BTN_INACTIVE,
        bottom: 20,
        right: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    waitingContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 1,
        flexDirection: 'row-reverse',
        paddingVertical: 15,
        paddingHorizontal: 35,
        alignItems: 'center',
    },
    infoContainer: {
        flex: 1,
        marginRight: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    priceText: {
        fontFamily: 'AvenirBook',
        fontSize: 17,
        color: Global.COLOR.TXT_PRICE,
        marginRight: 10,
    },
    nameText: {
        fontFamily: 'AvenirBlack',
        fontSize: 17,
        color: 'black',
    },
    descriptionText: {
        fontFamily: 'AvenirBook',
        fontSize: 12,
        lineHeight: 14,
        color: Global.COLOR.TXT_DESC,
        marginTop: 3,
    },
    pagination: {
        position: 'absolute',
        top: 1,
    },
});

export default GiftCard;
