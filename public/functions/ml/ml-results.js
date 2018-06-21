import chrome from 'ui/chrome';
import axios from 'axios';  
import ml from './ml';
import { fetch } from '../../../common/lib/fetch';

export const mlResultsBuckets = () => ({
  name: 'mlResultsBuckets',
  type: 'datatable',
  help: 'Query the X-Pack Machine Learning Resluts Buckets API',
  args: {
    job: {
      types: ['string']
    },
    anomaly_score: {
      types: ['number']
    },
    desc: {
      types: ['boolean']
    },
    end: {
      types: ['string']
    },
    exclude_interim: {
      types: ['boolean']
    },
    expand: {
      types: ['boolean']
    },
    sort: {
      types: ['string']
    },
    start: {
      types: ['string']
    },
    from: {
      types: ['number', null],
      default: 0
    },
    size: {
      types: ['number', null]
    },
  },
  fn(context, args, handlers) {
    // try handlers ^^
    const { job } = args;
    const api = ml.host + ml.root + ml.anomaly_detectors + '/' + job + ml.results.buckets + '?' 
    const { anomaly_score, desc, end, exclude_interim, expand, sort, start, from, size } = args;
    const bucketUrl = ml.addArgs( api, { anomaly_score, desc, end, exclude_interim, expand, sort, start, from, size } );

    const basePath = chrome.getBasePath();
    const apiPath = `${basePath}/canvas-xpack/ml`;
    
    return fetch.post( apiPath , {
      bucketUrl: bucketUrl,
      username: ml.auth.username,
      password: ml.auth.password
    })
    .then((res) => {
      let dataTable = {
        type: 'datatable',
        columns: [{ name: 'no content found' }],
        rows: res.data.buckets,
      };

      if ( res.data.buckets.length > 0 ) {
          dataTable.columns = Object.keys(res.data.buckets[0]).map(col => ({ name: col, type: 'unknown' }));
      }

      return dataTable;

    })
    .catch(err => {
      console.log(err)
      return {
        type: 'datatable',
        columns: ['error'],
        rows: [{ error: err }],
      }
    })
  }
});

export const mlResultsCategories = () => ({
  name: 'mlResultsCategories',
  type: 'datatable',
  help: 'Query the X-Pack Machine Learning Resluts Categories API',
  args: {
    job: {
      types: ['string']
    },
    from: {
      types: ['number', null],
      default: 0
    },
    size: {
      types: ['number', null]
    },
  },
  fn(context, args) {

    const { job } = args;
    const api = ml.host + ml.root + ml.anomaly_detectors + '/' + job + ml.results.categories + '?' 
    const { from, size } = args;
    const bucketUrl = ml.addArgs( api, { from, size } );

    const basePath = chrome.getBasePath();
    const apiPath = `${basePath}/canvas-xpack/ml`;
    
    return fetch.post( apiPath , {
      bucketUrl: bucketUrl,
      username: ml.auth.username,
      password: ml.auth.password
    })
    .then((res) => {
      let dataTable = {
        type: 'datatable',
        columns: [{ name: 'no content' }],
        rows: res.data.categories,
      };

      if ( res.data.categories.length > 0 )
        dataTable.columns = Object.keys(res.data.categories[0]).map(col => ({ name: col, type: 'unknown' }));

      return dataTable;
    })
    .catch(err => {
      return {
        type: 'datatable',
        columns: ['error'],
        rows: [{ error: err }],
      }
    })
  }
});

export const mlResultsInfluencers = () => ({
  name: 'mlResultsInfluencers',
  type: 'datatable',
  help: 'Query the X-Pack Machine Learning Resluts Influencers API',
  args: {
    job: {
      types: ['string']
    },
    influencer_score: {
      types: ['number']
    },
    desc: {
      types: ['boolean']
    },
    end: {
      types: ['string']
    },
    exclude_interim: {
      types: ['boolean']
    },
    sort: {
      types: ['string']
    },
    start: {
      types: ['string']
    },
    from: {
      types: ['number', null],
      default: 0
    },
    size: {
      types: ['number', null]
    },
  },
  fn(context, args) {

    const { job } = args;
    const api = ml.host + ml.root + ml.anomaly_detectors + '/' + job + ml.results.influencers + '?' 
    const { influencer_score, desc, end, exclude_interim, sort, start, from, size } = args;
    const bucketUrl = ml.addArgs( api, { influencer_score, desc, end, exclude_interim, sort, start, from, size } );

    const basePath = chrome.getBasePath();
    const apiPath = `${basePath}/canvas-xpack/ml`;
    
    return fetch.post( apiPath , {
      bucketUrl: bucketUrl,
      username: ml.auth.username,
      password: ml.auth.password
    })
    .then((res) => {
      let dataTable = {
        type: 'datatable',
        columns: [{ name: 'no content found' }],
        rows: res.data.influencers,
      };

      if ( res.data.influencers.length > 0 ) {
        dataTable.columns = Object.keys(res.data.influencers[0]).map(col => ({ name: col, type: 'unknown' }));
      }

      return dataTable;;

    })
    .catch(err => {
      console.log(err)
      return {
        type: 'datatable',
        columns: ['error'],
        rows: [{ error: err }],
      }
    })
  }
});

export const mlResultsRecords = () => ({
  name: 'mlResultsRecords',
  type: 'datatable',
  help: 'Query the X-Pack Machine Learning Resluts Records API',
  args: {
    job: {
      types: ['string']
    },
    record_score: {
      types: ['number']
    },
    desc: {
      types: ['boolean']
    },
    end: {
      types: ['string']
    },
    exclude_interim: {
      types: ['boolean']
    },
    sort: {
      types: ['string']
    },
    start: {
      types: ['string']
    },
    from: {
      types: ['number', null],
      default: 0
    },
    size: {
      types: ['number', null]
    },
  },
  fn(context, args) {

    const { job } = args;
    const api = ml.host + ml.root + ml.anomaly_detectors + '/' + job + ml.results.records + '?' 
    const { record_score, desc, end, exclude_interim, sort, start, from, size } = args;
    const bucketUrl = ml.addArgs( api, { record_score, desc, end, exclude_interim, sort, start, from, size } );

    const basePath = chrome.getBasePath();
    const apiPath = `${basePath}/canvas-xpack/ml`;
    
    return fetch.post( apiPath , {
      bucketUrl: bucketUrl,
      username: ml.auth.username,
      password: ml.auth.password
    })
    .then((res) => {
      let dataTable = {
        type: 'datatable',
        columns: [{ name: 'no content found' }],
        rows: res.data.records,
      };

      if ( res.data.records.length > 0 ) {
        dataTable.columns = Object.keys(res.data.records[0]).map(col => ({ name: col, type: 'unknown' }));
      }

      return dataTable;

    })
    .catch(err => {
      console.log(err)
      return {
        type: 'datatable',
        columns: ['error'],
        rows: [{ error: err }],
      }
    })
  }
});