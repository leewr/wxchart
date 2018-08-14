var common = require('./common');
var grid = require('./grid')()
var xAxis = require('./xAxis')()
var line = require('./line')()
var legend = require('./legend')()
var utils = require('../utils.js')

var toString = Object.prototype.toString
var isObject = function (val) {
    return val !== null && typeof val === 'object'
}
var isArray = function (val) {
    return toString.call(val) === '[object Array]'
}

function forEach (obj, fn) {
    if (obj === null || typeof obj === 'undefined') return

    if (typeof obj !== 'object') obj = [obj]

    if (isArray(obj)) {
        for (let i = 0, l = obj.length; i < l; i++) {
            fn.call(null, obj[i], i, obj)
        }
    } else {
        for (let key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                fn.call(null, obj[key], key, obj)
            }
        }
    }
}

function userMerge (/* obj1, obj2, obj3, ... */) {
    let result = {}
    function assignValue(val, key) {
        if (typeof result[key] === 'object' && typeof val === 'object' && !isArray(val)) {
            result[key] = userMerge(result[key], val)
        } else if (typeof val === 'object' && !isArray(val)) {
            result[key] = userMerge({}, val)
        }else {
            if (result[key] === undefined) {
                result[key] = val
            }
        }
    }
    for (let i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue)
    }
    return result
}

