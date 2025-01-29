import time
import requests
import base64
from picamzero import Camera
from io import BytesIO
from PIL import Image

# Initialize the camera
cam = Camera()
cam.start_preview()

# Server URL
server_url = "http://127.0.0.1:5000/image"

while True:
    try:
        # Capture an image
        frame = cam.capture_array()  # Capture the image as a numpy array

        # Save the image to a BytesIO buffer as JPEG
        buffer = BytesIO()
        image = Image.fromarray(frame)  # Convert the numpy array to a PIL Image
        image.save(buffer, format="JPEG")
        buffer.seek(0)

        # Convert the image to base64
        image_base64 = base64.b64encode(buffer.read()).decode('utf-8')

        # Send the image to the server
        response = requests.post(server_url, json={"base64_img": image_base64})
        if response.status_code == 200:
            print("Image sent successfully!")
        else:
            print(f"Failed to send image: {response.status_code}")

        # Wait 5 seconds before capturing the next image
        time.sleep(5)

    except Exception as e:
        print(f"An error occurred: {e}")
