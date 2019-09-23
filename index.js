const request = require("request");
const fs = require('fs');
const proxy_str = 'https://api.best-proxies.ru/proxylist.json?key=28543a225364b1e077685ba124aee19c&speed=1&type=https&google=1&level=1&country=de&limit=0';
const proxyApi = require("./proxyApi");
const yobitApi = require("./yobitApi");
// function get_pairs(way,callback){
//     request('https://yobit.net/api/3/info', function (error, response, body){
//         let pairs = JSON.parse(body).pairs;
//         let arr = [];
//         for(key in pairs){
//             arr.push(key);
//         }
//         fs.writeFile(way + "pairs.json" ,JSON.stringify(arr),callback)
//     });
// }

// function get_info(offset,limit,proxy) {
//     let reg_str = paris.slice(offset, offset + limit);
//     request({
//         'url': 'https://yobit.net/api/3/ticker/' + reg_str.join('-'),
//         'method': "GET",
//         'proxy': 'http://' + proxy
//     }, function (error, response, body) {

//         if (error) return console.log(error);
//         if (response.statusCode !== 200) return console.log(response.statusCode);
//         let info = JSON.parse(body);

//         reg_str.map(el => {
//             const delta = info[el].buy / info[el].low - 1;
//             if(info[el].vol>0 && delta > 0.0)
//             console.log(el, delta)
//         });

//       });
// }


 // get_proxy_list(()=>{
 //     const LIMIT = 30;
 //     for (let i = 60;i<90;i++){
 //         console.log('iter '+ i);
 //         get_info(i*LIMIT,LIMIT,proxy[5]);
 //     }
 //     //get_info(0,LIMIT,proxy[0]);
 // });
proxyApi.startUpdateProxyList(()=>{
	console.log(proxyApi.getAvailableProxy());
	console.log(proxyApi.getAvailableProxy());
	console.log(proxyApi.getAvailableProxy());

	// yobitApi.updateListInfoPairsByRange(0,15,proxyApi.getAvailableProxy(), ()=>{
	// 	console.log(yobitApi.state.infoAboutPairs);
	// });	
});

//	youpdateListInfoPairsByRange = (offset,limit,proxy, callback)

// ;},3000);




 