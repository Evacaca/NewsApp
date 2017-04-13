import React, { Component } from 'react';
import { View, StyleSheet, Image, Dimensions, Text, AsyncStorage } from 'react-native';
import { Container, Content, Card, CardItem} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";


const {width} = Dimensions.get('window');
export default class ColumnCard extends Component {
    render() {
        return (
            <Grid>
                <Row height={200}>
                    <Col marginRight={10}>
                        <Container>
                            <Content>
                                <Card>
                                    <CardItem cardBody>
                                        <View style={styles.mask}></View>
                                        <Image style={styles.image} source={{url: this.props.source.image}}></Image>
                                    </CardItem>
                                    <View style={styles.viewText}>
                                        <Text style={styles.titleText}>{this.props.source.name}</Text>
                                    </View>
                                    <CardItem content style={{
                                        justifyContent: 'center'}}>
                                        <Text style={styles.contentText}>{this.props.source.subscriber_num}</Text>
                                        <Text style={styles.contentText}>人订阅，更新至</Text>
                                        <Text style={styles.contentText}>{this.props.source.post_count}</Text>
                                        <Text style={styles.contentText}>篇</Text>
                                    </CardItem>
                                </Card>
                            </Content>
                        </Container>
                    </Col>
                    <Col>
                        <Container>
                            <Content>
                                <Card>
                                    <CardItem cardBody>
                                        <View style={styles.mask}></View>
                                        <Image style={styles.image} source={{url: this.props.sourceSecond.image}}></Image>
                                    </CardItem>
                                    <View style={styles.viewText}>
                                        <Text style={styles.titleText}>{this.props.sourceSecond.name}</Text>
                                    </View>
                                    <CardItem content style={{
                                        justifyContent:'center'}}>
                                        <Text style={styles.contentText}>{this.props.sourceSecond.subscriber_num}</Text>
                                        <Text style={styles.contentText}>人订阅，更新至</Text>
                                        <Text style={styles.contentText}>{this.props.sourceSecond.post_count}</Text>
                                        <View><Text style={styles.contentText}>篇</Text></View>
                                    </CardItem>
                                </Card>
                            </Content>
                        </Container>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: 100+'%',
        height: 140
    },
    flexContainer: {
        flex: 1,
    },
    contentText: {
        fontSize: 12,
        color: '#a6a6a6',
        lineHeight: 16
    },
    text: {
        fontSize: 12,
        color: '#b2b2b2',
    },
    viewText: {
        position: 'absolute',
        backgroundColor: 'transparent',
        width: width/2-20,
        top: 90,
    },
    titleText:{
        fontSize: 18,
        color: '#fff',
        fontWeight: '700',
        textAlign: 'center'
    },
    mask: {
        position: 'absolute',
        width: 100+'%',
        height: 140,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        top: 0,
        left: 0,
        zIndex: 1,
    }
})