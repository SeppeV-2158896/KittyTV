let slideIndex = 0;
let slides = [];

function showSlides() {
    const slideshowContainer = document.getElementById('slideshow-container');

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Move to the next slide
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1; // Reset to the first slide
    }

    // Show the current slide
    slides[slideIndex - 1].style.display = "block";

    // Change image every 5 seconds
    setTimeout(showSlides, 5000);
}

// Function to load images from the server
async function loadImages() {
    try {
        const response = await fetch('/images');
        const imageFiles = await response.json();

        const slideshowContainer = document.getElementById('slideshow-container');
        
        // Dynamically create div elements for each image
        imageFiles.forEach((image, index) => {
            const slideDiv = document.createElement('div');
            slideDiv.classList.add('slides', 'fade');
            
            const imgElement = document.createElement('img');
            imgElement.src = `carousel/${image}`;
            imgElement.alt = `Image ${index + 1}`;

            // imgElement.style.filter = 'blur(25px)'
            
            slideDiv.appendChild(imgElement);
            slideshowContainer.appendChild(slideDiv);
        });

        // Update the slides array and start the slideshow
        slides = document.getElementsByClassName('slides');
        showSlides();
    } catch (error) {
        console.error('Error loading images:', error);
    }
}

// Function to fetch a random meme and update the HTML
// Function to fetch a random meme and update the HTML
async function fetchRandomMeme() {
    try {
        const response = await fetch('https://meme-api.com/gimme/memes'); // Fetch meme from the API
        const memeData = await response.json();

        // Extract data from API response
        const memeUrl = memeData.url;

        // Update the DOM with the meme and apply dynamic resizing
        const memeContainer = document.getElementById('memeContainer');

        memeContainer.innerHTML = `
            <img id="memeImage" src="${memeUrl}" alt="Meme Image" style="max-width: 890px; max-height: 1500px; border: none;"/>
        `;

    } catch (error) {
        console.error('Error fetching meme:', error);
        document.getElementById('memeContainer').innerHTML = `<p>Error loading meme.</p>`;
    }
}


// Fetch a meme when the page loads
fetchRandomMeme();

// Set up the interval to fetch a new meme every minute (60000 milliseconds)
setInterval(fetchRandomMeme, 60000);

// Load images and start slideshow
loadImages();
