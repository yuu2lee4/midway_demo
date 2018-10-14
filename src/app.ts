// tslint:disable:no-console
// comment just for gitlab pipline
import { ApolloServer } from 'apollo-server-koa';
import loadConnector from './lib/load_connector';
import loadSchema from './lib/load_schema';

export default async (app) => {
  loadSchema(app);
  loadConnector(app);

  const apolloServerOption: any = {
    schema: app.schema,
    context: async (ctx) => ctx,
    formatResponse: (data) => {
      if (data.errors && data.errors.length) {
        return {
          data: data.data,
          code: 0,
          msg: data.errors[0].message,
          time: Date.now() / 1000,
        };
      } else {
        return {
          data: data.data,
          code: 0,
          time: Date.now() / 1000,
        };
      }

    },
  };
  if (app.config.env === 'test') {
    apolloServerOption.introspection = true;
  }
  const server = new ApolloServer(apolloServerOption);

/*   app.use(async (ctx, next) => {
    await next();
    if (ctx.type === 'application/json') {
      ctx.type = 'application/json;charset=UTF-8';
    }
  }); */

  server.applyMiddleware({
    app,
    cors: false,
    path: app.config.graphql.router,
  });

};
