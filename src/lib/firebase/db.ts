
import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // change if you set a password in XAMPP
  database: 'beauty_centre_dev',
});

export default db;
