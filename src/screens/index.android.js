import {Navigation} from 'react-native-navigation';

import FirstTabScreen from './NewsListScreen';
import SecondTabScreen from './SecondTabScreen';
import PushedScreen from './NewsDetailScreen';
import StyledScreen from './StyledScreen';
import SideMenu from './SideMenu';
import ModalScreen from './LoginScreen';
import CollapsingTopBarScreen from './CollapsingTopBarScreen';
import InAppNotification from './InAppNotification';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('example.FirstTabScreen', () => FirstTabScreen);
  Navigation.registerComponent('example.SecondTabScreen', () => SecondTabScreen);
  Navigation.registerComponent('example.PushedScreen', () => PushedScreen);
  Navigation.registerComponent('example.StyledScreen', () => StyledScreen);
  Navigation.registerComponent('example.ModalScreen', () => ModalScreen);
  Navigation.registerComponent('example.SideMenu', () => SideMenu);
  Navigation.registerComponent('example.CollapsingTopBarScreen', () => CollapsingTopBarScreen);
  Navigation.registerComponent('example.InAppNotification', () => InAppNotification);
}
