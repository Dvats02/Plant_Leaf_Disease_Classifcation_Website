# Plant Disease Classification
This project is a machine learning-based system for classifying various plant diseases using leaf images. The aim is to assist farmers and agricultural professionals in early detection and treatment, thereby improving crop health and yield.

#Table of Contents
#Project Overview

#Supported Diseases

#Technologies Used

#Dataset

#Model Architecture

#Installation

#Usage

#Results

#Contributing

#License

#Project Overview
Leaves from different plants exhibit unique symptoms when affected by diseases. This project leverages deep learning to detect and classify a wide range of plant diseases using image classification. It uses a Convolutional Neural Network (CNN) trained on leaf images of various crops, enabling multi-crop support and robust disease recognition.

#Supported Diseases
The model currently supports classification for the following diseases across various plant species:

diff
Copy
Edit
- Apple_scab
- Black_rot
- Cedar_apple_rust
- Powdery_mildew
- Cercospora_leaf_spot / Gray_leaf_spot
- Common_rust
- Northern_Leaf_Blight
- Esca (Black_Measles)
- Leaf_blight (Isariopsis_Leaf_Spot)
- Haunglongbing (Citrus Greening)
- Bacterial_spot
- Early_blight
- Late_blight
- Leaf_scorch
- Leaf_Mold
- Septoria_leaf_spot
- Spider_mites / Two-spotted_spider_mite
- Target_Spot
- Tomato_Yellow_Leaf_Curl_Virus
- Tomato_mosaic_virus
Some diseases are crop-specific, and class names may include both plant and disease for clarity.

Technologies Used
Python

TensorFlow / Keras

OpenCV

Scikit-learn

Pandas

NumPy

Dataset
The dataset consists of labeled images of plant leaves exhibiting various disease symptoms. It has been collected from reliable sources such as Kaggle, agricultural databases, and public datasets for plant pathology.

Model Architecture
The image classification model uses a CNN with the following layers:

Convolutional layers for feature extraction

Max-pooling layers to reduce spatial dimensions

Dense (fully connected) layers for classification

Softmax activation for multi-class output

Data augmentation, dropout, and batch normalization techniques are also applied to improve model generalization.

Installation
Clone the repository:

bash
Copy
Edit
git clone git@github.com:your-username/plant-disease-classification.git
Navigate into the project folder:

bash
Copy
Edit
cd plant-disease-classification
Install dependencies:

bash
Copy
Edit
pip install -r requirements.txt
Usage
Prepare your dataset and place images inside the data/ directory, organized by class.

Train the model:

bash
Copy
Edit
python train.py
Predict a disease from a new leaf image:

bash
Copy
Edit
python predict.py --image path_to_image.jpg
Results
The trained model achieves over 90% accuracy on the validation dataset across multiple plant species. It generalizes well on unseen data and can identify diseases even in visually complex leaf samples.

Performance metrics and example predictions are available in the results/ directory.

Contributing
Contributions are welcome! If you find bugs or have suggestions, feel free to fork the repository and submit a pull request.

License
This project is licensed under the MIT License — see the LICENSE file for more details.
