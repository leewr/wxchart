const Smooth = require('./smooth.js')
const utils = require('../utils.js')
module.exports = function line () {
	return {
		init: function (ctx, options) {
			const series = options.series
			console.log(options)
			series.forEach((item, index) => {
				this._drawUnit(ctx, options, index)
			})
		},
		_drawUnit: function (ctx, options, index) {
			let series = options.series[index]
			let data = utils.dataHander(series.data)
			console.log(data)
			// 坐标系转换
			ctx.beginPath()
			
			data.forEach(function (item, index) {
				let point = utils.dataTogrid(item)
				if (index === 0) {
					ctx.moveTo(point.x, point.y)
				}

				if (series.smooth) {
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
		 	console.log(series.itemStyle.opacity)
		 	console.log(options)
		 	if (series.itemStyle.opacity) {
				data.forEach(function (item, index) {
			 		let point = utils.dataTogrid(item)
			 		ctx.beginPath()
			 		ctx.beginPath()
			 		ctx.fillStyle = 'black'
			 		ctx.arc(point.x,point.y,2,0,2* Math.PI)
			 		ctx.fill()
			 		ctx.stroke()
			 	})
		 	}
		}
	}
}