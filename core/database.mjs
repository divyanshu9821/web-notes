import config from '../config.mjs';
import mysql from 'mysql2/promise';

const db = mysql.createPool({
    'host': config.mysql.host,
    'port': config.mysql.port,
    'user': config.mysql.user,
    'password': config.mysql.pass,
    'database': config.mysql.dbname
});

export default db;