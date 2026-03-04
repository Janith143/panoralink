const mysql = require('mysql2/promise');

async function main() {
    console.log('Connecting to MySQL...');
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '', // XAMPP default
            port: 3306
        });

        console.log('Connected!');

        await connection.query('CREATE DATABASE IF NOT EXISTS panoralink_db;');
        console.log('Database "panoralink_db" created or already exists.');

        await connection.end();
    } catch (err) {
        console.error('Error creating database:', err.message);
        process.exit(1);
    }
}

main();
