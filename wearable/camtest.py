from picamzero import Camera
import base64
from time import sleep
from io import BytesIO
from PIL import Image


cam = Camera()
cam.start_preview()

frame = cam.capture_array()  # Capture an image as a numpy array

buffer = BytesIO()
image = Image.fromarray(frame)  # Convert the numpy array to a PIL Image
image.save(buffer, format="JPEG")
buffer.seek(0)

# Convert the image to base64
image_base64 = base64.b64encode(buffer.read()).decode('utf-8')


sleep(5)
f = open("test.txt", 'w')
f.write(image_base64)
f.close()


