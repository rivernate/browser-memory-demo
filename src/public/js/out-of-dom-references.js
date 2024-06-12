document.getElementById('start-button').addEventListener('click', () => {
    let removedElements = [];

    function createAndRemoveElements() {
        const visual = document.getElementById('visual');
        for (let i = 0; i < 1000; i++) {
            const element = document.createElement('div');
            element.className = 'block';
            element.style.top = `${Math.random() * 280}px`;
            element.style.left = `${Math.random() * 280}px`;
            document.body.appendChild(element);
            removedElements.push(element); // Reference is kept
            document.body.removeChild(element); // Removed from DOM
            // Visual feedback
            visual.appendChild(element);
        }
        document.getElementById('output').innerText = 'Out-of-DOM reference leak created.';
        console.log('Out-of-DOM reference leak created.');
    }

    createAndRemoveElements();
});

