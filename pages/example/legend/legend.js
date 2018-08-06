// pages/example/line/line.js
var wxChart = require('../../../utils/wxChart/kline');
let lineChart
Page({

  /**
   * 页面的初始数据
   */
  data: {
    renderTime: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setChart()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  setChart: function () {
    
    let start = new Date()
    let option = {
      legend: {
        data: ['Men', 'Women', 'Total'],
        align: 'right'
      },
      xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
          type: 'value'
      },
      series: {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
      }
    }
    lineChart = wxChart('line-chart').init()
    lineChart.setOption(option)
    let end = new Date()
    this.setData({renderTime: end - start})

    console.log(new Date())
    
  }
})