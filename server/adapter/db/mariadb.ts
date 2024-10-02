import mariadb, { Pool, PoolConfig } from "mariadb";
import Logger from "../../util/Logger";
require("dotenv").config();

const logger = new Logger("MariaDbAdapter");

const dbConnOpts: PoolConfig = {
  host: process.env.SQL_HOST || "localhost",
  user: process.env.SQL_USERNAME,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  connectionLimit: 10,
};

const pool: Pool = mariadb.createPool(dbConnOpts);

pool
  .getConnection()
  .then((conn) => {
    logger.info("MariaDb connected!\tConnection id is " + conn.threadId);
    // conn.release(); //release to pool
  })
  .catch((err) => {
    logger.info("MariaDb not connected\tdue to error: " + err);
    return undefined;
  });

export { pool };
