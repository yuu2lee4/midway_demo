import * as path from 'path';
// had enabled by midway
// export = {
//   static: true,
// };
export = {
    /* mysql: {
        enable: true,
        package: 'egg-mysql',
    }, */
    graphql: {
        enable: true,
        path: path.join(__dirname, '../lib/plugin/egg-graphql'),
    },
};
