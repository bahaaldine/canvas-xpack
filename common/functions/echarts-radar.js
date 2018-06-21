import { sortBy, each, uniqBy, flattenDeep } from 'lodash';

export const radar = () => ({
  name: 'radar',
  type: 'render',
  context: {
    types: [
      'datatable',
    ],
  },
  help: 'http://echarts.baidu.com/demo.html#radar',
  args: {},
  fn(context, args) {

    let indicator = [];
    context.rows.map( (row, i) => {
      indicator.push( row.causes.map( (cause, j) => { 
        return { name: cause.by_field_value, max: 5000 } ;
      }) );
    });
    indicator = _.uniqBy(_.flattenDeep(indicator), "name");
    indicator = [
      {
        name: "404",
        max: 3200
      },
      {
        name: "302",
        max: 3200
      },
      {
        name: "304",
        max: 3200
      },
      {
        name: "200",
        max: 3200
      },
      {
        name: "500",
        max: 3200
      }
    ];

    let series = {};
    context.rows.map( (row, i) => {

      if ( typeof series[row.over_field_value] == 'undefined' ) {
        series[row.over_field_value] = { name: row.over_field_value };
        each(indicator, (value, key) => {
          series[row.over_field_value][value.name] = 0; 
        });
      
        if ( typeof series[row.over_field_value].record_score == 'undefined' ) {
          series[row.over_field_value].record_score = row.record_score;
        } else {
          if ( row.record_score > series[row.over_field_value].record_score ) {
            series[row.over_field_value].record_score = row.record_score;
          }
        }
      }

      if ( typeof row.causes[0] != 'undefined' ) {
        if ( typeof row.causes[0].actual[0] != 'undefined' )
          series[row.over_field_value][row.causes[0].by_field_value] = row.causes[0].actual[0];
      } 
    });

    series = sortBy(series, ['record_score'], false);
    if ( series.length > 10 )
      series = series.slice(Math.max(series.length - 10, 1));
    let legend = ['Typical'];
    legend = legend.concat(series.map(a => a.name));
    console.log(legend)

    let typical = { };
    context.rows.map( (row, i) => {

      if ( typeof typical == 'undefined' ) { 
        each(indicator, (value, key) => {
          typical[value.name] = 0; 
        });
      }

      if ( typeof row.causes[0] != 'undefined' ) {
        if ( typeof row.causes[0].typical[0] != 'undefined' )
        typical[row.causes[0].by_field_value] = row.causes[0].typical[0];
      } 
       
    });

    let dump = [{
      name: 'Typical',
      value: indicator.map( (indic) => {
        return typical[indic.name];
      })
    }];
    each(series, (value, key) => {
      dump.push({
        name: value.name,
        value: indicator.map( (indic) => {
          return value[indic.name];
        })
      })
    });
    
    series = dump;

    return {
      type: 'render',
      as: 'radar',
      value: {
        options: {},
        data: {
          indicator: indicator,
          legend: legend,
          series: series
        },
      },
    };
  },
});