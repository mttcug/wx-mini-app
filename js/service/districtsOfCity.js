var district = require("./district");

function dataFilter(big,small, currentCityCode) {

    var bigD=[], smallD=[];


    /*大区域过滤出来了*/
    big.forEach((value, index) => {
        (currentCityCode != undefined && value.code.toString().substr(0, 4) == currentCityCode.toString()) ? bigD.push(value) : '';
    })


    /*小区域*/
    bigD.forEach((value, index) => {
        var tempContainer = [];
        for (var item of small) {
            item.code.toString().substr(0, 6) == value.code.toString() ? tempContainer.push(item) : '';
        }
      
        //不限区域code设置440301+00
        var _code = value.code.toString() + '00';
        (tempContainer.length > 0 && tempContainer[0].code.toString()) != _code ? tempContainer.unshift({code: _code, name: '不限区域'}) : '';
        smallD.push(tempContainer);
    })


    var _bigCode = currentCityCode.toString() + '0000';
    bigD[0].code.toString() != _bigCode ? bigD.unshift({
        code: '000000',
        name: '全城'
    }) : '';
    smallD[0][0].code.toString() != '00000000' ? smallD.unshift([{
        code: '00000000',
        name: '全城'
    }]) : '';


    return {
        bigDistrict: bigD,
        smallDistrict: smallD
    }
}


function districtsOfCity(currentCityCode) {
    return new Promise((resolve, reject) => {
        /*未被缓存在本地就重新请求*/
      if (wx.getStorageSync('allDistrictData') == 'undefined' || wx.getStorageSync('allDistrictData') == '') {
            district.getDistrict().then((result) => {
              var data = dataFilter(result.bigDistrictData, result.smallDistrictData, currentCityCode);
                resolve(data);
            })
        } else {
        var bigDistrictData = wx.getStorageSync('bigDistrictData');
        var smallDistrictData = wx.getStorageSync('smallDistrictData');
        var result = dataFilter(bigDistrictData, smallDistrictData,currentCityCode);
            resolve(result);
        }
    })
}

module.exports={
    districtsOfCity:districtsOfCity
}