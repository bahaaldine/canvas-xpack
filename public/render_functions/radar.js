import echarts from 'echarts';

export default {
  name: 'radar',
  displayName: 'Radar',
  help: 'A Radar representing entity profiling',
  render(domNode, config, handlers) {
    const { options, data } = config;

    const radarOptions = {
        tooltip: {},
        legend: {
            data: data.legend
        },
        radar: {
            name: {
                textStyle: {
                    color: '#fff',
                    backgroundColor: '#999',
                    borderRadius: 3,
                    padding: [3, 5]
               }
            },
            indicator: data.indicator
        },
        series: [{
            type: 'radar',
            data : data.series
        }]
    };

    // create the vis timeline
    const radar = echarts.init(domNode);
    radar.setOption(radarOptions);

    // clean up the timeline when the element is destroyed
    handlers.onDestroy(() => radar.dispose());

    // tell the system the timeline is ready
    handlers.done();
  },
};