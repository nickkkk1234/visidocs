import cv2
import base64
import json
from ultralytics import YOLO

# Function to encode image as base64
def encode_image(image):
    _, buffer = cv2.imencode('.jpg', image)
    return base64.b64encode(buffer).decode('utf-8')

# Process video and generate JSON output
def process_video_with_yolo(mp4_path, model_path="yolo11n.pt", output_json="output2.json"):
    # Load YOLO model
    model = YOLO(model_path)

    # Open video
    cap = cv2.VideoCapture(mp4_path)
    frame_count = 0
    results_list = []

    while True:
        ret, frame = cap.read()
        if not ret:
            break  # End of video

        frame_count += 1


        if frame_count % 150 == 0:
            print("in frame")
            # Run YOLO inference
            results = model(frame)
            print("=======")
            print(results[0].boxes)
            print("=======")

            # Get annotated frame
            annotated_frame = results[0].plot()

            # Build frame data
            frame_data = {
                "frame": frame_count,
                "raw_image": encode_image(frame),
                "annotated_image": encode_image(annotated_frame),
                "data": []
            }

            # Extract detection details
            for box in results[0].boxes:
                bbox_coords = box.xyxy.tolist()
                if isinstance(bbox_coords[0], list):  # Handle unexpected nested lists
                    bbox_coords = bbox_coords[0]
                frame_data["data"].append({
                    "id": int(box.id) if box.id is not None else None,  # Ensure ID is JSON-serializable
                    "class": model.names[int(box.cls)],  # Map class index to class name
                    "bbox": [float(coord) for coord in bbox_coords]  # Ensure bbox is JSON-serializable
            })

            results_list.append(frame_data)

    cap.release()

    # Save results to JSON file
    with open(output_json, "w") as json_file:
        json.dump(results_list, json_file, indent=4)

    print(f"Processing complete. Results saved to {output_json}")

# Example usage
process_video_with_yolo(
    mp4_path="./video.mp4",
)
