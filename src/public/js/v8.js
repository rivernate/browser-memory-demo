document.getElementById('start-button').addEventListener('click', () => {
    const numBatches = 100;
    const batchSize = 10;
    const arraySize = 10000;
    const arrays = [];
    const objects = [];

    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');

    function updateProgress(batchIndex) {
        const progress = ((batchIndex + 1) / numBatches) * 100;
        progressBar.style.width = progress + '%';
        progressText.innerText = `Progress: ${progress.toFixed(2)}%`;
    }

    function allocateBatch(batchIndex) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.time(`Array allocation batch ${batchIndex}`);
                // Allocate a batch of large arrays
                for (let i = 0; i < batchSize; i++) {
                    const array = new Array(arraySize).fill(0).map(() => Math.random());
                    arrays.push(array);
                }
                console.timeEnd(`Array allocation batch ${batchIndex}`);

                console.time(`Object allocation batch ${batchIndex}`);
                // Allocate a batch of large objects
                for (let i = 0; i < batchSize; i++) {
                    const obj = {};
                    for (let j = 0; j < arraySize; j++) {
                        obj[`key${j}`] = `value${j}`;
                    }
                    objects.push(obj);
                }
                console.timeEnd(`Object allocation batch ${batchIndex}`);

                updateProgress(batchIndex);
                resolve();
            }, 200); // Increased delay between batches
        });
    }

    async function allocateMemory() {
        for (let i = 0; i < numBatches; i++) {
            await allocateBatch(i);
        }
        document.getElementById('output').innerText = `Allocated ${numBatches * batchSize} arrays and objects with ${arraySize} elements each.`;
        console.log('V8 memory allocation successful.');
    }

    allocateMemory().catch(error => {
        console.error('V8 memory allocation error:', error);
    });
});

