var utils = require('../utils')
var wxChart = require('./kline')

module.exports = {
	highlight: function(event) {
		const options = utils.getOptions()
		const ctx = options.ctx
		const x = event.touches[0].x
		const data = options.xAxis[0].dataXrange
		console.log('data', options)
		let curIndex = 0
		for (let i = 0; i < data.length - 1; i++) {
			if (x > data[i] && x < data[i + 1]) {
				curIndex = i
			}
		}
		options.xAxis[0].highlightIndex = curIndex
		console.log(this)
		console.log('redraw')
		this.draw(ctx, options)
		console.log('高亮', curIndex)
	}
}