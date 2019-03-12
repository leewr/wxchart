// grid 网格
module.exports = function grid () {
    return {
        init: function (ctx, options) {
            let grid = options.grid[0]
            this._drawBg(ctx, options)
            grid.show && this._draw(ctx, options)
        },
        _draw: function (ctx, options) {
            ctx.beginPath()
            ctx.setLineWidth(options.grid[0].borderWidth)
            ctx.setStrokeStyle(options.grid[0].borderColor)
            this._drawX(ctx, options)
            this._drawY(ctx, options)
            ctx.stroke()
        },
        _drawBg: function(ctx, options) {
            console.log(typeof options.grid[0].backgroundColor)
            if (typeof options.grid[0].backgroundColor === 'object') {
                console.log('111')
                const color = options.grid[0].backgroundColor
                const colorStops = color.colorStops
                const grd = ctx.createLinearGradient(0, 0, 200, 200)
                if (colorStops.length > 0) {
                    colorStops.forEach(item => {
                        grd.addColorStop(item.offset, item.color)
                    })
                    // grd.addColorStop(0, 'red')
                    // grd.addColorStop(0.16, 'orange')
                    // grd.addColorStop(0.33, 'yellow')
                    // grd.addColorStop(0.5, 'green')
                    // grd.addColorStop(0.66, 'cyan')
                    // grd.addColorStop(0.83, 'blue')
                    // grd.addColorStop(1, 'purple')
                    ctx.setFillStyle(grd)
                    ctx.fillRect(0, 0, 150, 150)
                }
            }
        },
        /**
         * [_drawX description]
         * @param  {[type]} ctx     [description]
         * @param  {[type]} options [description]
         * @return {[type]}         [description]
         */
        _drawX: function (ctx, options) {
            ctx.setLineWidth(1)
            let grid = options.grid[0]
            let average = Math.floor((grid.height - grid.top - grid.bottom) / grid.col)
            grid.left = options.yAxis[0].show ? grid.left : 0
            console.log('grid.left', grid.left)
            let x = {
                x: grid.left,
                y: grid.top
            }
            let x2 = {
                x: grid.width -grid.right,
                y: grid.top
            }
            for (let i = 0; i < grid.col - 1; i++) {
                x.y = x.y + average
                x2.y = x2.y + average
                ctx.moveTo(x.x, x.y)
                ctx.lineTo(x2.x, x2.y)
            }
        },
        /**
         * [_drawY description]
         * @param  {[type]} ctx     [description]
         * @param  {[type]} options [description]
         * @return {[type]}         [description]
         */
        _drawY: function (ctx, options) {
            let grid =options.grid[0]
            let average = Math.floor((grid.width - grid.left - grid.right) / grid.row)
            let a = {
                x: grid.left,
                y1: grid.top,
                y2: grid.height - grid.bottom
            }
            for (let i = 0; i < grid.row - 1; i++) {
                a.x += average
                ctx.moveTo(a.x, a.y1)
                ctx.lineTo(a.x, a.y2)
            }
        }
    }
}