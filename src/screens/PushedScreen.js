import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import NewsDetail from '../component/NewsDetail';

export default class PushedScreen extends Component {
  static navigatorStyle = {
    drawUnderTabBar: true
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ScrollView style={styles.container}>
          <NewsDetail pageID={this.props.id}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
      marginLeft: 14,
      marginRight: 14,
    backgroundColor: 'white'
  }
});
