
export default  {
  Query: {
    async notCallService(_root, _args, context, _info) {
        return context.ctx.connector.test.notCallService();
    },
    async callService(_root, _args, context, _info) {
      return context.ctx.connector.test.callService();
  },
  },
};
