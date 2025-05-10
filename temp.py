import numpy as np
import tensorflow as tf
import os
import random
import pandas as pd

# Load the model
MODEL = tf.keras.models.load_model("MMy_model.keras")

# Define class names
CLASS_NAMES = ['Early Blight', 'Late Blight', 'Healthy']

def predict_disease(image_path):
    img = tf.keras.preprocessing.image.load_img(image_path, target_size=(256, 256))
    img_array = tf.keras.preprocessing.image.img_to_array(img) / 255.0
    img_batch = np.expand_dims(img_array, 0)
    predictions = MODEL.predict(img_batch)
    predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
    confidence = np.max(predictions[0])
    return predicted_class, confidence

def get_random_image(folder_path):
    return random.choice([os.path.join(folder_path, img) for img in os.listdir(folder_path) if img.endswith(('JPG', 'jpeg', 'png'))])

# Paths to different disease folders
folders = {
    'Early Blight': r'C:\Users\Divyendu vats\Desktop\Coding_materials\MACHINE LEarning\ML_Projects\Potato_Disease_Classification\PlantVillage\Potato___Early_blight',
    'Healthy': r'C:\Users\Divyendu vats\Desktop\Coding_materials\MACHINE LEarning\ML_Projects\Potato_Disease_Classification\PlantVillage\Potato___healthy',
    'Late Blight': r'C:\Users\Divyendu vats\Desktop\Coding_materials\MACHINE LEarning\ML_Projects\Potato_Disease_Classification\PlantVillage\Potato___Late_blight'
}

# Initialize a list to store results
results = []

# Loop through each folder and make a prediction
for actual_class, folder_path in folders.items():
    random_image_path = get_random_image(folder_path)
    predicted_class, confidence = predict_disease(random_image_path)
    results.append({
        'Actual Class': actual_class,
        'Random Image': random_image_path,
        'Predicted Class': predicted_class,
        'Confidence': f"{confidence:.6f}"  # More decimal points
    })

# Create a DataFrame for better display
results_df = pd.DataFrame(results)
print(results_df)
