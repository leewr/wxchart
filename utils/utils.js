let mergeOtions
function init (options) {
	mergeOtions = options
}
function getOptions () {
	return mergeOtions
}

/*
* 已处理以grid为坐标轴
* 数据截取最小值开始
 */
function dataHander () {
	let options = getOptions()
	let grid = options.grid[0]
	let width = options.grid[0].width
	let height = options.grid[0].height
	let data = series.data
	let widthUnit = (width - grid.left - grid.right) / data.length
	let heightUnit = (height - grid.top - grid.bottom) / (grid.range.maxRange - grid.range.minRange)
	let result = []
	data.forEach(function (item, index) {
		result.push({x: widthUnit / 2 + widthUnit * index, y: item - grid.range.minRange})
	})
	return result
}

function dataTogrid (point) {
	const options = getOptions()
	const grid = options.grid[0]
	return {
		x: grid.left + point.x,
		y: grid.height - grid.bottom - point.y
	}
}


module.exports = {
	init: init,
	getOptions: getOptions
}