module.exports = function (ctxId) {
    let color1 = '#1890FF'
    let textColor = '#808080'
	return {
        setOptioned: false,
        drawIndex: 0,
        lastTempIndexData: {
            x: 0,
            y: 0
        },
		defaultOptions: {
			name: '',
            ctx: '',
            maxData: '',
            minData: '',
            drawed: false,
            margin: [0, 12, 0, 12],
            theme: {
                defaultColor: color1,
                line: {
                    color: color1,
                    lineWidth: 1
                },
                textStyle: {
                    color: textColor,
                    family: '"Helvetica Neue", "San Francisco", Helvetica, Tahoma, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", sans-serif',
                    size: 12,
                    style: 'normal',
                    weight: 'normal'
                },
                grid: {
                    stroke: color1,
                    lineWidth: 2,
                    lineDash: [2]
                },
                color: ['#1890FF', '#2FC25B', '#FACC14', '#223273', '#8543E0', '#13C2C2', '#3436C7', '#F04864'],
            },
            legend: {
                show: true,
                data: [],
                top: 6,
                left: 0,
                right: 0,
                position: 'top',
                align: 'left'
            },
			grid: {
                show: false,
				width: 'auto',
				height: 150,
				row: 4,
	            col: 4,
	            showX: true,
	            showY: true,
	            showEdg: true,
	            left: 45,
	            top: 30,
	            right: 0,
	            bottom: 20,
                backgroundColor: 'transparent',
                borderColor: '#d8d8d8',
                borderWidth: 1,
                showLabel: true,
                length: 52
			},
            dataZoom: 
                {
                    start: 0,
                    end: 1
                }
            ,
			xAxis:
				{
                    show: true,
                    length: 52
				}
			,
			yAxis:
                {
                    max: '',
                    min: '',
                    show: true
                }
			,
			series:
				{
                    name: '',
					type: 'bar',
					data: [],
                    show: true,
                    lineStyle: {
                        color: 'auto',
                        width: 1,
                        type: 'solid',
                        shadowBlur: 'aa'
                    },
                    smooth: false,
                    itemStyle: {
                        opacity: 1
                    },
                    areaStyle: {
                        origin: 'auto',
                        opacity: 0,
                        color: 'auto'
                    }
				}
		},
		init: function () {
			this.defaultOptions.ctx = wx.createCanvasContext(ctxId)
			return this
		},
		initConfig: function (options) {
			this._cover(options, this.defaults)
		},
        /**
         * [initOptions userOption标准化，将object转化为数组]
         * @param  {[type]} userOptions [description]
         * @return {[type]}             [description]
         */
        initOptions: function (userOptions, defaultOptions) {
            var that = this
            let result = {}
            for (let i in defaultOptions) {
                if (!userOptions[i]) {
                    isObject(defaultOptions[i]) && !isArray(defaultOptions[i]) ? result[i] = [defaultOptions[i]] : result[i] = defaultOptions[i]
                } else {
                    if (isObject(userOptions[i])) {
                        result[i] = isArray(userOptions[i]) ? userOptions[i] : [userOptions[i]]
                    }
                    if (result[i]) {
                        result[i].forEach(function (item, index) {
                            if (isObject(item)) {
                                result[i][index] = userMerge(item, defaultOptions[i])
                            }
                        })
                    }
                    if (typeof result[i] === 'number' || typeof result[i] === 'string') {
                        result[i] = userOptions[i]
                    }
                }
            }

            result['ctx'] = result['ctx'][0]
            // 处理canvas宽度
            if(result.grid[0].width === 'auto' || result.grid[0].width === '100%') {
                wx.getSystemInfo({
                    success: function (res) {
                        if (result.margin) {
                            result.grid[0].width = result.grid[0].width = that.canvasWidth = res.windowWidth - result.margin[1] - result.margin[3]
                        } else {
                            result.grid[0].width = that.canvasWidth = result.windowWidth;
                        }
                    }
                });
            }
            this.defaultOptions = result
            utils.init(result)
            return result
        },
		_cover: function( options, defaults ){
            var that = this
			var i, options = options || {}
                for ( i in defaults ){
                    if (isArray(defaults[i])) {

                    }
                    // 处理数组
                    if (Object.prototype.toString.call(defaults[i]) === '[object Array]' && options[i] !== undefined) {
                        var arr = options[i]
                        var defArr = defaults[i]
                        arr.forEach(function (item, index) {
                            for ( var k in defArr[0]) {
                                if (item[k] === undefined) {
                                    item[k] = defArr[0][k]
                                }
                            }
                        })
                    }
                    // 多层级对象
                    if(Object.prototype.toString.call(defaults[i]) === '[object Object]' && options[i] !== undefined) {
                        var tempObj = {}
                        for(let obj in defaults[i]) {
                            if (options[i][obj] === undefined) {
                                options[i][obj] = defaults[i][obj]
                            }
                        }
                    }
                    if ( options[i] === undefined ) {
                        options[i] = defaults[i];
                    }
                }
                // 处理canvas宽度
                if(options.grid.width === 'auto' || options.grid.width === '100%') {
                    wx.getSystemInfo({
                        success: function (result) {
                            if (options.margin) {
                                options.grid.width = options.grid.width = that.canvasWidth = result.windowWidth - options.margin[1] - options.margin[3]
                            } else {
                                options.grid.width = that.canvasWidth = result.windowWidth;
                            }
                        }
                    });
                }
                this.defaultOptions = options
                return options;	
            
		},
		setOption: function (options) {
            this.setOptioned = true
            let coverOptions = this.initOptions(options, this.defaultOptions)
			// let coverOptions = this._cover(options, this.defaultOptions)
            let ctx = this.defaultOptions.ctx
            // let golbData = this.dataInit(ctx, coverOptions, this.callback())
            // coverOptions.maxData = golbData.maxData
            // coverOptions.minData = golbData.minData
			this.draw(ctx, coverOptions)
		},
        dataInit: function (ctx, options, callback) {
            let that = this
            let series = options.series
            let maxData
            let minData
            let firstIndex
            for(let i = 0; i < series.length; i++){
                if(series[i].show) {
                    firstIndex = i
                    break;
                }
            }
            // 最大最小数值处理 加入最大最小值取值范围内的最大最小判断
            for (var i = 0; i < series.length; i++) {
                let dataStart = options.dataZoom[0].start * series[i].data.length
                let dataEnd = options.dataZoom[0].end * series[i].data.length
                if (series[i].show) {
                    if (i === firstIndex) {
                        minData = maxData = common._maxValueOfArr(series[i].data.slice(dataStart, dataEnd - 1))
                        // minData = maxData = Math.max.apply(null,series[0].data.slice(-52))
                    }
                    let tempMaxData = common._maxValueOfArr(series[i].data.slice(dataStart, dataEnd - 1))
                    let tempMinData = common._minValueOfArr(series[i].data.slice(dataStart, dataEnd - 1))
                    if ((maxData - tempMaxData) < 0) {
                        maxData = tempMaxData
                    }
                    if ((tempMinData - minData) < 0) {
                        minData = tempMinData
                    }
                }
            }
            
            // 当用户手动设置了最大最小值的时候采用用户设置的值
            if (options.yAxis[0].max !== '') {
                maxData = options.yAxis[0].max
            }
            if (options.yAxis[0].min !== '') {
                minData = options.yAxis[0].min
            }
            return {
                maxData: maxData,
                minData: minData
            }
        },
        dataHandle (ctx, option, maxData, minData) {
            // console.log(ctx)
            let that = this
            // let stroageBarData = data.slice(0)
            let gridData = []

            let seriesLength = option.series.length

            let height = option.grid.height - option.grid.left - option.grid.right
            let width = option.grid.width - option.grid.top - option.grid.bottom
            // let dataMax = Math.max.apply(null,stroageBarData.slice(-52))
            // let dataMin = Math.min.apply(null,data.slice(-52))
            
            let unitgridY =  height/(maxData - minData)
            let unitgridX =  width / 52
            let unityAxios = height/ maxData
            
            
            for (let i = 0; i < seriesLength; i++) {
                let stepIndex = 52
                // console.log(option.series[i].data.length)
                for (let j = 0; i < option.series[i].data.length; j--) {
                     stepIndex--
                    let itemData = option.series[i].data[j];
                    if (Object.prototype.toString.call(itemData) === '[object Array]') {
                        var ArrData = itemData
                    } else {
                        // console.log(0)
                        let x = unitgridX * stepIndex
                        let y = (maxData - itemData)  * unitgridY
                        // common.unitBar(ctx, x, y, stepIndex / 52 - 1, height - y)
                    } 
                }
            }
            /* for (var i = data.length; i > 0; i--) {
                stepIndex--
                
                gridData.push({
                    x: xAxisGrid,
                    y:(dataMax - data[i])  * unitgrid
                })
            }
            return gridData */
        },
		draw: function (ctx, options) {
            let series = options.series
            this.drawed = false
            grid.init(ctx, options)
            xAxis.init(ctx, options)
            legend.init(ctx, options)
            // common.drawLine(options)
            
            series.forEach(function (item, index) {
                switch (item.type) {
                    case 'line':
                        line.init(ctx, item, index, options)
                        break
                }
            })
            
            ctx.draw()
            ctx.save()
            this.drawed = true
		},
        //提供chart事件的支持
        on: function(type, params, callback) {
            var that = this
            // 参数处理
            var params = params.touches[0]

            if(Math.abs((params.x - that.lastTempIndexData.x)) - this.defaultOptions.grid.width / 52 > 0 && that.drawed) {
                params.dataLastIndex = common.getCurrentIndexData({x:params.x,y:params.y}, this.defaultOptions)
                if (type === 'highlight') {
                    if (typeof callback === 'function') {
                        that.lastTempIndexData.x = params.x
                        that.lastTempIndexData.y = params.y
                        grid.drawHigtLight(this.defaultOptions, params.x, params.y)
                        callback(params)
                        that.draw(this.defaultOptions.ctx, this.defaultOptions)
                    }
                }
            }
        },
        callback: function () {

        }
	}
}