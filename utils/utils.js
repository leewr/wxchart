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
    if (data.length === 0) return
	let options = getOptions()
	let grid = options.grid[0]
	let width = options.grid[0].width
    let height = options.grid[0].height
    const margin = options.margin
	// let data = options.series[0].data
	let widthUnit = (grid.x2 - grid.x) / data.length
	let heightUnit = (height - grid.top - grid.bottom - margin[0] -margin[2]) / (grid.range.maxRange - grid.range.minRange)
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
    const margin = options.margin
	const heightUnit = (height - grid.top - grid.bottom - margin[0] -margin[2]) / (grid.range.maxRange - grid.range.minRange)
	const y = (point.y - grid.range.minRange) * heightUnit
	return {
		x: grid.x + point.x,
		y: grid.height -  grid.bottom - y - margin[2]
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

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);    
    return result ? {        
        r: parseInt(result[1], 16),       
        g: parseInt(result[2], 16),        
        b: parseInt(result[3], 16)    
    } : null;
}

/**
 * 是否在目标范围之内
 */
function isInReact(point, pointRange) {
    if (
        point.x > pointRange.x[0] && 
        point.x < pointRange.x[1] &&
        point.y >pointRange.y[0] &&
        point.y < pointRange.y[1]
    ) {
        return true
    }
    return false
}
 
module.exports = {
	init,
	getOptions,
	dataHander,
	dataTogrid,
	measureText,
	hexToRgb
}
