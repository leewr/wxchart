/**
 * Created by ChenChao on 2017/1/4.
 */

module.exports = {
    drawLine: function (option) {
        let that = this
        let seriesArr = option.series
        seriesArr.forEach(function (item, index) {
            if (item.show) {
                if (item.type === 'line') {
                    that.bezier(option, index)
                }
                if (item.type === 'bar') {
                    that.bar(option, index)
                }
                if (item.type === 'candlestick') {
                    that.candle(option, index)
                }
            }
            
        })
    },
    bezier: function (option, index) {
        let that = this
        let ctx = option.ctx
        let series = option.series[index]
        let data = series.data
        let point = []
        // console.log(data)
        if (option.dataZoom[0].start) {
            var dataStartIndex = data.length * option.dataZoom[0].start - 1
        } else {
            var dataStartIndex = 0
        }
        // console.log("dataStartIndex is" + dataStartIndex)
        if (option.dataZoom[0].end) {
            var dataEndIndex = data.length * option.dataZoom[0].end - 1
        }
        point = this._dataTogrid(data, option, dataStartIndex, dataEndIndex)

        ctx.setLineWidth(series.lineStyle.width)
        ctx.setStrokeStyle(series.lineStyle.color)
        ctx.beginPath()
        // console.log(data.length - 1)
        if (option.dataZoom[0].start === 0){
            console.log('dataZoom start 0')
            for (var i = 1; i < data.length; i++) {
                if (i === 1) {
                    ctx.moveTo(point[0].x, point[0].y)
                }
                var ctrlP=that._getCtrlPoint(point,i);
                    ctx.bezierCurveTo(ctrlP.pA.x, ctrlP.pA.y, ctrlP.pB.x,ctrlP.pB.y, point[i].x, point[i].y);
            }
        } else {
            // console.log("数据start从非0的地方开始绘制")
            for (var i = data.length;i > 0; i--) {
                    // console.log(point[i])
                if (i==data.length) {
                    // console.log(point[i - 1].x,point[i - 1].y)
                    ctx.moveTo(point[i - 1].x,point[i - 1].y)
                } else {
                    var ctrlP=that._getCtrlPoint(point,i);
                    ctx.bezierCurveTo(ctrlP.pA.x, ctrlP.pA.y, ctrlP.pB.x,ctrlP.pB.y, point[i - 1].x, point[i - 1].y);
                }
            }
        }
        // console.log(point)
        ctx.stroke()
        // ctx.draw()
    },
    /*
    * ctx canvas元素
    * x strokeRect x坐标
    * y strokeRect y坐标
    * barW  strokeRect 宽度
    * H strokeRect 高度
    * style矩形样式
    */
    unitBar: function (ctx, x, y, barW, H, style) {
        ctx.setStrokeStyle('#ff2424')
        // ctx.strokeRect(x - 1, y, barW, H)
    },
    /*
    * option 合并后的参数
    * index series数组的指数
    */
    bar: function (option, index) {
        let that = this
        let ctx = option.ctx
        let series = option.series[index]
        let data = series.data
        let dataMax = option.maxData
        let w = option.grid.width
        let h = option.grid.height
        // 默认设置为52
        let barW = (w - option.grid.left - option.grid.right) / 52
        let stepHeight = dataMax / h

        barW = barW - 1
        // 当用户设置bar的宽度时取用户定义的数值
        // console.log(series.lineStyle.width)
        if (series.lineStyle.width != undefined) {
            barW = series.lineStyle.width
        }
        let point = []
        // console.log("barW is" + " " + barW)
        if (option.dataZoom[0].start) {
            var dataStartIndex = data.length * option.dataZoom[0].start - 1
        } else {
            var dataStartIndex = 0
        }
        if (option.dataZoom[0].end) {
            var dataEndIndex = data.length * option.dataZoom[0].end - 1
        }
        this._dataBarTogrid(data, option, dataStartIndex, dataEndIndex, barW, series)
    },
    /*
    * 绘制单个Bar
    * ctx canvas
    * x bar/实际为line 的x轴坐标
    * y line的y轴坐标
    * h canvas的高度，即line绘制的终点
    */
    drawBar (ctx, x, y, h, barW, series, index) {
        // console.log(series)
        ctx.beginPath()
        ctx.setLineWidth(barW)
        if (typeof series.lineStyle.color === 'function') {
            // console.log(series.lineStyle.color)
            let color = series.lineStyle.color({data: index,dataIndex: index})
            ctx.setStrokeStyle(color)
        } else {
            ctx.setStrokeStyle(series.lineStyle.color)
        }
        ctx.moveTo(x, h)
        ctx.lineTo(x, y)
        ctx.setStrokeStyle(series.lineStyle.color)
        ctx.stroke()
    },
    /*
    * bar数据转换成坐标点数据 并绘制单个直方图
    */
    _dataBarTogrid (data, option, dataStartIndex, dataEndIndex, barW, series) {
        let stroageBarData = data.slice(0)
        let gridData = []
        let height = option.grid.height
        let width = option.grid.width
        let dataMax = option.maxData
        let dataMin = option.minData
        var unitgrid =  height/(dataMax - dataMin)
        let unityAxios = height/ dataMax
        var stepIndex = option.grid.length
        var stepDataLength = option.grid.length
        // console.log("stepIndex is:" + stepIndex)
        var xAxisDatalength = option.grid.length
        // console.log("common.js line 156"+ data.length)
        if (option.dataZoom[0].start === 0){
            // console.log(data.length)
            for (var i = 0; i < data.length; i++) {
                var xAxisGrid = (i / xAxisDatalength) * width
                this.drawBar(option.ctx, xAxisGrid, (dataMax - data[i])  * unitgrid, height, barW, series, i);
            }
        } else {
            for (var i = data.length; i > data.length - stepDataLength; i--) {
                stepIndex--
                var xAxisGrid = (stepIndex / xAxisDatalength) * width

                // console.log(xAxisGrid)
                this.drawBar(option.ctx, xAxisGrid + 1, (dataMax - data[i - 1])  * unitgrid, height, barW, series, i - 1)
            }
        }
    },
    /*
    * 贝塞尔曲线数据转换成坐标点数据
    */
    _dataTogrid (data, option, dataStartIndex, dataEndIndex) {
        var stroageData = data.slice(0)
        var gridData = []
        var height = option.grid.height
        var width = option.grid.width
        var dataMax = option.maxData
        var dataMin = option.minData
        var unitgrid =  height/(dataMax - dataMin)
        var step = 52
        var stepIndex = 52

        // console.log(data)
        if (option.dataZoom[0].start === 0){
            for(var i = 0; i < data.length; i++) {
                var xAxisGrid = (i / option.grid.length ) * width
                gridData.push({
                    x: xAxisGrid,
                    y: (dataMax - data[i])  * unitgrid
                })
            }
        } else {
            for (var i = data.length; i > 0; i--) {
                stepIndex--
                var xAxisGrid = (stepIndex / 52) * width
                gridData.push({
                    x: xAxisGrid,
                    y:(dataMax - data[i - 1])  * unitgrid
                })
            }
        }
        return gridData
    },
    /*
    *根据已知点获取第i个控制点的坐标
    *param ps   {x:'',y:''}已知曲线将经过的坐标点
    *param i    第i个坐标点
    *param a,b  可以自定义的正数
    */
    _getCtrlPoint: function(ps, i, a, b){
        if(!a||!b){
            a=0.25;
            b=0.25;
        }
        //处理两种极端情形
        // console.log(i)
        if(i>ps.length-2){
            var last = ps.length - 1
            var pAx = ps[last].x + (ps[last - 1].x-ps[last].x)*a;
            var pAy = ps[last].y + (ps[last - 1].y-ps[last].y)*a;
        }else{
            var pAx = ps[i].x + (ps[i - 1].x - ps[i + 1].x)*a;
            var pAy = ps[i].y + (ps[i - 1].y - ps[i + 1].y)*a;
        }
        if(i < 3){
            var pBx = ps[0].x - (ps[0].x-ps[1].x)*b;
            var pBy = ps[0].y - (ps[0].y-ps[1].y)*b;
        }else{
            var pBx = ps[i - 1].x - (ps[i - 2].x-ps[i].x)*b;
            var pBy = ps[i - 1].y - (ps[i - 2].y-ps[i].y)*b;
        }
        return {
            pA:{x:pAx,y:pAy},
            pB:{x:pBx,y:pBy}
        }
    },
    candleBak: function (ctx, cx, cy, option) {
        var color = option.down ? '#1EBB54' : '#0d6811';
        var w = option.width;
        var h = option.height;
        //画影线
        ctx.setFillStyle(color);
        ctx.fillRect(cx + w/2 - 1, cy - h/2, 2, 2*h);
        //画实体
        if(option.down){
            ctx.setFillStyle(color);
            ctx.fillRect(cx, cy, w, h);
        }else{
            ctx.setLineWidth(2);
            ctx.setStrokeStyle(color);
            ctx.strokeRect(cx, cy, w, h);
            ctx.setFillStyle('white');
            ctx.fillRect(cx, cy, w, h);
        }
    },
    candlea: function (ctx, cx, w, h, l, s, c, isUp, max, min, areaH) {
        var color = isUp ? '#ff2424': '#0d6811';
        var ds = 1;

        //真实坐标计算
        h = areaH - (areaH * Math.abs(h - min) / (max - min));
        l = areaH - (areaH * Math.abs(l - min) / (max - min));
        s = areaH - (areaH * Math.abs(s - min) / (max - min));
        c = areaH - (areaH * Math.abs(c - min) / (max - min));

        //画影线 
        var lineH = Math.abs(h - l);
        ctx.setFillStyle(color);
        //影线用直角坐标画的？
        ctx.fillRect(cx + w/2 + ds - 1 + (isUp ? 0.5 : 0), lineH == 0 ? h + 1 : h, 1, lineH || 1);

        //画实体
        var barH = Math.abs(c - s);
        if(isUp){
            if(barH == 0){
                ctx.setFillStyle(color);
                ctx.fillRect(cx + ds, c + 1, w - ds, 1);
            }else{
                ctx.setLineWidth(1);
                ctx.setStrokeStyle(color);
                ctx.strokeRect(cx + ds + 1, c + 1, w - ds - 1, barH - 1);
                ctx.setFillStyle('#ffffff');
                ctx.fillRect(cx + ds + 1, c + 1, w - ds - 1, barH - 1);
            }
        }else{
            ctx.setFillStyle(color);
            ctx.fillRect(cx + ds, barH == 0 ? s + 1 : s, w - ds, barH || 1);
        }
    },
    /*
    *绘制蜡炬图组
    *param option  合并后的参数
    *param index    series数据的index
    */
    candle: function (option, index) {
        let that = this
        let ctx = option.ctx
        let series = option.series[index]
        let data = series.data
        let dataMax = Math.max.apply(null, data)
        let w = option.grid.width
        let h = option.grid.height
        let unitW = (w - option.grid.left - option.grid.right) / 52
        let stepHeight = dataMax / h
        unitW = unitW - 1
        let point = []
        if (option.dataZoom[0].start) {
            var dataStartIndex = data.length * option.dataZoom[0].start - 1
        } else {
            var dataStartIndex = 0
        }
        if (option.dataZoom[0].end) {
            var dataEndIndex = data.length * option.dataZoom[0].end - 1
        }
        this._dataCandleTogrid(data,option, dataStartIndex, dataEndIndex) 
        /* console.log(point)
        point.forEach(function (item, index) {
            // that.candlestick(ctx, item.x, item.barW, item.h, item.o, item.c)
        }) */
    },
    /*
    *根据坐标点绘制单个蜡炬图
    *param ctx   canvas对象
    *param x   影线x坐标
    *param barW  实体宽度
    *param o/c/l/h 开盘/收盘/最低/最高、、、 y轴坐标
    */
    candlestick: function (ctx, x, barW, o, c, l, h) {
        var context = ctx
        let isUp = (c - o) <= 0 ? true : false
        let color = isUp ? '#ff2424': '#009800'
        let yTop = isUp ? c : o
        /*console.log(isUp)
        console.log(c)
        console.log(o)*/
        // console.log(isUp)
        // 画影线
        // ctx.setStrokeStyle(color)
        ctx.beginPath()
        ctx.setFillStyle(color)
        ctx.setStrokeStyle(color)
        ctx.setLineWidth(1)
        ctx.moveTo(x, h)
        ctx.lineTo(x, c)
        ctx.moveTo(x, o)
        ctx.lineTo(x, l)
        ctx.stroke()
        // 画实体
        if (isUp > 0) {
            // ctx.setStrokeStyle('red')
            ctx.setStrokeStyle(color)
            ctx.setLineWidth(1)
            if (Math.abs(o - c) > 1) {
                ctx.setFillStyle('#ffffff')
            }
            ctx.strokeRect(x - barW / 2, yTop, barW, Math.abs(o - c))
            // ctx.fillRect(x - barW / 2 + 1,yTop + 1,barW - 2, Math.abs(o - c) - 2)
            // ctx.fill()
            // ctx.fillRect()
        } else {
            ctx.setFillStyle(color)
            ctx.setLineWidth(0)
            ctx.setStrokeStyle(color)
            // ctx.strokeRect(x - barW / 2, yTop, barW, Math.abs(o - c))
            ctx.fillRect(x - barW / 2,yTop,barW, Math.abs(o - c))
        }
    },
    _dataCandleTogrid: function (data, option, start, end, callback) {
        // console.log(data)
        let that = this
        let stroageBarData = data.slice(0)
        let gridData = []
        let height = option.grid.height
        let width = option.grid.width
        //console.log(width)
        let totalData = [].concat.apply([],stroageBarData)
        //console.log(new Date())
        let dataMax = Math.max.apply(null,[].concat.apply([],stroageBarData.slice(-52)))
        //console.log(new Date())
        //console.log(dataMax)
        let dataMin = Math.min.apply(null,[].concat.apply([],stroageBarData.slice(-52)))
        var unitgrid =  height/(dataMax - dataMin)
        let unityAxios = height/ dataMax
        var stepIndex = 52
        for (var i = data.length; i > data.length - 52; i--) {
            let tempdata = data[i - 1]
            /*let dataMax = data[i - 1][0]
            if (tempdata[0] > dataMax) {
                dataMax = tempdata[0]
            }*/
            // let dataMin = Math.min.apply(null,totalData.slice(-52 * (parseInt(i / 52) + 1))
            stepIndex--
            // console.log((stepIndex / 52)* width - 1 + (stepIndex + 1 / 52)* width - 1) 
            var xAxisGrid = (((2 * stepIndex + 1) *width / 52)) / 2
            // console.log((((2 * stepIndex + 1) *width / 52) -2) / 2)
            let o = (dataMax - tempdata[0])  * unitgrid
            let c = (dataMax - tempdata[1])  * unitgrid
            let l = (dataMax - tempdata[2])  * unitgrid
            let h = (dataMax - tempdata[3])  * unitgrid
            // console.log(h,l,o,c)
            /* gridData.push({
                x: xAxisGrid,
                barW: (1 / 52) * width - 1,
                h:(dataMax - tempdata[0])  * unitgrid,
                l:(dataMax - tempdata[1])  * unitgrid,
                o:(dataMax - tempdata[2])  * unitgrid,
                c:(dataMax - tempdata[3])  * unitgrid
            }) */
            that.candlestick(option.ctx, xAxisGrid, width / 52 - 2, o, c, l, h)
            // return
        }
        // that.candlestick(option.ctx, 100, width / 52, 190, 100, 200, 82)
        //that.candlestick(option.ctx, xAxisGrid[20], h, l, o, c)
        // console.log(gridData)
        return gridData
    },
    _maxValueOfArr: function (arr) {
        let newArray = arr.join(",").split(",")
        return Math.max.apply({}, newArray)
    },
    _minValueOfArr: function (arr) {
        let newArray = arr.join(",").split(",")
        return Math.min.apply({}, newArray)
    },
    getCurrentIndexData: function(data, options) {
        var x = data.x
        var y = data.y
        var lastDataIndex = x / ((options.grid.width - options.grid.left - options.grid.right)  / 52)
        return Math.round(lastDataIndex)
    }
};