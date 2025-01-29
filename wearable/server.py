from flask import Flask, request, send_file
from io import BytesIO
import base64

app = Flask(__name__)

# Variables to store the latest image
latest_image = None
decoded_image_bytes = None  # Global variable to store the decoded image bytes

# Route to handle image upload
@app.route('/image', methods=['POST'])
def upload_image():
    global latest_image, decoded_image_bytes
    data = request.json
    if 'base64_img' in data:
        # Update global variables with the new image
        latest_image = data['base64_img']
        decoded_image_bytes = base64.b64decode(latest_image)  # Decode the base64 string to bytes
        return "Image received", 200
    else:
        return "No image found in request", 400

# Route to serve the latest image
@app.route('/latest_image')
def serve_latest_image():
    global decoded_image_bytes
    if decoded_image_bytes:
        # Return the image bytes as a response
        return send_file(BytesIO(decoded_image_bytes), mimetype='image/jpeg')
    else:
        return "No image available", 404

# Route to display the latest image
@app.route('/')
def display_image():
    # Render HTML with JavaScript to refresh the image
    html_template = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Latest Image</title>
        <script>
            function refreshImage() {
                var img = document.getElementById("latestImage");
                img.src = "/latest_image?timestamp=" + new Date().getTime();
            }
            setInterval(refreshImage, 5000); // Refresh the image every 5 seconds
        </script>
    </head>
    <body>
        <h1>Latest Image</h1>
        <img id="latestImage" src="/latest_image" alt="Latest Image"/>
    </body>
    </html>
    """
    return html_template

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
