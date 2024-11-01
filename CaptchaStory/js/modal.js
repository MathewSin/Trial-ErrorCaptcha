let captchaTimeout; // Global variable to hold timeout

function showCaptchaPopup() {
    const modal = document.getElementById("captchaModal");
    const captchaContent = document.getElementById("captcha-content");

    // Load random CAPTCHA
    loadRandomCaptcha(captchaContent);

    modal.style.display = "block"; // Show the modal

    // Close the modal when user clicks on <span> (x)
    document.getElementById("closeModal").onclick = function() {
        modal.style.display = "none";
        clearTimeout(captchaTimeout); // Clear timeout if user closes manually
    };

    // Close the modal if user clicks outside of it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            clearTimeout(captchaTimeout); // Clear timeout if user clicks outside
        }
    };
}

// Function to mark CAPTCHA as completed and hide the modal
function completeCaptcha() {
    clearTimeout(captchaTimeout); // Clear timeout when CAPTCHA is completed
    const modal = document.getElementById("captchaModal");
    modal.style.display = "none"; // Hide modal
    window.location.href = 'home.html'; // Redirect to home page
}

// Function to reload the CAPTCHA after incorrect answer
function reloadCaptcha() {
    const captchaContent = document.getElementById("captcha-content");
    captchaContent.innerHTML = ''; // Clear existing CAPTCHA content
    loadRandomCaptcha(captchaContent); // Load new random CAPTCHA
}

function loadRandomCaptcha(captchaContent) {
    const captchaPages = ['page1.html', 'page2.html', 'page3.html'];
    const randomIndex = Math.floor(Math.random() * captchaPages.length);
    const randomPage = `${captchaPages[randomIndex]}?t=${Date.now()}`;

    fetch(randomPage)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            captchaContent.innerHTML = html;

            // Set data-type based on the loaded page
            if (randomPage.includes('page1.html')) {
                captchaContent.setAttribute('data-type', 'house');
            } else if (randomPage.includes('page2.html')) {
                captchaContent.setAttribute('data-type', 'fruit');
            } else if (randomPage.includes('page3.html')) {
                captchaContent.setAttribute('data-type', 'animal');
            }

            // Initialize the CAPTCHA event listeners
            initializeCaptcha(captchaContent.getAttribute('data-type'));

            // Restart the timeout for CAPTCHA
            restartCaptchaTimeout();
        })
        .catch(error => {
            console.error('Error loading CAPTCHA:', error);
            Swal.fire({
                title: "Error loading CAPTCHA",
                text: "Please try again later.",
                icon: "error",
                confirmButtonText: "OK"
            });
        });
}

// Function to restart CAPTCHA timeout
function restartCaptchaTimeout() {
    clearTimeout(captchaTimeout); // Clear previous timeout
    captchaTimeout = setTimeout(() => {
        Swal.fire({
            title: "CAPTCHA Failed",
            text: "Time limit exceeded. Please try logging in again.",
            icon: "error",
            confirmButtonText: "OK"
        }).then(() => {
            const modal = document.getElementById("captchaModal");
            modal.style.display = "none"; // Close the modal
            resetLogin(); // Reset login form and error message
        });
    }, 10000); // 10 seconds
}

// Initialize CAPTCHA event listeners based on type
function initializeCaptcha(captchaType) {
    console.log('Initializing CAPTCHA of type:', captchaType);
    if (captchaType === 'fruit') {
        initializeFruitCaptcha(); // Initialize fruit-related event listeners
    } else if (captchaType === 'house') {
        initializeHouseCaptcha(); // Initialize house-related event listeners
    } else if (captchaType === 'animal') {
        initializeAnimalCaptcha(); // Initialize animal-related event listeners
    } else {
        console.error('Unknown CAPTCHA type:', captchaType);
    }
}


// Initialize the CAPTCHA with drag-and-drop for fruit
function initializeFruitCaptcha() {
    const carrotImage = document.getElementById('carrot');
    const appleImage = document.getElementById('apple');
    const bananaImage = document.getElementById('banana');

    if (!carrotImage || !appleImage || !bananaImage) {
        console.error('CAPTCHA images not found. Make sure the fruit images are loaded correctly.');
        return;
    }

    const images = [carrotImage, appleImage, bananaImage];

    // Acak urutan gambar
    for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        images[i].parentNode.appendChild(images[j]);
    }

    // Set draggable attribute on the correct answer
    carrotImage.setAttribute('draggable', 'true');
    carrotImage.id = 'draggable'; // Set the ID for drag-and-drop
    appleImage.id = 'apple';
    bananaImage.id = 'banana';

    // Set dragstart event listener
    carrotImage.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text/plain', 'draggable');
    });

    // Enable drag-and-drop functionality
    enableDragAndDrop('fruit');
}

