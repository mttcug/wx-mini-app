

var promise = require('../../js/libs/es6-promise.min.js');
var constant = require("../../js/commonjs/constant");
var industryData = require('../../js/service/industry.js');
var district = require('../../js/service/district.js');
var currentCity = require('../../js/service/currentCity.js');
var districtOfCity = require('../../js/service/districtsOfCity.js');
var cityIdByNameFilter = require('../../js/filter/cityIdByNameFilter.js');
var citySelect = require('../../js/service/citySelect.js');
Page({
  data: {
    // 搜索
    inputShowed: false,
    inputVal: "",
    // scroll
    scrollHeight:600,
    toLetter: "",
    //被选中的字母将显示为蓝色
    selectedLetter:'',
    // 数据
    selectCityItem:{},
    currentCity: {},
    hotCities:[],
    citiesList: [],
    matchedCityList:[],
    loadCompleted:false
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    var that=this;
    this.setData({
      inputVal: e.detail.value,
      matchedCityList: citySelect.searchCityRelative(e.detail.value)
    });      
  },

  

  /**
   * 滚动事件
   */
  scroll: function (e){
  },

   
  /**
   *滚动到顶部
   */
  scrollTop: function (e) {
    this.setData({
      toLetter: 0
    });
  },
  

  /**
   * 滚动到相应字母位置
   */
  scrollToLetter: function (e) {
    this.setData({
      toLetter: e.currentTarget.dataset.letter,
      selectedLetter:e.currentTarget.dataset.letter
    });
  },


  /**
   * 城市点击事件
   */
  selectThisCity:function(e){
    this.setData({
      selectCityItem: e.currentTarget.dataset.city
    });
    

    
    /**
     * 跳转到首页
     */
    wx.redirectTo({
      url: '../index/index?' + "cityName=" + e.currentTarget.dataset.cityname + "&cityId=" + e.currentTarget.dataset.cityid
    })
  },



  
  /**
   * onload事件
   */
   onLoad: function () {
     var that=this;
     wx.showLoading({ title: '加载中', })
     var storageCurrentCity = wx.getStorageSync('currentCityItem');   
      
    this.setData({
      currentCity: storageCurrentCity,
      hotCities: constant.hotCities
     })
    if (wx.getStorageSync('city')){
       var city = wx.getStorageSync('city');
       citySelect.letterCityList().then(function(result){
        that.setData({
          citiesList: result,
          loadCompleted: true
        })
        wx.hideLoading();
      })
    }else{
      district.getDistrict().then(function(res){
        var city = res.city;
        citySelect.letterCityList().then(function (result) {
          that.setData({
            citiesList: result,
            loadCompleted: true
          })
          wx.hideLoading();
        })
      })
    }
    
   
    //获取设备高度
    var tempHeight = 0;
    wx.getSystemInfo({
      success: function (res) {
        tempHeight = res.windowHeight;
      }
    })
    this.setData({
      scrollHeight: tempHeight-48
    })
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
      })
    })
  }
})