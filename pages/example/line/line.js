// pages/example/line/line.js
var wxChart = require('../../../utils/wxChart/kline');
let lineChart
Page({

  /**
   * 页面的初始数据
   */
  data: {
    renderTime: 0,
    renderTime2: 0,
    renderTime3: 0
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
      xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
          type: 'value'
      },
      series: {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          lineStyle: {
            color: '#223273',
            width: 2
          }
      }
    }
    lineChart = wxChart('line-chart').init()
    lineChart.setOption(option)
    let end = new Date()
    this.setData({renderTime: end - start})

    let option2 = {
        grid: {
          show: true,
          height: 150,
          borderWidth: 0.5,
          left: 50,
          bottom: 30
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: {
            name: 'Women',
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true,
            itemStyle: {
              opacity: 1
            }
        }
    }
    let start2 = new Date()
    let lineChart2 = wxChart('line-chart2').init()
    lineChart2.setOption(option2)
    let end2 = new Date()
    this.setData({renderTime2: end2 - start2})

    let option3 = {
      xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
          type: 'value'
      },
      series: [
        {
            data: [8201, 9321, 9021, 9234, 1290, 13301, 12320],
            type: 'line',
            smooth: false
        },
        {
            data: [8220, 9322, 9012, 9342, 12290, 12330, 13220],
            type: 'line',
            smooth: false
        }
      ]
    }
    let lineChart3 = wxChart('line-chart3').init()
    lineChart3.setOption(option3)
  }
})