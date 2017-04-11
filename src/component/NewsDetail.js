/**
 * Created by wangliting on 2017/3/26.
 */
import React, {Component} from 'react';
import {
    View,
    WebView,
    StyleSheet,
    Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window');
const url = 'http://m.qdaily.com/mobile/articles/39056.html' ;

export default class NewsDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            detail_url: 'http://m.qdaily.com/mobile/articles/'
        }
    }

    render(){
        return(
            this.getNewsDetail(this.props.pageID)
        )
    }
    getNewsDetail(pageID){
        var url = this.state.detail_url+`${pageID}`+'.html';
        return(
            <View style={styles.flexContainer}>
                <WebView
                    style={{height:height, width:width-28, backgroundColor:'gray'}}
                    source={{uri:url,method: 'GET'}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    scalesPageToFit={true}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    flexContainer: {
        flex: 1,
    }
});