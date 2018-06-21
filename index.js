import routes from './server/routes/api';
import { serverFunctions } from './server/functions';

export default function (kibana) {
  return new kibana.Plugin({
    require: ['canvas'],
    name: 'canvas-xpack',
    uiExports: {
      hacks: [
        // register functions and the like things with canvas
        'plugins/canvas-xpack/lib/load_plugin.js',
      ],
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },

    init(server) {
      routes(server);
      serverFunctions.forEach(fn => server.plugins.canvas.addFunction(fn));
    }
  });
}
 