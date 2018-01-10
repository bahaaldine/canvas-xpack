
import { functionsRegistry } from 'plugins/canvas/lib/functions_registry';
import { elementsRegistry } from 'plugins/canvas/lib/elements_registry';
import { renderFunctionsRegistry } from 'plugins/canvas/lib/render_functions_registry';
import { viewRegistry } from 'plugins/canvas/expression_types';

import { commonFunctions } from '../../common/functions';
import { renderFunctions } from '../render_functions';
import { clientFunctions } from '../../public/functions';

commonFunctions.forEach(fnDef => functionsRegistry.register(fnDef));
renderFunctions.forEach(fnDef => renderFunctionsRegistry.register(fnDef));
clientFunctions.forEach(fnDef => functionsRegistry.register(fnDef));