
import {Navigation} from 'react-native-navigation';
import {registerScreens} from './screens';
registerScreens();

Navigation.startSingleScreenApp({
 screen: {
   screen: 'example.NewsListScreen',
   title: 'ALL',
 },
 drawer: {
   left: {
     screen: 'example.SideMenu'
   }
 }
});
