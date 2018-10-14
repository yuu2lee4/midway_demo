export default  {
    Query: {
      async test(_root, _args, context, _info) {
        return context.ctx.connector.test.test();
      },
    },
  };
