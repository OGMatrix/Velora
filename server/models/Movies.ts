// Logger
import Logger from '../util/Logger';
const logger = new Logger('MovieModel', 'debug');

import { pool } from "../adapter/db";
import { Movie } from '../interface';

export interface MovieDb {
    age: string,
    runtime: string,
    rating: string,
    year: string
    id: number,
    imdb_id: string,
    adult: boolean,
    title: string,
    description: string,
    poster: string,
    backdrop: string,
    release_date: string,
    file: string, 
    tagline: string,
    status: string,
    vote_count: number,
    collection: number | null
    addedAt: Date,
    url?: any,
    recommendation: number[],
    stringRuntime: string,
    ending?: string
}

export interface MovieRows extends Array<MovieDb> { }

export class MoviesModel {
    getAll() {
        let query: string = 'SELECT * FROM movies GROUP BY title ASC';

        return pool.query(query)
            .then((rows) => {
                const codeRows: MovieRows = rows;
                return Promise.resolve(codeRows);
            })
            .catch(err => {
                logger.error(`getAll\terror: ${err}`);
                return Promise.reject(err);
            });
    }

    startsWith(search: string) {
        let query: string = `SELECT * FROM movies WHERE title LIKE '%${search}%'`;

        return pool.query(query)
            .then((rows) => {
                const codeRows: MovieRows = rows;
                return Promise.resolve(codeRows)
            })
            .catch(err => {
                logger.error(`startsWith\terror: ${err}`);
                return Promise.reject(err);
            });
    }

    exist(id: number) {
        let query: string = 'SELECT * FROM movies WHERE id = ?';

        return pool.query(query, [id])
            .then((rows) => {
                const codeRows: MovieDb = rows[0];
                if (codeRows == null) return Promise.resolve(false);
                return Promise.resolve(true);
            })
            .catch(err => {
                logger.error(`exist\terror: ${err}`);
                return Promise.reject(err);
            });
    }

    insert(movie: Movie, file: string, runtime: string, year: string, age: string, genres: string) {
        let query: string = 'INSERT INTO movies (id, imdb_id, adult, title, description, poster, backdrop, release_date, file, tagline, status, vote_count, collection, runtime, year, age, genres) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

        let collectionId: any = null;
        if (movie.belongs_to_collection) collectionId = movie.belongs_to_collection.id;

        return pool.query(query, [movie.id, movie.imdb_id, movie.adult, movie.title, movie.overview.replace("-", "").replace("-", "").replace("-", "").replace("-", "").replace("-", "").replace("-", "").replace("‒", "").replace("‒", "").replace("ê", "e"), movie.poster_path, movie.backdrop_path, movie.release_date, file, movie.tagline.replace("‎", "").replace("‎", ""), movie.status, movie.vote_count, collectionId, runtime, year, age, genres])
            .then((rows) => {
                return Promise.resolve(true);
            })
            .catch(err => {
                logger.error(`insert\terror: ${err}`);
                return Promise.reject(err);
            });
    }

    edit(id: number, name: string, year: string, runtime: string, age: string, description: string) {
        let query: string = 'UPDATE movies SET title=?,description=?,year=?,runtime=?,age=? WHERE id = ? ';

        return pool.query(query, [name, description, year, runtime, age, id])
            .then((rows) => {
                return Promise.resolve(true);
            })
            .catch(err => {
                logger.error(`edit\terror: ${err}`);
                return Promise.reject(err);
            });
    }

    getById(id: number) {
        let query: string = 'SELECT * FROM movies WHERE id = ?';

        return pool.query(query, [id])
            .then((rows) => {
                const codeRows: MovieDb = rows[0];
                return Promise.resolve(codeRows)
            })
            .catch(err => {
                logger.error(`getById\terror: ${err}`);
                return Promise.reject(err);
            });
    }

    random() {
        let query: string = 'SELECT * FROM movies ORDER BY RAND() LIMIT 1'
        return pool.query(query)
            .then((rows) => {
                const codeRows: MovieDb = rows[0];
                return Promise.resolve(codeRows)
            })
            .catch(err => {
                logger.error(`random\terror: ${err}`);
                return Promise.reject(err);
            });
    }

    randomCount() {
        let query: string = 'SELECT * FROM movies ORDER BY RAND() LIMIT 20'
        return pool.query(query)
            .then((rows) => {
                const codeRows: MovieRows = rows;
                return Promise.resolve(codeRows)
            })
            .catch(err => {
                logger.error(`random\terror: ${err}`);
                return Promise.reject(err);
            });
    }

    getMostVotes() {
        let query: string = 'SELECT * FROM movies GROUP BY vote_count DESC';

        return pool.query(query)
            .then((rows) => {
                const codeRows: MovieRows = rows;
                return Promise.resolve(codeRows);
            })
            .catch(err => {
                logger.error(`getMostVotes\terror: ${err}`);
                return Promise.reject(err);
            });
    }

    getNewest() {
        let query: string = 'SELECT * FROM movies GROUP BY addedAt DESC';

        return pool.query(query)
            .then((rows) => {
                const codeRows: MovieRows = rows;
                return Promise.resolve(codeRows);
            })
            .catch(err => {
                logger.error(`getNewest\terror: ${err}`);
                return Promise.reject(err);
            });
    }

    async getByGenre(genre: string) {
        let query: string = "SELECT * FROM movies WHERE genres LIKE '%" + genre + "%'";

        return pool.query(query)
            .then((rows) => {
                const codeRows: MovieRows = rows;
                return Promise.resolve(codeRows);
            })
            .catch(err => {
                logger.error(`getByGenre\terror: ${err}`);
                return Promise.reject(err);
            });
    }
}