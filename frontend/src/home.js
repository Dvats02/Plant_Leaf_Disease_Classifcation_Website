import React, { useState } from 'react';
import './index.css';

function LeafScanLogo() {
  return (
    <div className="logo-container">
      <svg width="80" height="80" viewBox="0 0 200 200">
        {/* Circle background */}
        <circle cx="100" cy="100" r="90" fill="#4CAF50" opacity="0.15" />

        {/* Leaf shape */}
        <path
          d="M100,30 C140,30 160,75 160,110 C160,145 130,170 100,170 C70,170 40,145 40,110 C40,75 60,30 100,30 Z"
          fill="#4CAF50"
          opacity="0.9"
        />

        {/* Leaf veins */}
        <path
          d="M100,30 C100,90 100,170 100,170"
          stroke="#2E7D32"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M70,50 C90,70 110,70 130,50"
          stroke="#2E7D32"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M60,85 C85,100 115,100 140,85"
          stroke="#2E7D32"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M55,120 C80,135 120,135 145,120"
          stroke="#2E7D32"
          strokeWidth="2"
          fill="none"
        />

        {/* Scan lines */}
        <line x1="40" y1="70" x2="160" y2="70" stroke="#1976D2" strokeWidth="2" strokeDasharray="5,3" />
        <line x1="40" y1="100" x2="160" y2="100" stroke="#1976D2" strokeWidth="2" strokeDasharray="5,3" />
        <line x1="40" y1="130" x2="160" y2="130" stroke="#1976D2" strokeWidth="2" strokeDasharray="5,3" />
      </svg>
    </div>
  );
}

function Home() {
  const [image, setImage] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setSelectedFileName(file.name);
      setPreview(URL.createObjectURL(file));
      setResult('');
      setError('');
    } else {
      setImage(null);
      setSelectedFileName('');
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError('Please select an image file first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    setLoading(true);
    setResult('');
    setError('');

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      if (!backendUrl) {
        console.error("Backend URL is not configured. Please set REACT_APP_BACKEND_URL in your .env file.");
        throw new Error("Backend URL is not configured. Check console for details.");
      }

      console.log(`Sending request to: ${backendUrl}/predict`);

      const res = await fetch(`${backendUrl}/predict`, {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        throw new Error(`Server responded with status: ${res.status}`);
      }

      const data = await res.json();
      console.log('Response from backend:', data);

      if (data && data.prediction) {
        setResult(data.prediction);
      } else {
        console.error('Backend response is missing the "prediction" key. Response:', data);
        setError('Received an unexpected response format from the server.');
      }
    } catch (err) {
      console.error('Error during prediction submission:', err);
      setError(`Prediction failed: ${err.message}`);
      setResult('');
    } finally {
      setLoading(false);
    }
  };

  const resultClass = result ? (
    result.toLowerCase().includes('healthy') ? 'result-healthy' : 'result-disease'
  ) : '';

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="brand-container">
          <LeafScanLogo />
          <div className="brand-text">
            <h1>Leaf Disease</h1>
            <p className="tagline">Leaf Disease Detection</p>
          </div>
        </div>
      </header>

      <main className="content-area">
        <div className="upload-section">
          <h2>Upload Leaf Image</h2>
          <p className="instructions">
            Take a clear photo of a plant leaf and upload it to identify if it's healthy or affected by disease.
          </p>

          <form onSubmit={handleSubmit} className="upload-form">
            <div className="file-upload-container">
              <label htmlFor="imageUpload" className="file-upload-label">
                {selectedFileName || "Select Image"}
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/jpeg, image/png, image/jpg"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </div>

            {preview && (
              <div className="preview-container">
                <img src={preview} alt="Selected Preview" className="image-preview" />
                <button
                  type="button"
                  className="change-image-btn"
                  onClick={() => document.getElementById('imageUpload').click()}
                >
                  Change Image
                </button>
              </div>
            )}

            <button
              type="submit"
              className={`classify-btn ${!image ? 'disabled' : ''}`}
              disabled={loading || !image}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Analyzing...
                </>
              ) : (
                'Analyze Leaf'
              )}
            </button>
          </form>
        </div>

        {(result || error) && (
          <div className={`result-section ${resultClass}`}>
            {error ? (
              <div className="error-message">
                <h3>Error</h3>
                <p>{error}</p>
              </div>
            ) : (
              <div className="result-display">
                <h3>Analysis Result</h3>
                <p className="result-text">{result}</p>
                {result && (
                  <div className="recommendation">
                    {result.toLowerCase().includes('healthy') ? (
                      <p>Your plant appears healthy! Continue with your current care routine.</p>
                    ) : (
                      <p>Disease detected. Consider treatment options appropriate for the identified condition.</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>LeafScan &copy; {new Date().getFullYear()} • Upload clear, well-lit images for the most accurate results</p>
      </footer>
    </div>
  );
}

export default Home;
