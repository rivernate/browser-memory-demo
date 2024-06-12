document.getElementById('start-button').addEventListener('click', async () => {
    const dbName = 'leveldb-example';
    const storeName = 'store';
    const numEntries = 10000;

    try {
        // Open or create the database
        const db = await openDatabase(dbName, storeName);

        // Clear existing entries
        await clearObjectStore(db, storeName);

        // Add a large number of entries
        await addEntries(db, storeName, numEntries);

        // Read the entries back
        await readEntries(db, storeName, numEntries);

        document.getElementById('output').innerText = `Added and read ${numEntries} entries in IndexedDB.`;
    } catch (error) {
        console.error('Error during LevelDB operations:', error);
    }
});

function openDatabase(dbName, storeName) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 2); // Incremented version to ensure upgrade

        request.onupgradeneeded = event => {
            console.log('Upgrading database...');
            const db = event.target.result;
            if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStore(storeName, { keyPath: 'id' });
                console.log(`Object store "${storeName}" created.`);
            }
        };

        request.onsuccess = event => {
            console.log('Database opened successfully.');
            resolve(event.target.result);
        };

        request.onerror = event => {
            console.error('Database error:', event.target.error);
            reject(event.target.error);
        };
    });
}

function clearObjectStore(db, storeName) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const clearRequest = store.clear();

        clearRequest.onsuccess = () => {
            console.log(`Object store "${storeName}" cleared.`);
            resolve();
        };

        clearRequest.onerror = event => {
            console.error('Clear object store error:', event.target.error);
            reject(event.target.error);
        };
    });
}

function addEntries(db, storeName, numEntries) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);

        transaction.oncomplete = () => {
            console.log('All entries added successfully.');
            resolve();
        };

        transaction.onerror = event => {
            console.error('Transaction error:', event.target.error);
            reject(event.target.error);
        };

        for (let i = 0; i < numEntries; i++) {
            const largeValue = 'x'.repeat(1000); // Large value to increase storage usage
            const request = store.add({ id: i, value: largeValue });
            request.onerror = event => {
                console.error(`Add entry error (ID: ${i}):`, event.target.error);
            };
        }
    });
}

function readEntries(db, storeName, numEntries) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);

        transaction.oncomplete = () => {
            console.log('All entries read successfully.');
            resolve();
        };

        transaction.onerror = event => {
            console.error('Transaction error:', event.target.error);
            reject(event.target.error);
        };

        for (let i = 0; i < numEntries; i++) {
            const request = store.get(i);
            request.onsuccess = event => {
                if (i === numEntries - 1) {
                    console.log(`Entry ${i} read successfully.`);
                }
            };
            request.onerror = event => {
                console.error(`Read entry error (ID: ${i}):`, event.target.error);
            };
        }
    });
}

