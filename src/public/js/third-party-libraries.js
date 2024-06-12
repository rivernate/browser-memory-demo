document.getElementById('start-button').addEventListener('click', () => {
    function useThirdPartyLibrary() {
        const visual = document.getElementById('visual');
        const elements = [];
        for (let i = 0; i < 1000; i++) {
            const element = document.createElement('div');
            element.className = 'block';
            element.style.top = `${Math.random() * 280}px`;
            element.style.left = `${Math.random() * 280}px`;
            // Simulate a third-party library managing the element
            thirdPartyLibrary.manageElement(element); // Hypothetical third-party library call
            elements.push(element); // Accidental reference
            visual.appendChild(element);
        }
        document.getElementById('output').innerText = 'Third-party library leak created.';
        console.log('Third-party library leak created.');
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

    useThirdPartyLibrary();
});

