export = (appInfo: any) => {
  const config: any = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1539485726231_9348';

  // add your config here
  config.middleware = [
  ];
  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '12345678',
      database: 'gannan',
    },
  };
  config.graphql = {
    router: '/graphql',
  };

  return config;
};
