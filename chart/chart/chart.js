
const Base = require('../base')

class Chart extends Base {
	source(data, colDefs) {
		this.set('data', data)
		if (colDefs) {
			// this.scale(colDefs)
		}
		return this
	}
	scale(field, config) {
		
	}
}

Chart.plugins = Chart.initPlugins()
module.exports = Chart