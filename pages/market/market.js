var app = getApp();
var wxChart = require('../../utils/wxChart/kline');
var indicator = require('../../utils/indicator.js')
var apidata = require('../../apiData/goldtime.js')
var totalData = apidata.kdata().data.data_list;

var chart //蜡炬图
var option
var getOptionKline1 = function () {
  return {
    name: 'dk',
    width: 'auto',
    margin: [0, 12, 0, 12],
    height: 240,
    average: [5, 10, 20],
    grid: {
      show: false,
      width: 'auto',
      height: '240',
      row: 4,
      col: 4,
      showX: true,
      showY: true,
      showEdg: true,
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'transparent',
      borderColor: '#ccc',
      showLabel: true
    },
    dataZoom: [
      {
        start: 0,
        end: 1
      }
    ],
    xAxis: [{
      show: true,
      data: [],
      averageLabel: []
    }],
    yAxis: [
      {
        show: true
      }
    ],
    series: [
      {
        show: true,
        type: 'line',
        name: 'ma5',
        data: '',
        lineStyle: {
          color: '#feb911',
          width: 1,
          type: 'solid'
        }
      },
      {
        show: true,
        type: 'line',
        name: 'ma10',
        data: '',
        lineStyle: {
          color: '#63cfff',
          width: 1,
          type: 'solid'
        }
      },
      {
        show: true,
        type: 'line',
        name: 'ma20',
        data: '',
        lineStyle: {
          color: '#f184f5',
          width: 1,
          type: 'solid'
        }
      },
      {
        show: true,
        type: 'candlestick',
        name: '日K线',
        data: '',
        itemStyle: {
          color: '#c23531 ',
          color0: '#314656 ',
          borderColor: '#c23531',
          borderColor0: '#314656',
          borderWidth: 1,
          type: 'solid'
        }
      },
      {
        show: false,
        type: 'line',
        name: 'bollmid',
        data: '',
        lineStyle: {
          color: '#63cfff',
          width: 1,
          type: 'solid'
        }
      },
      {
        show: false,
        type: 'line',
        name: 'bolllower',
        data: '',
        lineStyle: {
          color: '#f184f5',
          width: 1,
          type: 'solid'
        }
      },
      {
        show: false,
        type: 'line',
        name: 'bollupper',
        data: '',
        lineStyle: {
          color: '#feb911',
          width: 1,
          type: 'solid'
        }
      }
    ],
    callback: function (time) {
      var page = getCurrentPages();
      page = page[page.length - 1];
      page.setData({
        kl1RenderTime: time
      });
    }
  };
};


var volchart // 直方图
var valOption
var getvalOption = function () {
  return {
    name: 'val',
    width: 'auto',
    height: '',
    margin: [0, 12, 0, 12],
    grid: {
      show: false,
      width: 'auto',
      height: '120',
      row: 2,
      col: 4,
      showX: true,
      showY: true,
      showEdg: true,
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'transparent',
      borderColor: '#ccc',
      showLabel: true,
      length: 52
    },
    dataZoom: [
      {
        start: 0,
        end: 1
      }
    ],
    series: [
      {
        show: true,
        type: 'bar',
        name: 'volbar',
        data: '',
        lineStyle: {
          color: function (params) {
            var index = params.dataIndex
            if (totalData[index].updown >= 0) {
              return '#e74c3c'
            } else {
              return '#0d6811'
            }
          },
          type: 'solid'
        }
      },
      {
        show: true,
        type: 'line',
        name: 'volma5',
        data: '',
        lineStyle: {
          color: '#feb911',
          width: 1,
          type: 'solid'
        }
      },
      {
        show: true,
        type: 'line',
        name: 'volma10',
        data: '',
        lineStyle: {
          color: '#63cfff',
          width: 1,
          type: 'solid'
        }
      },
      {
        show: true,
        type: 'line',
        name: 'volma20',
        data: '',
        lineStyle: {
          color: '#f184f5',
          width: 1,
          type: 'solid'
        }
      },
      {
        show: false,
        type: 'line',
        name: 'kdjk',
        data: '',
        lineStyle: {
          color: '#feb911',
          width: 1,
          type: 'solid'
        }
      },
      {
        show: false,
        type: 'line',
        name: 'kdjd',
        data: '',
        lineStyle: {
          color: '#63cfff',
          width: 1,
          type: 'solid'
        }
      },
      {
        show: false,
        type: 'line',
        name: 'kdjj',
        data: '',
        lineStyle: {
          color: '#f184f5',
          width: 1,
          type: 'solid'
        }
      },
      {
        show: false,
        type: 'line',
        name: 'rsi6',
        data: '',
        lineStyle: {
          color: '#feb911',
          width: 1,
          type: 'solid'
        }
      },
      {
        show: false,
        type: 'line',
        name: 'rsi12',
        data: '',
        lineStyle: {
          color: '#63cfff',
          width: 1,
          type: 'solid'
        }
      },
      {
        show: false,
        type: 'line',
        name: 'rsi24',
        data: '',
        lineStyle: {
          color: '#f184f5',
          width: 1,
          type: 'solid'
        }
      },
      {
        show: false,
        type: 'line',
        name: 'posi',
        data: '',
        lineStyle: {
          color: '#000000',
          width: 1,
          type: 'solid'
        }
      }
    ]
  }
}


