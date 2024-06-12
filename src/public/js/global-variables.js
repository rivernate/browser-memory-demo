document.getElementById('start-button').addEventListener('click', () => {
    function startTimer() {
        const visual = document.getElementById('visual');
        setInterval(() => {
            console.log('Timer leak');
            // Visual feedback
            const block = document.createElement('div');
            block.className = 'block';
            block.style.top = `${Math.random() * 280}px`;
            block.style.left = `${Math.random() * 280}px`;
            visual.appendChild(block);
        }, 1000); // Timer that is never cleared
        document.getElementById('output').innerText = 'Timer leak created.';
        console.log('Timer leak created.');
    }

    startTimer();
});

