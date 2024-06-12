let leakCount = 0;

document.getElementById('start-button').addEventListener('click', () => {
    function useThirdPartyLibrary() {
        const elements = [];
        for (let i = 0; i < 10000 * leakCount; i++) {
            const element = document.createElement('div');
            element.className = 'block';
            element.style.top = `${Math.random() * 280}px`;
            element.style.left = `${Math.random() * 280}px`;
            // Simulate a third-party library managing the element
            thirdPartyLibrary.manageElement(element); // Hypothetical third-party library call
            elements.push(element); // Accidental reference
        }
        document.getElementById('output').innerText = `Third-party library leak #${leakCount} created.`;
        console.log(`Third-party library leak #${leakCount} created.`);
    }

    // Hypothetical third-party library
    const thirdPartyLibrary = {
        manageElement: function(element) {
            // Simulate some management of the element
            element.addEventListener('click', () => {
                console.log('Element managed by third-party library');
            });
        }
    };

    leakCount++;
    useThirdPartyLibrary();
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

