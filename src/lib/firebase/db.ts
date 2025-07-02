
import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // change if you set a password in XAMPP
  database: 'beautycentre_db',
});

export default db;
