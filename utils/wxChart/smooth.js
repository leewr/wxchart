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

function getCtrlPoint(ps, i, a, b){
        if(!a||!b){
            a=0.25;
            b=0.25;
        }

        //处理两种极端情形
        // console.log(i)
        let pAx, pAy, pBx, pBy
        if(i>ps.length-2){
            pAx = ps[i].x + (ps[i - 1].x-ps[i].x)*a;
            pAy = ps[i].y + (ps[i - 1].y-ps[i].y)*a;
        }else{
            pAx = ps[i].x + (ps[i - 1].x - ps[i + 1].x)*a;
            pAy = ps[i].y + (ps[i - 1].y - ps[i + 1].y)*a;
        }
        if(i < 3){
            pBx = ps[0].x - (ps[0].x-ps[1].x)*b;
            pBy = ps[0].y - (ps[0].y-ps[1].y)*b;
        }else{
            pBx = ps[i - 1].x - (ps[i - 2].x-ps[i].x)*b;
            pBy = ps[i - 1].y - (ps[i - 2].y-ps[i].y)*b;
        }
        return {
            pA:{x:pAx,y:pAy},
            pB:{x:pBx,y:pBy}
        }
}

// 直角坐标系数值转换到 canvas 数值
/*
* val {x: , y: } 
*/
function dataTogrid (val) {
	let options = utils.getOptions()
	let data = series.data
	let grid = options.grid[0]
	let left = grid.left
	let right = grid.right
	let top = grid.top
	let bottom = grid.bottom
	let range = grid.range
	let gridHeight = grid.height - top - bottom
	let gridWidth = grid.width - left - right
	let widthUnit = gridWidth / data.length
	let unitY = gridHeight / (range.maxRange - range.minRange)
	let unitX = 
	let l = (val.y - range.minRange) * unit
	let w = ()
	return {
		x: grid.left + index * widthUnit +  widthUnit / 2,
		y: grid.height - l - bottom
	}
}



module.exports = {
	smooth: getCtrlPoint,
	toGrid: dataTogrid
}