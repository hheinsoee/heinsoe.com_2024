import mysql from "mysql2";
var pool = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

export const theSql = (sql, cb) => {
  pool.query(sql, function (err, result) {
    cb(err, result);
  });
};

export const safeSql = async (sql, data) => {
  return await new Promise((resolve, reject) => {
    pool.query(sql, data, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
