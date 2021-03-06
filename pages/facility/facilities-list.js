var promise = require('../../js/libs/es6-promise.min.js');
var constant = require("../../js/commonjs/constant");
var industryData = require('../../js/service/industry.js');
var district = require('../../js/service/district.js');
var currentCity = require('../../js/service/currentCity.js');
var districtOfCity = require('../../js/service/districtsOfCity.js');
var cityIdByNameFilter = require('../../js/filter/cityIdByNameFilter.js');
var waterMarkFilter = require('../../js/filter/waterMarkFilter.js');
var stampTimeFilter = require('../../js/filter/stampTimeFilter.js');
var citySelect = require('../../js/service/citySelect.js');
Page({
  data: {
    // 轮播图数据
    facilitiesData: constant.facilitiesData,
    hasFacilities: [],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    currentPage: 0,
    pageNum: 8
  },
  // 轮播图页数改变控制
  pageChange: function (e) {
    this.setData({
      currentPage: e.detail.current
    })
  },
  onLoad: function (option) {
    var that=this;
    console.log( "facilityOption:", option.facilities);
    var tempContainer=[];
    for (var facility of option.facilities) {
      var facilityItem = that.data.facilitiesData.find(item => item.index == facility);
      if (facilityItem!=undefined)
      {
        tempContainer.push(facilityItem);  
      }
    
    }
    this.setData({
      hasFacilities: tempContainer
    });

    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return stampTimeFilter.formatTime(new Date(log))
      })
    })
  }
})