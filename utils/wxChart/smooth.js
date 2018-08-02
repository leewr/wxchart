

function controlPointBezier () {

}

function smoothBezier(points) {
	let midPoints = []
	points.forEach(function (item, index) {
		let next = points[index + 1]
		midPoints.push({x: (item[0] + next[0]) / 2, y: (item[1] + next[1]) / 2})
	})
	
}

module.exports = {
	smooth: controlPointBezier
}