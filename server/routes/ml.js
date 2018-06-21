import { each } from 'lodash'

const addArgs = (api, args) => {
  let url = api;

  each(args, (value, key) => {
    if ( typeof value != "undefined" ) {
      url += '&' + key + '=' + value;  
    }
  });

  return url;
};

export default {
  host: 'http://localhost:9200',
  root: '/_xpack/ml', 
  auth: {
    username: 'elastic',
    password: 'bahaaldine',
  },
  anomaly_detectors: '/anomaly_detectors',
  results: {
    buckets: '/results/buckets',
    categories: '/results/categories',
    influencers: '/results/influencers',
    records: '/results/records',
  },
  addArgs
}