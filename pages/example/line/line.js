// pages/example/line/line.js
var wxChart = require('../../../utils/wxChart/kline');
let lineChart
let lineChart4
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
      name: 1,
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
        name: 2,
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
            smooth: false,
            itemStyle: {
              opacity: 1
            },
            areaStyle: {
              opacity: 0.2,
              color: {
                colorStops: [{
                  offset: 0, color: '#fff',
                }, {offset: 1, color: '#232E40'}]
              }
            }
        }
    }
    let start2 = new Date()
    let lineChart2 = wxChart('line-chart2').init()
    lineChart2.setOption(option2)
    let end2 = new Date()
    this.setData({renderTime2: end2 - start2})

    let option3 = {
      name: 2,
      xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
          type: 'value'
      },
      series: [
        {
            data: [4201, 5321, 6021, 7234, 2290, 8301, 1220],
            type: 'line',
            smooth: false
        },
        {
            data: [8220, 9322, 9012, 9342, 12290, 12330, 13220],
            type: 'line',
            smooth: false,
            areaStyle: {
              opacity: 0
            }
        }
      ]
    }
    let lineChart3 = wxChart('line-chart3').init()
    lineChart3.setOption(option3)

    let option4 = {
      name: 2,
      margin: [20, 20, 20, 20],
      title: {
          aligin: 'center',
          text: '近6个月收益',
          fontSize: '16'
      },
      xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
          axisTick: {
            show: false
          },
          lineStyle: {
            color: '#232E40'
          },
          textStyle: {
            color: '#8C939D'
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
            data: [333, 932, 901, 600, 1210, 800, 400],
            type: 'line',
            smooth: false,
            areaStyle: {
              opacity: 0.2,
              color: {
                colorStops: [{
                  offset: 0, color: '#fff',
                }, {offset: 1, color: '#232E40'}]
              }
            },
            itemStyle: {
              color: '#8C939D',
              highlight: {
                color: '#FEAA0A'
              }
            },
            lineStyle: {
              width: 0
            }
        }
      ]
    }
    lineChart4 = wxChart('line-chart4').init()
    lineChart4.setOption(option4)
  },
  touchStart: function (event) {
    // console.log(event)
    lineChart.on(event.type, event, function (e) {
      // console.log(e)
    })
  },
  touchMove: function (event) {
    lineChart.on(event.type, event, function (e) {
      // console.log(e)
    })
  },
  touchStart: function(event) {
    lineChart4.on('highlight', event, (res) => {
      console.log('callback highlight', res)
    })
  }
})