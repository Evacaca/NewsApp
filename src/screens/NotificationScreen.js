import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';

export default class NotificationScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    {this.props.message}
                    <Text style={styles.highlight}>
                        {'"'}{this.props.note}{'"'}
                    </Text>
                </Text>
                <View><Text>前往首页可加载更多</Text></View>
                <TouchableOpacity onPress={ this.onDismissPress.bind(this) }>
                    <Text style={styles.button}>关闭</Text>
                </TouchableOpacity>
            </View>
        );
    }

    onDismissPress() {
        this.props.navigator.dismissInAppNotification();
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d6e7ad'
    },
    welcome: {
        fontSize: 16,
        textAlign: 'center',
        margin: 10,
        paddingTop: 20
    },
    highlight: {
        fontSize: 18,
        // color: '#fff'
    },
    button: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 10,
        marginTop: 10,
        color: '#4692ad'
    }
});
