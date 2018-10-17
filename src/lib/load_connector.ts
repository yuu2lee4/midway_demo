import * as fs from 'fs';
import * as path from 'path';

const SYMBOL_CONNECTOR_CLASS = Symbol('Application#connectorClass');

const getJsByEnv = (filename, env) => {
  if (env !== 'local') {
    return `${filename}.js`;
  } else {
    return `${filename}.ts`;
  }
};
export default (app) => {
  const basePath = path.join(app.baseDir, 'app/graphql');
  const types = fs.readdirSync(basePath);

  Object.defineProperty(app, 'connectorClass', {
    get() {
      if (!this[SYMBOL_CONNECTOR_CLASS]) {
        const classes = new Map();

        types.forEach((type) => {

          const connectorFile = path.join(basePath, type, getJsByEnv('connector', app.config.env));
          /* istanbul ignore else */
          if (fs.existsSync(connectorFile)) {
            const connector = require(connectorFile).default;
            classes.set(type, connector);
          }
        });

        this[SYMBOL_CONNECTOR_CLASS] = classes;
      }
      return this[SYMBOL_CONNECTOR_CLASS];
    },
  });
};
