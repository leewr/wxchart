const Smooth = require('./smooth')

module.exports = function line () {
	return {
		init: function (ctx, options) {
			this._draw(ctx, options)
		},
		_draw: function (ctx, options) {
			let series = options.series[0]
			let data = series.data
			let grid = options.grid[0]
			let left = grid.left
			let right = grid.right
			let top = grid.top
			let bottom = grid.bottom
			let range = grid.range
			let gridHeight = grid.height - top - bottom
			let gridWidth = grid.width - left - right
			let widthUnit = gridWidth / data.length
			let unit = gridHeight / (range.maxRange - range.minRange)
			let ps = []
			// 坐标系转换
			ctx.beginPath()

			data.forEach(function (item, index) {
				let l = (item - range.minRange) * unit
				let x = grid.left + index * widthUnit +  widthUnit / 2
				let y = grid.height - l - bottom
				ps.push({x: x, y: y})
				if (series.smooth) {
					
				} else {
					if (index === 0) {
						ctx.moveTo(x, y)
					} else {
						ctx.lineTo(x, y)
					}
				}
			})
			console.log(ps)
			if (series.smooth) {
				for (let i = 1; i < data.length; i++) {
					let bezierPoint = Smooth.smooth(data, i)
					let gridPoint = Smooth.toGrid(data[i], i)
					let l = (bezierPoint.pA.x - range.minRange) * unit
					if (i === 1) {
	                    ctx.moveTo(ps[0].x, ps[0].y)
	                }
                	ctx.bezierCurveTo(bezierPoint.pA.x, bezierPoint.pA.y, bezierPoint.pB.x, bezierPoint.pB.y, gridPoint.x, gridPoint.y)
				}
			}
			console.log('end')
		 	ctx.stroke()
		 	ctx.strokeStyle="#fff"

		 	ps.forEach(function (item, index) {
		 		ctx.beginPath()

		 		if (index) {
		 			ctx.fillStyle = 'red'
		 			let bezierPoint = Smooth.smooth(ps, index, .5, .5)
		 			ctx.arc(bezierPoint.pA.x,bezierPoint.pA.y,2,0,2* Math.PI)
		 		    ctx.arc(bezierPoint.pB.x,bezierPoint.pB.y,2,0,2* Math.PI)
		 		    ctx.fill()
		 		}
		 		ctx.beginPath()
		 		ctx.fillStyle = 'black'
		 		ctx.arc(item.x,item.y,2,0,2* Math.PI)
		 		ctx.fill()
		 		ctx.stroke()
		 	})
		}
	}
}