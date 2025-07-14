# 🌿 Plant Disease Classification

This project is a machine learning-based system for classifying various plant diseases using leaf images. The goal is to assist farmers and agricultural professionals in early detection and treatment, ultimately improving crop health and yield.

---

## 📑 Table of Contents

- [Project Overview](#project-overview)
- [Supported Diseases](#supported-diseases)
- [Technologies Used](#technologies-used)
- [Dataset](#dataset)
- [Model Architecture](#model-architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Results](#results)
- [Contributing](#contributing)
- [License](#license)

---

## 🌱 Project Overview

Leaves from different plants exhibit unique symptoms when affected by diseases. This project leverages deep learning to detect and classify a wide range of plant diseases using image classification. It uses a Convolutional Neural Network (CNN) trained on leaf images of various crops, enabling multi-crop support and robust disease recognition.

---

## 🦠 Supported Diseases

The model supports classification for the following diseases across various plant species:

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

---

## 🧪 Technologies Used

- Python  
- TensorFlow / Keras  
- Scikit-learn  
- Pandas  
- NumPy  

---

## 📂 Dataset

The dataset comprises labeled images of plant leaves exhibiting various disease symptoms. Sources include:

- Kaggle  
- Public agricultural research datasets  
- Open plant pathology repositories  

---

## 🧠 Model Architecture

The classification model is built using a Convolutional Neural Network (CNN) with the following components:

- **Convolutional layers**: For feature extraction  
- **Max Pooling layers**: For spatial dimensionality reduction  
- **Dense layers**: For final classification  
- **Softmax activation**: For multi-class output  

Enhancements for better generalization:

- Data Augmentation  
- Dropout Regularization  
- Batch Normalization  

---

## ⚙️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/plant-disease-classification.git
