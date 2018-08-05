var utils = require('../utils.js')

function controlPointBezier () {

}

function smoothBezier(points) {
	let midPoints = []
	points.forEach(function (item, index) {
		let next = points[index + 1]
		midPoints.push({x: (item[0] + next[0]) / 2, y: (item[1] + next[1]) / 2})
	})
}

// 问题： 曲线最高点高于数值最大值
function getCtrlPoint(points, i, a, b){
    function isNotMiddlePoint (points, i) {
        if (points[i - 1] && points[i + 1]) {
            return points[i].y >= Math.max(points[i - 1].y, points[i + 1].y)
                   || points[i].y <= Math.min(points[i - 1].y, points[i + 1].y);
        } else {
            return false
        }
    }

    if(!a||!b){
        a=0.2;
        b=0.2;
    }
    let pAx = null;
    let pAy = null;
    let pBx = null;
    let pBy = null;
    if(i < 1){
        pAx = points[0].x + (points[1].x-points[0].x) * a;
        pAy = points[0].y + (points[1].y-points[0].y) * a;
    }else{
        pAx = points[i].x + (points[i + 1].x - points[i-1].x) * a;
        pAy = points[i].y + (points[i + 1].y - points[i-1].y) * a;
    }

    if(i > points.length - 3){
        let last =points.length - 1;
        pBx = points[last].x - (points[last].x - points[last - 1].x) * b;
        pBy = points[last].y - (points[last].y - points[last - 1].y) * b;
    }else{
        pBx = points[i + 1].x - (points[i + 2].x-points[i].x) * b;
        pBy = points[i + 1].y - (points[i + 2].y-points[i].y) * b;
    }

    //thx https://github.com/xiaolin3303/wx-charts/issues/79
    if (isNotMiddlePoint(points, i + 1)) {
        pBy = points[i + 1].y;
    }
    if (isNotMiddlePoint(points, i)) {
        pAy = points[i].y;
    }

    return {
        pA: {x: pAx, y: pAy},
        pB: {x: pBx, y: pBy}
    }
}

// 直角坐标系数值转换到 canvas 数值
/*
* val {x: , y: } 
*/
function dataTogrid (val) {
	let options = utils.getOptions()
	let data = options.series[0].data
	let grid = options.grid[0]
	let left = grid.left
	let right = grid.right
	let top = grid.top
	let bottom = grid.bottom
	let range = grid.range
	let gridHeight = grid.height - top - bottom
	let gridWidth = grid.width - left - right
	let widthUnit = gridWidth / data.length
	let unitX = gridWidth
	let unitY = gridHeight / (range.maxRange - range.minRange)
	let l = (val.y - range.minRange) * unitY
	return {
		x: grid.left + index * widthUnit +  widthUnit / 2,
		y: grid.height - l - bottom
	}
}



module.exports = {
	smooth: getCtrlPoint,
	toGrid: dataTogrid
}