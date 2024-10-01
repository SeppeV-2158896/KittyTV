const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));

// Route to get images from the carousel folder
app.get('/images', (req, res) => {
    const carouselDir = path.join(__dirname, 'public', 'carousel');
    
    fs.readdir(carouselDir, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan folder');
        }

        // Filter image files (you can add more extensions if needed)
        const imageFiles = files.filter(file => {
            return file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.gif');
        });

        res.json(imageFiles);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
