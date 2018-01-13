var apiUrl=require("../../js/commonjs/constant");
var request = require("../../js/commonjs/jsonRpc");

var params = { sessionId: '' };
var industry=request.httpRequest(apiUrl.httpUrl.clientUrl,"POST",'baseData_listIndustry',params);

/*获取城市数据*/
function getIndustry() {

    var allData=[];
    var bigIndustryData = [];
    var smallIndustryData = [];

    return new Promise((resolve,reject)=>{
        industry.then((result)=>{
            var res = result.data.result;



            //筛选出大行业
            res.objects.forEach(function (value, key) {
                allData.push(value);
                value.code.toString().length == 2 ? bigIndustryData.push(value) : '';
            });


            //过滤出小行业
            for (let value of bigIndustryData) {
                var tempContainer = [];
                for (var item of allData) {
                    (item.code.toString().length > 2 && item.code.toString().substr(0, 2) == value.code.toString()) ? tempContainer.push(item) : '';
                }
                smallIndustryData.push(tempContainer);
            }


            /*
            大行业的不限{ code: '00', name: '不限' }
            小行业的不限{ code: '0000', name: '不限' }  推进行业列表
            * */
            bigIndustryData[0].code.toString() != '00' ? bigIndustryData.unshift({ code: '00', name: '不限' }) : '';
            smallIndustryData.unshift([{ code: '0000', name: '不限' }]);
            smallIndustryData.forEach(function(val,index){
              val[0].code.toString() != bigIndustryData[index].code + '00' ? val.unshift({ code: bigIndustryData[index].code + '00', name: '不限' }) : '';
            })





            var industry = {
                allData:allData,
                bigIndustryData: bigIndustryData,
                smallIndustryData: smallIndustryData
            }
            wx.setStorageSync('industryData', JSON.stringify(industry));
            resolve(industry);
        })
    })
}
/*获取当前城市下的小城市*/
module.exports={
    getIndustry:getIndustry
}