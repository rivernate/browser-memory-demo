let leakCount = 0;

document.getElementById('start-button').addEventListener('click', () => {
    const container = document.getElementById('container');

    for (let i = 0; i < 10000 * leakCount; i++) {
        const div = document.createElement('div');
        div.textContent = `Element ${i}`;
        container.appendChild(div);
    }

    leakCount++;
    document.getElementById('output').innerText = `Blink GC leak #${leakCount} created.`;
    console.log(`Blink GC leak #${leakCount} created.`);

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

