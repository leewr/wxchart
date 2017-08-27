//app.js
//let openSocket = require('./config.js')
//const io = require('./utils/socket-io.js')
//import io from './utils/socket-iomin.js'
App({
  onLaunch: function() {
  },
  onShow:function() {
  },
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    market: null,
    socket: null,
    userInfo: null
  }
})
