import echarts from 'echarts';

function isBetween(start, limit) {
    return function(element, index, array) {
        return (element[1] > start) && ( element[1] <= limit );
    }
}

export const  calendarScatter = () => ({
  name: 'calendarScatter',
  displayName: 'Calendar Scatter',
  help: 'A Calendar representing anomalies over time',
  render(domNode, config, handlers) {
    const { options, data } = config;

    /*const items = data
    .filter(row => Boolean(row.content) && Boolean(row.start))
    .map(row => ({
      ...row,
      start: row.start && new Date(row.start),
      end: row.end && new Date(row.end),
    }));*/

    console.log(data);

    const calendarOption = {
        tooltip : {
            trigger: 'item'
        },
        legend: {
            data:['Warning',  'Critical'],
        },
        calendar: [{
            left: 'center',
            range: [data[0][0], data[data.length-1][0]],
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#777',
                    width: 4,
                    type: 'solid'
                }
            },
            itemStyle: {
                normal: {
                    color: '#323c48',
                    borderColor: '#999'
                }
            }
        }],
        series : [
            {
                name: 'Warning',
                type: 'effectScatter',
                coordinateSystem: 'calendar',
                data: data.filter(isBetween(50,80)),
                symbolSize: 10, 
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                itemStyle: {
                    normal: {
                        color: '#FFA500',
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                zlevel: 1
            },
            {
                name: 'Critical',
                type: 'effectScatter',
                coordinateSystem: 'calendar',
                data: data.filter(isBetween(80,100)),
                symbolSize: 15,
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                itemStyle: {
                    normal: {
                        color: '#ff0000',
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                zlevel: 2
            }
        ]
    };
    
    // create the vis timeline
    const scatterCalendar = echarts.init(domNode);
    scatterCalendar.setOption(calendarOption);

    // clean up the timeline when the element is destroyed
    handlers.onDestroy(() => scatterCalendar.dispose());

    // tell the system the timeline is ready
    handlers.done();
  },
});