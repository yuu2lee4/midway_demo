import * as fs from 'fs';
import { makeExecutableSchema } from 'graphql-tools';
import * as _ from 'lodash';
import * as path from 'path';

const SYMBOL_SCHEMA = Symbol('Applicaton#schema');

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

  const schemas: string[] = [];
  const resolverMap = {};
  const directiveMap = {};

  types.forEach((type) => {
    // 加载schema
    const schemaFile = path.join(basePath, type, 'schema.graphql');
    /* istanbul ignore else */
    if (fs.existsSync(schemaFile)) {
      const schema = fs.readFileSync(schemaFile, {
        encoding: 'utf8',
      });
      schemas.push(schema);
    }

    // 加载resolver
    const resolverFile = path.join(basePath, type, getJsByEnv('resolver', app.config.env));
    if (fs.existsSync(resolverFile)) {
      const resolver = require(resolverFile).default;
      _.merge(resolverMap, resolver);
    }

    // 加载directive resolver
    const directiveFile = path.join(basePath, type, getJsByEnv('directive', app.config.env));
    if (fs.existsSync(directiveFile)) {
      const directive = require(directiveFile);
      _.merge(directiveMap, directive);
    }
  });

  Object.defineProperty(app, 'schema', {
    get() {
      if (!this[SYMBOL_SCHEMA]) {
        this[SYMBOL_SCHEMA] = makeExecutableSchema({
          typeDefs: schemas,
          resolvers: resolverMap,
          directiveResolvers: directiveMap,
        });
      }
      return this[SYMBOL_SCHEMA];
    },
  });
};
