// backend/db.js
// if using my sql 

/* import mysql from 'mysql2';

export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // put your MySQL password
  database: 'geer'
});

db.connect(err => {
  if (err) throw err;
  console.log(' MySQL connected!');
}); */

// if using dummy data- json file
export const db = {
    query: (sql, params, callback) => {
        console.warn("Attempted DB query, but MySQL is not connected. Using dummy data.");
        callback(new Error("MySQL not connected. Using dummy data."), []);
    }
};
console.log(' MySQL connection omitted. Using dummy JSON data for products.');
