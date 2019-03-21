
function getRectPoints(config) {
	const { x, y, y0, size } = config

	let ymin = y0
	// 返回矩形坐标的四个点
	return [
		{ x: xmin, y: ymin },
		{ x: xmin, y: yamx },
		{ x: xmax, y: ymax },
		{ x: xmax, y: ymin }
	]
}

const Interval = Shape.registerFactory('interval', {
	defaultShapeType: 'rect',
	getDefaultPoints(config) {
		return getRectPoints(config)
	}
})

Shape.registerShape('interval', 'rect', {
	draw(config, container) {
		const points = this.parsePoints()
		const style = Util.mix({
			fill: config.color
		}, Global.shape.interval, config.style)

		if (cfg.isInCircle) {

		}

		const rectConfig = getRectRange(points)

		return container.addShape('rect', {
			className: 'interval'
		})
	}
})

module.exports = Interval