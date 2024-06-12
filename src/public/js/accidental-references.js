document.getElementById('start-button').addEventListener('click', () => {
    let elements = [];

    function addElements() {
        const visual = document.getElementById('visual');
        for (let i = 0; i < 1000; i++) {
            const element = document.createElement('div');
            element.className = 'block';
            element.style.top = `${Math.random() * 280}px`;
            element.style.left = `${Math.random() * 280}px`;
            document.body.appendChild(element);
            elements.push(element); // Accidental reference
            visual.appendChild(element);
        }
    }

    function removeElements() {
        for (let i = 0; i < elements.length; i++) {
            document.body.removeChild(elements[i]);
        }
        // Oops! We forgot to clear the 'elements' array
        document.getElementById('output').innerText = 'Accidental reference created.';
        console.log('Accidental reference created.');
    }

    addElements();
    removeElements();
});

