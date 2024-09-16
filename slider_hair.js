document.addEventListener('DOMContentLoaded', function () {
    // Function to initialize slider functionality
    function initializeSlider(sliderContainerClass, prevButtonClass, nextButtonClass) {
        const sliderContainer = document.querySelector(`.${sliderContainerClass}`);
        const slides = sliderContainer.querySelectorAll('.slide');
        const prevButton = document.querySelector(`.${prevButtonClass}`);
        const nextButton = document.querySelector(`.${nextButtonClass}`);
        let currentIndex = 0;

        // Function to move slider
        function moveToSlide(index) {
            sliderContainer.querySelector('.slider-wrapper').style.transform = `translateX(-${index * 100}%)`;
        }

        // Click event for next button
        nextButton.addEventListener('click', function () {
            currentIndex = (currentIndex + 1) % slides.length;
            moveToSlide(currentIndex);
        });

        // Click event for previous button
        prevButton.addEventListener('click', function () {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            moveToSlide(currentIndex);
        });

        // Auto slide every 3 seconds
        setInterval(function () {
            currentIndex = (currentIndex + 1) % slides.length;
            moveToSlide(currentIndex);
        }, 300); // 3000ms = 3 seconds
    }

    // Initialize sliders for facial makeup and hair color
    initializeSlider('image-slider-facial', 'prev-facial', 'next-facial');
    initializeSlider('image-slider-hair', 'prev-hair', 'next-hair');
});
