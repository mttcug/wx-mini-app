
function getCurrentCity() {
    return new Promise((resolve, reject) => {
        wx.getLocation({
            type: 'gcj02',
            success: function (res) {
                var latitude = res.latitude;
                var longitude = res.longitude;
                var speed = res.speed;
                var accuracy = res.accuracy;
                wx.request({
                    url: 'https://api.map.baidu.com/geocoder/v2/?ak=fN66w00hfey6hwEyhFcYFRvvwe4a0pOG&location=' + latitude + ',' + longitude + '&output=json',
                    data: {},
                    header: {
                        'Content-Type': 'application/json'
                    },
                    success: function (res) {
                        // success
                        var tempCity = res.data.result.addressComponent.city;
                        var currentCityName = tempCity.substr(0, tempCity.length - 1);

                        resolve(currentCityName)
                    }
                })
            }
        })
    })
}

module.exports={
    getCurrentCity:getCurrentCity
}