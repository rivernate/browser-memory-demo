document.getElementById('start-button').addEventListener('click', () => {
    function createCircularReference() {
        const visual = document.getElementById('visual');
        const objA = {};
        const objB = {};
        objA.b = objB;
        objB.a = objA; // Circular reference
        // Visual feedback
        const block = document.createElement('div');
        block.className = 'block';
        block.style.top = `${Math.random() * 280}px`;
        block.style.left = `${Math.random() * 280}px`;
        visual.appendChild(block);
        document.getElementById('output').innerText = 'Circular reference created.';
        console.log('Circular reference created.');
    }

    createCircularReference();
});

