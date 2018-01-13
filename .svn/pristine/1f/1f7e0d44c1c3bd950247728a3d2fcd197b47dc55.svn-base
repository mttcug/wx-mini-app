var districtData = require("../service/district.js");

function cityNameFunc(cityId) {
  return new Promise((resolve, reject) => {
  //判断城市数据是否被缓存，有责用，无则请求数据
  var cities = sessionStorage.getItem("cities");
  if (cities) {
    var cityItems = JSON.parse(cities);
  } else {
    districtData.getDistrict().then(res => {
      var cityItem = res.city.find(item => item.code == cityId);
      return cityItem
    })
  }
  })
}

module.exports = {
  cityNameFunc: cityNameFunc
}