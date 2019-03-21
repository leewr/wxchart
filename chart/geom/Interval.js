const Geom = require('./base')

class Interval extends Geom {
	getDefaultConfig() {
		const config = super.getDefaultConfig()
		config.type = 'interval'
		config.shapeType = 'interval'
		config.generatePoints = true
		return config
	}
	
	constructor(config) {
		super(config)
		Util.mix(this, SizeMixin)
	}

	createShapePointsConfig(obj) {

	}

	clearInner() {
		super.clearInner()
		this.set('defaultSize', null)
	}

}

Geom.Interval = Interval
module.exports = Interval