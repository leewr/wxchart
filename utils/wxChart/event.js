import utils from './utils'

export default {
	highlight: function(event, callback) {
		const options = utils.getOptions()
		const ctx = options.ctx
		const x = event.touches[0].x
		const data = options.xAxis[0].dataXrange
		let curIndex = 0
		for (let i = 0; i < data.length - 1; i++) {
			if (x > data[i] && x < data[i + 1]) {
				curIndex = i
			}
		}
		options.xAxis[0].highlightIndex = curIndex
		this.draw(ctx, options)
		callback(curIndex)
	}
}