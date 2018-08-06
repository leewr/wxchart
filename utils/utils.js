let mergeOtions
function init (options) {
	mergeOtions = options
}
function getOptions () {
	return mergeOtions
}

/*
* 已处理以grid为坐标轴
 */
function dataHander (data) {
	let options = getOptions()
	let grid = options.grid[0]
	let width = options.grid[0].width
	let height = options.grid[0].height
	// let data = options.series[0].data
	let widthUnit = (width - grid.left - grid.right) / data.length
	let heightUnit = (height - grid.top - grid.bottom) / (grid.range.maxRange - grid.range.minRange)
	let result = []
	data.forEach(function (item, index) {
		result.push({x: widthUnit / 2 + widthUnit * index, y: item})
	})
	return result
}

function dataTogrid (point) {
	const options = getOptions()
	const height = options.grid[0].height
	const grid = options.grid[0]
	const heightUnit = (height - grid.top - grid.bottom) / (grid.range.maxRange - grid.range.minRange)
	const y = (point.y - grid.range.minRange) * heightUnit
	return {
		x: grid.left + point.x,
		y: grid.height - grid.bottom - y
	}
}

function measureText (text, fontSize=10) {
    // wx canvas 未实现measureText方法, 此处自行实现
    text = String(text);
    var text = text.split('');
    var width = 0;
    text.forEach(function(item) {
        if (/[a-zA-Z]/.test(item)) {
            width += 7;
        } else if (/[0-9]/.test(item)) {
            width += 5.5;
        } else if (/\./.test(item)) {
            width += 2.7;
        } else if (/-/.test(item)) {
            width += 3.25;
        } else if (/[\u4e00-\u9fa5]/.test(item)) {
            width += 10;
        } else if (/\(|\)/.test(item)) {
            width += 3.73;
        } else if (/\s/.test(item)) {
            width += 2.5;
        } else if (/%/.test(item)) {
            width += 8;
        } else {
            width += 10;
        }
    });
    return width * fontSize / 10;
}


module.exports = {
	init,
	getOptions,
	dataHander,
	dataTogrid,
	measureText
}
