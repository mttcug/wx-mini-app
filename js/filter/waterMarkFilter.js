//图片加水印操作
function waterMark(obj) {
  if (typeof (obj) == "string") {
    return obj != '' ? obj + "?x-oss-process=image/watermark,image_d2F0ZXJtYXJrMy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8xMDA=,t_100,g_center,y_10,x_10" : '';
  }
  if (typeof (obj) == "object") {
    obj.forEach((value, index) => {
      value.url = value.url != '' ? value.url + "?x-oss-process=image/watermark,image_d2F0ZXJtYXJrMy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8xMDA=,t_100,g_center,y_10,x_10" : '';
    })
    return obj;
  }
}

module.exports={
  waterMark: waterMark
}