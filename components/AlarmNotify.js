import * as React from 'react';
import { View } from 'react-native';
import { Button, Headline } from 'react-native-paper';



class AlarmNotify extends React.Component {
    render() {
        return (

            <View style = {{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 250,
                    margin: 15,
                    padding: 20,
                    borderRadius: 15,
                }}>
                <Headline style = {{
                        fontSize: 32,
                        color: '#fff'
                    }}>
                    {"Вставай!"}
                </Headline>
                <View style = {{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Headline style = {{
                            fontSize: 24,
                            color: '#fff'
                        }}>
                        {"Радиостанция:"}
                    </Headline>
                    <Headline style = {{
                            fontSize: 24,
                            color: '#fff'
                        }}>
                        {this.props.radioName}
                    </Headline>
                </View>
                <Button
                    color = '#ea5515'
                    mode = "contained"
                    onPress = {this.props.onHide}
                    style = {{alignContent: 'flex-end'}}>
                    {"Отключить"}
                </Button>
            </View>
        );
    }
}

export default AlarmNotify;