document.getElementById('start-button').addEventListener('click', () => {
    const canvas = document.getElementById('skiaCanvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        console.error('Canvas context not supported');
        return;
    }

    // Function to draw random rectangles with gradients
    function drawGradientRectangles() {
        for (let i = 0; i < 10000; i++) {
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, getRandomColor());
            gradient.addColorStop(1, getRandomColor());

            ctx.fillStyle = gradient;
            ctx.fillRect(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                Math.random() * 50,
                Math.random() * 50
            );
        }
    }

    // Function to draw random circles with radial gradients
    function drawGradientCircles() {
        for (let i = 0; i < 10000; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const radius = Math.random() * 25;
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
            gradient.addColorStop(0, getRandomColor());
            gradient.addColorStop(1, getRandomColor());

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    // Function to draw images repeatedly
    function drawImages() {
        const img = new Image();
        img.onload = function() {
            for (let i = 0; i < 10000; i++) {
                ctx.drawImage(img, Math.random() * canvas.width, Math.random() * canvas.height, 50, 50);
            }
        };
        img.src = '/textures/large-texture.jpg'; // Ensure you have a large texture image in this path
    }

    // Function to draw random text with transformations
    function drawTransformedText() {
        ctx.font = '16px Arial';
        for (let i = 0; i < 10000; i++) {
            ctx.save();
            ctx.translate(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.rotate(Math.random() * 2 * Math.PI);
            ctx.fillStyle = getRandomColor();
            ctx.fillText('Skia Test Text', 0, 0);
            ctx.restore();
        }
    }

    // Function to get a random color
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Perform drawing operations
    drawGradientRectangles();
    drawGradientCircles();
    drawImages();
    drawTransformedText();

    document.getElementById('output').innerText = 'Drawing operations completed.';
    console.log('Skia drawing operations successful.');
});

