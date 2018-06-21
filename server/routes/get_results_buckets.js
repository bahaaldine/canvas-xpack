import axios from 'axios';
import ml from './ml'
import Promise from 'bluebird';

export function get_results_buckets(server) {
  
    server.route({
    path: '/canvas-xpack/ml',
    method: 'POST',
    handler: function (req, reply) {
        
        const username = req.payload.username;
        const password = req.payload.password;
        const bucketUrl = req.payload.bucketUrl;

        axios.request({
            method: 'get',
            url: bucketUrl,
            auth: {
                username: username,
                password: password
            },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            reply(res.data);
        })
        .catch(err => {
            reply ({
                type: 'datatable',
                columns: ['error'],
                rows: [{ error: err }],
            })
        })
    }
  });

  return server;
}