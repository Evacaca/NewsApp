import React, { Component } from 'react';
import { View, StyleSheet, Image, Dimensions, Text,TouchableOpacity } from 'react-native';
import { Container, Content, Card, CardItem, Button, Icon} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";

export default class NewsCard extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Grid>
                <Row height={200}>
                    <Col>
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
                                        position: 'absolute',
                                        top:88,
                                        backgroundColor: 'transparent'}}>
                                        <Button transparent>
                                            <Icon style={{fontSize:14}} active name="thumbs-up" />
                                            <Text style={styles.text}>{this.props.source.post.praise_count}</Text>
                                        </Button>
                                        <Button transparent>
                                            <Icon style={{fontSize:14}} active name="chatbubbles" />
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
                                        position: 'absolute',
                                        top:88,
                                        backgroundColor: 'transparent'}}>
                                        <Button transparent>
                                            <Icon style={{fontSize:14}} active name="thumbs-up" />
                                            <Text style={styles.text}>{this.props.sourceSecond.post.praise_count}</Text>
                                        </Button>
                                        <Button transparent>
                                            <Icon style={{fontSize:14}} active name="chatbubbles" />
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
        fontSize: 12,
        color: 'rgb(252, 86, 43)',
    }
})