import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Guide from '../screens/guide';
import LocationPermission from '../screens/location';
import NotificationPermission from '../screens/notification';
import Instruction from '../screens/instruction';
import LogIn from '../screens/login';
import SignIn from '../screens/signin';
import SignUp from '../screens/signup';

export default createAppContainer(
    createSwitchNavigator(
        {
            Guide: { screen: Guide },
            Location: { screen: LocationPermission },
            Notify: { screen: NotificationPermission },
            Instruction: { screen: Instruction },
            LogIn: { screen: LogIn },
            SignIn: { screen: SignIn },
            SignUp: { screen: SignUp },
        },
        {
            initialRouteName: 'Guide',
            headerMode: 'none'
        }
    )
);
