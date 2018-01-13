/*
请求列表数据
params url 请求地址
params type post or get
params method 方法
params params 请求的参数
*/
function httpRequest(url,type,method, params) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            method: type,
            data: { id: 1,jsonrpc: "2.0",method: method,params: params},
            header: {'content-type': 'application/json'},
            success: resolve,
            fail: reject
        })
    })
}


module.exports={
    httpRequest:httpRequest
}
