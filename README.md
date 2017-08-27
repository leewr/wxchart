# wxchart 
k线图、直方图、曲线图、保持了和echart的类似的参数配置

### 使用方法
	1、引入wxchart
		const wxChart = require('wxChart')
	2、实例化初始对象
		consot chart =wxChart.init()
	3、通过setOption方法生成图表
		chart.setOption(options)
### options 参数配置
	options = {
		grid:{
			show: false, //是否显示直接坐标系网格
			showX: ture, //显示横轴网格线
			showY：true, //显示数轴网格线
			width: 'auto' //?
			height: '110' //组件的高度
			left: 0,
			top: 0,
			right: 0,
			bottom: 0,
			backgroundColor: 'transparent',
			borderColor: '#cccccc',
			showLable: true, //暂时好像没有用可以去掉
			length: 52 //默认数据长度
		},
		dataZoom:[{
			start: 0,
			end: 1
		}],
		xAxis: [
			{
				show: true,
				length: 52
			}
		],
		yAxis: [
			{
				max: '',
				min: '',
				show: true
			}
		],
		series: [
			{
				name: '',
				type: 'bar',
				show: true, //是否显示该图表数据
				data: [],//一维数组数据
				lineStyle: {
					color: '',
					width: 1,
					type: 'solid'
				}
			},
			{
				name: '',
				type: 'line', 
				show: true,
				data: [], //一维数组[]
				lineStyle: {
					color: '',
					width: 1,
					type: 'solid'
				}
			},
			{
                show: true,
                type: 'candlestick',
                name: '',
                data: '', //data 多维数组[[开盘、收盘、最低、最高]]
                itemStyle: {
                    color: '#c23531 ',
                    color0: '#314656 ',
                    borderColor: '#c23531',
                    borderColor0: '#314656',
                    borderWidth: 1,
                    type: 'solid'
                }
            }
		]
	}
### 效果预览
#### k线图
![](https://github.com/leewr/wxchart/raw/image/kline.png)