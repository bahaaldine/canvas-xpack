export const calendarScatter = () => ({
  name: 'calendarScatter',
  type: 'render',
  context: {
    types: [
      'datatable',
    ],
  },
  help: 'http://echarts.baidu.com/demo.html#calendar-effectscatter',
  args: {},
  fn(context, args) {
    return {
      type: 'render',
      as: 'calendarScatter',
      value: {
        options: {},
        data: context.rows.map((row, i) => ([ new Date(row.timestamp).toISOString().substring(0, 10), row.anomaly_score ])),
      },
    };
  },
});