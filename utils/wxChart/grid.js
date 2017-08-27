// 坐标轴
module.exports = function () {
    return {
        init: function (ctx, options) {
            var that = this;
            var grid = this.grid = options.grid
            var xAxis = this.xAxis = options.xAxis[0]
            var yAxis = this.yAxis = options.yAxis[0]
            var w = grid.width;
            var h = grid.height;
            if(w === 'auto' || w === '100%') {
                wx.getSystemInfo({
                    success: function (result) {
                        if (options.margin) {
                            w = w = that.canvasWidth = result.windowWidth - options.margin[1] - options.margin[3]
                        } else {
                            w = that.canvasWidth = result.windowWidth;
                        }
                    }
                });
            }
            console.log("canvasWidth is " + w)
            if(h === 'auto'){
                h = 225;
            }
            this.metaUnit = options.metaUnit;
            this.initConfig(options.grid);
            console.log('h is' + h)
            xAxis.show && this.drawX(ctx, w, h, options);
            yAxis.show && this.drawY(ctx, w, h, options);
            // ctx.draw()
            return this;
        },
        initConfig: function (options) {
            // console.log(options.col)
            this.col = options.col;
            this.row = options.row;
            this.showEdg = options.showEdg;
            this.showX = options.showX;
            this.showY = options.showY;
            this.yMax = options.yMax;
            this.yMin = options.yMin;
            this.paddingTop = options.paddingTop;
            this.paddingBottom = options.paddingBottom;
            this.paddingLeft = options.paddingLeft;
            this.paddingRight = options.paddingRight;
            this.color = options.color;
        },
        drawY: function (ctx, w, h, options) {
            var col = options.grid.col;
            var xLen = options.series[0].data.length;
            var type = options.series[0].type;
            var times;
            var startX = options.grid.left;
            var endX = w - options.grid.right;
            var startY = options.grid.top;
            var endY = h - options.grid.bottom;
            ctx.setFontSize(this.fontSize);
            if(this.xAxis.show){
                //todo
                this.onePixelLineTo(ctx, startX, startY, startX, endY, false);
                var step = (w - this.grid.left - this.grid.right) / col;
                for (var i = 1; i < (col + 1); i++) {
                    var x = startX + step * i;
                    this.onePixelLineTo(ctx, x, startY - 1, x, endY - 1, false);
                }
                // console.log(startY)
                this.onePixelLineTo(ctx, endX, startY - 1, endX, endY -1, false);
            }
            if(options.times){
                times = options.times;
                ctx.setFillStyle(this.txtColor);
                ctx.fillText(times[0], startX + 4, endY + this.paddingBottom - 2);
                ctx.fillText(times[1], endX - (times[1].length > 8 ? 90 : 56), endY + this.paddingBottom - 2);
            }
            // ctx.draw()
        },
        drawX: function (ctx, w, h, options, xais) {
            // ctx.clearRect(0, 0, yOpt.width, yOpt.height)
            var grid = this.grid
            var row = grid.row;
            var startX = grid.left;
            var endX = w - grid.right;
            var startY = grid.top;
            var endY = h - grid.bottom;
            var step = (h - grid.top - grid.bottom) / row;
            var showLabel = options.showLabel || true;
            var max = this.yMax;
            var min = this.yMin;
            var labelStep = (max - min) / row;
            var middleIndex = row / 2;
            var textDataUnit = (options.maxData - options.minData) / row
            drawYLine.call(this);
            this.drawYUnit = drawYUnit;
                      
            function drawYLine() {
                this.showEdg && this.onePixelLineTo(ctx, startX, startY, endX, startY, true);
                this.drawText(options, options.maxData, 4, 12)
                for(var i = 1; i < row; i++){
                    var y = startY + step * i;
                    this.onePixelLineTo(ctx, startX, y, endX, y, true);
                    this.drawText(options, options.maxData - textDataUnit * i, 4, y + 3)
                }
                this.showEdg && this.onePixelLineTo(ctx, startX, endY - 1, endX, endY - 1, true);
                this.drawText(options, options.minData, 4, endY - 6)
            }
            function drawYUnit() {
                ctx.setFillStyle(this.txtColor);
                showLabel && ctx.fillText(max.toFixed(2), startX + 3, startY + 12);
                for(var i = 1; i < row; i++){
                    var y = startY + step * i;
                    if(showLabel){
                        var label = (max - labelStep * i).toFixed(2);
                        if(i < middleIndex){
                            ctx.fillText(label, startX + 3, y + 10);
                        }
                        if(i === middleIndex){
                            ctx.fillText(label, startX + 3, y + 4);
                        }
                        if(i > middleIndex){
                            ctx.fillText(label, startX + 3, y - 4);
                        }
                    }
                }
                showLabel && ctx.fillText((max - labelStep * i).toFixed(2), startX + 3, startY + step * i - 4);
            }       
        },
        onePixelLineTo: function (ctx, fromX, fromY, toX, toY, vertical) {
            var backgroundColor = '#ffffff';
            var currentStrokeStyle = '#e8e8e8';
            ctx.beginPath();
            ctx.moveTo(fromX, fromY);
            ctx.lineTo(toX, toY);
            ctx.closePath();
            ctx.setLineWidth(1);
            ctx.setStrokeStyle(backgroundColor);
            ctx.stroke();
            ctx.beginPath();
            if(vertical) {
                ctx.moveTo(fromX, fromY);
                ctx.lineTo(toX + 1, toY);
            } else {
                ctx.moveTo(fromX, fromY + 1);
                ctx.lineTo(toX, toY + 1);
            }
            ctx.closePath();
            ctx.setLineWidth(1);
            ctx.setStrokeStyle(currentStrokeStyle);
            ctx.stroke();
        },
        /*
        * ctx
        * x 軸坐標
        * y 軸坐標
        */
        drawHigtLight: function (options, x, y) {
            // console.log('drawHigtLight')
            let ctx = options.ctx
            let h = options.grid.height
            let w = options.grid.width
            // console.log(ctx)
            // console.log(x)
            // console.log(y)
            ctx.beginPath()
            ctx.setStrokeStyle('#000000')
            ctx.moveTo(0, y)
            ctx.lineTo(w, y)
            ctx.moveTo(x, 0)
            ctx.lineTo(x, h)
            ctx.stroke()
            ctx.moveTo(x, y)
            ctx.setStrokeStyle('blue')
            ctx.setLineWidth(1)
            ctx.fill()
            ctx.arc(x, y, 4, 0, 2*Math.PI, false)
            ctx.fill()
        },
        /*
        * 绘制y轴分隔文字
        * text 绘制的文字
        * x、y x轴 y轴坐标
        */
        drawText: function (options, text, x, y) {
            /*var fontsize = textoption.fontsize
            var color = textoption.color
            var maxDataText = options.maxData
            var minDataText = options.minData*/
            var ctx = options.ctx
            // console.log('setFillStyle' + text)
            ctx.setFontSize(12)
            ctx.setFillStyle('#000000')
            ctx.fillText(text, x , y)
        }
    };
};