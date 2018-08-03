// pages/example/line/line.js
var wxChart = require('../../../utils/wxChart/kline');
let lineChart
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
    console.log(new Date())
    let start = new Date()
    let option = {
        grid: {
          show: true,
          height: 150,
          borderWidth: 0.5,
          left: 50,
          bottom: 30
        },
        xAxis: {
            type: 'category',
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9']
        },
        yAxis: {
            type: 'value'
        },
        series: {
            data: [820, 932, 901, 934, 1290, 1330, 1320, 860, 600],
            type: 'line',
            smooth: true
        }
    }
    lineChart = wxChart('line-chart').init()
    lineChart.setOption(option)
    let end = new Date()
    console.log('render: ' + (end - start) + 'ms');

    let ctx = wx.createCanvasContext('test-chart')

    // ctx.rect(10, 10, 350, 150)
    ctx.setLineWidth(1)
    ctx.setLineDash([10, 1])
    ctx.moveTo(10, 10)
    ctx.lineTo(350, 10)
    ctx.lineTo(350, 140)
    ctx.lineTo(10, 140)
    ctx.lineTo(10, 10)

    ctx.moveTo(10, 50)
    ctx.lineTo(18, 50)
    ctx.moveTo(20, 50)
    ctx.lineTo(38, 50)
    ctx.moveTo(40, 50)
    ctx.lineTo(58, 50)
    ctx.moveTo(60, 50)
    ctx.lineTo(68, 50)
    ctx.stroke()
    ctx.draw()
  }
})