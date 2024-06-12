document.getElementById('start-button').addEventListener('click', async () => {
    const numRecords = 10000;

    try {
        const SQL = await initSqlJs({ locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.2/${file}` });

        // Create an in-memory SQLite database
        const db = new SQL.Database();

        // Create a table
        db.run('CREATE TABLE test (id INTEGER PRIMARY KEY, value TEXT);');

        // Insert a large number of records
        db.run('BEGIN TRANSACTION;');
        for (let i = 0; i < numRecords; i++) {
            db.run('INSERT INTO test (value) VALUES (?);', [`Value ${i}`]);
        }
        db.run('COMMIT;');

        // Update records
        db.run('BEGIN TRANSACTION;');
        for (let i = 0; i < numRecords; i++) {
            db.run('UPDATE test SET value = ? WHERE id = ?;', [`Updated Value ${i}`, i + 1]);
        }
        db.run('COMMIT;');

        // Query records
        const results = db.exec('SELECT * FROM test;');
        console.log('Query Results:', results);

        // Delete records
        db.run('BEGIN TRANSACTION;');
        for (let i = 0; i < numRecords; i++) {
            db.run('DELETE FROM test WHERE id = ?;', [i + 1]);
        }
        db.run('COMMIT;');

        document.getElementById('output').innerText = `Performed SQLite operations on ${numRecords} records.`;
        console.log('SQLite operations successful.');
    } catch (error) {
        console.error('SQLite operations error:', error);
    }
});

