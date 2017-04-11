/**
 * Created by wangliting on 2017/4/2.
 */
import {AsyncStorage} from 'react-native';

let Storage = {
    setAsCache(key, value){
        if (typeof value !== 'string') {
            value = JSON.stringify(value);
        }

        AsyncStorage.setItem(key, value, function (err) {
            if(err){
                console.log('错误');
            }
        });
    },

    getCache(key){
        AsyncStorage.getItem(key, function(err, result){
            if(err){
                console.log('错误');
            }

            console.log(result);
        });
    }
}

export default Storage;