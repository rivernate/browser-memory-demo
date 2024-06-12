let imageCount = 1000;
let images = [];
const imageContainer = document.getElementById('image-container');
const loadImagesButton = document.getElementById('load-images');
const discardImagesButton = document.getElementById('discard-images');

loadImagesButton.addEventListener('click', () => {
    for (let i = 0; i < imageCount; i++) {
        const img = document.createElement('img');
        img.src = `https://via.placeholder.com/300?text=Image+${i + 1}`;
        imageContainer.appendChild(img);
        images.push(img);
    }
    document.getElementById('output').innerText = `Loaded ${imageCount} images.`;
    console.log(`Loaded ${imageCount} images.`);
    updateHeapSize();
});

discardImagesButton.addEventListener('click', () => {
    images.forEach(img => {
        imageContainer.removeChild(img);
    });
    images = [];
    document.getElementById('output').innerText = `Discarded ${imageCount} images.`;
    console.log(`Discarded ${imageCount} images.`);
    updateHeapSize();
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

