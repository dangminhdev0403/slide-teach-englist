let currentSlide = 0;
let slides = document.querySelectorAll('.slide');
let timeLeft = 25 * 60;
let editMode = false;


function showSlide(n) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    updateProgressBar();
    updateSlideNumber();

    anime({
        targets: '.slide.active',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        easing: 'easeOutExpo'
    });
}

function updateProgressBar() {
    const progress = (currentSlide / (slides.length - 1)) * 100;
    document.querySelector('.progress-bar').style.width = `${progress}%`;
}

function updateSlideNumber() {
    document.querySelector('.slide-number').textContent =
        `Slide ${currentSlide + 1}/${slides.length}`;
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function toggleEdit() {
    editMode = !editMode;
    document.querySelectorAll('.editable').forEach(el => {
        el.contentEditable = editMode;
        el.classList.toggle('edit-mode', editMode);
    });
}

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.querySelector('.timer').textContent =
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (timeLeft > 0) {
        timeLeft--;
        setTimeout(updateTimer, 1000);
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
});

// Initialize
updateTimer();
updateProgressBar();
updateSlideNumber();

// Initial animation
anime({
    targets: '.slide-container',
    scale: [0.9, 1],
    opacity: [0, 1],
    duration: 1000,
    easing: 'easeOutExpo'
});

const clickOverlay = document.querySelector('.click-overlay');

clickOverlay.addEventListener('contextmenu', (e) => {
    e.preventDefault(); // Prevent context menu
    createRipple(e, 'rgba(255, 0, 0, 0.3)');
    prevSlide();
});

clickOverlay.addEventListener('click', (e) => {
    createRipple(e, 'rgba(0, 255, 0, 0.3)');
    nextSlide();
});

function createRipple(event, color) {
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = `${event.clientX}px`;
    ripple.style.top = `${event.clientY}px`;
    ripple.style.background = color;
    document.body.appendChild(ripple);

    anime({
        targets: ripple,
        scale: [0, 3],
        opacity: [1, 0],
        duration: 1000,
        easing: 'easeOutExpo',
        complete: () => ripple.remove()
    });
}

// Enhanced slide transitions
function showSlide(n) {
    const oldSlide = slides[currentSlide];
    slides[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    const newSlide = slides[currentSlide];
    slides[currentSlide].classList.add('active');
    updateProgressBar();
    updateSlideNumber();

    // Enhanced animations
    anime.timeline({
        easing: 'easeOutExpo'
    })
        .add({
            targets: oldSlide,
            opacity: [1, 0],
            translateX: ['0%', '-100%'],
            duration: 600
        })
        .add({
            targets: newSlide,
            opacity: [0, 1],
            translateX: ['100%', '0%'],
            duration: 600,
            offset: '-=400'
        });
}

// Enhanced progress bar animation
function updateProgressBar() {
    const progress = (currentSlide / (slides.length - 1)) * 100;
    anime({
        targets: '.progress-bar',
        width: `${progress}%`,
        duration: 400,
        easing: 'easeInOutQuad'
    });
}

// Touch support for mobile
let touchStartX = 0;
document.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
});

document.addEventListener('touchend', e => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) { // Minimum swipe distance
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
});

// Initialize
updateTimer();
updateProgressBar();
updateSlideNumber();

// Initial page load animation
anime({
    targets: '.slide.active',
    scale: [0.9, 1],
    opacity: [0, 1],
    duration: 1000,
    easing: 'easeOutExpo'
});


// Hàm hiển thị thông báo
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';

    // Ẩn thông báo sau 3 giây
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Hàm bật/tắt điều hướng slide bằng phím
function toggleArrowNavigation() {
    arrowNavigationEnabled = !arrowNavigationEnabled;
    const status = arrowNavigationEnabled ? 'bật' : 'tắt';
    showNotification(`Điều hướng bằng phím mũi tên đã ${status}.`);
}

// Cập nhật sự kiện keydown để sử dụng arrowNavigationEnabled
document.addEventListener('keydown', (e) => {
  
    if (e.key === 'a') toggleArrowNavigation(); // Nhấn 'a' để bật/tắt
    if (arrowNavigationEnabled ==false) {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
        
        
    }
  
});
