import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import NavigationService from '../utils/service';
import AuthNavigator from './auth';
import MainNavigator from './main';

const TopLevelNavigator = createSwitchNavigator(
    {
        Auth: AuthNavigator,
        Main: MainNavigator,
    },
    {
        initialRouteName: 'Auth'
    }
);

const AppContainer = createAppContainer(TopLevelNavigator);

export default function AppNavigator() {

    return (
        <AppContainer ref={(navigatorRef) => { NavigationService.setTopLevelNavigator(navigatorRef); }}/>
    );
}
