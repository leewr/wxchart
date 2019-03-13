// pages/example/linetest.js
var wxChart = require('../../../utils/wxChart/kline');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    klineHeight: '480rpx'
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
    let option3 = {
      name: 2,
      margin: [20, 20, 20, 20],
      title: {
          aligin: 'center',
          text: '近6个月收益',
      },
      xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            show: false
          }
      },
      grid: {
        show:  false,
        height: 240,
        left: 0,
        right: 0,
        top: 20,
        backgroundColor: {
          x: 0,
          y: 0,
          x2: 100,
          y2: 100,
          colorStops: [{
              offset: 0, color: '#394353' // 0% 处的颜色
          }, {
              offset: 0.5, color: '#394353' // 100% 处的颜色
          }],
        }
      },
      yAxis: {
          type: 'value',
          show:  false
      },
      series: [
        {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: false,
            areaStyle: {
              opacity: 0.2,
              color: {
                colorStops: [{
                  offset: 0, color: '#fff',
                }, {offset: 1, color: '#232E40'}]
              }
            }
        }
      ]
    }
    let lineChart3 = wxChart('line-chart').init()
    lineChart3.setOption(option3)
  }
})