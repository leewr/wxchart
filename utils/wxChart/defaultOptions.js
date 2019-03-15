const color1 = '#1890FF'
const textColor = '#808080'

export default  {
    name: '',
    ctx: '',
    maxData: '',
    minData: '',
    drawed: false,
    margin: [0, 0, 0, 0],
    theme: {
        defaultColor: color1,
        line: {
            color: color1,
            lineWidth: 1
        },
        textStyle: {
            color: textColor,
            family: '"Helvetica Neue", "San Francisco", Helvetica, Tahoma, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", sans-serif',
            size: 12,
            style: 'normal',
            weight: 'normal'
        },
        grid: {
            stroke: color1,
            lineWidth: 2,
            lineDash: [2]
        },
        color: ['#1890FF', '#2FC25B', '#FACC14', '#223273', '#8543E0', '#13C2C2', '#3436C7', '#F04864'],
    },
    title: {
        left: 'center',
        text: '',
        textAlign: 'center',
        textStyle: {
            color: '#FEAA0A',
            fontSize: 16,
        }
    },
    legend: {
        show: true,
        data: [],
        top: 6,
        left: 0,
        right: 0,
        position: 'top',
        align: 'left'
    },
    grid: {
        show: true,
        width: 'auto',
        height: 150,
        row: 4,
        col: 4,
        showX: true,
        showY: true,
        showEdg: true,
        left: 40,
        top: 40,
        right: 40,
        bottom: 20,
        backgroundColor: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 0,
            colorStops: [
                {
                    offset: 0,
                    color: 'transparent'
                },
                {
                    offset: 1,
                    color: 'transparent'
                }
            ]
        },
        borderColor: '#d8d8d8',
        borderWidth: 1,
        showLabel: true,
        length: 52
    },
    dataZoom: 
        {
            start: 0,
            end: 1
        }
    ,
    xAxis:
        {
            show: true,
            length: 52,
            lineStyle: {
                color: '#333'
            },
            axisTick: {
                show: true
            },
            textStyle: {
                color: '#333'
            }
        }
    ,
    yAxis:
        {
            max: '',
            min: '',
            show: true
        }
    ,
    series: {
        name: '',
        type: 'bar',
        data: [],
        show: true,
        lineStyle: {
            color: '#000000',
            width: 1,
            type: 'solid',
            shadowBlur: 'aa'
        },
        smooth: false,
        itemStyle: {
            opacity: 1,
            color: '#333',
            highlight: {
                color: '#000'
            }
        },
        areaStyle: {
            origin: 'auto',
            opacity: 0,
            color: { // 可接受对象或者字符串
                type: 'linear',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [{
                    offset: 0, color: 'red' // 0% 处的颜色
                }, {
                    offset: 1, color: 'blue' // 100% 处的颜色
                }],
            }
        }
    }
}

