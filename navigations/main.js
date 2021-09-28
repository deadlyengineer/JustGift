import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Icon } from 'react-native-elements';
import Global from '../utils/global';

import Product from '../screens/product';
import Contact from '../screens/contact';
import FavList from '../screens/favlist';
import Favorite from '../screens/favorite';
import Setting from '../screens/setting';

export default createAppContainer(
    createMaterialBottomTabNavigator(
        {
            One: createSwitchNavigator(
                {
                    Product: { screen: Product }
                },
                {
                    initialRouteName: 'Product',
                    headerMode: 'none',
                    navigationOptions: {
                        tabBarLabel: ' ',
                        tabBarIcon: ({ focused }) => (
                            <Icon
                                name='gift'
                                type='material-community'
                                size={30}
                                color={focused ? Global.COLOR.PRIMARY : Global.COLOR.ICON_INACTIVE}
                                iconStyle={{ width: 30, height: 30 }}
                            />
                        )
                    }
                }
            ),
            Two: createSwitchNavigator(
                {
                    FavList: { screen: FavList },
                    Favorite: { screen: Favorite }
                },
                {
                    initialRouteName: 'FavList',
                    headerMode: 'none',
                    navigationOptions: {
                        tabBarLabel: ' ',
                        tabBarIcon: ({ focused }) => (
                            <Icon
                                name='heart'
                                type='material-community'
                                size={30}
                                color={focused ? Global.COLOR.SECONDARY : Global.COLOR.ICON_INACTIVE}
                                iconStyle={{ width: 30, height: 30 }}
                            />
                        )
                    }
                }
            ),
            Three: createSwitchNavigator(
                {
                    Contact: { screen: Contact }
                },
                {
                    initialRouteName: 'Contact',
                    headerMode: 'none',
                    navigationOptions: {
                        tabBarLabel: ' ',
                        tabBarIcon: ({ focused }) => (
                            <Icon
                                name='account-multiple'
                                type='material-community'
                                size={30}
                                color={focused ? Global.COLOR.ICON_CONTACT : Global.COLOR.ICON_INACTIVE}
                                iconStyle={{ width: 30, height: 30 }}
                            />
                        )
                    }
                }
            ),
            Four: createSwitchNavigator(
                {
                    Setting: { screen: Setting }
                },
                {
                    initialRouteName: 'Setting',
                    headerMode: 'none',
                    navigationOptions: {
                        tabBarLabel: ' ',
                        tabBarIcon: ({ focused }) => (
                            <Icon
                                name='cog'
                                type='material-community'
                                size={30}
                                color={focused ? 'black' : Global.COLOR.ICON_INACTIVE}
                                iconStyle={{ width: 30, height: 30 }}
                            />
                        )
                    }
                }
            )
        },
        {
            initialRouteName: 'One',
            barStyle: { backgroundColor: 'white', height: Global.SIZE.W_92 },
            resetOnBlur: true,
            shifting: false,
            keyboardHidesNavigationBar: true,
        }
    )
);
