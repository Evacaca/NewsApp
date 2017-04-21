import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableHighlight
} from 'react-native';

import {Navigation} from 'react-native-navigation';
import Swiper from 'react-native-swiper';

const {width} = Dimensions.get('window');
const renderPagination = (index, total, context) => {
    return (
        <View style={{
              position: 'absolute',
              bottom: 10,
              right: 10
        }}>
            <Text style={{ color: 'grey' }}>
                <Text style={{
                    color: 'white',
                    fontSize: 20
            }}>{index + 1}</Text>/{total}
            </Text>
        </View>
    )
}

export default class Slider extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <View  onPress={this.props.click}>
                <Swiper style={styles.wrapper} height={240}
                        renderPagination={renderPagination}
                        paginationStyle={{bottom: -23, left: null, right: 10}} loop={true}
                autoplay={true}>
                    <View style={styles.slide}>
                        <Image style={styles.image} source={{url: this.props.img[0]}}/>
                        <Text style={styles.bannerTitle}>从广州十三行到淘宝网红店，卖衣服的生意就这么变了</Text>
                    </View>
                    <View style={styles.slide}>
                        <Image style={styles.image} source={{url: this.props.img[1]}}/>
                        <Text style={styles.bannerTitle}>假发日益流行，做它的匠人却渐渐消失，这是纽约最后制发大师的故事</Text>
                    </View>
                    <View style={styles.slide}>
                        <Image style={styles.image} source={{url: this.props.img[2]}}/>
                        <Text style={styles.bannerTitle}>谁在替上海张罗那个时装周？</Text>
                    </View>
                    <View style={styles.slide}>
                        <Image style={styles.image} source={{url: this.props.img[3]}}/>
                        <Text style={styles.bannerTitle}>歌单聚集的注意力越来越多，它会像当年的单曲一样再次重塑音乐产业吗？</Text>
                    </View>
                </Swiper>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },

    slide: {
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },

    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },

    image: {
        width,
        flex: 1
    },
    bannerTitle: {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        position: 'absolute',
        bottom: 30,
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,0.5)',
        fontSize: 18,
        lineHeight: 24
    }

});
