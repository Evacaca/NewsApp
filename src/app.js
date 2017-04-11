import {
  Platform
} from 'react-native';
import {Navigation} from 'react-native-navigation';

import {registerScreens} from './screens';
registerScreens();

Navigation.startSingleScreenApp({
 screen: {
   screen: 'example.FirstTabScreen',
   title: 'ALL',
 },
 drawer: {
   left: {
     screen: 'example.SideMenu'
   }
 }
});
