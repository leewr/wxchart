// grid 网格
export default {
    init: function (ctx, options) {
        console.log('options', options)
        let grid = options.grid[0]
        this._preCalc(ctx, options)
        this._drawBg(ctx, options)
        grid.show && this._draw(ctx, options)
    },
    _preCalc: function(ctx, options) {
        // 内部值x\y坐标值
        const grid = options.grid[0]
        const margin = options.margin
        grid.x = grid.left + margin[3]
        grid.y = grid.top + margin[0]
        grid.x2 = grid.width - grid.right - margin[1]
        grid.y2 = grid.height - grid.bottom - margin[2]
    },
    _draw: function (ctx, options) {
        ctx.beginPath()
        ctx.lineWidth = options.grid[0].borderWidth
        ctx.setStrokeStyle(options.grid[0].borderColor)
        this._drawX(ctx, options)
        this._drawY(ctx, options)
        ctx.stroke()
    },
    _drawBg: function(ctx, options) {
        console.log(typeof options.grid[0].backgroundColor)
        if (typeof options.grid[0].backgroundColor === 'object') {
            const grid = options.grid[0]
            const color = options.grid[0].backgroundColor
            const colorStops = color.colorStops
            // 背景渐变有一个默认值
            const grd = ctx.createLinearGradient(grid.x, grid.y, grid.x2 - grid.x, grid.y2 - grid.y)
            if (colorStops.length > 0) {
                colorStops.forEach(item => {
                    grd.addColorStop(item.offset, item.color)
                })
                ctx.setFillStyle(grd)
                ctx.fillRect(grid.x, grid.y, grid.x2 -grid.x - 1, grid.y2 - grid.y -1)
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
        ctx.lineWidth = 1
        let grid = options.grid[0]
        let margin = options.margin
        let average = Math.floor((grid.y2 - grid.y) / grid.col)
        let x = {
            x: grid.left,
            y: grid.top
        }
        let x2 = {
            x: grid.width -grid.right,
            y: grid.top + margin[0]
        }
        console.log(grid.top, margin[0], margin[0] + grid.top)
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