import mysql from "mysql2/promise";

const pool = mysql.createPool({
 host: "139.167.173.43",
  port: 3306,
  user: "dbupload",
  password: "123qwe!@#",
  database: "apollo_web",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
