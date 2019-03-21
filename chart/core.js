const Core = {}

const Global = require('./global')
Core.Global = Global
Core.version = Global.version
Core.Chart = require('./chart/chart')
Core.G = require('./graphic/index')
Core.Util = require('./util/common')

module.exports = Core