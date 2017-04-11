import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage
} from 'react-native';

import { Image } from 'react-native';
import SubscribeCard from '../component/SubscribeCard';
import NetUil from '../util/NetUtil';

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
        // if you want to listen on navigator events, set this up
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.state = {
            source: null,
            btnIsPress: true,
            _iconColor: '#A91503',
        }
    }

    componentDidMount() {
        fetch('http://www.qdaily.com/special_columns/column_more/1487916735.json').
        then((response) => response.json()).
        then((responseJson) => {
            this.setState({
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
                                  click={()=>this.onSubscribePress(newsColumns[i].id)}
                                  clickSecond={()=>this.onSubscribePress(newsColumns[j].id)}/>
        });
        return (
            <ScrollView style={styles.container}>
                {columnRows}
            </ScrollView>
        );
    }

    onNavigatorEvent(event) {
        if (event.id == 'close') {
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
    onSubscribePress(subscribe, btnIsPress, _iconColor){  //点击订阅
        var that = this;
        let url = 'http://localhost:3000/user_data';

        AsyncStorage.getItem('account_ID', function (err, result) {
            var curr_id = result;

            if(!curr_id){  //如果未登录，则进入登录界面
                that.props.navigator.pop();
                that.props.navigator.showModal({
                    title: "登录",
                    screen: "example.ModalScreen"
                });
            }
            else {     //否则发送请求

                this.setState = {   //设置按钮样式
                    btnIsPress: btnIsPress,
                    _iconColor: _iconColor,
                }

                let data = {
                    'user_id': curr_id,
                    'subscribe_id': subscribe,
                };
                NetUil.postJson(url, data, (responseJson) => {
                    console.log(responseJson);
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
