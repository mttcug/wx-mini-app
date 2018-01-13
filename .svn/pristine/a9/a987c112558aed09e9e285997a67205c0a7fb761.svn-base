var apiUrl = require("../../js/commonjs/constant");
var request = require("../../js/commonjs/jsonRpc");

var params = { sessionId: '' };
var industry=request.httpRequest(apiUrl.httpUrl.clientUrl,"POST",'baseData_listDistrict',params);

function getDistrict() {
    var allData=[];
    var city=[];
    var bigDistrictData=[];
    var smallDistrictData=[];


    return new Promise((resolve,reject)=>{
        industry.then((result)=>{
            var res = result.data.result;

            res.objects.forEach(function (value, key) {
                allData.push(value);
                //所有的市
                value.code.toString().length == 4 ? city.push(value) : '';
                //所有市内区域
                value.code.toString().length == 6 ? bigDistrictData.push(value) : '';
                //所有区域内小区域
                value.code.toString().length == 8 ? smallDistrictData.push(value) : '';
            });



            var districtData = {
                allData: allData,
                city: city,
                bigDistrictData: bigDistrictData,
                smallDistrictData: smallDistrictData
            }
            wx.setStorageSync('allDistrictData', districtData.allData);
            wx.setStorageSync('city', districtData.city);
            wx.setStorageSync('bigDistrictData', districtData.bigDistrictData);
            wx.setStorageSync('smallDistrictData', districtData.smallDistrictData);
            resolve(districtData);
        })
    })
}

module.exports={
    getDistrict:getDistrict
}