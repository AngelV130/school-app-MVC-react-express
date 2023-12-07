import { createConnection } from 'mysql2/promise';
// const mysql = require('mysql2');

const db = await createConnection({
    host: 'localhost',
    port:3306,
    user: 'root',
    password: 'rootpsw',
    database: 'school',
});
export default db