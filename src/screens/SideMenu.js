import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    AlertIOS,
    Image,
    AsyncStorage,
    DeviceEventEmitter
} from 'react-native';

import {Container, Content, ListItem, Right} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

export default class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_email: '登录',
            user_status: false
        }
    }
    componentDidMount(){
        console.log("组件渲染组件渲染")
        this.user_info = DeviceEventEmitter.addListener('user_info', (user_info)=>{//监听通知事件以获取登录信息
            console.log(user_info);
            if(!user_info.status){
                user_info.email = '登录';
            }
           this.setState({
               user_email: user_info.email,
               user_status: user_info.status
           });
        });
    }
    componentWillUnmount(){         //销毁
        console.log("组件销毁组件销毁");
        this.user_info.remove();
    }
    render() {
        var logItem = null;
        if(this.state.user_status){
            logItem = (
                <ListItem onPress={ this.onLogout.bind(this) }>
                    <Icon name='md-exit' size={26} color={'#CF0E17'}/>
                    <Text style={styles.button}>退出</Text>
                    <Right><Icon name="ios-arrow-round-forward" color={'#8D7D7D'} size={24}/></Right>
                </ListItem>
            );
        }
        return (
            <View style={styles.container}>
                <View style={styles.viewImage}>
                    <Image style={styles.image} source={require('../img/timg.jpeg')}></Image>
                </View>

                <Container>
                    <Content>
                        <ListItem onPress={ this.onModalPress.bind(this) }>
                            <Icon name='md-person' size={26} color={'#CF0E17'}/>
                            <Text style={styles.button}>{this.state.user_email}</Text>
                            <Right><Icon name="ios-arrow-round-forward" color={'#8D7D7D'} size={24}/></Right>
                        </ListItem>
                        <ListItem onPress={ this.onBackPress.bind(this) }>
                            <Icon name='md-home' size={26} color={'#CF0E17'}/>
                            <Text style={styles.button}>首页</Text>
                            <Right><Icon name="ios-arrow-round-forward" color={'#8D7D7D'} size={24}/></Right>
                        </ListItem>
                        <ListItem onPress={ this.onSubscribePress.bind(this) }>
                            <Icon name='md-cube' size={22} color={'#CF0E17'}/>
                            <Text style={styles.button}>栏目中心</Text>
                            <Right><Icon name="ios-arrow-round-forward" color={'#8D7D7D'} size={24}/></Right>
                        </ListItem>
                        {logItem}
                    </Content>
                </Container>
            </View>
        );
    }

    onModalPress() {        //进入登录页面
        if(this.state.user_status){  //如果已经登录，则不再登录
            return;
        }
        else {
            this._toggleDrawer();
            this.props.navigator.showModal({
                title: "登录",
                screen: "example.ModalScreen"
            });
        }
    }

    onBackPress() {
        this._toggleDrawer();
    }

    _toggleDrawer() {       //关闭菜单栏
        this.props.navigator.toggleDrawer({
            to: 'closed',
            side: 'left',
            animated: true
        });
    }

    onSubscribePress() { //进入订阅页面
        this._toggleDrawer();
        this.props.navigator.showModal({
            title: "订阅",
            screen: "example.SubScribeScreen"
        });
    }
    onLogout(){     //退出登录
        this._toggleDrawer();
        this.props.navigator.handleDeepLink({
            link: "SideMenu/example.FirstTabScreen",
        });

        // DeviceEventEmitter.emit('user_subscribe', ({ 'subscribes': []}));

        if(this.state.user_status){
            let USERSTATUSINFO = {
                account_email: '',
                account_status: false,
                account_ID: ''
            }
            AsyncStorage.setItem('USER_STATUS_INFO', JSON.stringify(USERSTATUSINFO));
            this.setState({
                user_email: '登录',
                user_status: false
            });

        }
        // this.props.navigator.pop();

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 60,
    },
    viewImage: {
        alignItems: 'center',
        marginBottom: 20,
    },
    button: {
        textAlign: 'center',
        fontSize: 16,
        color: '#8D7D7D',
        marginLeft: 14,
    },
    image: {
        width: 128,
        height: 128,
    }
});
