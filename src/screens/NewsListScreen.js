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
    RefreshControl,
    DeviceEventEmitter,
    Animated,
    Easing
} from 'react-native';
//引用组件
import Slider from '../component/Slider';
import NewsCard from '../component/NewsCard';
import ColumnCard from '../component/ColumnCard';
import DataJson from '../api_server/news_db.json';
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
            rowData: null,
            columnData: null,
            status: false,
            subscribes: []
        }
        this.spinValue = new Animated.Value(0);
    }

    componentDidMount() {
        this.spinner();
        var that = this;

        fetch('http://www.qdaily.com/homes/articlemore/1490225388.json')
            .then((response) => response.json())
            .then((responseJson) => {
                that.setState({
                    rowData: responseJson.data.feeds
                });
            });
    }
    spinner () {
        this.spinValue.setValue(0);
        Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                duration: 1800,
                easing: Easing.linear
            }
        ).start(() => this.spinner())
    }
    onNavigatorEvent(event) {

        if (event.type == 'DeepLink') { //handle deep link
            const parts = event.link.split('/');
            if (parts[0] == 'SideMenu') {
                this.props.navigator.resetTo({
                    title: "ALL",
                    screen: parts[1],
                    animated: true
                });
            }
        }

        if (event.id === 'menu') {
            AsyncStorage.getItem("USER_STATUS_INFO", (error, result) => {//获取登录信息
                var email = '登录';
                var status = false;

                if(result){
                    email = JSON.parse(result).account_email;
                    status = JSON.parse(result).account_status;
                }
                DeviceEventEmitter.emit('user_info', {'email': email, 'status': status});  //传播通知登录信息

                this.props.navigator.toggleDrawer({  //打开侧边菜单栏
                    side: 'left',
                    animated: true,
                });
            });
        }
    }

    render() {
        var news = this.state.rowData;
        var columnNews = this.state.columnData;
        var img_url = ['http://img.qdaily.com/article/banner/20170322013702HD2XZToMq5G7m3Qy.jpg?imageMogr2/auto-orient/thumbnail/!640x360r/gravity/Center/crop/640x360/quality/85/format/jpg/ignore-error/1',
            'http://img.qdaily.com/article/banner/20170320000232OyrY3HL5T6RMWuSB.jpg?imageMogr2/auto-orient/thumbnail/!640x360r/gravity/Center/crop/640x360/quality/85/format/jpg/ignore-error/1',
            'http://img.qdaily.com/article/banner/20170323095136PzYgOsRUaATmB4Co.jpg?imageMogr2/auto-orient/thumbnail/!640x360r/gravity/Center/crop/640x360/quality/85/format/jpg/ignore-error/1'];

        if (!news) {        //加载动画
            return this.renderLoadingView();
        }

        return this.renderNews(img_url, news, columnNews, this.state.status);
    }

    renderLoadingView() {   //加载数据
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })
        return (
            <View style={styles.container}>
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

    renderNews(img_url, news, columnNews, status) {
        const rows = news.map((row, ii) => { //渲染首页
            var i = 2*ii;
            var j = 2*ii+1;
            if (j > this.state.loaded) return;

            return <NewsCard key={i} source={news[i]} sourceSecond={news[j]}
                             click={()=>this.onPushPress(news[i].post.id)}
                             clickSecond={()=>this.onPushPress(news[j].post.id)}/>

        });
        if(status) {
            var columnRows = columnNews.map((row, ii) => {
                var i = 2 * ii;
                var j = 2 * ii + 1;

                if (j > columnNews.length) return;
                return <ColumnCard key={i} source={columnNews[i]}
                                   sourceSecond={columnNews[j]}
                                   clickSecond={() => this.onPushContent(columnNews[j].name, columnNews[j].id)}
                                   click={() => this.onPushContent(columnNews[i].name, columnNews[i].id)}/>
            });
        }
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
                {columnRows}
                {rows}
            </ScrollView>
        );
    }

    onRefresh() {               //下拉加载
        this.setState({isRefreshing: true});
        let url;

        AsyncStorage.getItem('USER_STATUS_INFO', (error, result) => {
            var resultJson = JSON.parse(result);
            if(!resultJson){
                return;
            }
            else {
                var curr_status = resultJson.account_status;

                if (curr_status) {
                    // console.log(curr_status);
                    url = "http://www.qdaily.com/special_columns/column_more/1487916735.json";
                    AsyncStorage.getItem('USER_DATA', (error, result) => {  //获取用户的订阅版块
                        var subscribes = JSON.parse(result).subscribe_id;


                                var subscribeNews = DataJson.data;
                                var columnNews = [];
                                for (var i in subscribes) {
                                    console.log(subscribeNews[subscribes[i]]);
                                    columnNews.push(subscribeNews[subscribes[i]]);
                                }
                                // @TODO
                                if (subscribes.length % 2 != 0) {    //每次同时渲染两个，所以需要控制偶数

                                    console.log(subscribes[subscribes.length - 1]);
                                    columnNews.push(subscribeNews[subscribes.length - 1]);
                                }
                                this.setState({
                                    status: true,
                                    columnData: columnNews
                                });
                            })
                }
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
            screen: "example.NewsDetailScreen",
            passProps: {id: pageID}
        });
    }

    onPushContent(navTitle, subscribeID){
        this.props.navigator.push({
            title: `${navTitle}`,
            screen: 'example.SubscribeContentScreen',
            passProps: {id: subscribeID}
        })
    }
}
//定义样式
const styles = StyleSheet.create({
    flexContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        marginTop: 100,
        // justifyContent: 'center',
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
