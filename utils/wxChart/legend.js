import { measureText, getOptions } from '../utils.js'
module.exports = function legend () {
	return {
		init: function (ctx) {
			let options = getOptions()
			console.log('legend', options)
			this._drawTitle(ctx, options)
			options.legend[0].show && this._draw(ctx, options)
		},
		_draw: function (ctx, options) {
			let seriesLegend = []
			let legend = options.legend[0]
			let dataLegend = legend.data.length ? legend.data: []
			if (dataLegend.length) {
				let that = this
				ctx.setTextAlign('left')
				console.log('legend')
				let x = legend.left + 2
				let r = options.grid[0].width - legend.right - 2
				let y = legend.top
				dataLegend.map((item, index) => {
					let textWidth = measureText(item, 12)
					let single = dataLegend.length % 2
					if (legend.position === 'top') {
						if (legend.align === 'left') {
							this._drawUnit(ctx, x, y, item, 6)
							x += (textWidth + 4 + 6 + 12)
						} else if (legend.align === 'right') {
							textWidth = measureText(dataLegend[dataLegend.length - 1 - index], 12)
							r = r - (textWidth + 4 + 6 + 12)
							this._drawUnit(ctx, r, y, dataLegend[dataLegend.length - 1 - index], 6)
						}
					}
				})
				ctx.stroke()
			}
		},
		_drawUnit (ctx, x, y, text, textMarginLeft) {
			let textX = x + textMarginLeft
			ctx.beginPath()
			ctx.arc(x, y, 2, 0, 2 * Math.PI)
			ctx.fillText(text, textX, y)
			ctx.fill()
		},
		_drawTitle (ctx, options) {
			const title = options.title[0]
			console.log(title)
			let x = options.grid[0].width / 2
			const metrics = ctx.measureText(title.text)
			ctx.beginPath()
			ctx.setFillStyle(title.textStyle.color)
			ctx.setFontSize(title.textStyle.fontSize)
			ctx.fillText(title.text, x, (options.grid[0].top + options.margin[0]) / 2)
			ctx.fill()
		}
	}
}