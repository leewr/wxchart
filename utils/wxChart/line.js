const Smooth = require('./smooth.js')
const utils = require('../utils.js')
module.exports = function line () {
	return {
		init: function (ctx, item, index, options) {

				this._drawUnit(ctx, item, index, options)
			//})
		},
		_drawUnit: function (ctx, item, index, options) {
			let grid = options.grid[0]
			let theme = options.theme[0]
			let series = options.series[index]
			let data = utils.dataHander(item.data)
			// 坐标系转换
			ctx.beginPath()
			ctx.strokeStyle = theme.color[index]
			ctx.fillStyle = theme.line.color
			ctx.lineWidth = item.lineStyle.width
			if (item.lineStyle.color !== 'auto') {
				ctx.strokeStyle = item.lineStyle.color
				ctx.fillStyle = item.lineStyle.color
			}
			ctx.setLineWidth = item.lineStyle.lineWidth
			let point0 = utils.dataTogrid(data[0])
			let pointLast = utils.dataTogrid(data[data.length - 1])
			data.forEach(function (i, n) {
				let point = utils.dataTogrid(i)
				if (n === 0) {
					ctx.moveTo(point.x, point.y)
				}
				if (i.smooth) {
					if (index > 0) {
						let bezierPoint = Smooth.smooth(data, n - 1)
						const pointA = utils.dataTogrid(bezierPoint.pA)
						const pointB = utils.dataTogrid(bezierPoint.pB)
						ctx.bezierCurveTo(pointA.x, pointA.y, pointB.x, pointB.y, point.x, point.y)
					}
				} else {
					ctx.lineTo(point.x, point.y)
				}

				if (n === data.length - 1) {
					// 包裹区域
					// 绘制层级问题
				 	
				}
			})

		 	ctx.stroke()

		 	// 背景区域
		 	if (item.areaStyle.opacity) {
		 		let color = utils.hexToRgb(item.areaStyle.color === 'auto' ? theme.color[index] : item.areaStyle.color)
		 		color = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + '0.5)'
				ctx.lineTo(pointLast.x, grid.height - grid.bottom - 1)
				ctx.lineTo(grid.left, grid.height - grid.bottom - 1)
				ctx.lineTo(point0.x, point0.y)
				ctx.fillStyle = color
				ctx.closePath()
				ctx.fill()
			}

		 	ctx.strokeStyle="#fff"

		 	// 显示圆点
		 	if (item.itemStyle.opacity) {
				data.forEach(function (i, index) {
			 		let point = utils.dataTogrid(i)
			 		ctx.beginPath()
			 		ctx.lineWidth = item.lineStyle.width / 2
			 		ctx.arc(point.x,point.y, item.lineStyle.width < 2 ? 2 : item.lineStyle.width,0,2* Math.PI)
			 		ctx.fill()
			 		ctx.stroke()
			 	})
		 	}
		}
	}
}