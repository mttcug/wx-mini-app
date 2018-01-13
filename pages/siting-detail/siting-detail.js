var promise = require('../../js/libs/es6-promise.min.js');
var constant = require("../../js/commonjs/constant");
var industryData = require('../../js/service/industry.js');
var district = require('../../js/service/district.js');
var currentCity = require('../../js/service/currentCity.js');
var districtOfCity = require('../../js/service/districtsOfCity.js');
var cityIdByNameFilter = require('../../js/filter/cityIdByNameFilter.js');
var waterMarkFilter = require('../../js/filter/waterMarkFilter.js');
var stampTimeFilter = require('../../js/filter/stampTimeFilter.js');
var detailInfoFilter = require('../../js/filter/detailInfoFilter.js');
var industryNameByIdFilter = require('../../js/filter/industryNameByIdFilter.js');
var request = require('../../js/service/httpReq.js');

Page({
  data: {
    
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    currentPage: 0,
    pageNum: 8,
    shopDetail:[],
    hasFacilities:[],
    facilitiesData: constant.facilitiesData,
    facilitiesLength:0,
    pageContent:0,
    customerMobile: '',
    loadCompleted: false,
    oppoId: ''
  },
  onShareAppMessage: function () {
    var obj={
      title: this.data.shopDetail['title'] + ',' + this.data.shopDetail['content']['minArea'] + '-' + this.data.shopDetail['content']['maxArea'] + '平米',
        desc: this.data.shopDetail['description'],
          path: 'pages/siting-detail/siting-detail?oppoId=' + this.data.oppoId,
          success: function (res) {        // 分享成功     
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
          }, fail: function (res) {        // 分享失败    
            wx.showToast({
              title: '失败',
              icon: 'fail',
              duration: 2000
            })
          }
        }

    
    if (!this.data.shopDetail['content']['area']){
      obj.title = this.data.shopDetail['title'];
    }


    return obj;
  },
  // 轮播图页数改变控制
  pageChange: function (e) {
    this.setData({
      currentPage: e.detail.current
    })
  },
  // 打客服电话
  makeCustomerPhoneCall: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.customerMobile
    })
  },
  // 打用户电话
  makePhoneCall: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.call
    })
  },
  onLoad: function (options) {
    var that = this;
    wx.showLoading({ title: '加载中', })

    that.setData({
      oppoId: options.oppoId
    });
    //根据商机ID请求详情数据
    var sitingParams = {
      sessionId: '',
      opportunityId: options.oppoId
    }
    request.getDetail(sitingParams).then(function (result) {
      var res = result.data.result;
      res.content.type = detailInfoFilter.firstType(res.content.type);
      res.content.industryId = industryNameByIdFilter.industryName(res.content.industryId);
      res.content.districtIds = detailInfoFilter.locationName(res.content.districtIds); 
      res.content.rentMeasure = detailInfoFilter.rentMeasure(res.content.rentMeasure);
      res.content.industryType = detailInfoFilter.operateType(res.content.industryType);  
    
      //请求物业配套数据
      var tempArray = [];
      var tempLength = 0;
      for (var facility of res.content.facilities) {
        var facilityItem = that.data.facilitiesData.find(item => item.index == facility);
        tempArray.push(facilityItem);
        tempLength = tempArray.length;
        that.setData({
          hasFacilities: tempArray,
          facilitiesLength: tempLength
        })
      }
      that.setData({
        shopDetail: res,
        loadCompleted:true
      });
      setTimeout(() => { wx.hideLoading() }, 100)
    })
    //请求客服电话
    var customerPhoneParams = {
      sessionId: '',
      opportunityId: parseInt(options.oppoId)
    }
    request.getPreSalePhone(customerPhoneParams).then((result) => {
      var PhoneInfo = result.data.result;
      
      that.setData({ customerMobile: PhoneInfo });
    })
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return stampTimeFilter.formatTime(new Date(log))
      })
    })


    //////////////////////////////////////////////////////
    //获取设备高度
    //////////////////////////////////////////////////////
    var tempHeight = 0;
    wx.getSystemInfo({
      success: function (res) {
        tempHeight = res.windowHeight-60;
      }
    })
    this.setData({
      pageContent: tempHeight
    })
  }
})