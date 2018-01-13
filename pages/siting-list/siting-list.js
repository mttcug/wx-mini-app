//transfer-list.js

var promise = require('../../js/libs/es6-promise.min.js');
var constant = require("../../js/commonjs/constant");
var industryData = require('../../js/service/industry.js');
var district = require('../../js/service/district.js');
var currentCity = require('../../js/service/currentCity.js');
var districtOfCity = require('../../js/service/districtsOfCity.js');
var cityIdByNameFilter = require('../../js/filter/cityIdByNameFilter.js');
var waterMarkFilter = require('../../js/filter/waterMarkFilter.js');
var stampTimeFilter = require('../../js/filter/stampTimeFilter.js');
var request = require('../../js/service/httpReq.js');

Page({
  data: {
    windowHeight: 600,
    listShow: false,
    pageScroll: true,//页面是否滚动
    tabs: ["行业", "区域", "面积"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    // 行业tab
    industries: [],
    activeIndustryIndex: 0,
    activeSmallSelected: null,
    smallIndustry: [],
    // 区域tab   
    locations: [],
    activeLocationIndex: 0,
    activeSmallLocationSelected: null,
    smallLocations: [],
    //面积tab
    area: constant.areaData,
    activeAreaSelected: 0,

    //区域面积被选中的
    datasetIndustry: null,
    datasetLocation: null,
    datasetminArea: null,
    datasetmaxArea: null,

    //用于存储页面tab被选中的值
    selectedBigIndustry: '行业',
    selectedBigLocation: '区域',
    selectedSmallIndustry: '行业',
    selectedSmallLocation: '区域',
    selectedIndustry: '行业',
    selectedLocation: '区域',
    selectedArea: '面积',

    currentCityItem:{},
    sitingList: [],
    pageNo: 0,
    noData: true  //没有数据的时候
  },



  //时间转换功能
  stampToTime:function (value) {
    var realtime = new Date(parseInt(value.updateTime));
    value.updateTime = stampTimeFilter.stampTime(realtime);
  },




  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      pageScroll: false
    });
    if (e.currentTarget.id == undefined || e.currentTarget.id == '') {
      this.setData({ listShow: false });
      return;
    }
    if (this.data.activeIndex == e.currentTarget.id) {
      //再次点击同一个则收起下拉列表，如果点击的不同则不用收起
      this.setData({listShow: this.data.listShow ? false : true});
    } else {this.setData({activeIndex: e.currentTarget.id,listShow: true});}
  },



  selectIndustry: function (e) {
    this.setData({
      activeIndustryIndex: e.currentTarget.id,
      selectedBigIndustry: e.currentTarget.dataset.value,
      selectedIndustry: e.currentTarget.dataset.value
      });
    //tab名称显示变化
    this.setData({ tabs: [this.data.selectedIndustry, this.data.selectedLocation, this.data.selectedArea] });
  },



  selectLocation: function (e) {
    this.setData({
      activeLocationIndex: e.currentTarget.id,
      selectedBigLocation: e.currentTarget.dataset.value,
      selectedLocation: e.currentTarget.dataset.value
    });    //tab名称显示变化
    this.setData({ tabs: [this.data.selectedIndustry, this.data.selectedLocation, this.data.selectedArea] });
  },





  //公用函数
  clickToRequest: function (e) {
    var that = this;
    wx.showLoading({title: '加载中' })

    //开始请求数据
    var sitingParams = {
      query: {
        keyword: '', cityId: that.data.currentCityItem.code,
        districtId: that.data.datasetLocation == '0000' ? 0 : that.data.datasetLocation,
        industryId: that.data.datasetIndustry,
        minArea: that.data.datasetminArea,
        maxArea: that.data.datasetmaxArea,
        minRent: null, maxRent: null
      },
      pageNo: 0,
      pageSize: 20
    }

    request.getSitingList(sitingParams).then(result=> {
      var res = result.data.result;
      if (res.totalCount == 0) {
        //隐藏加载中
        setTimeout( ()=> {
          wx.hideLoading();
          that.setData({sitingList: res.objects,noData: false})
        }, 10)
      } else {
        res.objects.forEach( (value, index)=> {
          that.stampToTime(value);
        });
        that.setData({
          sitingList: res.objects,
          noData: true
        })      
      }
     
      //隐藏加载中
      setTimeout( ()=> {
        wx.hideLoading()
      }, 2000)
    });
  },











  //点击小行业
  selectSmallIndustry: function (e) {
    var that = this;
    this.setData({
      activeSmallSelected: e.currentTarget.id,
      listShow: false,
      pageScroll: true,
      pageNo: 0
    });


    //tab名称显示变化
    if (e.currentTarget.dataset.value == '不限') {
      this.setData({ selectedIndustry: this.data.selectedBigIndustry })
    } else {
      this.setData({ selectedSmallIndustry: e.currentTarget.dataset.value, selectedIndustry: e.currentTarget.dataset.value })
    }
    this.setData({ tabs: [this.data.selectedIndustry, this.data.selectedLocation, this.data.selectedArea] });


    //查询所传的参数变化
    if (e.currentTarget.id.toString().substr(2, 2) == '00') {
      this.setData({ datasetIndustry: e.currentTarget.id.toString().substr(0, 2) })
    } else {
      this.setData({ datasetIndustry: e.currentTarget.dataset.industry })
    }

    this.clickToRequest(e);
  },





  //点击小区域
  selectSmallLocation: function (e) {
    var that = this;

    this.setData({
      activeSmallLocationSelected: e.currentTarget.id,
      listShow: false,
      pageScroll: true,
      pageNo: 0
    });
    //tab名称显示变化
    if (e.currentTarget.dataset.value == '不限区域') {
      this.setData({ selectedLocation: this.data.selectedBigLocation })
    } else {
      this.setData({ selectedSmallLocation: e.currentTarget.dataset.value, selectedLocation: e.currentTarget.dataset.value });
    }

    this.setData({ tabs: [this.data.selectedIndustry, this.data.selectedLocation, this.data.selectedArea] });
    //查询所传的参数变化
    //判断选的是否是全城或区域不限，全城则搜索当前城市，不限区域则搜索大区域
    var tailFourNum = e.currentTarget.id.toString().substr(e.currentTarget.id.toString().length - 4);

    var cityCode = e.currentTarget.id.toString().substr(0, 4);

    //code 后四位如果是0000代表所有区域即整个这个城市,后两位是00则是大区域，否则是选择了小区域
    if (tailFourNum == '0000') {
      this.setData({ datasetLocation: cityCode })
    } else {
      var tailTwoNum = e.currentTarget.id.toString().substr(e.currentTarget.id.toString().length - 2);

      var bigDistrict = e.currentTarget.id.toString().substr(0, 6);

      tailTwoNum == '00' ? this.setData({ datasetLocation: bigDistrict }) : this.setData({ datasetLocation: e.currentTarget.dataset.location });
    }
    this.clickToRequest(e);
  },








  selectArea: function (e) {
    var that = this;
    this.setData({
      activeAreaSelected: e.currentTarget.id,
      listShow: false,
      pageScroll: true,
      pageNo: 0
    });

    this.setData({ selectedArea: e.currentTarget.dataset.value });
    this.setData({ tabs: [this.data.selectedIndustry, this.data.selectedLocation, this.data.selectedArea] });

    e.currentTarget.id == 0 ? this.setData({ datasetminArea: null, datasetmaxArea: null }) : this.setData({ datasetminArea: e.currentTarget.dataset.minarea, datasetmaxArea: e.currentTarget.dataset.maxarea })
    
    this.clickToRequest(e);
  },






  //上拉刷新
  loadData: function (e) {
    // 加载中
    var that = this;
    wx.showLoading({title: '加载中'})
    //请求数据
    var newPageNum = this.data.pageNo + 1;
    this.setData({pageNo: newPageNum});
    //开始请求数据
    var sitingParams = {
      query: {
        keyword: '', cityId: that.data.currentCityItem.code,
        districtId: that.data.datasetLocation,
        industryId: that.data.datasetIndustry,
        minArea: that.data.datasetminArea,
        maxArea: that.data.datasetmaxArea,
        minRent: null, maxRent: null
      },
      pageNo: 0,
      pageSize: 20
    }
    request.getTransferList(sitingParams).then(result=> {
      var res = result.data.result;
      if (res.objects.length==0){
        wx.showToast({ title: '没有更多数据啦', icon: 'success', duration: 2000 })
      }else{
        res.objects.forEach( (value, index)=> {that.stampToTime(value); });
        var tempData = res.objects;
        var newData = [...(that.data.sitingList), ...tempData];
        that.setData({sitingList: newData})      
      }
      //隐藏加载中
      setTimeout( ()=> {wx.hideLoading()}, 2000)

    });
  },








  onLoad: function () {
    var that = this;
    var storageCurrentCity = wx.getStorageSync('currentCityItem');

    //开始请求行业区域面积值（下拉框显示）
    industryData.getIndustry().then(industry => {
      that.setData({
        industries: industry.bigIndustryData,
        smallIndustry: industry.smallIndustryData
      })
    });

    //区域列表数据请求
    if (storageCurrentCity) {
      districtOfCity.districtsOfCity(storageCurrentCity.code).then(cityMatchesDistrict => {
        that.setData({
          locations: cityMatchesDistrict.bigDistrict,
          smallLocations: cityMatchesDistrict.smallDistrict
        })
      })
    } else {
      district.getDistrict().then(location => {
        return currentCity.getCurrentCity()
      }).then(res => {
        return cityIdByNameFilter.cityIdFunc(res)
      }).then(currentCityItem => {
        that.setData({
          currentCityItem: currentCityItem
        })
        return districtOfCity.districtsOfCity(currentCityItem.code)
      })
        .then(cityMatchesDistrict => {
          that.setData({
            locations: cityMatchesDistrict.bigDistrict,
            smallLocations: cityMatchesDistrict.smallDistrict
          })
        })
    }

    //面积列表数据
    that.setData({ area: constant.areaData })



    //刚进来或是刷新的情况
    if (storageCurrentCity) {
      that.setData({
        currentCityItem: { code: storageCurrentCity.code, name: storageCurrentCity.name }
      })
    }
    
    //请求列表数据
    var sitingParams = {
      query: {
        keyword: '',
         cityId: that.data.currentCityItem.code,
        districtId: null,
        industryId: null,
        minArea: null,
        maxArea: null,
        minRent: null, maxRent: null
      },
      pageNo: 0,
      pageSize: 20
    }
    wx.showLoading({title: '加载中'})
    request.getTransferList(sitingParams).then(result=> {
      var res = result.data.result;
      if (res.totalCount == 0) {
        //隐藏加载中
        setTimeout( ()=> {
          wx.hideLoading();
          that.setData({sitingList: res.objects,noData: false})
        }, 10)
      } else {
        res.objects.forEach( (value, index)=> {
          that.stampToTime(value);
          if(typeof (value.districtName=='string')){   //查出的结果一个就是字段串形式多个时是数组，显示的时候统一成数组形式
            var temp = value.districtName;
            value.districtName=[];
            value.districtName.push(temp);
          }
        });
        that.setData({sitingList: res.objects,noData: true});   
      }
      //隐藏加载中
      setTimeout( ()=> {
        wx.hideLoading()
      }, 2000)
    });





    //获取设备高度
    var tempHeight = 0;
    wx.getSystemInfo({
      success: function (res) {
        tempHeight = res.windowHeight;
      }
    })
    this.setData({
      windowHeight: tempHeight - 51    //有一个头部高度
    })
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return stampTimeFilter.formatTime(new Date(log))
      })
    })
  }
})
