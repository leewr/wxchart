const Path = require('./path')
const Geom = require('./base')

// 注册图形
require('./shape/line')

class Line extends Path {
	getDefaultConfig() {
		const config = super().getDefaultConfig()
		config.type = 'line'
		return config
	}
}

Geom.Line = Line
module.exports = Line