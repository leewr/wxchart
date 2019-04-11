import defaultOptions from './defaultOptions'
import chartEvent from './event'
import grid from './grid'
import xAxis from './xAxis'
import line from './line'
import legend from './legend'
import utils from './utils.js'

module.exports = function (ctxId) {
    console.log(defaultOptions)
    const obj = utils.deepClone(defaultOptions)
	return {
        setOptioned: false,
        drawIndex: 0,
        lastTempIndexData: {
            x: 0,
            y: 0
        },
		defaultOptions: obj,
		init: function () {
			this.defaultOptions.ctx = wx.createCanvasContext(ctxId)
			return this
		},
        /**
         * [initOptions userOption标准化，将object转化为数组]
         * @param  {[type]} userOptions [description]
         * @return {[type]}             [description]
         */
        initOptions: function (userOptions, defaultOptions , callback) {
            var that = this
            let result = {}
            for (let i in defaultOptions) {
                if (!userOptions[i]) {
                    utils.isObject(defaultOptions[i]) && !utils.isArray(defaultOptions[i]) ? result[i] = [defaultOptions[i]] : result[i] = defaultOptions[i]
                } else {
                    if (utils.isObject(userOptions[i])) {
                        result[i] = utils.isArray(userOptions[i]) ? userOptions[i] : [userOptions[i]]
                    }
                    if (result[i]) {
                        result[i].forEach(function (item, index) {
                            if (utils.isObject(item)) {
                                result[i][index] = utils.userMerge(item, defaultOptions[i])
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
            // 采用新增加的接口
            wx.createSelectorQuery().select('#' +result.ctx.canvasId).boundingClientRect(function (rect) {
                this.defaultOptions = result
                result.grid[0].width = rect.width
                result.grid[0].height = rect.height
                utils.init(result)
                callback(result)
              }).exec()
        },
		setOption: function (options) {
            console.log('options', options)
            this.setOptioned = true
            this.initOptions(options, this.defaultOptions, (res) => {
                let ctx = this.defaultOptions.ctx
                this.draw(ctx, res)
            })
		},
		draw: function (ctx, options) {
            let series = options.series
            this.drawed = false
            console.log('grid', grid)
            grid.init(ctx, options)
            xAxis.init(ctx, options)
            legend.init(ctx, options)
            
            series.forEach(function (item, index) {
                console.log(item.type)
                switch (item.type) {
                    case 'line':
                        line.init(ctx, item, index, options)
                        break
                    case 'pie':
                        console.log('pie')
                        break
                }
            })
            
            ctx.draw()
            ctx.save()
            this.drawed = true
		},
        // 提供chart事件的支持
        on: function(type, event, callback) {
            // var options = this.defaultOptions
            switch(type) {
                case 'highlight': {
                    console.log('highlight')
                    chartEvent.highlight.call(this, event, callback)
                    break
                }
                case 'move': {
                    console.log('move')
                    chartEvent.move.call(this, event, callback)
                }
                default: {
                    console.log(1)
                }
            }
        },
        callback: function () {

        }
	}
}