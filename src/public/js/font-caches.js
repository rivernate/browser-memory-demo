const textContainer = document.getElementById('text-container');
const loadTextButton = document.getElementById('load-text');
const discardTextButton = document.getElementById('discard-text');

const textCount = 1000;
let textElements = [];

const sampleTexts = [
    "The quick brown fox jumps over the lazy dog.",
    "Sphinx of black quartz, judge my vow.",
    "Pack my box with five dozen liquor jugs.",
    "Jackdaws love my big sphinx of quartz.",
    "The five boxing wizards jump quickly.",
    "How razorback-jumping frogs can level six piqued gymnasts!",
    "Sympathizing would fix Quaker objectives.",
    "Back in June we delivered oxygen equipment of the same size.",
    "We promptly judged antique ivory buckles for the next prize.",
    "Crazy Frederick bought many very exquisite opal jewels.",
    "☺ ☻ ♥ ♦ ♣ ♠ • ◘ ○",
    "¡™£¢∞§¶•ªº–≠",
    "Œ∑´®†¥¨ˆøπ“‘",
    "¡™£¢∞§¶•ªº–≠"
];

loadTextButton.addEventListener('click', () => {
    for (let i = 0; i < textCount; i++) {
        const div = document.createElement('div');
        div.className = 'text-sample';
        if (i % 5 === 0) {
            div.classList.add('font-roboto');
        } else if (i % 5 === 1) {
            div.classList.add('font-opensans');
        } else if (i % 5 === 2) {
            div.classList.add('font-lobster');
        } else if (i % 5 === 3) {
            div.classList.add('font-adobe1');
        } else {
            div.classList.add('font-adobe2');
        }
        if (i % 7 === 0) {
            div.classList.add('font-bold');
        }
        if (i % 11 === 0) {
            div.classList.add('font-italic');
        }
        div.textContent = sampleTexts[i % sampleTexts.length];
        textContainer.appendChild(div);
        textElements.push(div);
    }
    document.getElementById('output').innerText = `Loaded ${textCount} text elements.`;
    console.log(`Loaded ${textCount} text elements.`);
    updateHeapSize();
});

discardTextButton.addEventListener('click', () => {
    textElements.forEach(div => {
        textContainer.removeChild(div);
    });
    textElements = [];
    document.getElementById('output').innerText = `Discarded ${textCount} text elements.`;
    console.log(`Discarded ${textCount} text elements.`);
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

