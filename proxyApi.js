const request = require("request");
const fs = require('fs');
const proxyUrl = 'https://api.best-proxies.ru/proxylist.json?key=28543a225364b1e077685ba124aee19c&speed=1&type=https&google=1&level=1&country=us&limit=0';
let state = {
    proxyList: [],
    checkedProxy: {}
}
//Get 
exports.startUpdateProxyList = async (callback) => {
 await new Promise((resolve, reject) => {
        request(proxyUrl, function (error, response, body) {
        if (error) console.log("proxy:", error);
        else if (response.statusCode !== 200) console.log("proxy:", response.statusCode);
        else {
            state.proxyList = JSON.parse(body).map(el => {
                return el.ip + ':' + el.port
            });
            
            resolve();
        }
        reject();
        
        });

     }).then(()=> {console.log('PROXY UPDATED...', state.proxyList)})
    .catch(()=> {console.log("PROXY UPDATED FAILED!")});
    
    setTimeout(this.startUpdateProxyList, 5000)
    if (callback) callback();
}

exports.testCurrentProxy = (proxy) => {
    if(!index.isNumber())return console.log('BARRRRAAAAAAAAAAANNNNNNNNNNNN')
    request({
        'url':'https://api.ipify.org/',
        'method': "GET",
        'proxy':'http://'+ proxy
    },function (error, response, body) {
        if(error)console.log(error);
        if (!error && response.statusCode === 200) {
            console.log('my ip',body);
        }
        setTimeout(start,100)
    });
}

exports.getAvailableProxy = () => {
    let proxy = null;
    state.proxyList.some((el) => {
       if(!state.checkedProxy[el]||Date.now()-state.checkedProxy[el] > 3000){
        proxy = el;
        state.checkedProxy[el] = Date.now();
        return true;
       }
       return false;

    });
    return proxy
}

//exports.state = state;