Page({
  data: {
    marketData: '',
    code: '',
    ma5: '',
    ma10: '',
    ma20: '',
    ma5b: '',
    ma10b: '',
    ma20b: '',
    dayLeft: '2017/03/17',
    dayCenter: '2017/04/28',
    dayRight: '2017/06/13',
    DkData: '',
    klineHeight: '',
    MaActive: true,
    BollActive: '',
    VolActive: true,
    MacdActive: '',
    KdjActive: '',
    RsiActive: '',
    PosiActive: '',
    setdayclass: false,
    setweekclass: false,
    setmonthclass: false,
    set240minclass: false,
    set60minclass: false,
    set30minclass: false,
    set15minclass: false,
    set5minclass: false,
    set1minclass: false,
    showMore: false,
    shadowlayer: false,
    Minselect: true,
    showMoreList: false
  },
  onLoad: function (options) {
    var that = this
    let day = options.day ? options.day : 'month'
    // 实时行情
    //marketSocket.init(that, app, options)
    //设置active
    this.setData({
      code: options.code
    })
    switch (day) {
      case '1':
        this.setData({
          showMore: true,
          set1minclass: true,
          Minselect: false,
        })
        break;
      case '5':
        this.setData({
          showMore: true,
          set5minclass: true,
          Minselect: false,
        })
        break;
      case '30':
        this.setData({
          showMore: true,
          set30minclass: true,
          Minselect: false,
        })
        break;
      case '60':
        this.setData({
          showMore: true,
          set60minclass: true,
          Minselect: false,
        })
        break;
      case '240':
        this.setData({
          showMore: true,
          set240minclass: true,
          Minselect: false,
        })
        break;
      case 'month':
        this.setData({
          setmonthclass: true,
        })
        break;
      case 'week':
        this.setData({
          setweekclass: true,
        })
        break;
      case 'day':
        this.setData({
          setdayclass: true,
        })
        break;
    }
    wx.getSystemInfo({
      success: function (result) {
        that.setData({
          klineHeight: result.windowHeight - (result.windowWidth / 750) * 640
        })
      }
    });
    that.setData({
      DkData: totalData
    })

    that.tabChart();
  },
  tabChart: function (e) {
    var that = this
    // 绘制蜡炬图
    chart = wxChart('k-line').init()
    option = getOptionKline1()
    var averageData = []
    var vol = []
    var candlestick = []
    var kdj = []
    var posi = []
    that.data.DkData.map(function (item, index) {
      averageData.push(item.close)
      vol.push(item.volume)
      candlestick.push([item.open, item.close, item.low, item.high])
      kdj.push([item.high, item.low, item.close])
      posi.push(item.posi)
    })
    option.grid.height = this.data.klineHeight
    option.dataZoom[0].start = (averageData.length - 52) / averageData.length
    //console.log("option.dataZoom[0].start" + option.dataZoom[0].start)
    option.series[0].data = indicator.MA(averageData, 5)
    option.series[1].data = indicator.MA(averageData, 10)
    option.series[2].data = indicator.MA(averageData, 20)
    option.series[3].data = candlestick
    option.series[4].data = indicator.BOLL(averageData).mid
    option.series[5].data = indicator.BOLL(averageData).lower
    option.series[6].data = indicator.BOLL(averageData).upper
    chart.setOption(option)
    // 绘制直方图
    volchart = wxChart('k-line-vol').init()
    valOption = getvalOption()
    valOption.series[0].data = vol
    valOption.dataZoom[0].start = (vol.length - 52) / vol.length
    valOption.series[1].data = indicator.MA(vol, 5)
    valOption.series[2].data = indicator.MA(vol, 10)
    valOption.series[3].data = indicator.MA(vol, 20)
    // KDJ数值计算
    //console.log(indicator.KDJ(kdj).k)
    valOption.series[4].data = indicator.KDJ(kdj).k
    valOption.series[5].data = indicator.KDJ(kdj).d
    valOption.series[6].data = indicator.KDJ(kdj).j
    // RSI数值计算
    valOption.series[7].data = indicator.RSI(averageData).rsi6
    valOption.series[8].data = indicator.RSI(averageData).rsi12
    valOption.series[9].data = indicator.RSI(averageData).rsi24
    // posi数值averageData
    valOption.series[10].data = posi
    volchart.setOption(valOption)
  },
  setclass: function () {
    return 'active'
  },
  changeMA: function () {
    option.series[3].show = option.series[0].show = option.series[1].show = option.series[2].show = true
    option.series[4].show = option.series[5].show = option.series[6].show = false
    this.setData({
      MaActive: true,
      BollActive: ''
    })
    chart.setOption(option)
  },
  changeBOLL: function () {
    option.series[0].show = option.series[1].show = option.series[2].show = false
    option.series[3].show = option.series[4].show = option.series[5].show = option.series[6].show = true
    this.setData({
      MaActive: '',
      BollActive: true
    })
    chart.setOption(option)
  },
  changeKDJ: function (type) {
    this.setData({
      VolActive: '',
      MacdActive: '',
      KdjActive: true,
      RsiActive: '',
      PosiActive: ''
    })
    valOption.series[0].show = valOption.series[1].show = valOption.series[2].show = valOption.series[3].show = false
    valOption.series[4].show = valOption.series[5].show = valOption.series[6].show = true
    // rsi
    valOption.series[7].show = valOption.series[8].show = valOption.series[9].show = false
    // posi
    valOption.series[10].show = false
    volchart.setOption(valOption)
  },
  changeVOL: function () {
    this.setData({
      VolActive: true,
      MacdActive: '',
      KdjActive: '',
      RsiActive: '',
      PosiActive: ''
    })
    valOption.series[0].show = valOption.series[1].show = valOption.series[2].show = valOption.series[3].show = true
    valOption.series[4].show = valOption.series[5].show = valOption.series[6].show = false
    // rsi
    valOption.series[7].show = valOption.series[8].show = valOption.series[9].show = false
    // posi
    valOption.series[10].show = false
    volchart.setOption(valOption)
  },
  changeRSI: function () {
    this.setData({
      VolActive: '',
      MacdActive: '',
      KdjActive: '',
      RsiActive: true,
      PosiActive: ''
    })
    for (let i = 0; i < 7; i++) {
      valOption.series[i].show = false
    }
    // posi
    valOption.series[10].show = false
    valOption.series[7].show = valOption.series[8].show = valOption.series[9].show = true
    volchart.setOption(valOption)
  },
  changePOSI: function () {
    this.setData({
      VolActive: '',
      MacdActive: '',
      KdjActive: '',
      RsiActive: '',
      PosiActive: true
    })
    for (let i = 0; i < 10; i++) {
      valOption.series[i].show = false
    }
    valOption.series[10].show = true
    volchart.setOption(valOption)
  },
  showMoreMethod: function () {
    this.setData({
      showMore: true,
      shadowlayer: true,
      showMoreList: true
    })
  },
  canvasmove: function (params) {
    ////console.log(params)
    var that = this
    chart.on('highlight', params, function (res) {
      // valOption.valOption
      // //console.log(res.dataLastIndex)
      // //console.log(option.series[0].data[res.dataLastIndex])
      that.setData({
        ma5: option.series[0].data[option.series[0].data.length - res.dataLastIndex],
        ma10: option.series[1].data[option.series[0].data.length - res.dataLastIndex],
        ma20: option.series[2].data[option.series[0].data.length - res.dataLastIndex],
        ma5b: option.series[4].data[option.series[0].data.length - res.dataLastIndex].toFixed(2),
        ma10b: option.series[5].data[option.series[0].data.length - res.dataLastIndex].toFixed(2),
        ma20b: option.series[6].data[option.series[0].data.length - res.dataLastIndex].toFixed(2)
      })
    })
  }
});