var apiUrl = require("../../js/commonjs/constant");
var request = require("../../js/commonjs/jsonRpc");


function getTransferList(transferParams) {
  return new Promise((resolve, reject) => {
    request.httpRequest(apiUrl.httpUrl.webSiteUrl, "POST", 'search_transfer', transferParams).then(result => {
      resolve(result);
    })
  })
}


function getSitingList(sitingParams) {
  return new Promise((resolve, reject) => {
    request.httpRequest(apiUrl.httpUrl.webSiteUrl, "POST", 'search_siting', sitingParams).then(result => {
      resolve(result);
    })
  })
}



function getDetail(params) {
  return new Promise((resolve, reject) => {
    request.httpRequest(apiUrl.httpUrl.merchantUrl, "POST", 'opportunity_get', params).then(result => {
      resolve(result);
    })
  })
} 

function getPreSalePhone(params) {
  return new Promise((resolve, reject) => {
    request.httpRequest(apiUrl.httpUrl.merchantUrl, "POST", 'opportunity_getPreSalePhone', params).then(result => {
      resolve(result);
    })
  })
} 


module.exports = {
  getTransferList: getTransferList,
  getSitingList: getSitingList,
  getDetail: getDetail,
  getPreSalePhone: getPreSalePhone
}