/**
 * 
 * @param {*} param0 
 * 默认sqllite数据库
 * module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'sqlite',
        filename: env('DATABASE_FILENAME', '.tmp/data.db'),
      },
      options: {
        useNullAsDefault: true,
      },
    },
  },
});

 */

module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'mysql',
        host: 'localhost',
        port:  3306,
        database: 'strapi',
        username: 'lizw',
        password: 'sj18218222614',
      },
      options: {
        useNullAsDefault: true,
      },
    },
  },
});