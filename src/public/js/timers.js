document.getElementById('start-button').addEventListener('click', () => {
    function createTimerLeak() {
        setInterval(() => {
            console.log('Timer leak');
        }, 1000); // Timer that is never cleared
        document.getElementById('output').innerText = 'Timer leak created.';
        console.log('Timer leak created.');
    }

    createTimerLeak();
});

