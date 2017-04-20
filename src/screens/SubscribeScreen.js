import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage,
    DeviceEventEmitter,
    Animated,
    Easing
} from 'react-native';

import { Image } from 'react-native';
import SubscribeCard from '../component/SubscribeCard';
import DataJson from '../api_server/news_db.json';

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
        }
        this.spinValue = new Animated.Value(0);
    }

    componentDidMount() {
        this.spinner();
        // console.log(DataJson.data.length);
        this.setState({
            source: DataJson.data
        });
    }

    spinner () {
        this.spinValue.setValue(0)
        Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                duration: 1800,
                easing: Easing.linear
            }
        ).start(() => this.spinner())
    }
    render() {
        var newsColumns = this.state.source;

        if (!newsColumns) {
            return this.renderLoadingView();
        }
        return this.renderColumns(newsColumns);
    }

    renderLoadingView() {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })
        return (
            <View style={styles.loadContainer}>
                <Text style={{color:'#A91503'}}>加载中...</Text>
                <Animated.Image
                    style={{
                        width: 40,
                        height: 40,
                        transform: [{rotate: spin}] }}
                    source={require('../img/loading.png')}
                />
            </View>
        )
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

    isContain(arr, element){   //判断数组重复
        var i = arr.length;
        while(i --){
            if(arr[i] == element){
                return {'isInclude':false, 'index':i};
            }
        }
        return {'isInclude':true, 'index':i};
    }

    onSubscribePress(subscribe){                                //点击订阅
        var that = this;

        AsyncStorage.getItem('USER_STATUS_INFO', function (err, result) {
            var resultJson = JSON.parse(result);

            var isFirst = resultJson.isFirst;

            if(!resultJson.account_status){                                   //未登录，进入登录界面
                that.props.navigator.pop();
                that.props.navigator.showModal({
                    title: "登录",
                    screen: "example.LoginScreen"
                });
            }
            else {
                var curr_id = resultJson.account_ID;

                let USERDATA = {
                    'user_id': curr_id,
                    'subscribe_id': [subscribe],
                };

                if (isFirst) {   //登录后第一次点击
                    console.log(1111);
                    fetch('http://localhost:3000/user_data', {method: 'get'})
                        .then((response) => response.json()).then((responseJson) => {
                        if (!responseJson) {
                            return;
                        }  //用户还没有订阅栏目
                        else {
                            for (var i in responseJson) {
                                if (responseJson[i].user_id == curr_id) {
                                    USERDATA.subscribe_id = responseJson[i].subscribe_id;

                                    if (that.isContain(USERDATA.subscribe_id, subscribe).isInclude) {
                                        USERDATA.subscribe_id.push(subscribe);
                                        that.props.navigator.showInAppNotification({
                                            screen: "example.NotificationScreen",
                                            passProps: {note: that.state.source[subscribe].name, message: '您已成功订阅了'}
                                        });
                                    }
                                    else {

                                        USERDATA.subscribe_id.splice(that.isContain(USERDATA.subscribe_id, subscribe).index, 1);  //删除重复的数组元素
                                        that.props.navigator.showInAppNotification({
                                            screen: "example.NotificationScreen",
                                            passProps: {note: that.state.source[subscribe].name, message: '您已取消订阅'}
                                        });
                                    }

                                    AsyncStorage.setItem('USER_DATA', JSON.stringify(USERDATA));
                                    return;
                                }
                            }
                        }
                    });
                    let USERSTATUSINFO = {
                        'account_email': resultJson.account_email,
                        'account_status': resultJson.account_status,
                        'account_ID': resultJson.account_ID,
                        'isFirst': false,
                    }
                    AsyncStorage.setItem('USER_STATUS_INFO', JSON.stringify(USERSTATUSINFO));
                }


                //存储当前用户的订阅ID
                AsyncStorage.getItem('USER_DATA', (error, result) => {
                    if(!result){
                        AsyncStorage.setItem('USER_DATA', JSON.stringify(USERDATA));
                        that.props.navigator.showInAppNotification({
                            screen: "example.NotificationScreen",
                            passProps: {note: that.state.source[subscribe].name, message: '您已成功订阅了'}
                        });
                    }
                    else {
                        var responseJson = JSON.parse(result);
                        var arr_id = responseJson.subscribe_id;

                        if (that.isContain(arr_id, subscribe).isInclude) {
                            arr_id.push(subscribe);
                            that.props.navigator.showInAppNotification({
                                screen: "example.NotificationScreen",
                                passProps: {note: that.state.source[subscribe].name, message: '您已成功订阅了'}
                            });
                        }
                        else{
                            arr_id.splice(that.isContain(arr_id, subscribe).index,1);  //删除重复的数组元素
                            that.props.navigator.showInAppNotification({
                                screen: "example.NotificationScreen",
                                passProps: {note: that.state.source[subscribe].name, message: '您已取消订阅'}
                            });
                        }

                        USERDATA.subscribe_id = arr_id;

                        that.setState({                                               //设置用户订阅版块列表
                            subscribes: arr_id,
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
    loadContainer: {
        flex: 1,
        marginTop: 100,
        alignItems: 'center'
    },
    button: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 10,
        marginTop: 10,
        color: 'blue'
    }
});
