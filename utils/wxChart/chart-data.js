
export function datayAxisHandle (series, options) {
	let data = series[0].data
	let max = Math.max.apply(this, data)
	let min = Math.min.apply(this, data)
	let range = calcRange(max, min)
}

export function calcRange (max, min) {
	let limit = 0
	let range = max - min
	if (range >= 10000) {
		limit = 1000
	} else if (range >= 1000) {
		limit = 100
	} else if ( range >= 100) {
		limit = 10
	} else if (range >= 10) {
		limit = 5
	} else if (range >=1) {
		limit = 1
	} else if (range >= 0.1) {
		limit = 0.1
	} else {
		limit  = 0.01
	}

	return {
		minRange: findRange(min, 'lower', limit),
		maxRange: findRange(max, 'upper', limit)
	}
}

export function findRange (num, type, limit) {
	if (num === Infinity || num === -Infinity ) return 0
	if (isNaN(num)) {
		throw new Error('unvalid series data!')
	}
	limit = limit || 10
	let multiple = 1
	while (limit < 1) {
		limit *= 10
		multiple *= 10
	}
	if (type === 'upper') {
		num = Math.ceil(num * multiple)
	} else {
		num = Math.floor(num * multiple)
	}
	console.log(num)
	while (num % limit !== 0) {
		if (type === 'upper') {
			num++
		} else {
			num--
		}
	}
	console.log('num', num, multiple, num / multiple)
	return num / multiple
}