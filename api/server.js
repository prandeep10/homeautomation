const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Enable CORS
app.use(cors());

// Example: Mocked states of lights
let lightsState = {
  light1: false,
  light2: false,
  light3: false,
  light4: false,
};

// Define routes to control lights
app.post('/api/control/light/:light/on', (req, res) => {
  const light = req.params.light;
  // Example: Code to turn on the specified light
  lightsState[light] = true;
  res.json({ message: `${light} turned on` });
});

app.post('/api/control/light/:light/off', (req, res) => {
  const light = req.params.light;
  // Example: Code to turn off the specified light
  lightsState[light] = false;
  res.json({ message: `${light} turned off` });
});

// Route to fetch lights state
app.get('/api/lights', (req, res) => {
  res.json(lightsState);
});

// State variable to track LED status
let isLedOn = false;

// Route to turn LED on
app.post('/api/led/on', (req, res) => {
  isLedOn = true;
  res.json({ message: 'LED turned on' });
});

// Route to turn LED off
app.post('/api/led/off', (req, res) => {
  isLedOn = false;
  res.json({ message: 'LED turned off' });
});

// Route to get LED status
app.get('/api/led/status', (req, res) => {
  res.json({ isLedOn });
});


// State variable to track fan speed
let fanSpeed = 1;

// Route to set fan speed
app.post('/api/fan/speed/:speed', (req, res) => {
  const speed = parseInt(req.params.speed);

  // Check if the requested speed is valid (1, 2, or 3)
  if (speed >= 1 && speed <= 3) {
    fanSpeed = speed;
    res.json({ message: `Fan speed set to ${speed}` });
  } else {
    res.status(400).json({ error: 'Invalid fan speed. Please specify a speed between 1 and 3.' });
  }
});

// Route to get current fan speed
app.get('/api/fan/speed', (req, res) => {
  res.json({ speed: fanSpeed });
});




// State variable to track water droplet status
let isWaterDropletOn = false;

// Route to turn water droplets on
app.post('/api/water/on', (req, res) => {
  isWaterDropletOn = true;
  res.json({ message: 'Water droplets turned on' });
});

// Route to turn water droplets off
app.post('/api/water/off', (req, res) => {
  isWaterDropletOn = false;
  res.json({ message: 'Water droplets turned off' });
});

// Route to get water droplet status
app.get('/api/water/status', (req, res) => {
  res.json({ isWaterDropletOn });
});



// For TV 



const tvUrls = [
  "https://www.youtube.com/embed/k0h_55Odqyc?si=k1plqqJ6RHpToRxb",
  "https://www.youtube.com/embed/9XGekkdAIrk?si=u4H_0vewhb2r3LOs",
  "https://www.youtube.com/embed/vOpkyoLnj2w?si=Fhj89t15YgSfWUEQ",
  // Add more URLs as needed
];
let currentUrlIndex = 0;

app.post('/api/tv/channel/next', (req, res) => {
  if (currentUrlIndex < tvUrls.length - 1) {
    currentUrlIndex++;
    res.json({ message: 'Changed to the next URL', url: tvUrls[currentUrlIndex] });
  } else {
    res.status(400).json({ error: 'No more URLs available' });
  }
});

app.post('/api/tv/channel/previous', (req, res) => {
  if (currentUrlIndex > 0) {
    currentUrlIndex--;
    res.json({ message: 'Changed to the previous URL', url: tvUrls[currentUrlIndex] });
  } else {
    res.status(400).json({ error: 'No previous URLs available' });
  }
});

app.get('/api/tv/url', (req, res) => {
  res.json({ url: tvUrls[currentUrlIndex] });
});




let isFeederOn = false;

// Route to turn the feeder on
app.post('/api/feeder/on', (req, res) => {
  isFeederOn = true;
  res.json({ message: 'Feeder turned on' });
});

// Route to turn the feeder off
app.post('/api/feeder/off', (req, res) => {
  isFeederOn = false;
  res.json({ message: 'Feeder turned off' });
});

// Route to get the current feeder status
app.get('/api/feeder/status', (req, res) => {
  res.json({ isFeederOn });
});





let isWindowOpen = false;

// Route to check if window is open
app.get('/api/window/status', (req, res) => {
  res.json({ windowStatus: isWindowOpen ? 'open' : 'closed' });
});

// Route to open the window
app.post('/api/window/open', (req, res) => {
  isWindowOpen = true;
  res.json({ message: 'Window opened' });
});

// Route to close the window
app.post('/api/window/close', (req, res) => {
  isWindowOpen = false;
  res.json({ message: 'Window closed' });
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
