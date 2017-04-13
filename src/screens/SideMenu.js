import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    AlertIOS,
    Image,
} from 'react-native';

import {Container, Content, ListItem, Right} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

export default class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_info: '登录'
        }
    }
    componentDidMount(){

    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.viewImage}>
                    <Image style={styles.image} source={require('../img/timg.jpeg')}></Image>
                </View>

                <Container>
                    <Content>

                        <ListItem onPress={ this.onModalPress.bind(this) }>
                            <Icon name='md-person' size={26} color={'#CF0E17'}/>
                            <Text style={styles.button}>{this.state.user_info}</Text>
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
                        <ListItem onPress={ this.onSubscribePress.bind(this) }>
                            <Icon name='md-exit' size={26} color={'#CF0E17'}/>
                            <Text style={styles.button}>退出</Text>
                            <Right><Icon name="ios-arrow-round-forward" color={'#8D7D7D'} size={24}/></Right>
                        </ListItem>
                    </Content>
                </Container>
            </View>
        );
    }

    onModalPress() {
        this._toggleDrawer();
        this.props.navigator.showModal({
            title: "登录",
            screen: "example.ModalScreen"
        });
    }

    onBackPress() {
        this._toggleDrawer();
    }

    _toggleDrawer() {
        this.props.navigator.toggleDrawer({
            to: 'closed',
            side: 'left',
            animated: true
        });
    }

    onSubscribePress() {
        this._toggleDrawer();
        this.props.navigator.showModal({
            title: "订阅",
            screen: "example.SubScribeScreen"
        });
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
