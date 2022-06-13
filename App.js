import 'intl';
import 'intl/locale-data/jsonp/ru-RU';
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider, DarkTheme, Modal, withTheme } from 'react-native-paper';
import * as Notifications from 'expo-notifications';
import AlarmNotify from './components/AlarmNotify';
import HomeScreen from './screens/HomeScreen';
import AddScreen from './screens/AddScreen';
import RadioPlayer from './framework/RadioPlayer';



const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,  
    }),
});

export default class App extends React.Component {

    constructor() {
        super();

        Notifications.addNotificationReceivedListener(notification => {
            RadioPlayer.instance.play({
                uri: notification.request.content.data.radioUri
            });

            this.state.bIsAlarmNotifyVisible = true;
            this.state.currentRadioName = notification.request.content.data.radioName;
            this.setState(this.state);
        });
    }

    state = {
        bIsAlarmNotifyVisible: false,
        currentRadioName: "",
    }

    _hideAlarmNotify() {
        RadioPlayer.instance.stop();
        this.state.bIsAlarmNotifyVisible = false;
        this.setState(this.state);
    }

    render() {
        return (
            <PaperProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Home" screenOptions={{ header: (props) => { } }}>
                        <Stack.Screen name="Home" component={withTheme(HomeScreen)} />
                        <Stack.Screen name="Add" component={withTheme(AddScreen)} />
                    </Stack.Navigator>
                </NavigationContainer>
                <Modal visible={this.state.bIsAlarmNotifyVisible} dismissable={false} >
                    <AlarmNotify radioName={this.state.currentRadioName} onHide={this._hideAlarmNotify.bind(this)} />
                </Modal>
            </PaperProvider>
        );
    }

}
