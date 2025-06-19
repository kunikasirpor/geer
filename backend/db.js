// backend/db.js
import mysql from 'mysql2';

export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // put your MySQL password
  database: 'geer'
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ MySQL connected!');
});
