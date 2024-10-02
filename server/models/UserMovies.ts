// Logger
import Logger from '../util/Logger';
const logger = new Logger('UserMoviesModel', 'debug');

import { pool } from "../adapter/db"; // Assume pool is your MySQL connection pool

export interface UserMoviesDb {
  userId: string;
  filmId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserMoviesRows extends Array<UserMoviesDb> {}

export class UserMoviesModel {
  
  // Get a single userMovie record by userId and filmId
  get(userId: string, filmId: string) {
    const query: string = 'SELECT * FROM userMovies WHERE userId = ? AND filmId = ?';

    return pool.query(query, [userId, filmId])
      .then((rows) => {
        const result: UserMoviesDb = rows[0];
        return Promise.resolve(result);
      })
      .catch(err => {
        logger.error(`get\terror: ${err}`);
        return Promise.reject(err);
      });
  }

  // Get all records for a specific user
  getAll(userId: string) {
    const query: string = 'SELECT * FROM userMovies WHERE userId = ? ORDER BY createdAt DESC';

    return pool.query(query, [userId])
      .then((rows) => {
        const result: UserMoviesRows = rows;
        return Promise.resolve(result);
      })
      .catch(err => {
        logger.error(`getAll\terror: ${err}`);
        return Promise.reject(err);
      });
  }

  // Insert a new userMovie record
  insert(userId: string, filmId: string) {
    const query: string = 'INSERT INTO userMovies (userId, filmId, createdAt, updatedAt) VALUES (?, ?, NOW(), NOW())';

    return pool.query(query, [userId, filmId])
      .then(() => {
        return Promise.resolve(true);
      })
      .catch(err => {
        logger.error(`insert\terror: ${err}`);
        return Promise.reject(err);
      });
  }

  // Update an existing userMovie record
  update(userId: string, filmId: string) {
    const query: string = 'UPDATE userMovies SET updatedAt = NOW() WHERE userId = ? AND filmId = ?';

    return pool.query(query, [userId, filmId])
      .then(() => {
        return Promise.resolve(true);
      })
      .catch(err => {
        logger.error(`update\terror: ${err}`);
        return Promise.reject(err);
      });
  }

  // Delete a userMovie record
  delete(userId: string, filmId: string) {
    const query: string = 'DELETE FROM userMovies WHERE userId = ? AND filmId = ?';

    return pool.query(query, [userId, filmId])
      .then(() => {
        return Promise.resolve(true);
      })
      .catch(err => {
        logger.error(`delete\terror: ${err}`);
        return Promise.reject(err);
      });
  }
}
