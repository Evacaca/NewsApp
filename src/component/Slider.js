import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions
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
            <View>
                <Swiper style={styles.wrapper} height={240}
                        renderPagination={renderPagination}
                        paginationStyle={{bottom: -23, left: null, right: 10}} loop={true}
                autoplay={true}>
                    <View style={styles.slide}>
                        <Image style={styles.image} source={{url: this.props.img_one}}/>
                    </View>
                    <View style={styles.slide}>
                        <Image style={styles.image} source={{url: this.props.img_sec}}/>
                    </View>
                    <View style={styles.slide}>
                        <Image style={styles.image} source={{url: this.props.img_third}}/>
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
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },

    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },

    image: {
        width,
        flex: 1
    }
});
