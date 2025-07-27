const express = require('express');
const cors = require('cors');
const multer = require('multer');
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const CLASS_NAMES = [
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
];

let model;

async function loadModel() {
    try {
        model = await tf.loadLayersModel('file://' + path.join(__dirname, '../model.h5/model.json'));
        console.log('Model loaded successfully');
    } catch (error) {
        console.error('Error loading model:', error);
    }
}

loadModel();

app.get('/ping', (req, res) => {
    res.send('Hello, I am alive!');
});

app.post('/predict', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No image uploaded' });
    }

    try {
        const imageBuffer = req.file.buffer;
        const image = await loadImage(imageBuffer);
        const resizedImage = tf.image.resizeNearestNeighbor(image, [256, 256]).toFloat().expandDims(0);
        const predictions = await model.predict(resizedImage).data();
        const predictedClassIndex = argMax(predictions);
        const predictedClass = CLASS_NAMES[predictedClassIndex];
        const confidence = predictions[predictedClassIndex];

        console.log(`Prediction: ${predictedClass}, Confidence: ${confidence}`);

        res.json({
            prediction: predictedClass,
            confidence: confidence
        });
    } catch (error) {
        console.error('Error during prediction:', error);
        res.status(500).json({ error: error.message });
    }
});

// Helper function to load image from buffer
async function loadImage(buffer) {
    const image = await tf.node.decodeImage(buffer, 3);
    return image;
}

// Helper function to find the index of the maximum value in an array
function argMax(array) {
    return array.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
}

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});
