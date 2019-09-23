const request = require("request");
const fs = require('fs');
const proxyApi = require("./proxyApi");
const pairsName = require("./pairsName.json");
const infoAllPairsUrl = 'https://yobit.net/api/3/info'
let infoAboutPairs = {} // info about all pairs with any calculated parameters
let listPumpedPairs = {}// history about pumped pairs
exports.getAllPairsListToFile = (way,callback) =>{
    request(infoAllPairsUrl, function (error, response, body){
        let pairs = JSON.parse(body).pairs;
        let arr = [];
        for(key in pairs){
            arr.push(key);
        }
        fs.writeFile(way + "pairsName.json" ,JSON.stringify(arr),callback)
    });
}
exports.updateListInfoPairsByRange =  new Promise((resolve,reject)=>{
    (offset,limit,proxy) => {
    infoAboutPairsByRange = pairsName.slice(offset, offset + limit);
   request({
        'url': 'https://yobit.net/api/3/ticker/' + infoAboutPairsByRange.join('-'),
        'method': "GET",
        'proxy': 'http://' + proxy
    },  function (error, response, body) {

        if (error) reject(error);
        if (response.statusCode !== 200) reject(response.statusCode);
        const infoAboutPairsByRange = JSON.parse(body);         
        for(key in infoAboutPairsByRange){
            infoAboutPairs[key] = infoAboutPairsByRange[key];
            infoAboutPairs[key].delta = infoAboutPairs[key].buy / infoAboutPairs[key].low - 1;
        }        
    resolve();
        });
    }
})
exports.updatedListPumpedPairs = (listPairs) => {
    for(key in infoAboutPairs){
        delta = infoAboutPairs[key].delta;
        if(delta > 0.0 && infoAboutPairs[key].vol > 0){
            listPumpedPairs[key].timePumped.push('19:15');
            listPumpedPairs[key].delta.push(delta)
        }
    }
}
exports.filtredPairsByName = (listPairs,namePair) => {
    let filtredPairsWithByNameList = listPairs.filter((el) => el.split('_').some(word=>word===namePair));
    console.log(filtredPairsWithByNameList.slice(1100,1200));
    return filtredPairsWithByNameList;
}
exports.state = {
    infoAboutPairs:infoAboutPairs,
    listPumpedPairs:listPumpedPairs
};
exports.isAnyProfitCycle = (defaultCoin) => {
    const listCoins = this.filtredPairsByName(pairsName,defaultCoin).map((el) => {
        return el.split('_')[0];
    })
    for(let i=0; i< listCoins.length; i++){
        for(let j=0; j< listCoins.length; j++){
            if(i!=j ){
                let sell1=1, sell2=1, buy=1;
                const Pair = infoAboutPairs[listCoins[i]+'_'+listCoins[j]];
                const reversPair = infoAboutPairs[listCoins[j]+'_'+listCoins[i]];
                if(Pair){
                    sell1 = infoAboutPairs[listCoins[j]+'_'+defaultCoin].sell;//покупаю за defaultCoin(валюта) валюту Y(listCoins[i])
                    sell2 = namePair.sell;//покупаем за Y : X
                    buy = infoAboutPairs[listCoins[i]+'_'+defaultCoin].buy; // покупка defaultCoin за Х
                }
                if(reversPair){
                    sell1 = infoAboutPairs[listCoins[i]+'_'+defaultCoin].sell ;
                    sell2 = reversPair.sell;
                    buy = infoAboutPairs[listCoins[j]+'_'+defaultCoin].buy;
                }
               console.log(sell1*sell2*buy);

            }
        }
    }
}
function huiyankshen(){
    for(let i =0;i<pairsName.length-30;i+=30){
        let proxy = null,status = null;
        do{
         proxy = proxyApi.getAvailableProxy();
        }while(!proxy)

        do{
        this.updateListInfoPairsByRange(i,30,proxy)
        .then(()=>{status = true;})
        .catch(console.log)
    }while(!status)
    }
    console.log(infoAboutPairs);
    setTimeout()
}
proxyApi.startUpdateProxyList(()=>{
    console.log(proxyApi.getAvailableProxy());
    console.log(proxyApi.getAvailableProxy());
    console.log(proxyApi.getAvailableProxy());
    huiyankshen()

    // yobitApi.updateListInfoPairsByRange(0,15,proxyApi.getAvailableProxy(), ()=>{
    //  console.log(yobitApi.state.infoAboutPairs);
    // });  
});

//;
//this.isAnyProfitCycle('usd')
 //this.filtredPairsByName(pairsName,'usd');
 // get_proxy_list(()=>{
 //     const LIMIT = 30;
 //     for (let i = 60;i<90;i++){
 //         console.log('iter '+ i);
 //         get_info(i*LIMIT,LIMIT,proxy[5]);
 //     }
 //     //get_info(0,LIMIT,proxy[0]);
 // });


