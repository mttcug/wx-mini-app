function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function stampTime(stamp) {
  var year = new Date().getFullYear() - stamp.getFullYear();
  var month = (new Date().getMonth() + 1) - (stamp.getMonth() + 1);
  var date = new Date().getDate() - stamp.getDate();
  var hour = new Date().getHours() - stamp.getHours();
  var minute = new Date().getMinutes() - stamp.getMinutes();
  var second = new Date().getSeconds() - stamp.getSeconds();
  /*  console.log("lalal:",now);*/
  var time;
  if (year > 0) {
    time = stamp.getFullYear() + "年" + (stamp.getMonth() + 1) + "月" + stamp.getDate() + "日";
  } else if (year == 0 & month > 0) {
    time = (stamp.getMonth() + 1) + "月" + stamp.getDate() + "日";
  } else if (year == 0 & month == 0 & date > 1) {
    time = date + "天前";
  } else if (year == 0 & month == 0 & date == 1) {
    /*time=date+"天前";*/
    time = "昨天";
  } else if (year == 0 & month == 0 & date == 0 & hour > 0) {
    if (stamp.getHours() < 10) {
      if (stamp.getMinutes() < 10) {
        time = "0" + stamp.getHours() + ":0" + stamp.getMinutes();
      } else {
        time = "0" + stamp.getHours() + ":" + stamp.getMinutes();
      }
    } else {
      if (stamp.getMinutes() < 10) {
        time = stamp.getHours() + ":0" + stamp.getMinutes();
      } else {
        time = stamp.getHours() + ":" + stamp.getMinutes();
      }
    }

  } else if (year == 0 & month == 0 & date == 0 & hour == 0 & minute > 0) {
    time = minute + "分钟前";
  } else if (year == 0 & month == 0 & date == 0 & hour == 0 & minute == 0) {
    time = "刚刚";
  }
  return time;
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  stampTime: stampTime
}
