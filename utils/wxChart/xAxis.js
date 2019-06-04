import { calcRange } from './chart-data.js'
// xAxis x轴线
export default {
	init: function (ctx, options) {
		this._draw(ctx, options)
	},
	_draw: function (ctx, options) {
		ctx.beginPath()
		this._drawXAxis(ctx, options)
		this._drawYAxis(ctx, options)
		ctx.stroke()
	},
	_drawXAxis: function (ctx, options) {
		this._drawXline(ctx, options)
	},
	_drawYAxis: function (ctx, options) {
		this._ylineCalc(ctx, options)
		options.yAxis[0].show && this._drawYline(ctx, options)
	},
	_drawXline: function (ctx, options) {
		// XAxis 只允许底部一个轴
		let grid = options.grid[0]
		let xAxis = options.xAxis[0]
		let dataLength
		if (dataLength <= 0) return;
		dataLength = xAxis.data.length > options.dataZoom[0].endValue ? options.dataZoom[0].endValue : xAxis.data.length
		console.log('dataLength', dataLength)
		let average = (grid.x2 - grid.x) / dataLength
		let margin = options.margin[0]
		// 坐标横线
		console.log(options)
		ctx.setStrokeStyle(xAxis.lineStyle.color)
		ctx.setTextAlign('center')
		ctx.setFontSize('12')
		console.log(grid)
		ctx.moveTo(grid.x, grid.y2)
		ctx.lineTo(grid.x2, grid.y2)
		console.log('drawx')

		// 坐标下引线
		let a = {
			x: grid.x2,
			y: grid.y2
		}
		let dataXrange = []
		for (let i = 0; i <= dataLength; i++) {
			let l = a.x
			dataXrange.push(a.x)
			if (xAxis.axisTick.show) {
				ctx.setFillStyle(xAxis.lineStyle.color)
				ctx.moveTo(a.x, a.y)
				ctx.lineTo(a.x, a.y + 3)
			}
			a.x -= average
			if (i < dataLength) {
				ctx.setFillStyle(xAxis.textStyle.color)
				ctx.fillText(xAxis.data[dataLength - i - 1], (l + a.x) /2 , a.y + 20)
			}
		}
		xAxis.dataXrange = dataXrange.reverse()
		console.log('dataXrange', xAxis.dataXrange)
	},
	_drawYline: function (ctx, options) {
		let grid = options.grid[0]
		let yAxis = options.yAxis[0]
		let data = []
		let margin = options.margin
		if (yAxis.data) {
			data = yAxis.data
		} else {
			options.series.map((item) => {
				data.push(item['data'])
			})
		}
		const range = grid.range
		let average = (grid.height - grid.top - grid.bottom - margin[0] - margin[2]) / grid.row
		let numAverage = (range.maxRange - range.minRange) / grid.row
		let num = range.maxRange

		console.log('range', range)

		ctx.setTextAlign('right')
		ctx.setTextBaseline('middle')
		console.log('grid.left', grid.left)
		ctx.moveTo(grid.x, grid.y)
		ctx.lineTo(grid.x, grid.y2)
		let a = {
			x: grid.x,
			y: grid.top + margin[0]
		}
		for (let i = 0; i <= grid.row; i++) {
			ctx.fillText(num, a.x - 6, a.y)
			ctx.moveTo(a.x, a.y)
			ctx.lineTo(a.x - 3, a.y)
			num -= numAverage
			a.y += average
		}
	},
	_ylineCalc: function (ctx, options) {
		let grid = options.grid[0]
		let yAxis = options.yAxis[0]
		let data = []
		if (yAxis.data) {
			data = yAxis.data
		} else {
			options.series.map((item, name) => {
				data.push(item['data'])
			})
		}
		console.log('data.length', data)
		let maxDataArr = [],
			minDataArr = []
		data.forEach((item, index) => {
			let max = Math.max.apply(null, item)
			let min = Math.min.apply(null, item)
			maxDataArr.push(max)
			minDataArr.push(min)
		})
		let range = calcRange(Math.max.apply(null, maxDataArr), 0)
		grid.range = range
	}
}