// 注册一个
const Line = Shape.registerFactory('line', {
	defauleShapeType: 'line'
})


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