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
    RefreshControl,
} from 'react-native';
//引用组件
import NewsCard from '../component/NewsCard';

let url = "http://www.qdaily.com/special_columns/show_more/";
let subscribe_id = {
    '29': '1488795859',
    '22': '1486187906',
    '13': '1487575845',
    '8': '1487559576',
    '16': '1465808623',
    '38': '1488238303',
    '14': '1468714602',
    '15': '1466233377',
    '9': '1468710118',
    '33': '1483570800',
    '17': '1446278400',
    '49': '1451829630',
    '44': '1486984036',
    '31': '1487586035',
    '30': '1480410436',
    '12': '1452188482',
    '11': '1454778006',
    '18': '1453446000',
    '41': '1481071783',
    '20': '1452322836',
}

//定义组件
export default class SubscribeContentScreen extends Component {
    //导航设置

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
        this.state = {
            isRefreshing: false,
            loaded: 10,
            rowData: null,
        }
    }

    componentDidMount() {
        var that = this;
        var subscribe_url = url + `${this.props.id}` + '/'+ `${subscribe_id[this.props.id]}` + '.json'
console.log(subscribe_url);
        fetch(subscribe_url)
            .then((response) => response.json())
            .then((responseJson) => {
                that.setState({
                    rowData: responseJson.data.feeds
                });
            });
    }


    render() {
        var news = this.state.rowData;

        if (!news) {        //加载页面内容
            return this.renderLoadingView();
        }

        return this.renderNews(news);
    }

    renderLoadingView() {   //加载数据
        return (
            <View style={styles.flexContainer}>
                <Text>
                    Loading news...
                </Text>
            </View>
        );
    }

    renderNews(news) {
        if(news.length % 2 !=0){            //  保持偶数
            news.push(news[2]);
        }
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

                {rows}
            </ScrollView>
        );
    }

    onRefresh() {               //下拉加载
        this.setState({isRefreshing: true});

        fetch('http://www.qdaily.com/special_columns/show_more/41/1481071783')
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
