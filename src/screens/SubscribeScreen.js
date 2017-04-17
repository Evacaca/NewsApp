import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage,
    DeviceEventEmitter
} from 'react-native';

import { Image } from 'react-native';
import SubscribeCard from '../component/SubscribeCard';

export default class SubscribeScreen extends Component {
    static navigatorButtons = {
        leftButtons: [{
            title: '关闭',
            id: 'close'
        }]
    };
    static navigatorStyle = {
        navBarBackgroundColor: '#A91503',
        navBarTextColor: '#fff',
        navBarButtonColor: '#ffffff',
        statusBarTextColorScheme: 'light',
    };
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

        this.state = {
            source: null,
            subscribes: [],
            btnIsPress: true,
            _iconColor: '#A91503',
        }
    }

    componentDidMount() {
        var that = this;
        fetch('http://www.qdaily.com/special_columns/column_more/1487916735.json').
        then((response) => response.json()).
        then((responseJson) => {
            that.setState({
                source: responseJson.data.columns
            });
        });
    }

    render() {
        var newsColumns = this.state.source;

        if (!newsColumns) {
            return this.renderLoadingView();
        }
        return this.renderColumns(newsColumns);
    }

    renderLoadingView() {
        return (
            <View style={styles.flexContainer}>
                <Text>
                    Loading ...
                </Text>
            </View>
        );
    }

    renderColumns(newsColumns) {
        const columnRows = newsColumns.map((row, ii) => {
            var i = 2*ii;
            var j = 2*ii+1;
            if(j>newsColumns.length) return;

            return <SubscribeCard key={i} source={newsColumns[i]}
                                  sourceSecond={newsColumns[j]}
                                  click={()=>this.onSubscribePress(i)}
                                  clickSecond={()=>this.onSubscribePress(j)}/>
        });
        return (
            <ScrollView style={styles.container}>
                {columnRows}
            </ScrollView>
        );
    }

    onNavigatorEvent(event) {
        if (event.id == 'close') {
            DeviceEventEmitter.emit('user_subscribe', {'subscribes': this.state.subscribes});//传播通知订阅信息
            console.log('test7: '+ this.state.subscribes);
            this.props.navigator.dismissModal();
            this.props.navigator.pop();
        }
    }
    onChangeSubscribeState(btnIsPress, _iconColor){  //@TODO
        this.setState = {
            btnIsPress: btnIsPress,
            _iconColor: _iconColor,
        }
    }
    onSubscribePress(subscribe){                                //点击订阅
        var that = this;

        AsyncStorage.getItem('USER_STATUS_INFO', function (err, result) {
            var resultJson = JSON.parse(result);
            if(!resultJson){                                   //未登录，进入登录界面
                that.props.navigator.pop();
                that.props.navigator.showModal({
                    title: "登录",
                    screen: "example.LoginScreen"
                });
            }
            else {
                var curr_id = JSON.parse(result).account_ID;
                console.log(curr_id);

                let USERDATA = {
                    'user_id': curr_id,
                    'subscribe_id': [subscribe],
                };

                // AsyncStorage.removeItem('USER_DATA');

                //存储当前用户的订阅ID
                AsyncStorage.getItem('USER_DATA', (error, result) => {//当前用户还未有订阅
                    if (!result) {
                        AsyncStorage.setItem('USER_DATA', JSON.stringify(USERDATA));
                        AsyncStorage.getItem('USER_DATA', (error, result) => {
                            console.log("test3: " + result);
                        });
                    }
                    else {                                            //当前用户已经有订阅版块
                        var arr_id = JSON.parse(result).subscribe_id;
                        arr_id.push(subscribe);
                        USERDATA.subscribe_id = arr_id;

                        that.setState({                                //设置用户订阅版块列表
                            subscribes: arr_id
                        });

                        AsyncStorage.setItem('USER_DATA', JSON.stringify(USERDATA), () => {
                            AsyncStorage.getItem('USER_DATA', (error, result) => {
                                console.log("test4: " + result);
                            });
                        });
                    }
                });

            }
        });

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    button: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 10,
        marginTop: 10,
        color: 'blue'
    }
});
