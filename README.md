# 🌱 Plant Leaf Disease Classification (32 Classes)

This project is a **Deep Learning-based application** that classifies plant leaf diseases into **32 different categories** using images.  
The system helps farmers and agricultural experts detect plant diseases early, improving crop yield and reducing losses.

---

## 📌 Features
- **Supports 32 plant disease classes**
- **Image-based classification** using a trained CNN model
- **User-friendly UI** for uploading leaf images
- **Real-time predictions** with confidence scores
- Model trained on a large dataset of labeled plant leaf images

---

## 🖼️ Supported Classes
The model can classify plant leaves into **32 categories** including:
- Apple (Scab, Black Rot, Cedar Rust, Healthy)
- Blueberry (Healthy)
- Cherry (Powdery Mildew, Healthy)
- Corn (Cercospora Leaf Spot, Common Rust, Northern Leaf Blight, Healthy)
- Grape (Black Rot, Esca, Leaf Blight, Healthy)
- Orange (Haunglongbing/Citrus Greening)
- Peach (Bacterial Spot, Healthy)
- Pepper Bell (Bacterial Spot, Healthy)
- Potato (Early Blight, Late Blight, Healthy)
- Raspberry (Healthy)
- Soybean (Healthy)
- Squash (Powdery Mildew)
- Strawberry (Leaf Scorch, Healthy)
- Tomato (Bacterial Spot, Early Blight, Late Blight, Leaf Mold, Septoria Leaf Spot, Spider Mites, Target Spot, Mosaic Virus, Healthy)

---

## 🛠️ Tech Stack
### **Frontend**
- React.js (for the UI)
- CSS / Bootstrap for styling

### **Backend**
- FastAPI / Flask (for API endpoints)
- TensorFlow / Keras (for deep learning model)
- gdown (to fetch model from Google Drive)

---

## 📂 Project Structure

Plant_Leaf_Disease_Classification_Website/
│
├── backend/                   # Node.js + Express backend for API and model handling
├── frontend/                  # React-based frontend for user interaction
├── requirements.txt           # Python dependencies (for model training/conversion)
├── package.json               # Backend & frontend dependencies
├── package-lock.json          # Node.js dependency lock file
├── README.md                  # Project documentation
├── .gitignore                 # Ignored files list
├── .gitattributes             # Git attributes settings
└── __pycache__/               # Python cache files (from model training scripts)




🚀 Installation
1️⃣ Clone the repository
git clone https://github.com/Dvats02/Plant_Leaf_Disease_Classifcation_Website.git
cd Plant_Leaf_Disease_Classifcation_Website


2️⃣ Install Python dependencies
Make sure you have Python 3.8+ installed, then run:
pip install -r requirements.txt


3️⃣ Download the model file
Run the provided script to download model.h5 from Google Drive:
python download_model.py

4️⃣ Install Node.js dependencies
Make sure you have Node.js 16+ installed, then run:
cd backend
npm install

cd backend
npm install

cd frontend
npm install
npm start



download_model.py:
import gdown
import os

file_id = "YOUR_FILE_ID"
url = f["https://drive.google.com/uc?id={file_id}"](https://drive.google.com/file/d/1PbLT4j4FnIHPgkI4MAtD9R2BaCWymTZ0/view?usp=sharing)
output = "model.h5"

if not os.path.exists(output):
    print("📥 Downloading model.h5 from Google Drive...")
    gdown.download(url, output, quiet=False)
    print("✅ Download complete!")

