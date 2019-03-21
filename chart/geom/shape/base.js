class Geom extends Base {
	init() {
		const self = this
		self._initAttrs()
		const dataArray = self._processData()
		if (self.get('adjust')) {
			self._adjustData(dataArray)
		}
		self.set('dataArray', dataArray)
	}
}

module.exports = Geom