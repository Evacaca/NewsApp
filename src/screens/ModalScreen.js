import React, {Component} from 'react';
import {
    Image,
    Dimensions,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage
} from 'react-native';

import {Container, Content, Form, Item, Input, Button} from 'native-base';
import Storage from '../util/Storage';

const {width} = Dimensions.get('window');

export default class ModalScreen extends Component {
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
            email: '',
            password: '',
            status: false,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.flexContainer}>
                    <View style={styles.imageView}>
                        <Image style={styles.topImageStyle} source={require('../img/login_large_ic.png')}></Image>
                    </View>
                    <Container style={{width: 300}}>
                        <Content>
                            <Form style={{paddingLeft:10, paddingRight:10}}>
                                <Item regular>
                                    <Input placeholder="邮箱" onChangeText={(text) => this.setState({email: text})}/>
                                </Item>
                                <Item regular>
                                    <Input placeholder="密码" onChangeText={(text) => this.setState({password: text})}/>
                                </Item>
                            </Form>

                            <Button block
                                    style={{backgroundColor: '#A91503', marginTop: 30, marginLeft:10, marginRight:10}}
                                    onPress={this.onPressCallback.bind(this)}>
                                <Text style={styles.buttonText}>登录</Text>
                            </Button>
                            <View style={styles.loginView}>
                                <TouchableOpacity style={[styles.loginItem, styles.textLeft]}
                                                  onPress={ this.onRegisterPress.bind(this) }>
                                    <Text style={styles.text}>注册</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.loginItem, styles.textRight]}>
                                    <Text style={styles.text}>忘记密码</Text>
                                </TouchableOpacity>
                            </View>
                        </Content>
                    </Container>
                </View>
            </View>
        );
    }

    onNavigatorEvent(event) {
        if (event.id == 'close') {
            this.props.navigator.dismissModal();
        }
    }

    onRegisterPress() {
        this.props.navigator.push({
            title: "注册",
            screen: "example.RegisterScreen"
        });
    }

    onLightBoxPress(message) {
        this.props.navigator.showLightBox({
            screen: "example.LightBoxScreen",
            style: {
                backgroundBlur: "dark"
            },
            passProps: {
                greeting: message
            },
        });
    }

    onLoginIn(){
        this.props.navigator.dismissModal({
           passProps: {status: this.state.status}
        });
    }
    onPressCallback () {

        var email = this.state.email.trim();
        var pwd = this.state.password.trim();

        if(email=='' || pwd==''){
            console.log("邮箱和密码不能为空");
            return;
        }

        fetch('http://localhost:3000/user').
        then((response) => response.json()).
            then((responseJson) => {

            for(var i in responseJson){
                if(email == responseJson[i]["user_email"]){ //验证账号密码的时候，感觉自己像个白痴
                    if(pwd == responseJson[i]["user_password"]){
                        //设置用户登录信息
                        let USERSTATUSINFO = {
                            'account_ID': responseJson[i].id,
                            'account_status': true
                        }
                        AsyncStorage.setItem('USER_STATUS_INFO', JSON.stringify(USERSTATUSINFO));
                        //登录成功，回到首页

                        // AsyncStorage.getItem('USER_STATUS_INFO', (error, result) => {
                        //     console.log(result);
                        // })
                        this.onLoginIn();
                        return;
                    }
                    return this.onLightBoxPress('密码错误！');

                }

            }
            return this.onLightBoxPress('邮箱不存在！');
        }).done();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(249, 249, 249)',
    },
    button: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 10,
        marginTop: 10,
        color: 'blue'
    },
    flexContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgb(249, 249, 249)'
    },
    imageView: {
        flex: 1,
        marginTop: 22,
        alignItems: 'center',
        justifyContent: 'center'
    },
    topImageStyle: {
        width: width * 0.5,
        height: width * 0.5,
    },
    loginView: {
        margin: 10,
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginItem: {
        flex: 1,
    },
    textLeft: {
        alignItems: 'flex-start',
    },
    textRight: {
        alignItems: 'flex-end',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff'
    },
    text: {
        color: '#808080',
        fontSize: 14,
    }
});
