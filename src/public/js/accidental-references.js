let leakCount = 0;
const elements = [];

document.getElementById('start-button').addEventListener('click', () => {
    function addElements() {
        for (let i = 0; i < 100000 * leakCount; i++) {
            const element = document.createElement('div');
            document.body.appendChild(element);
            elements.push(element); // Accidental reference
            document.body.removeChild(element);
        }
        document.getElementById('output').innerText = `Accidental reference leak #${leakCount} created.`;
        console.log(`Accidental reference leak #${leakCount} created.`);
    }

    leakCount++;
    addElements();
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

