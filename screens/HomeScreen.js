import * as React from 'react';
import { StyleSheet, View, ScrollView, Button } from 'react-native';
import { Appbar, IconButton } from 'react-native-paper';
import AlarmEntry from '../components/AlarmEntry';
import AlarmManager from '../framework/AlarmManager';
import { LinearGradient } from "expo-linear-gradient";


class HomeScreen extends React.Component {

    constructor() {
        super();

        this.state.alarmManager.load({
            onLoadedCb: (bResult) => {
                this.setState(this.state);
            }
        });
    }

    state = {
        alarmManager: AlarmManager.instance
    }

    _onAddAlarmPressed() {
        this.props.navigation.navigate("Add");
    }

    _onAlarmRemove({ id }) {
        this.state.alarmManager.removeAlarm({ id: id });
        this.setState(this.state);
    }

    _onAlarmStatusChange({ id }) {
        this.state.alarmManager.save();
    }

    componentDidUpdate() {
        if (this.props.route.params && this.props.route.params.newAlarm != null) {
            this.state.alarmManager.addAlarm({ alarm: this.props.route.params.newAlarm });
            this.props.route.params.newAlarm = null;
            this.setState(this.state);
        }
    }

    render() {
        return (
            <LinearGradient
                style = {style.background}
                colors = {['#333333', '#181818']}
            >
                <View style = {{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 80,
                    }}>
                    <Appbar.Header style = {{backgroundColor: '#333333'}}>
                        <Appbar.Action color = '#ea5515' icon = "alarm-check"/>
                        <Appbar.Content color = '#ea5515' title = "Будильники" />
                    </Appbar.Header>
                    <ScrollView style = {style.scrollView}>
                        {
                            this.state.alarmManager.getAlarms().map (
                                (alarm, i) => (
                                    <AlarmEntry
                                        key = {i}
                                        id = {i}
                                        alarm = {alarm}
                                        theme = {{color: '#fff'}}
                                        onAlarmRemove = {this._onAlarmRemove.bind(this)}
                                        onAlarmStatusChange = {this._onAlarmStatusChange.bind(this)}
                                    />
                                )
                            )
                        }
                    </ScrollView>
                </View>
                <View 
                    style = {{
                        position: 'absolute',
                        height: 70,
                        width: 70,
                        right: 40,
                        bottom: 40,
                    }}>
                <IconButton 
                        icon = "bell-plus"
                        color = "#ea5515"
                        size = {70}
                        onPress = {this._onAddAlarmPressed.bind(this)}
                        />
                </View>
            </LinearGradient>
        );
    }
}

const style = StyleSheet.create({
    background: {flex: 1},
    scrollView: {padding: 20},
})

export default HomeScreen;