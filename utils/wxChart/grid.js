// grid 网格
module.exports = function grid () {
    return {
        init: function (ctx, options) {
            let grid = options.grid[0]
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