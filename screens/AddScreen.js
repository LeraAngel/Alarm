import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Button, Headline, List } from 'react-native-paper';
import { TimePickerModal, enGB } from 'react-native-paper-dates';
import Moment from 'moment';
import Alarm from '../framework/Alarm';
import Radio from '../framework/Radio';
import { LinearGradient } from "expo-linear-gradient";


class AddScreen extends React.Component {

    constructor() {
        super();
        this.radioList = [
            new Radio({ icon: "spotlight", title: "Спокойная музыка", uri: "https://cafe.amgradio.ru/Cafe" }),
            new Radio({ icon: "skull-outline", title: "Русский рок", uri: "https://rock.amgradio.ru/RusRock" }),
            new Radio({ icon: "music-clef-treble", title: "Зарубежные хиты", uri: "https://fresh.amgradio.ru/Fresh" }),
            new Radio({ icon: "human-male-female-child", title: "Детская музыка", uri: "https://deti.amgradio.ru/Deti" }),
            new Radio({ icon: "ipod", title: "Ремиксы", uri: "https://rmx.amgradio.ru/RemixFM" }),
        ];
        this.state.radio = this.radioList[0];
    }

    state = {
        time: new Date(),
        radio: null,
        timeOpen: false,
        radioListExpanded: false,
    }

    _onAlarmDeclined() {
        this.props.navigation.goBack();
    }

    _onAlarmConfirmed() {
        this.props.navigation.navigate("Home", ({
            newAlarm: Alarm.fromDate({
                date: this.state.time,
                radio: this.state.radio
            })
        }));
    }

    _onPickTimeRequest() {
        this.state.timeOpen = true;
        this.setState(this.state);
    }

    _onPickTimeConfirm({ hours, minutes }) {
        this.state.time.setHours(hours);
        this.state.time.setMinutes(minutes);
        this._onPickTimeDismiss();
    }

    _onPickTimeDismiss() {
        this.state.timeOpen = false;
        this.setState(this.state);
    }

    _onPickRadioExpand() {
        this.state.radioListExpanded = !this.state.radioListExpanded;
        this.setState(this.state);
    }

    _onPickRadio({ id }) {
        this.state.radio = this.radioList[id];
        this._onPickRadioExpand();
    }

    render() {
        return (
            <LinearGradient
                style = {style.background}
                colors = {['#333', '#181818']}
            >
               <View>
                    <Appbar.Header style = {{backgroundColor: '#333'}}>
                        <Appbar.Action color = '#ea5515' icon = "arrow-u-left-top-bold" onPress = {this._onAlarmDeclined.bind(this)} />
                        <Appbar.Content color = '#ea5515' title = "Новый будильник" />
                        <Appbar.Action color = '#ea5515' icon = "bell-check" onPress = {this._onAlarmConfirmed.bind(this)} />
                    </Appbar.Header>
                    <View>
                        <Button
                            mode = "text"
                            color = "#fff"
                            onPress = {this._onPickTimeRequest.bind(this)}
                            style = {{
                                padding: 20,
                                alignSelf: 'stretch',
                            }}
                            labelStyle = {{fontSize: 72}}>
                            {Moment(this.state.time).format('HH:mm')}
                        </Button>

                        <Headline style = {{
                                color: '#ea5515',
                                fontSize: 24,
                                lineHeight: 32,
                                marginTop: 20,
                                marginLeft: 20,
                                textAlign: 'left',
                            }}>
                        {"Выбери радиостанцию:"}
                        </Headline>
                        <List.Accordion
                            titleStyle = {style.title}
                            title = {this.state.radio.title}
                            expanded = {this.state.radioListExpanded}
                            onPress = {this._onPickRadioExpand.bind(this)}
                            style = {{backgroundColor: '#333'}}
                            left = {props => <List.Icon {...props} icon = {this.state.radio.icon} color = '#ea5515'/>}
                        >
                            {
                                this.radioList.map(
                                    (radio, i) => (
                                        <List.Item
                                            key = {i}
                                            title = {radio.title}
                                            titleStyle = {{color: '#fff'}}
                                            onPress = {() => {this._onPickRadio({ id: i })}}
                                            left = {() => <List.Icon icon = {radio.icon} color = '#fff'/>}
                                            style = {{marginLeft: 10}}
                                        />
                                    )
                                )
                            }
                        </List.Accordion>
                    </View>
                    <TimePickerModal
                        locale = 'en'
                        visible = {this.state.timeOpen}
                        onDismiss = {this._onPickTimeDismiss.bind(this)}
                        onConfirm = {this._onPickTimeConfirm.bind(this)}
                        hours = {this.state.time.hours}
                        minutes = {this.state.time.minutes}
                        label="Время"
                        cancelLabel="Отмена"
                        animationType = "slide"
                        uppercase = {false}
                    />
                </View>
            </LinearGradient>
        );
    }
}


const style = StyleSheet.create({
    background: {
        flex: 1,
    },
    title: {
        color: '#ea5515',
    },
})


export default AddScreen;