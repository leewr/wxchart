const Smooth = require('./smooth.js')
import utils from './utils'
export default {
	init: function (ctx, item, index, options) {
			this._drawUnit(ctx, item, index, options)
		//})
	},
	_drawUnit: function (ctx, item, index, options) {
		console.log('item.data.length', item.data.length)
		
		let grid = options.grid[0]
		let theme = options.theme[0]
		let series = options.series[index]
		
		// 坐标系转换
		ctx.beginPath()
		ctx.strokeStyle = theme.color[index]
		ctx.fillStyle = theme.line.color
		ctx.lineWidth = item.lineStyle.width
		if (item.lineStyle.color !== 'auto') {
			ctx.strokeStyle = item.lineStyle.color
			ctx.fillStyle = item.lineStyle.color
		}
		// 数据为0时候斜杠
		if (item.data.length === 0 ) {
			ctx.beginPath()
			ctx.setStrokeStyle('#8C939D')
			ctx.setFillStyle('#8C939D')
			ctx.lineWidth = 1
			ctx.setLineDash([1, 2], 4)
			ctx.moveTo(grid.x, grid.y2)
			ctx.lineTo(grid.x2, grid.y)
			ctx.stroke()
			return
		}

		let data = utils.dataHander(item.data, options)
		ctx.lineWidth  = item.lineStyle.width
		let point0 = utils.dataTogrid(data[0])
		console.log('zoomData', options)
		// todo 数据长度转换
		if (options.dataZoom[0].end) {

		}
		let dataLength = data.length > options.dataZoom[0].endValue ? options.dataZoom[0].endValue : data.length
		let pointLast = utils.dataTogrid(data[dataLength - 1])

		data.forEach(function (i, n) {
			let point = utils.dataTogrid(i)
			if (n === 0) {
				ctx.moveTo(point.x, point.y)
			}
			if (series.smooth) {
				console.log('smooth', series.smooth, index)
				// if (index > 0) {
					let bezierPoint = Smooth.smooth(data, n - 1)
					const pointA = utils.dataTogrid(bezierPoint.pA)
					const pointB = utils.dataTogrid(bezierPoint.pB)
					ctx.bezierCurveTo(pointA.x, pointA.y, pointB.x, pointB.y, point.x, point.y)
				// }
			} else {
				// 数据长度控制
				if (n < dataLength) {
					ctx.lineTo(point.x, point.y)
				}
			}

			if (n === data.length - 1) {
				// 包裹区域
				// 绘制层级问题
			}
		})

		if (item.lineStyle.width !== 0) {
			ctx.stroke()
		}
		
		// 背景区域
		if (item.areaStyle.opacity) {
			// let color = utils.hexToRgb(item.areaStyle.color === 'auto' ? theme.color[index] : item.areaStyle.color)
			// color = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + '0.5)'
			ctx.lineTo(pointLast.x, grid.y2)
			ctx.lineTo(grid.x, grid.y2)
			ctx.lineTo(point0.x, point0.y)
			// ctx.fillStyle = color
			// Create linear gradient
			console.log('bgDraw')
			const color = item.areaStyle.color
			const colorStops = color.colorStops
			console.log(colorStops)
			ctx.setGlobalAlpha(item.areaStyle.opacity)
			const grd = ctx.createLinearGradient(0, 0, 0, grid.height)
			colorStops.forEach(item => {
				grd.addColorStop(item.offset, item.color)
			})
			
			ctx.setFillStyle(grd)
			ctx.closePath()
			ctx.fill()
			ctx.setGlobalAlpha(1)
		}

		

		// 显示圆点
		if (item.itemStyle.opacity) {
			ctx.setStrokeStyle(item.itemStyle.color)
			ctx.setFillStyle(item.itemStyle.color)
			data.forEach(function (i, index) {
				if (i < dataLength) {
					let point = utils.dataTogrid(i)
				// ctx.beginPath()
				let isHight 
				if (index === options.xAxis[0].highlightIndex) {
					// 圆点高亮
					isHight = true
					ctx.setFillStyle('#fff')
					// ctx.setStrokeStyle('#fff')
					// ctx.arc(point.x,point.y, 20 ,0,2* Math.PI)
					// 虚线
					// ctx.lineWidth = 4
					// ctx.setLineDash([2,10], 5)
					ctx.beginPath()
					ctx.setLineDash([1,2], 5)
					ctx.lineWidth = 1
					ctx.moveTo(point.x, grid.y)
					ctx.lineTo(point.x, grid.y2)
					ctx.closePath()
					ctx.stroke()
				}
				ctx.beginPath()
					ctx.lineWidth = item.lineStyle.width / 2
					if (isHight) {
					ctx.setFillStyle(item.itemStyle.highlight.color)
					ctx.setStrokeStyle(item.itemStyle.highlight.color)
					ctx.arc(point.x,point.y, 4,0,2* Math.PI)
					} else {
					ctx.arc(point.x,point.y, item.lineStyle.width < 2 ? 2 : item.lineStyle.width,0,2* Math.PI)
					}
				
				ctx.fill()
				ctx.stroke()
				ctx.setStrokeStyle(item.itemStyle.color)
				ctx.setFillStyle(item.itemStyle.color)
				}
				
			})
		}
	},
	update: function (ctx, item, index, options) {
		
	}
}