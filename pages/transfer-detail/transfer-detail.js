

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
    isRent: true,
    indicatorDots: false,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    currentPage: 0,
    pageNum: 8,
    facilitiesData: constant.facilitiesData,
    hasFacilities: [],
    facilitiesLength: 0,
    // 店铺信息
    shopDetail: {},
    pageContent: 0,
    customerMobile: '',
    loadCompleted: false,
    oppoId:''
  },
  onShareAppMessage: function () {
    var obj = {
      title: this.data.shopDetail['title'] + ',' + this.data.shopDetail['content']['area'] + '平米,租金' + this.data.shopDetail['content']['rent']/100 + '元/月',
      path: 'pages/transfer-detail/transfer-detail?oppoId=' + this.data.oppoId,
      success: function (res) {        // 分享成功    
        wx.showShareMenu({

          // 要求小程序返回分享目标信息

          withShareTicket: true

        }); 
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        });
      }, fail: function (res) {        // 分享失败    
        wx.showToast({
          title: '失败',
          icon: 'fail',
          duration: 2000
        })
      }
    }
    if (!this.data.shopDetail['content']['rent']) {
      if (!this.data.shopDetail['content']['area']){
        obj.title = this.data.shopDetail['title'] + ',租金面议';
      }else{
        obj.title = this.data.shopDetail['title'] + ',' + this.data.shopDetail['content']['area'] + '平米,租金面议';
      }
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
    console.log("option:", options, options.oppoId);
    wx.showShareMenu({

      withShareTicket: true

    })
    
    console.log("1");
    that.setData({
      oppoId: options.oppoId
    });
    //根据商机ID请求详情数据
    wx.showLoading({ title: '加载中' })
    console.log("2");
    var transferParams = {
      sessionId: '',
      opportunityId: options.oppoId
    }
    console.log("3");
    request.getDetail(transferParams).then(result => {
      console.log("45", result);
      var res = result.data.result;
      console.log("5");
      res.content.photos = waterMarkFilter.waterMark(res.content.photos);
      console.log("6");
      res.content.industryId = industryNameByIdFilter.industryName(res.content.industryId);
      console.log("7");
      res.content.address = detailInfoFilter.address(res.content.districtId, res.content.address);
      console.log("8");
      res.content.districtId = detailInfoFilter.locationName(res.content.districtId);
      console.log("9");
      res.content.rentMeasure = detailInfoFilter.rentMeasure(res.content.rentMeasure);
      console.log("0");
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
      console.log("结果：", res.content);
      that.setData({
        shopDetail: res,
        loadCompleted: true,
        pageNum: res.content.photos ? res.content.photos.length : 0
      });
      //隐藏加载中
      setTimeout(() => { wx.hideLoading() }, 100)
    })



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
        tempHeight = res.windowHeight - 60;
      }
    })
    this.setData({
      pageContent: tempHeight
    })
  }

  
})