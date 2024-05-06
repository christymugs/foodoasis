/**
 * Function to add event listener on multiple elements
 */
const addEventOnElements = function (elements, eventType, callback) {
    for (let i = 0, len = elements.length; i < len; i++) {
        elements[i].addEventListener(eventType, callback);
    }
}

/**
 * Function to update the user's location
 */
const updateUserLocation = function (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Use latitude and longitude to fetch the location using a service like reverse geocoding
    // For demonstration, let's just display the coordinates
    const userLocation = `Latitude: ${latitude}, Longitude: ${longitude}`;
    document.getElementById("user-location").textContent = userLocation;
};

/**
 * Function to handle errors if geolocation retrieval fails
 */
const handleLocationError = function (error) {
    console.error("Error getting user's location:", error);
    document.getElementById("user-location").textContent = "Location not available";
};

/**
 * Function to fetch user's location
 */
const getUserLocation = function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(updateUserLocation, handleLocationError);
    } else {
        console.error("Geolocation is not supported by this browser.");
        document.getElementById("user-location").textContent = "Location not available";
    }
};

/**
 * Function to toggle the navbar
 */
const toggleNavbar = function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
}

/**
 * Function to hide header on scroll
 */
const hideHeader = function () {
    const isScrollBottom = lastScrollPos < window.scrollY;
    if (isScrollBottom) {
        header.classList.add("hide");
    } else {
        header.classList.remove("hide");
    }

    lastScrollPos = window.scrollY;
}

/**
 * Function to update slider position
 */
const updateSliderPos = function () {
    lastActiveSliderItem.classList.remove("active");
    heroSliderItems[currentSlidePos].classList.add("active");
    lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

/**
 * Function for next slide
 */
const slideNext = function () {
    if (currentSlidePos >= heroSliderItems.length - 1) {
        currentSlidePos = 0;
    } else {
        currentSlidePos++;
    }

    updateSliderPos();
}

/**
 * Function for previous slide
 */
const slidePrev = function () {
    if (currentSlidePos <= 0) {
        currentSlidePos = heroSliderItems.length - 1;
    } else {
        currentSlidePos--;
    }

    updateSliderPos();
}

/**
 * Function for auto slide
 */
const autoSlide = function () {
    autoSlideInterval = setInterval(function () {
        slideNext();
    }, 7000);
}

/**
 * Function to handle mouseover and mouseout events on slider buttons
 */
const handleSliderButtonHover = function () {
    clearInterval(autoSlideInterval);
};

/**
 * Function to handle window load event
 */
window.addEventListener("load", function () {
    preloader.classList.add("loaded");
    document.body.classList.add("loaded");
    getUserLocation();
    autoSlide();
});

/**
 * Function to handle scroll event
 */
window.addEventListener("scroll", function () {
    if (window.scrollY >= 50) {
        header.classList.add("active");
        backTopBtn.classList.add("active");
        hideHeader();
    } else {
        header.classList.remove("active");
        backTopBtn.classList.remove("active");
    }
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", handleSliderButtonHover);
addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

/**
 * Function to handle click event on navbar toggler buttons
 */
addEventOnElements(navTogglers, "click", toggleNavbar);

/**
 * Function to handle click event on slider navigation buttons
 */
heroSliderNextBtn.addEventListener("click", slideNext);
heroSliderPrevBtn.addEventListener("click", slidePrev);
// Function to handle errors if geolocation retrieval fails
