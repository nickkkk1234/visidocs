import asyncio
# import websockets
from quart import websocket
import base64
from picamzero import Camera
from io import BytesIO
from PIL import Image

# Initialize the camera
cam = Camera()
cam.start_preview()

# WebSocket server URL
ws_url = "wss://ef2024vancouver.onrender.com/image_stream"

async def send_images():
    async with websockets.connect(ws_url) as websocket:
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

                # Send the image over WebSocket
                payload = json.dumps({'base64_img': image_base64})
                # await websocket.send_json({"base64_img": image_base64})
                await websocket.send(payload)
                print("Image sent successfully!")
                
                # Wait 2.5 seconds before sending the next image
                await asyncio.sleep(2.5)

            except Exception as e:
                print(f"An error occurred: {e}")

# Run the WebSocket client
asyncio.run(send_images())
