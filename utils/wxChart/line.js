module.exports = function line () {
	return {
		init: function (ctx, options) {
			this._draw(ctx, options)
		},
		_draw: function (ctx, options) {
			let data = options.series[0].data
			// 坐标系问题
			ctx.beginPath()
			data.forEach(function (item, index) {
				ctx.moveTo
			})
			ctx.moveTo() 
		}
	}
}