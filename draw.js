< !DOCTYPE html >
    <
    html lang = "en" >
    <
    head >
    <
    meta charset = "UTF-8" >
    <
    meta name = "viewport"
content = "width=device-width, initial-scale=1.0" >
    <
    title > Canvas Image Upload < /title> <
    /head> <
    body >

    <
    canvas id = "canvas"
width = "500"
height = "500"
style = "border:1px solid #000;" > < /canvas> <
    button id = "uploadButton" > Upload Image < /button>

<
script >
    document.addEventListener('DOMContentLoaded', () => {
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');
        const uploadButton = document.getElementById('uploadButton');

        let isDrawing = false;

        // Function to start drawing
        function startDrawing(e) {
            isDrawing = true;
            draw(e);
        }

        // Function to stop drawing
        function stopDrawing() {
            isDrawing = false;
            context.beginPath();
        }

        // Function to draw on the canvas
        function draw(e) {
            if (!isDrawing) return;

            context.lineWidth = 5;
            context.lineCap = 'round';
            context.strokeStyle = '#000';

            context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
            context.stroke();
            context.beginPath();
            context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        }

        // Event listeners for drawing
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mousemove', draw);

        // Your canvas drawing code here

        uploadButton.addEventListener('click', () => {
            const image = canvas.toDataURL('image/png');

            fetch('https://your-api-endpoint-here/upload', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        file: image,
                    }),
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    // Handle the response from the server, which contains the fileId and URL
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Handle errors, if any
                });
        });
    }); <
/script>

<
/body> <
/html>