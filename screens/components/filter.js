import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, TouchableOpacity, ScrollView, Modal } from 'react-native';
import Global from '../../utils/global';

const FilterDlg = (props) => {

    const [price, setPrice] = useState(props.data.price);
    const [age, setAge] = useState(props.data.age);
    const [gender, setGender] = useState(props.data.gender);

    const pressApplyAction = () => {
        const data = {
            price: price,
            age: age,
            gender: gender,
        };
        props.onChangeValue(data);
        props.onChangeVisible(false);
    }

    const pressCloseAction = () => {
        setPrice(props.data.price);
        setAge(props.data.age);
        setGender(props.data.gender);
        props.onChangeVisible(false);
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
                        <TouchableOpacity style={styles.applyBtn} onPress={pressApplyAction}>
                            <Text style={styles.closeText}>Apply</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeBtn} onPress={pressCloseAction}>
                            <Text style={styles.closeText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                        <View style={styles.category}>
                            <Text style={styles.categoryTitle}>Price and deals</Text>
                            <View style={styles.row}>
                                <Pressable style={price == 0 ? styles.optionActive : styles.optionInactive} onPress={() => setPrice(0)}>
                                    <Text style={price == 0 ? styles.activeText : styles.inactiveText}>All Prices</Text>
                                </Pressable>
                                <Pressable style={price == 1 ? styles.optionActive : styles.optionInactive} onPress={() => setPrice(1)}>
                                    <Text style={price == 1 ? styles.activeText : styles.inactiveText}>Up to $20</Text>
                                </Pressable>
                                <Pressable style={price == 2 ? styles.optionActive : styles.optionInactive} onPress={() => setPrice(2)}>
                                    <Text style={price == 2 ? styles.activeText : styles.inactiveText}>$20 to $50</Text>
                                </Pressable>
                                <Pressable style={price == 3 ? styles.optionActive : styles.optionInactive} onPress={() => setPrice(3)}>
                                    <Text style={price == 3 ? styles.activeText : styles.inactiveText}>$50 to $100</Text>
                                </Pressable>
                            </View>
                            <View style={styles.row}>
                                <Pressable style={price == 4 ? styles.optionActive : styles.optionInactive} onPress={() => setPrice(4)}>
                                    <Text style={price == 4 ? styles.activeText : styles.inactiveText}>$100 to $200</Text>
                                </Pressable>
                                <Pressable style={price == 5 ? styles.optionActive : styles.optionInactive} onPress={() => setPrice(5)}>
                                    <Text style={price == 5 ? styles.activeText : styles.inactiveText}>$200 & above</Text>
                                </Pressable>
                            </View>
                        </View>
                        <View style={styles.category}>
                            <Text style={styles.categoryTitle}>Age</Text>
                            <View style={styles.row}>
                                <Pressable style={age == 9 ? styles.optionActive : styles.optionInactive} onPress={() => setAge(9)}>
                                    <Text style={age == 9 ? styles.activeText : styles.inactiveText}>All Ages</Text>
                                </Pressable>
                                <Pressable style={age == 0 ? styles.optionActive : styles.optionInactive} onPress={() => setAge(0)}>
                                    <Text style={age == 0 ? styles.activeText : styles.inactiveText}>13 or below</Text>
                                </Pressable>
                                <Pressable style={age == 1 ? styles.optionActive : styles.optionInactive} onPress={() => setAge(1)}>
                                    <Text style={age == 1 ? styles.activeText : styles.inactiveText}>14 - 17</Text>
                                </Pressable>
                                <Pressable style={age == 2 ? styles.optionActive : styles.optionInactive} onPress={() => setAge(2)}>
                                    <Text style={age == 2 ? styles.activeText : styles.inactiveText}>18 - 24</Text>
                                </Pressable>
                                <Pressable style={age == 3 ? styles.optionActive : styles.optionInactive} onPress={() => setAge(3)}>
                                    <Text style={age == 3 ? styles.activeText : styles.inactiveText}>25 - 34</Text>
                                </Pressable>
                            </View>
                            <View style={styles.row}>
                                <Pressable style={age == 4 ? styles.optionActive : styles.optionInactive} onPress={() => setAge(4)}>
                                    <Text style={age == 4 ? styles.activeText : styles.inactiveText}>35 - 44</Text>
                                </Pressable>
                                <Pressable style={age == 5 ? styles.optionActive : styles.optionInactive} onPress={() => setAge(5)}>
                                    <Text style={age == 5 ? styles.activeText : styles.inactiveText}>45 - 54</Text>
                                </Pressable>
                                <Pressable style={age == 6 ? styles.optionActive : styles.optionInactive} onPress={() => setAge(6)}>
                                    <Text style={age == 6 ? styles.activeText : styles.inactiveText}>55 - 64</Text>
                                </Pressable>
                                <Pressable style={age == 7 ? styles.optionActive : styles.optionInactive} onPress={() => setAge(7)}>
                                    <Text style={age == 7 ? styles.activeText : styles.inactiveText}>65 - 74</Text>
                                </Pressable>
                                <Pressable style={age == 8 ? styles.optionActive : styles.optionInactive} onPress={() => setAge(8)}>
                                    <Text style={age == 8 ? styles.activeText : styles.inactiveText}>75 or older</Text>
                                </Pressable>
                            </View>
                        </View>
                        <View style={styles.category}>
                            <Text style={styles.categoryTitle}>Gender</Text>
                            <View style={styles.row}>
                                <Pressable style={gender == 2 ? styles.optionActive : styles.optionInactive} onPress={() => setGender(2)}>
                                    <Text style={gender == 2 ? styles.activeText : styles.inactiveText}> All </Text>
                                </Pressable>
                                <Pressable style={gender == 0 ? styles.optionActive : styles.optionInactive} onPress={() => setGender(0)}>
                                    <Text style={gender == 0 ? styles.activeText : styles.inactiveText}>Male</Text>
                                </Pressable>
                                <Pressable style={gender == 1 ? styles.optionActive : styles.optionInactive} onPress={() => setGender(1)}>
                                    <Text style={gender == 1 ? styles.activeText : styles.inactiveText}>Female</Text>
                                </Pressable>
                            </View>
                        </View>
                    </ScrollView>
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
        height: Global.SIZE.H_527,
        top: Global.SIZE.HEIGHT - Global.SIZE.H_527,
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        
    },
    header: {
        flexDirection: 'row',
        height: 60,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 30,
        marginHorizontal: 10,
        borderBottomWidth: 0.2,
    },
    closeBtn: {
        position: 'absolute',
        left: 30,
    },
    closeText: {
        fontSize: 18,
        color: 'rgba(48, 111, 129, 1)',
        fontWeight: 'bold',
    },
    category: {
        paddingVertical: 10,
        marginHorizontal: 20,
        borderBottomWidth: 0.2,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    optionActive: {
        height: 30,
        paddingHorizontal: 5,
        borderRadius: 8,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'rgba(220, 236, 239, 1)',
        backgroundColor: 'rgba(233, 243, 244, 1)',
        marginRight: 10,
    },
    activeText: {
        fontSize: 12,
        color: 'rgba(48, 111, 129, 1)',
    },
    optionInactive: {
        height: 30,
        paddingHorizontal: 5,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(244, 244, 244, 1)',
        marginRight: 8,
    },
    inactiveText: {
        fontSize: 12,
        color: 'black',
    },
});

export default FilterDlg;
