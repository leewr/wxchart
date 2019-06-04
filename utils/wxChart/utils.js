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
function dataHander (data, options) {
    if (data.length === 0) return
    let dataLength = data.length > options.dataZoom[0].endValue ? options.dataZoom[0].endValue : data.length
	let grid = options.grid[0]
	let width = options.grid[0].width
    let height = options.grid[0].height
    const margin = options.margin
	// let data = options.series[0].data
	let widthUnit = (grid.x2 - grid.x) / dataLength
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
    
    let heightUnit = 0
    if ((grid.range.maxRange - grid.range.minRange) !== 0) {
        heightUnit = (height - grid.top - grid.bottom - margin[0] -margin[2]) / (grid.range.maxRange - grid.range.minRange)
    } else {
        heightUnit = 1
    }
    
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

var toString = Object.prototype.toString
var isObject = function (val) {
    return val !== null && typeof val === 'object'
}
var isArray = function (val) {
    return toString.call(val) === '[object Array]'
}

function forEach (obj, fn) {
    if (obj === null || typeof obj === 'undefined') return

    if (typeof obj !== 'object') obj = [obj]

    if (isArray(obj)) {
        for (let i = 0, l = obj.length; i < l; i++) {
            fn.call(null, obj[i], i, obj)
        }
    } else {
        for (let key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                fn.call(null, obj[key], key, obj)
            }
        }
    }
}

function userMerge (/* obj1, obj2, obj3, ... */) {
    let result = {}
    function assignValue(val, key) {
        if (typeof result[key] === 'object' && typeof val === 'object' && !isArray(val)) {
            result[key] = userMerge(result[key], val)
        } else if (typeof val === 'object' && !isArray(val)) {
            result[key] = userMerge({}, val)
        }else {
            if (result[key] === undefined) {
                result[key] = val
            }
        }
    }
    for (let i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue)
    }
    return result
}

/*
* 简易的对象clone
*/
function deepClone (obj) {
    const cloneObj = JSON.stringify(obj)
    return JSON.parse(cloneObj)
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
    hexToRgb,
    isObject,
    isArray,
    forEach,
    userMerge,
    deepClone
}
