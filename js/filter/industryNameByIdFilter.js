
let industry = require('../service/industry.js');
//行业
function industryName(arg) { //输入的是单个值还是数组
  if (typeof (arg) == "number") {
    if (arg == 0) {
      return '';
    } else {
      if (wx.getStorageSync('industryData')) {
        var industryData = JSON.parse(wx.getStorageSync('industryData'));
        var item = industryData.allData.find(item => item.code.toString() === arg.toString());
        return item.name;
      } else {
        industry.getIndustry().then(data => {
          var item = data.allData.find(item => item.code.toString() === arg.toString());
          return item.name;
        })
      }
    }
  }
  if (typeof (arg) == "object") {
    var container = [];
    for (var value of arg) {
      if (wx.getStorageSync('industryData')) {
        var industryData = JSON.parse(wx.getStorageSync('industryData'));
        var item = industryData.allData.find(item => item.code === value);
        item ? container.push(item) : '';
      } else {
        industry.getIndustry().then(data => {
          var item = data.allData.find(item => item.code.toString() === arg.toString());
          item ? container.push(item) : '';
        })
      }
    }
    return container;
  }
}

module.exports={
  industryName: industryName
}