// Sama untuk rumah dan hewan
function initializeHouseCaptcha() {
    const rabbitHouseImage = document.getElementById('rabbitHouse');
    const dogHouseImage = document.getElementById('dogHouse');
    const catHouseImage = document.getElementById('catHouse');

    if (!rabbitHouseImage || !dogHouseImage || !catHouseImage) {
        console.error('CAPTCHA images not found. Make sure the house images are loaded correctly.');
        return;
    }

    const images = [rabbitHouseImage, dogHouseImage, catHouseImage];

    // Acak urutan gambar
    for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        images[i].parentNode.appendChild(images[j]);
    }

    // Set draggable attribute pada gambar yang benar
    rabbitHouseImage.setAttribute('draggable', 'true');
    rabbitHouseImage.id = 'draggable'; // Set ID untuk drag-and-drop
    dogHouseImage.id = 'dogHouse';
    catHouseImage.id = 'catHouse';

    // Set dragstart event listener
    rabbitHouseImage.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text/plain', 'draggable');
    });

    // Enable drag-and-drop functionality
    enableDragAndDrop('house');
}

// Untuk hewan juga
function initializeAnimalCaptcha() {
    const fishImage = document.getElementById('fish');
    const birdImage = document.getElementById('bird');
    const turtleImage = document.getElementById('turtle');

    if (!fishImage || !birdImage || !turtleImage) {
        console.error('CAPTCHA images not found. Make sure the animal images are loaded correctly.');
        return;
    }

    const images = [fishImage, birdImage, turtleImage];

    // Acak urutan gambar
    for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        images[i].parentNode.appendChild(images[j]);
    }

    // Set draggable attribute on the correct answer
    turtleImage.setAttribute('draggable', 'true');
    turtleImage.id = 'draggable'; // Set the ID for drag-and-drop
    fishImage.id = 'fish';
    birdImage.id = 'bird';

    // Set dragstart event listener
    turtleImage.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text/plain', 'draggable');
    });

    // Enable drag-and-drop functionality
    enableDragAndDrop('animal');
}


// Function to add drag-and-drop capabilities
// Function to enable drag-and-drop capabilities
function enableDragAndDrop(captchaType) {
    const dropZone = document.getElementById('dropBox');

    // Allow Drop
    dropZone.addEventListener('dragover', function(event) {
        event.preventDefault(); // Prevent default to allow drop
        dropZone.classList.add('dragover'); // Add class for visual feedback
    });

    // Handle Drop for Mouse
    dropZone.addEventListener('drop', function(event) {
        event.preventDefault();
        handleDrop(event);
    });

    // Handle Drop for Touch
    dropZone.addEventListener('touchend', function(event) {
        const touch = event.changedTouches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        if (element && element.draggable) {
            handleDrop({ dataTransfer: { getData: () => 'draggable' } });
        }
    });

    dropZone.addEventListener('dragleave', function() {
        dropZone.classList.remove('dragover'); // Remove class after drag leave
    });
}

// Function to handle the drop logic
function handleDrop(event) {
    const data = event.dataTransfer ? event.dataTransfer.getData('text/plain') : 'draggable';
    if (data === 'draggable') {
        Swal.fire({
            title: "Correct!",
            text: "CAPTCHA completed successfully.",
            icon: "success",
            confirmButtonText: "OK"
        }).then(() => {
            completeCaptcha();
        });
    } else {
        Swal.fire({
            title: "Incorrect!",
            text: "Try dragging the correct image!",
            icon: "error",
            confirmButtonText: "OK"
        }).then(() => {
            reloadCaptcha();
        });
    }
}


// Reset login form and error message
function resetLogin() {
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('error-message').textContent = '';

    // Reset CAPTCHA requirement
    if (captchaRequired) {
        showCaptchaPopup(); // Show CAPTCHA again for the user to try again
    } else {
        captchaCompleted = false; // Reset CAPTCHA completion status
    }
}
