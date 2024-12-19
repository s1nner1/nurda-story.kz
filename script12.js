// 1. Плавный скроллинг при переходе по якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// 2. Появление элементов с анимацией при прокрутке страницы
const sections = document.querySelectorAll('section');

const appearOptions = {
    threshold: 0.1 // Элемент появляется, когда 10% его площади становится видимым
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
        }
    });
}, appearOptions);

sections.forEach(section => {
    section.classList.add('hidden');
    appearOnScroll.observe(section);
});

// 3. Фиксация меню при прокрутке страницы
const navbar = document.querySelector('header');
const sticky = navbar.offsetTop;

function stickyNavbar() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
}

window.onscroll = function () {
    stickyNavbar();
};

// 4. Отображение текущей даты и времени в подвале
function updateDateTime() {
    const dateTimeElement = document.getElementById('datetime');
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formattedDateTime = now.toLocaleString('ru-RU', options);
    dateTimeElement.textContent = formattedDateTime;
}

setInterval(updateDateTime, 1000); // обновление каждую секунду
