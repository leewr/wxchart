const Smooth = require('./smooth.js')
const utils = require('../utils.js')
module.exports = function line () {
	return {
		init: function (ctx, options) {
			const theme = options.theme[0]
			const series = options.series
			series.forEach((item, index) => {
				
				this._drawUnit(ctx, item, index, options)
			})
		},
		_drawUnit: function (ctx, item, index, options) {
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
			data.forEach(function (item, index) {
				let point = utils.dataTogrid(item)
				if (index === 0) {
					ctx.moveTo(point.x, point.y)
				}
				if (item.smooth) {
					if (index > 0) {
						let bezierPoint = Smooth.smooth(data, index - 1)
						const pointA = utils.dataTogrid(bezierPoint.pA)
						const pointB = utils.dataTogrid(bezierPoint.pB)
						ctx.bezierCurveTo(pointA.x, pointA.y, pointB.x, pointB.y, point.x, point.y)
					}
				} else {
					ctx.lineTo(point.x, point.y)
				}
			})
		 	ctx.stroke()
		 	ctx.strokeStyle="#fff"

		 	// 显示圆点
		 	console.log()
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