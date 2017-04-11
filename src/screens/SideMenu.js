import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    AlertIOS,
    Image
} from 'react-native';

import {Icon, Container, Content, ListItem, Right} from 'native-base';

export default class SideMenu extends Component {
    constructor(props) {
        super(props);
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
                            <Icon name='ios-person'/>
                            <Text style={styles.button}>登录</Text>
                            <Right><Icon name="arrow-forward" /></Right>
                        </ListItem>
                        <ListItem onPress={ this.onBackPress.bind(this) }>
                            <Icon name='bookmarks'/>
                            <Text style={styles.button}>首页</Text>
                            <Right><Icon name="arrow-forward" /></Right>
                        </ListItem>
                        <ListItem onPress={ this.onSubscribePress.bind(this) }>
                            <Icon name='flame'/>
                            <Text style={styles.button}>栏目中心</Text>
                            <Right><Icon name="arrow-forward" /></Right>
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
        color: 'rgb(252,86,43)',
        marginLeft: 16,
    },
    image: {
        width: 128,
        height: 128,
    }
});
