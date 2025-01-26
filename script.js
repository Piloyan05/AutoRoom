document.addEventListener('DOMContentLoaded', function() {
    // Language translation functionality
    const translations = {
        'hy': {
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


document.addEventListener('DOMContentLoaded', function() {
    const cars = document.querySelectorAll('.car-item');
    const brandFilter = document.getElementById('brand-filter');
    const minPriceFilter = document.getElementById('min-price');
    const maxPriceFilter = document.getElementById('max-price');

    function filterCars() {
        const selectedBrand = brandFilter.value.toLowerCase();
        const minPrice = parseInt(minPriceFilter.value) || 0;
        const maxPrice = parseInt(maxPriceFilter.value) || Number.MAX_VALUE;

        cars.forEach(car => {
            const carBrand = car.getAttribute('data-brand').toLowerCase();
            const carPrice = parseInt(car.getAttribute('data-price'));

            if ((selectedBrand === '' || carBrand === selectedBrand) &&
                carPrice >= minPrice && carPrice <= maxPrice) {
                car.style.display = 'block';
            } else {
                car.style.display = 'none';
            }
        });
    }

    document.querySelector('button').addEventListener('click', filterCars);
});


document.addEventListener('DOMContentLoaded', function() {
    const brandFilter = document.getElementById('brand-filter');
    const minPriceFilter = document.getElementById('min-price');
    const maxPriceFilter = document.getElementById('max-price');
    const carsGrid = document.getElementById('cars-grid');

    async function filterCars() {
        const selectedBrand = brandFilter.value;
        const minPrice = minPriceFilter.value || 0;
        const maxPrice = maxPriceFilter.value || '';

        try {
            const response = await fetch(`/api/cars?brand=${selectedBrand}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
            const cars = await response.json();
            
            carsGrid.innerHTML = '';
            
            cars.forEach(car => {
                const carElement = document.createElement('div');
                carElement.classList.add('car-item');
                carElement.innerHTML = `
                    <img src="${car.image}" alt="${car.name}">
                    <h3>${car.name}</h3>
                    <p>Price: $${car.price}</p>
                `;
                carsGrid.appendChild(carElement);
            });
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    }

    document.querySelector('button').addEventListener('click', filterCars);
});



const apiUrl = 'https://vr8qfrr9-7032.euw.devtunnels.ms/api/v1/car/getcars';

async function getCars() {
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',  // Change to 'POST' if needed
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Cars:', data);
  } catch (error) {
    console.error('Failed to fetch cars:', error);
  }
}
getCars();
