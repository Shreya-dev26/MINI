const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

const mongoURI = 'mongodb+srv://admin:Shreyamonogodb%40123@cluster0.o8xij.mongodb.net/FSD-BDT';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

// Define the Exoplanet Schema
const exoplanetSchema = new mongoose.Schema({
  Name: String,
  Mass: Number, // Mass (MJ)
  Radius: Number, // Radius (RJ)
  Period: Number, // Period (days)
  SemiMajorAxis: Number, // Semi-major axis (AU)
  Temp: Number, // Temp (K)
  DiscoveryMethod: String, // Discovery method
  DiscYear: Number, // Discovery Year
  Distance: Number, // Distance (ly)
  HostStarMass: Number, // Host star mass (M☉)
  HostStarTemp: Number, // Host star temp (K)
  Remarks: String // Remarks
}, { collection: 'exoplanets' });

// Create the Exoplanet model
const Exoplanet = mongoose.model('Exoplanet', exoplanetSchema);

// Route to get all exoplanets
app.get('/exoplanets', async (req, res) => {
    console.log("inside the request")
  try {
    const exoplanets = await Exoplanet.find(); // Fetch all exoplanets from the collection
    res.json(exoplanets); // Send the data as a JSON response
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch exoplanets data' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
