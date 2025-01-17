let leakCount = 0;
const objects = [];

document.getElementById('start-button').addEventListener('click', () => {
    function createCircularReference() {
        const objA = {};
        const objB = {};
        objA.b = objB;
        objB.a = objA; // Circular reference
        objects.push(objA, objB); // Keep reference to simulate leak
    }

    for (let i = 0; i < 10000 * leakCount; i++) {
        createCircularReference();
    }
    leakCount++;
    document.getElementById('output').innerText = `Circular reference leak #${leakCount} created.`;
    console.log(`Circular reference leak #${leakCount} created.`);

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

