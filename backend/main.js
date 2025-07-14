const express = require("express");
const cors = require("cors");
const app = express();
const predictRoute = require("./routes/predict");


app.use(cors());
app.use(express.json());

app.use("/predict", predictRoute);


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
