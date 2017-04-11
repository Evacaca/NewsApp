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
    AsyncStorage,
    RefreshControl
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
            isRefreshing: false,
            loaded: 10,
            rowData: null
        }
    }

    componentDidMount() {
        var that = this;

        fetch('http://www.qdaily.com/homes/articlemore/1490225388.json')
            .then((response) => response.json())
            .then((responseJson) => {
                that.setState({
                    rowData: responseJson.data.feeds
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
        var news = this.state.rowData;
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
            if (j > this.state.loaded) return;

            return <NewsCard key={i} source={news[i]} sourceSecond={news[j]}
                             click={()=>this.onPushPress(news[i].post.id)}
                             clickSecond={()=>this.onPushPress(news[j].post.id)}/>

        });
        return (
            <ScrollView style={styles.flexContainer} refreshControl={
                <RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={this.onRefresh.bind(this)}
                    tintColor='#A91503'
                    title= {this.state.isRefreshing? '加载中...':'下拉刷新'}/>
            }>
                <Slider img_one={img_url[0]}
                        img_sec={img_url[1]}
                        img_third={img_url[2]}/>
                {rows}
            </ScrollView>
        );
    }

    onRefresh() {               //下拉加载
        this.setState({isRefreshing: true});
        let url;
        AsyncStorage.getItem('account_status', (error, result)=>{
            var curr_status = result;
            if(curr_status){
                // console.log(curr_status);
                url = "http://www.qdaily.com/special_columns/column_more/1487916735.json";
//（subscribe_id是序号 i,j）如何获得用户ID和订阅的ID
            }
        });

        fetch('http://www.qdaily.com/homes/articlemore/1490225388.json')
            .then((response) => response.json())
            .then((responseJson) => {
                var news = responseJson.data.feeds;
                if(this.state.loaded>news.length){
                    this.setState({
                       isRefreshing: false
                    });
                    return;
                }
                setTimeout(() => {
                    var rowNewData = news.concat(this.state.rowData);
                    this.setState({
                        loaded: this.state.loaded + 6,
                        isRefreshing: false,
                        rowData: rowNewData,
                    })
                }, 2000);

            });
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
