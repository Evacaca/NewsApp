import React, {Component} from 'react';
import {
    Image,
    Dimensions,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import {Container, Content, Form, Item, Input, Button} from 'native-base';
import NetUtil from '../util/NetUtil';

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
            confirm_pwd: ''
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
                                    <Input placeholder="电子邮箱" onChangeText={(text) => this.setState({email: text})}/>
                                </Item>
                                <Item regular>
                                    <Input placeholder="创建密码" onChangeText={(text) => this.setState({password: text})}/>
                                </Item>
                                <Item regular>
                                    <Input placeholder="确认密码" onChangeText={(text) => this.setState({confirm_pwd: text})}/>
                                </Item>
                            </Form>

                            <Button block
                                    style={{backgroundColor: '#A91503', marginTop: 30, marginLeft:10, marginRight:10}}
                                    onPress={this._checkRegister.bind(this)}>
                                <Text style={styles.buttonText}>下一步</Text>
                            </Button>
                            <Button block style={{
                                        backgroundColor: 'transparent',
                                        marginTop: 10,
                                        marginLeft:10,
                                        marginRight:10,
                                        borderColor: '#eaeaea',
                                        borderWidth: 1,
                                        borderStyle: 'solid'}}
                            onPress={this.onClosePress.bind(this)}>
                                <Text style={styles.cancelText}>取消</Text>
                            </Button>
                            <View style={styles.loginView}>
                                <TouchableOpacity style={[styles.loginItem, styles.textLeft]}
                                                  onPress={ this.onLoginPress.bind(this) }>
                                    <Text style={styles.text}>已有账户</Text>
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

    onLoginPress() {
        this.props.navigator.push({
            title: "登录",
            screen: "example.LoginScreen"
        });
    }
    onClosePress() {
        this.props.navigator.dismissModal();
    }
    _checkRegister() {
        var
            email = this.state.email.trim(),
            pwd = this.state.password.trim(),
            sec_pwd = this.state.confirm_pwd;
        var email_filter=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(email=='' || pwd=='') {
            return this.onLightBoxPress("邮箱和密码输入不能为空");
        }
        if(!email_filter.test(email)) {
            return this.onLightBoxPress("邮箱格式输入错误！");
        }
        if(pwd.length>6 || pwd.length <4){
            return this.onLightBoxPress("密码长度应为4-6位");
        }
        if(!pwd.match(/^[0-9A-Za-z]{4,6}$/)){
            return this.onLightBoxPress("密码格式错误，应由数字或字母构成");
        }
        if(sec_pwd != pwd){
            return this.onLightBoxPress("密码不一致");
        }

        else{
            this.onPressCallback();
        }
    }
    onPressCallback () {
        let data = {
            'user_email': this.state.email,
            'user_password': this.state.password,
            'login_status': false,
        };
        let url = "http://localhost:3000/user";
        fetch(url, {method: 'get'}).then((response) => response.json()).then((responseJson) => {
            console.log(2222222222);
            for(var i in responseJson){

                if(data.user_email == responseJson[i].user_email){
                    return this.onLightBoxPress("邮箱已存在");
                }
            }
            NetUtil.postJson(url,data,(responseJson) => {
                // alert(responseJson.user_email);
            });
            this.props.navigator.dismissModal();
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
        color: '#fff'
    },
    text: {
        color: '#808080',
        fontSize: 14,
    },
    cancelText:{
        color: '#808080',
        fontSize: 18,
    }
});
