/**
 * Created by wangliting on 2017/3/22.
 */
let NetUtil = {
    postJson(url, data, callback){
        var fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json; charset=UTF-8"
            },
            body:JSON.stringify(data)
        };

        fetch(url, fetchOptions)
            .then((response) => response.text())
            .then((responseText) => {
                 callback(JSON.parse(responseText));
                // callback(responseJson);
            }).done();
    },
}
export default NetUtil;