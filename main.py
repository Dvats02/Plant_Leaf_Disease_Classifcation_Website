from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf

app = FastAPI()

# CORS middleware to handle requests from different origins
origins = [
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the trained model
MODEL = tf.keras.models.load_model("MMy_model.keras")

# Class names for the model's output
CLASS_NAMES = ["Early Blight", "Late Blight", "Healthy"]

# Ping route to check if the server is alive
@app.get("/ping")
async def ping():
    return "Hello, I am alive" 

# Function to read and process the uploaded image
def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image

# Prediction route
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image = read_file_as_image(await file.read())
    image = tf.image.resize(image, [256, 256])  # Resize image to 256x256
    image = image / 255.0  # Normalize the image to [0, 1]
    
    img_batch = np.expand_dims(image, 0)  # Add batch dimension

    # Make predictions
    predictions = MODEL.predict(img_batch)

    # Get predicted class and confidence score
    predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
    confidence = np.max(predictions[0])
    
    return {
        'class': predicted_class,
        'confidence': float(confidence)
    }

# Start the server
if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8000)
