const Shape = {}

const ShapeBase = {
	_coordinate: null,
	draw (config, container) {
	},
	//Coordinate 设置坐标系
	setCoordinate (coordinate) {
		this._coordinate = coordinate
	},
	/*
	* convert the normalized value to the canvas position
	* 装换初始值到画布的值 
	*/
	parsePoint(point) {
		const coordinate = this._coordinate
		if (coordinate.isPolar) {

		}
		return coordinate.converPoint(point)
	},
	parsePoints(points) {
		if (!points) return false
		const self = this
		const result = []
		points.forEach(function (point) {
			result.push(self.parsePoints(point))
		})
		return result
	}
}

const ShapeFactoryBase = {
	defaultShapeType: null,
	setCoordinate(coordinate) {
		this._coordinate = coordinate
	},
	getShape(type) {
		const self = this;
		if (Util.isArray(type)) {
			type = type[0]
		}
		const shape = self[type] || self[self.defaultShapeType]
		shape._coordinate = self._coordinate
		return shape
	},
	getShapePoints(type, config) {
		const shape = this.getShape(type)
		const fn = shape.getPoints || shape.getShapePoints || this.getDefaultPoints
		const points = fn(config)
		return points
	},
	getDefaultPoints() {
		return []
	},
	drawShape(type, config, container) {
		const shape = this.getShape(type)
		if (!config.color) {
			config.color = Global.color[0]
		}
		return shape.draw(config, container)
	}
}

// 注册工厂模式
Shape.registerFactory = function (factoryName, config) {
	const className = Util.upperFirst(factoryName)
	const geometryObject = Util.mix({}, ShapeFactoryBase, config)
	Shape[className] = geometryObject
	geometryObject.name = factoryName
	return geometryObject
}

Shape.registerShape = function (factoryName, shapeType, config) {
	const className = Util.upperFirst(factoryName)
	const factory = Shape[className]
	const shapeObject = Util.mix({}, ShapeBase, config)
	factory[shapeType] = shapeObject // ?有什么作用
	return shapeObject
}

Shape.registShape = Shape.registerShape

Shape.getShapeFactory = function (factoryName) {
	const self = this
	factoryName = factoryName || 'point'
	const className = Util.upperFirst(factoryName)
	return self[className]
}


module.exports = Shape;