var httpUrl={
}


var hotCities = [{ code: '4403', name: "深圳" }, { code: '1101', name: "北京" }, { code: '3101', name: "上海" }, { code: '4401', name: "广州" }, { code: '3301', name: "杭州" }];
var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];



var facilitiesData = [
    { index: 8, title: "产权", imageUrl: "../../images/common/facilities_1.png" },
    { index: 9, title: "证件齐全", imageUrl: "../../images/common/facilities_2.png" },
    { index: 7, title: "停车位", imageUrl: "../../images/common/facilities_3.png" },
    { index: 1, title: "可明火", imageUrl: "../../images/common/facilities_4.png" },
    { index: 3, title: "380V", imageUrl: "../../images/common/facilities_5.png" },
    { index: 2, title: "上下水", imageUrl: "../../images/common/facilities_6.png" },
    { index: 4, title: "煤气管道", imageUrl: "../../images/common/facilities_7.png" },
    { index: 5, title: "排污管道", imageUrl: "../../images/common/facilities_8.png" },
    { index: 6, title: "排烟管道", imageUrl: "../../images/common/facilities_9.png" },
];



var areaData = [{ name: "不限", min: 0, max: 0 }, { name: "20平米以下", min: 0, max: 20 }, { name: "20-50平米", min: 20, max: 50 }, { name: "50-100平米", min: 50, max: 100 }, {
    name: "100-200平米", min: 100, max: 200
}, { name: "200-500平米", min: 200, max: 500 }, { name: "500平米以上", min: 500, max: 999999 }]



module.exports={
    httpUrl:httpUrl,
    hotCities:hotCities,
    letters:letters,
    facilitiesData:facilitiesData,
    areaData:areaData
}