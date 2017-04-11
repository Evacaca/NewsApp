import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Platform,
    Image,
    Dimensions,
    ScrollView,
    AsyncStorage
} from 'react-native';
//引用组件
import Slider from '../component/Slider';
import NewsCard from '../component/NewsCard';
import ColumnCard from '../component/ColumnCard';
//定义组件
export default class FirstTabScreen extends Component {
    //导航设置
    static navigatorButtons = {
        leftButtons: [{
            icon: require('../img/navicon_menu.png'),
            id: 'menu'
        }],
        rightButtons: [
            {
                icon: require('../img/navicon_add.png'),
                id: 'add'
            }
        ]
    };
    static navigatorStyle = {
        navBarBackgroundColor: '#A91503',
        navBarTextColor: '#fff',
        navBarSubtitleTextColor: '#ff0000',
        navBarButtonColor: '#ffffff',
        statusBarTextColorScheme: 'light',
        tabBarBackgroundColor: '#A91503',
        tabBarButtonColor: '#ffffff',
        tabBarSelectedButtonColor: '#ffff00'
    };

    constructor(props) {
        super(props);
        // if you want to listen on navigator events, set this up
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.state = {
            source: null,
            status: null
        }
    }

    componentDidMount() {
        var that = this;

        fetch('http://www.qdaily.com/homes/articlemore/1490225388.json')
            .then((response) => response.json())
            .then((responseJson) => {
            that.setState({
                source: responseJson.data.feeds,
            });


        });

    }

    onNavigatorEvent(event) {
        if (event.id === 'menu') {
            this.props.navigator.toggleDrawer({
                side: 'left',
                animated: true
            });
        }
    }

    render() {
        var news = this.state.source;
        var img_url = ['http://img.qdaily.com/article/banner/20170322013702HD2XZToMq5G7m3Qy.jpg?imageMogr2/auto-orient/thumbnail/!640x360r/gravity/Center/crop/640x360/quality/85/format/jpg/ignore-error/1',
            'http://img.qdaily.com/article/banner/20170320000232OyrY3HL5T6RMWuSB.jpg?imageMogr2/auto-orient/thumbnail/!640x360r/gravity/Center/crop/640x360/quality/85/format/jpg/ignore-error/1',
            'http://img.qdaily.com/article/banner/20170323095136PzYgOsRUaATmB4Co.jpg?imageMogr2/auto-orient/thumbnail/!640x360r/gravity/Center/crop/640x360/quality/85/format/jpg/ignore-error/1'];

        if (!news) {        //加载页面内容
            return this.renderLoadingView();
        }

        return this.renderNews(img_url,news);
    }

    renderLoadingView() { //加载数据
        return (
            <View style={styles.flexContainer}>
                <Text>
                    Loading news...
                </Text>
            </View>
        );
    }

    renderNews(img_url, news) {
        const rows = news.map((row, ii) => { //渲染首页
            var i = 2*ii;
            var j = 2*ii+1;
            if (j > news.length) return;

            return <NewsCard key={i} source={news[i]} sourceSecond={news[j]}
                             click={()=>this.onPushPress(news[i].post.id)}
                             clickSecond={()=>this.onPushPress(news[j].post.id)}/>

        });
        return (
            <ScrollView style={styles.flexContainer}>
                <Slider img_one={img_url[0]}
                        img_sec={img_url[1]}
                        img_third={img_url[2]}/>
                {rows}
            </ScrollView>
        );
    }

    onPushPress(pageID) {
        this.props.navigator.push({
            title: "新闻详情",
            screen: "example.PushedScreen",
            passProps: {id: pageID}
        });
    }
}
//定义样式
const styles = StyleSheet.create({
    flexContainer: {
        flex: 1
    },
    button: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 10,
        marginTop: 10,
        color: 'blue'
    }
});
