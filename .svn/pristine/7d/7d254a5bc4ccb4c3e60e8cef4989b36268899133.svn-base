var districtData = require("../service/district.js");

function cityIdFunc(cityName) {
  return new Promise((resolve,reject)=>{
    //判断城市数据是否被缓存，有责用，无则请求数据
    var cities = wx.getStorageSync('currentCityItem');
    if (cities) {
      resolve(cities);
    } else {
      districtData.getDistrict().then(res => {
        var cityItem = res.city.find(item => item.name == cityName);
        resolve(cityItem);
      })
    }
  })

}
module.exports = {
  cityIdFunc: cityIdFunc
}