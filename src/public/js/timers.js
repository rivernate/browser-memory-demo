let leakCount = 0;
let timerInterval = 1000;
const leakArrays = [];

document.getElementById('start-button').addEventListener('click', () => {
    function startTimer() {
        setInterval(() => {
            console.log('Timer leak');
            // Simulate significant memory usage
            const leakArray = new Array(100000 * leakCount).fill('leak');
            leakArrays.push(leakArray); // Keep reference to simulate leak
        }, timerInterval); // Timer that is never cleared
        document.getElementById('output').innerText = `Timer leak #${leakCount} created.`;
        console.log(`Timer leak #${leakCount} created.`);
    }

    leakCount++;
    timerInterval = Math.max(100, timerInterval / 2); // Reduce interval time to increase frequency
    startTimer();
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

