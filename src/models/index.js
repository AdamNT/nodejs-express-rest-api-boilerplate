import debug from 'debug';
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import 'dotenv/config';

const log = debug('db:log');
const errorLog = debug('db:error');
const { DB_DATABASE, DB_USER, DB_PASSWORD } = process.env;
const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: 'db',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const db = {};
const currentFileBasename = path.basename(module.filename);

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 &&
      file !== currentFileBasename &&
      file.slice(-3) === '.js'
  )
  .map(async (file) => {
    const model = await import(path.join(__dirname, file));
    const { name } = model.default;

    db[name] = model.default(sequelize, Sequelize);
  });

sequelize
  .authenticate()
  .then(() => {
    log('Connection has been established successfully.');
  })
  .catch((err) => {
    errorLog('Unable to connect to the database:', err);
  });

db.Sequelize = Sequelize;
db.sequelize = sequelize;

export { sequelize };
export default db;
