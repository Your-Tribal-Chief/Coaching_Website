// // const carouselContainer = document.querySelector('.carousel-container');
// // const images = carouselContainer.querySelectorAll('img');
// // const prevBtn = document.getElementById('prev');
// // const nextBtn = document.getElementById('next');

// // let currentIndex = 0;

// // function showImage(index) {
// //     const width = images[0].clientWidth;
// //     carouselContainer.style.transform = `translateX(-${index * width}px)`;
// // }

// // prevBtn.addEventListener('click', () => {
// //     currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
// //     showImage(currentIndex);
// // });

// // nextBtn.addEventListener('click', () => {
// //     currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
// //     showImage(currentIndex);
// // });

// // // Initialize
// // showImage(currentIndex);

// let currentSlide = 0;

// function moveSlide(direction) {
//     const carouselInner = document.querySelector('.carousel-inner');
//     const totalSlides = carouselInner.children.length;

//     currentSlide += direction;

//     if (currentSlide < 0) {
//         currentSlide = totalSlides - 1;
//     } else if (currentSlide >= totalSlides) {
//         currentSlide = 0;
//     }

//     const offset = -currentSlide * 100;
//     carouselInner.style.transform = `translateX(${offset}%)`;
// }
let currentSlide = 0;

// Function to update carousel position
function updateCarousel() {
    const carouselInner = document.querySelector('.carousel-inner');
    const totalSlides = document.querySelectorAll('.carousel-item').length;

    // Move to the calculated position
    const offset = -currentSlide * 100;
    carouselInner.style.transform = `translateX(${offset}%)`;

    // Wrap around logic
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
}

// Function to handle manual navigation
function moveSlide(direction) {
    const totalSlides = document.querySelectorAll('.carousel-item').length;

    currentSlide += direction;

    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }

    updateCarousel();
}

// Auto-slide functionality
setInterval(() => {
    currentSlide++;
    updateCarousel();
}, 2000);

// Initial setup
updateCarousel();