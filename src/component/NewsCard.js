import React, { Component } from 'react';
import { View, StyleSheet, Image, Dimensions, Text,TouchableOpacity } from 'react-native';
import { Container, Content, Card, CardItem, Button} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/Ionicons';
export default class NewsCard extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Grid style={{paddingLeft:6, paddingRight: 6, paddingTop:6}}>
                <Row height={200}>
                    <Col style={{marginRight:6}}>
                        <Container>
                            <Content>
                                <Card>
                                    <CardItem cardBody onPress={this.props.click}>
                                        <Image style={styles.image} source={{url: this.props.source.image}}></Image>
                                    </CardItem>
                                    <CardItem content onPress={this.props.click}>
                                        <Text numberOfLines={2} style={styles.contentText}>{this.props.source.post.title}</Text>
                                    </CardItem>
                                    <CardItem style={{
                                        justifyContent: 'center',
                                        width: '100%',
                                        position: 'absolute',
                                        top:110,
                                        padding:0,
                                        backgroundColor: 'rgba(159,159,159,0.6)'}}>
                                        <Button transparent small>
                                            <Icon style={{fontSize:16, color: '#FFFF'}} active name="ios-thumbs-up" />
                                            <Text style={styles.text}>{this.props.source.post.praise_count}</Text>
                                        </Button>
                                        <Button transparent small>
                                            <Icon style={{fontSize:16, color: '#FFFF'}} name="ios-chatbubbles" />
                                            <Text style={styles.text}>{this.props.source.post.comment_count}</Text>
                                        </Button>
                                    </CardItem>
                                </Card>
                            </Content>
                        </Container>
                    </Col>
                    <Col>
                        <Container>
                            <Content>
                                <Card>
                                    <CardItem cardBody onPress={this.props.clickSecond}>
                                        <Image style={styles.image}  source={{url: this.props.sourceSecond.image}}></Image>
                                    </CardItem>
                                    <CardItem content onPress={this.props.clickSecond}>
                                        <Text style={styles.contentText} numberOfLines={2}>{this.props.sourceSecond.post.title}</Text>
                                    </CardItem>
                                    <CardItem style={{
                                        justifyContent: 'center',
                                        width: '100%',
                                        position: 'absolute',
                                        top:110,
                                        padding:0,
                                        backgroundColor: 'rgba(159,159,159,0.6)'}}>
                                        <Button transparent small>
                                            <Icon style={{fontSize:16, color: '#FFFF'}} name="ios-thumbs-up" />
                                            <Text style={styles.text}>{this.props.sourceSecond.post.praise_count}</Text>
                                        </Button>
                                        <Button transparent small>
                                            <Icon style={{fontSize:16, color: '#FFFF'}} name="ios-chatbubbles" />
                                            <Text style={styles.text}>{this.props.sourceSecond.post.comment_count}</Text>
                                        </Button>
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
        fontSize: 14,
        color: '#0f1419',
        lineHeight: 14
    },
    text: {
        fontSize: 11,
        color: '#FFFF',
    }
})