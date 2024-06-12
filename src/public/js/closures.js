let leakCount = 0;
const leakFunctions = [];

document.getElementById('start-button').addEventListener('click', () => {
    function createClosure() {
        const largeArray = new Array(100000 * leakCount).fill('leak');
        return function() {
            console.log('Closure leak');
            return largeArray;
        };
    }

    const leakyFunction = createClosure();
    setInterval(() => {
        leakyFunction();
    }, 100); // Interval is never cleared
    leakFunctions.push(leakyFunction);
    leakCount++;
    document.getElementById('output').innerText = `Closure leak #${leakCount} created.`;
    console.log(`Closure leak #${leakCount} created.`);

    updateHeapSize();
    document.getElementById('start-button').textContent = `Start Leak (${leakCount} times)`;
});

function updateHeapSize() {
    if (performance.memory) {
        const heapSizeElement = document.getElementById('heap-size');
        setInterval(() => {
            const { usedJSHeapSize, totalJSHeapSize, jsHeapSizeLimit } = performance.memory;
            heapSizeElement.textContent = `Heap Size: ${formatBytes(usedJSHeapSize)} / ${formatBytes(totalJSHeapSize)} (Limit: ${formatBytes(jsHeapSizeLimit)})`;
        }, 1000);
    } else {
        console.warn('performance.memory is not supported in this browser.');
    }
}

function formatBytes(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

updateHeapSize();

