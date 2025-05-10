
# Plant Disease Classification

This project is a machine learning-based system for classifying various diseases affecting potato crops using image data. The aim is to help farmers identify and treat diseases quickly to improve crop yield.

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Dataset](#dataset)
- [Model Architecture](#model-architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Results](#results)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
Potato plants are susceptible to various diseases that can significantly reduce their yield. This project uses image classification techniques to automatically detect diseases in potato plant leaves. By leveraging a deep learning model, the system can classify different types of diseases such as late blight, early blight, etc.

## Technologies Used
- Python
- TensorFlow/Keras
- OpenCV
- Scikit-learn
- Pandas
- Numpy

## Dataset
The dataset consists of images of potato leaves labeled with various diseases. It includes the following classes:
- Early Blight
- Late Blight
- Healthy

The dataset can be downloaded from [Kaggle](https://www.kaggle.com/datasets) or another relevant source.

## Model Architecture
The classification model is built using a Convolutional Neural Network (CNN) with the following layers:
- Convolutional layers
- Max-pooling layers
- Fully connected layers
- Softmax output for classification

The model is trained on labeled images to classify the disease based on visual features.

## Installation
1. Clone this repository:
   ```bash
   git clone git@github.com:your-username/potato-disease-classification.git
   ```
2. Navigate to the project directory:
   ```bash
   cd potato-disease-classification
   ```
3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage
1. Prepare your dataset by placing it in the `data/` directory.
2. Run the training script to train the model:
   ```bash
   python train.py
   ```
3. Use the trained model to make predictions on new images:
   ```bash
   python predict.py --image path_to_image
   ```

## Results
The model achieved an accuracy of over 90% on the validation dataset. More details on the training process and evaluation metrics can be found in the `results/` directory.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
