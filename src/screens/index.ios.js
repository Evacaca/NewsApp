import {Navigation} from 'react-native-navigation';

import NewsListScreen from './NewsListScreen';
import NewsDetailScreen from './NewsDetailScreen';
import SideMenu from './SideMenu';
import LoginScreen from './LoginScreen';
import NotificationScreen from './NotificationScreen';
import LightBoxScreen from './LightBoxScreen';
import SubscribeScreen from './SubscribeScreen';
import RegisterScreen from './RegisterScreen';
import SubscribeContentScreen from './SubscribeContentScreen';

// 注册app的所有界面入口
export function registerScreens() {
  Navigation.registerComponent('example.NewsListScreen', () => NewsListScreen);
  Navigation.registerComponent('example.NewsDetailScreen', () => NewsDetailScreen);
  Navigation.registerComponent('example.LoginScreen', () => LoginScreen);
  Navigation.registerComponent('example.NotificationScreen', () => NotificationScreen);
  Navigation.registerComponent('example.SideMenu', () => SideMenu);
  Navigation.registerComponent('example.LightBoxScreen', () => LightBoxScreen);
  Navigation.registerComponent('example.SubScribeScreen', () => SubscribeScreen);
  Navigation.registerComponent('example.RegisterScreen', () => RegisterScreen);
  Navigation.registerComponent('example.SubscribeContentScreen', () => SubscribeContentScreen);
}
