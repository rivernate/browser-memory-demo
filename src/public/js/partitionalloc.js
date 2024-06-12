document.getElementById('start-button').addEventListener('click', () => {
    const bufferSize = 100000000; // 100 million bytes (100 MB)
    const numBuffers = 10;
    const buffers = [];

    try {
        for (let i = 0; i < numBuffers; i++) {
            // Create large SharedArrayBuffers
            const buffer = new SharedArrayBuffer(bufferSize);
            buffers.push(buffer);

            // Fill the buffer with some data
            const view = new Uint8Array(buffer);
            for (let j = 0; j < view.length; j++) {
                view[j] = j % 256;
            }
        }

        document.getElementById('output').innerText = `Allocated ${numBuffers} SharedArrayBuffers of size ${bufferSize} bytes.`;
        console.log('SharedArrayBuffer allocation successful.');
    } catch (error) {
        console.error('Memory allocation error:', error);
    }
});

