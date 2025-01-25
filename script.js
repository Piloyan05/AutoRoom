document.addEventListener('DOMContentLoaded', function() {
    // Language translation functionality
    const translations = {
        'hy': {
            'logo': 'ԼՈԳՈ',
            'partners': 'Գործընկերների համար',
            'cars': 'Մեքենաներ',
            'about': 'Մեր մասին',
            'contact': 'Կապ',
            'hero_title': 'Մենք Գնում ենք Ձեր Մեքենան',
            'hero_description': 'Աճուրդներ ամբողջ աշխարհից, առաքում Հայաստան',
            'cta_button': 'Սկսել հիմա',
            'about_us_title': 'Մեր մասին',
            'about_us_description': 'Մենք մասնագիտանում ենք ավտոմեքենաների ձեռքբերման հարցում միջազգային աճուրդներից և դրանց առաքման հարցում Հայաստան:',
            'cars_section_title': 'Մեքենաներ',
            'contact_us_title': 'Կապ մեզ հետ'
        },
        'ru': {
            'logo': 'ЛОГО',
            'partners': 'Для партнеров',
            'cars': 'Автомобили',
            'about': 'О нас',
            'contact': 'Контакт',
            'hero_title': 'Мы Покупаем Ваш Автомобиль',
            'hero_description': 'Аукционы по всему миру, доставка в Армению',
            'cta_button': 'Начать сейчас',
            'about_us_title': 'О нас',
            'about_us_description': 'Мы специализируемся на покупке автомобилей на международных аукционах и их доставке в Армению.',
            'cars_section_title': 'Автомобили',
            'contact_us_title': 'Связаться с нами'
        },
        'en': {
            'logo': 'LOGO',
            'partners': 'For Partners',
            'cars': 'Cars',
            'about': 'About Us',
            'contact': 'Contact',
            'hero_title': 'We Buy Your Car',
            'hero_description': 'Auctions from all over the world, delivery to Armenia',
            'cta_button': 'Get Started',
            'about_us_title': 'About Us',
            'about_us_description': 'We specialize in purchasing cars from international auctions and delivering them to Armenia.',
            'cars_section_title': 'Cars',
            'contact_us_title': 'Contact Us'
        }
    };

    const languageSelector = document.getElementById('language');
    languageSelector.addEventListener('change', function() {
        const selectedLanguage = this.value;
        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.getAttribute('data-lang-key');
            el.textContent = translations[selectedLanguage][key];
        });
    });

    // Carousel functionality
    const carousel = document.querySelector('.carousel-items');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const carItems = document.querySelectorAll('.car-item');
    const totalItems = carItems.length;
    const itemWidth = carItems[0].clientWidth;

    let index = 0;

    function updateCarousel() {
        carousel.style.transition = 'transform 0.5s ease-in-out';
        carousel.style.transform = `translateX(${-index * itemWidth}px)`;
    }

    nextBtn.addEventListener('click', function() {
        if (index >= totalItems) {
            index = 0;
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(0px)`;
            setTimeout(() => {
                carousel.style.transition = 'transform 0.5s ease-in-out';
                index++;
                updateCarousel();
            }, 50);
        } else {
            index++;
            updateCarousel();
        }
    });

    prevBtn.addEventListener('click', function() {
        if (index <= 0) {
            index = totalItems;
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(${-index * itemWidth}px)`;
            setTimeout(() => {
                carousel.style.transition = 'transform 0.5s ease-in-out';
                index--;
                updateCarousel();
            }, 50);
        } else {
            index--;
            updateCarousel();
        }
    });

    function cloneItems() {
        const firstClone = carItems[0].cloneNode(true);
        const lastClone = carItems[totalItems - 1].cloneNode(true);
        carousel.appendChild(firstClone);
        carousel.insertBefore(lastClone, carItems[0]);
    }

    cloneItems();
    carousel.style.transform = `translateX(${-itemWidth}px)`;
});
