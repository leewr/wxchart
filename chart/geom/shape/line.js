// 注册一个
const Line = Shape.registerFactory('line', {
	defauleShapeType: 'line'
})

function getStyle(config) {
	const style = {
		strokeStyle: config.color
	}
	if (config.size >=0) {
		style.lineWidth = config.size
	}
	Util.mix(style, config.style)
	return Util.mix({}, Global.shape.line, style)
}

function drawLines(config, container, style, smooth) {
	const points = config.points
	if (points.length && Util.isArray(points[0].y)) {

	}
	return container.addShape('Polyline', {
		className: 'line',
		attrs: Util.mix({
			points,
			smooth
		}, style)
	})
}

// 注册图形类型

const SHAPES = ['line', 'smooth', 'dash']

Util.each(SHAPES, function(shapeTpye) {
	Shape.registerShape('line', shapeTpye, {
		draw() {
			return ;
		}
	})
})

module.exports = Line