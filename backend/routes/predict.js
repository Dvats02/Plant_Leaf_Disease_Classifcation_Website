const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads directory exists in the 'backend' folder
const uploadsDir = path.join(__dirname, "..", "uploads"); // Resolves to backend/uploads
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log(`Created uploads directory: ${uploadsDir}`);
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir); // Save files directly into backend/uploads/
    },
    filename: (req, file, cb) => {
        // Sanitize filename slightly to prevent issues, though Date.now() helps uniqueness
        const safeOriginalName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '');
        cb(null, `${Date.now()}-${safeOriginalName}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Example: Limit file size to 10MB
    fileFilter: (req, file, cb) => { // Example: Accept only common image types
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// Middleware to handle multer errors specifically
const handleUploadErrors = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        console.error("Multer error:", err);
        return res.status(400).json({ error: `File upload error: ${err.message}` });
    } else if (err) {
        console.error("File filter error:", err);
        return res.status(400).json({ error: err.message });
    }
    next();
};


router.post("/", upload.single("image"), handleUploadErrors, (req, res) => {
    if (!req.file) {
        // This case should ideally be caught by multer error handling if no file is sent,
        // but good to have a fallback.
        console.error("No file uploaded with the 'image' field.");
        return res.status(400).json({ error: "No image file uploaded." });
    }

    // req.file.path will be the absolute path to the uploaded file, e.g., C:\...\backend\uploads\filename.jpg
    const imagePath = req.file.path;
    console.log(`Image uploaded to: ${imagePath}`);

    // Determine Python executable (python or python3)
    // For robustness, you might want to make this configurable or detect it
    const pythonExecutable = "python";

    console.log(`Spawning Python script: ${pythonExecutable} main.py "${imagePath}"`);

    const pythonProcess = spawn(pythonExecutable, ["main.py", imagePath], {
        cwd: path.join(__dirname, ".."), // Set CWD to backend/
        env: {
            ...process.env, // Inherit parent environment variables
            PYTHONIOENCODING: 'UTF-8', // ** Key fix for potential Unicode errors on Windows **
            TF_ENABLE_ONEDNN_OPTS: '0' // To suppress TensorFlow oneDNN info messages
        }
    });

    let scriptOutput = "";
    let scriptErrorOutput = "";

    pythonProcess.stdout.on("data", (data) => {
        const dataStr = data.toString();
        console.log(`Python stdout: ${dataStr.trim()}`);
        scriptOutput += dataStr;
    });

    pythonProcess.stderr.on("data", (data) => {
        const dataStr = data.toString();
        // Filter out TensorFlow info messages from actual errors if TF_ENABLE_ONEDNN_OPTS isn't fully effective
        if (!dataStr.includes("oneDNN custom operations") && !dataStr.includes("TF-グラフ")) { // Added Japanese TF message
            console.error(`Python stderr: ${dataStr.trim()}`);
        }
        scriptErrorOutput += dataStr; // Capture all stderr for debugging
    });

    pythonProcess.on("close", (code) => {
        console.log(`Python script exited with code ${code}`);

        // Always attempt to delete the uploaded image
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error("Failed to delete uploaded file:", imagePath, err);
            } else {
                console.log("Successfully deleted uploaded file:", imagePath);
            }
        });

        if (code !== 0) {
            console.error(`Prediction failed. Python script error output:\n${scriptErrorOutput}`);
            return res.status(500).json({
                error: "Prediction failed on the server.",
                details: scriptErrorOutput || "Python script exited with a non-zero code."
            });
        }

        if (!scriptOutput.trim()) {
            console.error("Prediction failed: Python script produced no output.");
            return res.status(500).json({
                error: "Invalid response from Python script: No output.",
                details: scriptErrorOutput
            });
        }

        try {
            const prediction = JSON.parse(scriptOutput.trim());
            console.log("Sending prediction to client:", prediction);
            res.json(prediction);
        } catch (parseError) {
            console.error("Error parsing prediction result from Python:", parseError);
            console.error("Raw Python output that failed to parse:", scriptOutput);
            res.status(500).json({
                error: "Invalid response format from Python script.",
                details: `Failed to parse: ${scriptOutput.trim()}`
            });
        }
    });

    pythonProcess.on("error", (spawnError) => {
        console.error("Failed to start Python subprocess.", spawnError);
        // Attempt to delete file if spawn failed
        fs.unlink(imagePath, (err) => {
            if (err) console.error("Failed to delete uploaded file after spawn error:", err);
        });
        res.status(500).json({
            error: "Failed to start prediction process.",
            details: spawnError.message
        });
    });
});

module.exports = router;