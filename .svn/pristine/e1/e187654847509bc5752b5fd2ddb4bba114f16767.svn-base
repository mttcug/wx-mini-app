//首选类型
function firstType(code) {
  var typeList = [{ code: 0, name: "全部" }, { code: 1, name: "店铺转让" }, { code: 2, name: "出租招商" }];
  return typeList.find(item => item.code === code) ? typeList.find(item => item.code === code).name : '';
}

//租金单位
function rentMeasure(code) {
  var List = [{ code: 0, name: "元/月" }, { code: 1, name: "元/天" }, { code: 2, name: "万元/年" }, { code: 3, name: "元/平米*月" }, { code: 4, name: "元/平米*天" }];
  return List.find(item => item.code === code) ? List.find(item => item.code === code).name : '';
}

//经营类型
function operateType(code) {
  var List = [{ code: 1, name: "个人" }, { code: 2, name: "加盟" }, { code: 3, name: "直营" }];
  return List.find(item => item.code === code) ? List.find(item => item.code === code).name : '';
}


//地址 城市+区域+地址
function address(arg, adress) {
  var sessionCity = wx.getStorageSync('city');
  var sessionbigDistrictData = wx.getStorageSync('bigDistrictData');
  var sessionsmallDistrictData = wx.getStorageSync('smallDistrictData');
  var city = sessionCity.find(item => item.code.toString() === arg.toString().substr(0, 4));
  var district = sessionbigDistrictData.find(item => item.code.toString() === arg.toString().substr(0, 6));
  var newaddress = arg.toString().length >= 6 ? city.name + district.name + adress : city.name + adress;
  return newaddress;
}


//根据id得出所在具体地址  城市+区域+小区域
function locationName(arg) {
  var sessionCity = wx.getStorageSync('city');
  var sessionbigDistrictData = wx.getStorageSync('bigDistrictData');
  var sessionsmallDistrictData = wx.getStorageSync('smallDistrictData');
  if (typeof (arg) == "number") {
    if (arg == 0) {
      return '';
    } else {
      var city = sessionCity.find(item => item.code.toString() === arg.toString().substr(0, 4));
      var district = sessionbigDistrictData.find(item => item.code.toString() === arg.toString().substr(0, 6));
      var smallDistrict = sessionsmallDistrictData.find(item => item.code.toString() === arg.toString().substr(0, 8));
      var result = arg.toString().length == 6 ? city.name + district.name : city.name + district.name + smallDistrict.name;
      return result ? result : '';
    }
  }
  if (typeof (arg) == "object") {
    var container = [];
    var i = 1;
  
    for (var value of arg) {   
      var city = sessionCity.find(item => item.code.toString() === value.toString().substr(0, 4));
      var district = value.toString().length >= 6 ? sessionbigDistrictData.find(item => item.code.toString() === value.toString().substr(0, 6)) : '';
      var smallDistrict = value.toString().length == 8 ? sessionsmallDistrictData.find(item => item.code.toString() === value.toString().substr(0, 8)) : '';

      if (value.toString().length < 6)
        result = city.name;
      else
        result = value.toString().length == 6 ? city.name + district.name : city.name + district.name + smallDistrict.name;


      if (result != undefined && result != '') {
        container.push(result);
      }
    }
    return container;
  }
}

module.exports={
  firstType: firstType,
  rentMeasure: rentMeasure,
  operateType: operateType,
  address: address,
  locationName: locationName
}