import sys
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import json
import os

# Suppress TensorFlow logging (1 = INFO, 2 = WARNING, 3 = ERROR)
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2' # Set before importing tensorflow
# For oneDNN specific messages, TF_ENABLE_ONEDNN_OPTS='0' is handled by Node.js env

import tensorflow as tf # Ensure tf is imported after setting TF_CPP_MIN_LOG_LEVEL

# It's good practice to load the model once if the script could be imported
# but for this simple script, loading it in main is fine.
# SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
# MODEL_PATH = os.path.join(SCRIPT_DIR, "MMy_model.keras")
# model = load_model(MODEL_PATH)

model = load_model("model.h5") # Relies on cwd being 'backend/'

CLASS_LABELS = disease_names = [
    "Apple___Apple_scab",
    "Apple___Black_rot",
    "Apple___Cedar_apple_rust",
    "Apple___healthy",
    "Blueberry___healthy",
    "Cherry_(including_sour)___Powdery_mildew",
    "Cherry_(including_sour)___healthy",
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot",
    "Corn_(maize)___Common_rust_",
    "Corn_(maize)___Northern_Leaf_Blight",
    "Corn_(maize)___healthy",
    "Grape___Black_rot",
    "Grape___Esca_(Black_Measles)",
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
    "Grape___healthy",
    "Orange___Haunglongbing_(Citrus_greening)",
    "Peach___Bacterial_spot",
    "Peach___healthy",
    "Pepper,_bell___Bacterial_spot",
    "Pepper,_bell___healthy",
    "Potato___Early_blight",
    "Potato___Late_blight",
    "Potato___healthy",
    "Raspberry___healthy",
    "Soybean___healthy",
    "Squash___Powdery_mildew",
    "Strawberry___Leaf_scorch",
    "Strawberry___healthy",
    "Tomato___Bacterial_spot",
    "Tomato___Early_blight",
    "Tomato___Late_blight",
    "Tomato___Leaf_Mold",
    "Tomato___Septoria_leaf_spot",
    "Tomato___Spider_mites Two-spotted_spider_mite",
    "Tomato___Target_Spot",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
    "Tomato___Tomato_mosaic_virus",
    "Tomato___healthy"
]
 # Ensure these match your model
TARGET_SIZE = (256, 256)

def predict_image(img_path):
    try:
        img = image.load_img(img_path, target_size=TARGET_SIZE)
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = img_array / 255.0

        # Make model.predict less verbose
        # verbosity: 0 = silent, 1 = progress bar, 2 = one line per epoch.
        # For a single prediction, 0 should be fine.
        predictions = model.predict(img_array, verbose=0) # <--- SET verbose=0
        class_idx = np.argmax(predictions[0])

        if class_idx < len(CLASS_LABELS):
            return CLASS_LABELS[class_idx]
        else:
            # This should ideally not happen if model and labels are correctly defined
            print("Error: Predicted class index out of bounds.", file=sys.stderr)
            return "Unknown Class"
    except Exception as e:
        print(f"Error in predict_image: {str(e)}", file=sys.stderr)
        # import traceback # Uncomment for full traceback if needed
        # traceback.print_exc(file=sys.stderr)
        raise # Re-raise the exception so Node.js knows it failed

if __name__ == "__main__":
    if len(sys.argv) > 1:
        img_path = sys.argv[1]
        try:
            prediction_result = predict_image(img_path)
            # Ensure ONLY JSON is printed to stdout for Node.js to parse
            print(json.dumps({"prediction": prediction_result}))
            sys.stdout.flush() # Good practice
        except Exception:
            # Error message would have been printed to stderr by predict_image or above
            sys.exit(1) # Exit with a non-zero code to indicate failure
    else:
        print(json.dumps({"error": "No image path provided"}), file=sys.stderr)
        sys.exit(1)