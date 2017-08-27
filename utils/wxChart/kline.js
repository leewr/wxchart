var common = require('./common');
var grid = require('./grid')()
module.exports = function (ctxId) {
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
			grid: {
                show: false,
				width: 'auto',
				height: '110',
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
                showLabel: true,
                length: 52
			},
            dataZoom : [
                {
                    start: 0,
                    end: 1
                }
            ],
			xAxis:[
				{
                    show: true,
                    length: 52
				}
			],
			yAxis:[
                {
                    max: '',
                    min: '',
                    show: true
                }
			],
			series:[
				{
                    name: '',
					type: 'bar',
					data: [],
                    show: true,
                    lineStyle: {
                        color: '',
                        width: 1,
                        type: 'solid',
                        shadowBlur: 'aa'
                    }
				}
			]
		},
		init: function () {
			this.defaultOptions.ctx = wx.createCanvasContext(ctxId)
			return this
		},
		initConfig: function (options) {
			this._cover(options, this.defaults)
		},
		_cover: function( options, defaults ){
            // console.log(options)
            var that = this
			var i, options = options || {};
            // if (!setOptioned) { //未初始化
                for ( i in defaults ){
                    // 处理数组
                    if (Object.prototype.toString.call(defaults[i]) === '[object Array]' && options[i] !== undefined) {
                        var arr = options[i]
                        var defArr = defaults[i]
                        arr.forEach(function (item, index) {
                            for ( var k in defArr[0]) {
                                // if (Object.prototype.toString.call(k) === '[')
                                    // console.log(Object.prototype.toString.call(k))
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
                                // console.log(typeof options[i][obj]) 
                            }
                            // 单独处理legend.selected
                            /*if (obj === 'selected') {
                                obj[]
                            }*/
                            // console.log(options[i][obj])    
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
                // console.log(options)
                this.defaultOptions = options
                return options;
                // console.log(options)
            /*} else { //初始化之后

            }	*/		
            
		},
		setOption: function (options) {
            this.setOptioned = true
			let coverOptions = this._cover(options, this.defaultOptions)
            let ctx = this.defaultOptions.ctx
            let golbData = this.dataInit(ctx, coverOptions, this.callback())
            coverOptions.maxData = golbData.maxData
            coverOptions.minData = golbData.minData
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
                // console.log("dataStart: " + dataStart)
                // console.log("dataEnd: " + dataEnd)
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
            this.drawed = false
            grid.init(ctx, options)
            common.drawLine(options)
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
                // console.log(this.drawIndex++)
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