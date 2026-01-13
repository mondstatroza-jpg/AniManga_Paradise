const PRODUCTS_PER_PAGE = 8;
const PRODUCTS_DATA = {
    all: [],
    manga: [
        { id: 1, title: "Наруто. Том 1: Узумаки Наруто", author: "Масаси Кишимото", category: "Манга • Сёнэн", price: 849, oldPrice: 999, image: "https://i.pinimg.com/736x/89/4e/10/894e10bcc72701d75ad08d31546bf225.jpg", genre: ["экшен", "сёнэн"], age: "12+", status: "вышел", badge: "хит", rating: 4.8, inStock: true, type: "manga" },
        { id: 2, title: "Атака титанов. Том 13: Последний бой", author: "Хадзимэ Исаяма", category: "Манга • Драма", price: 1099, oldPrice: null, image: "https://i.pinimg.com/1200x/2a/ff/2d/2aff2d288c4245170cd0ea0718a7125c.jpg", genre: ["драма", "фэнтези"], age: "16+", status: "вышел", badge: "новинка", rating: 4.9, inStock: true, type: "manga" },
        { id: 3, title: "Человек-бензопила. Том 10", author: "Тацуки Фудзимото", category: "Манга • Экшен", price: 799, oldPrice: 899, image: "https://i.pinimg.com/1200x/26/6d/50/266d50e490378dae90fdf14cbcf53e41.jpg", genre: ["экшен", "сёнэн"], age: "16+", status: "выпускается", badge: null, rating: 4.7, inStock: true, type: "manga" },
        { id: 4, title: "Моя геройская академия. Том 39", author: "Кохэй Хорикоси", category: "Манга • Сёнэн", price: 899, oldPrice: 1099, image: "https://i.pinimg.com/1200x/ac/40/65/ac4065bafd606ac2132cfd88c6d8978f.jpg", genre: ["экшен", "сёнэн"], age: "12+", status: "вышел", badge: "скидка", rating: 4.6, inStock: true, type: "manga" },
        { id: 5, title: "Ван Пис. Том 100: Путь к мечте", author: "Эйитиро Ода", category: "Манга • Приключения", price: 949, oldPrice: null, image: "https://i.pinimg.com/736x/ee/e8/b4/eee8b4e823ed5b2123eedc0e6e18680b.jpg", genre: ["приключения", "комедия"], age: "12+", status: "выпускается", badge: null, rating: 4.8, inStock: true, type: "manga" },
        { id: 6, title: "Магическая битва. Том 4", author: "Гэгэ Акутами", category: "Манга • Фэнтези", price: 849, oldPrice: null, image: "https://i.pinimg.com/1200x/eb/96/6e/eb966e6747943bf5aaf26caf9edc9766.jpg", genre: ["фэнтези", "экшен"], age: "16+", status: "выпускается", badge: "эксклюзив", rating: 4.7, inStock: true, type: "manga" },
        { id: 7, title: "Блич. Том 74: Последний стих", author: "Тайто Кубо", category: "Манга • Сёнэн", price: 899, oldPrice: 999, image: "https://i.pinimg.com/1200x/1a/e7/aa/1ae7aa19dbd7dd790586a8b364375716.jpg", genre: ["экшен", "фэнтези"], age: "16+", status: "вышел", badge: null, rating: 4.5, inStock: true, type: "manga" },
        { id: 8, title: "Истребитель демонов. Том 23", author: "Койохару Готогэ", category: "Манга • Фэнтези", price: 799, oldPrice: null, image: "https://i.pinimg.com/736x/38/ca/29/38ca29a15acbb90d1004259916e44805.jpg", genre: ["фэнтези", "экшен"], age: "16+", status: "вышел", badge: "бестселлер", rating: 4.9, inStock: true, type: "manga" }
    ],
    manhwa: [
        { id: 9, title: "Соло Левеллинг. Том 1", author: "Chugong", category: "Манхва • Фэнтези", price: 899, oldPrice: null, image: "https://i.pinimg.com/736x/0b/ce/a2/0bcea2d4089d790c13c3fcfcd7ba2f27.jpg", genre: ["фэнтези", "экшен"], age: "16+", status: "вышел", badge: "новинка", rating: 4.8, inStock: true, type: "manhwa" },
        { id: 10, title: "Возвращение героя. Том 1", author: "UU", category: "Манхва • Фэнтези", price: 849, oldPrice: null, image: "https://i.pinimg.com/736x/3c/78/28/3c7828d4136ff1b364a0a1e4fd074e28.jpg", genre: ["фэнтези", "приключения"], age: "16+", status: "выпускается", badge: null, rating: 4.6, inStock: true, type: "manhwa" }
    ],
    manhua: [
        { id: 11, title: "Король мертвецов. Том 1", author: "Er Gen", category: "Маньхуа • Фэнтези", price: 799, oldPrice: null, image: "https://i.pinimg.com/736x/2a/33/c5/2a33c5fb8f8491296bfd58a9bf96b1b7.jpg", genre: ["фэнтези", "приключения"], age: "16+", status: "вышел", badge: null, rating: 4.5, inStock: true, type: "manhua" },
        { id: 12, title: "Путь бессмертного. Том 1", author: "Wang Yu", category: "Маньхуа • Фэнтези", price: 849, oldPrice: 999, image: "https://i.pinimg.com/1200x/0d/e7/a0/0de7a0c0a741f1aa823efd925443146c.jpg", genre: ["фэнтези", "экшен"], age: "18+", status: "выпускается", badge: "хит", rating: 4.7, inStock: true, type: "manhua" }
    ],
    comics: [
        { id: 13, title: "Человек-паук. Том 1", author: "Stan Lee", category: "Комиксы • Супергерои", price: 1299, oldPrice: 1499, image: "https://i.pinimg.com/1200x/cc/4b/50/cc4b508e706fa280c3725dda0a8bdca4.jpg", genre: ["супергерои", "экшен"], age: "12+", status: "вышел", badge: "скидка", rating: 4.7, inStock: true, type: "comics" },
        { id: 14, title: "Бэтмен. Том 1", author: "Bob Kane", category: "Комиксы • Супергерои", price: 1199, oldPrice: null, image: "https://i.pinimg.com/1200x/c6/2b/9a/c62b9a9c562361a28746de93b9f7bd1c.jpg", genre: ["супергерои", "детектив"], age: "16+", status: "вышел", badge: null, rating: 4.8, inStock: true, type: "comics" }
    ]
};

// Объединяем все товары для категории "all"
PRODUCTS_DATA.all = [...PRODUCTS_DATA.manga, ...PRODUCTS_DATA.manhwa, ...PRODUCTS_DATA.manhua, ...PRODUCTS_DATA.comics];

let currentFilters = {
    type: 'all',
    genres: [],
    age: [],
    status: [],
    priceMin: 0,
    priceMax: 10000,
    search: '',
    sort: 'popular'
};

let currentPage = 1;
let totalPages = 1;
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', function () {
    initCatalog();
});

function initCatalog() {
    loadTheme();
    initFilters();
    initEvents();
    loadProducts();
    updateCartCount();
}

// ===== ТЕМА =====
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.className = savedTheme + '-theme';

    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.theme === savedTheme) {
            btn.classList.add('active');
        }
    });

    const themeLogo = document.getElementById('themeLogo');
    if (themeLogo) {
        themeLogo.className = savedTheme === 'light' ? 'fas fa-sun' :
            savedTheme === 'dark' ? 'fas fa-moon' : 'fas fa-heart';
    }
}

// ===== ФИЛЬТРЫ =====
function initFilters() {
    // Переключатели типа
    document.querySelectorAll('.type-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilters.type = btn.dataset.type;
            currentPage = 1;
            loadProducts();
            showNotification(`Показаны: ${btn.textContent}`, 'info');
        });
    });

    // Чекбоксы жанров
    document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateGenresFilter();
        });
    });

    // Возрастной рейтинг
    document.querySelectorAll('.filter-option input[name="age"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateAgeFilter();
        });
    });

    // Статус
    document.querySelectorAll('.filter-option input[name="status"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateStatusFilter();
        });
    });

    // Цена
    const priceMinInput = document.getElementById('priceMin');
    const priceMaxInput = document.getElementById('priceMax');
    const priceRangeMin = document.getElementById('priceRangeMin');
    const priceRangeMax = document.getElementById('priceRangeMax');

    if (priceMinInput && priceMaxInput && priceRangeMin && priceRangeMax) {
        priceMinInput.addEventListener('input', () => {
            const value = Math.min(parseInt(priceMinInput.value) || 0, currentFilters.priceMax);
            priceMinInput.value = value;
            priceRangeMin.value = value;
            currentFilters.priceMin = value;
        });

        priceMaxInput.addEventListener('input', () => {
            const value = Math.max(parseInt(priceMaxInput.value) || 10000, currentFilters.priceMin);
            priceMaxInput.value = value;
            priceRangeMax.value = value;
            currentFilters.priceMax = value;
        });

        priceRangeMin.addEventListener('input', () => {
            const value = parseInt(priceRangeMin.value);
            priceMinInput.value = value;
            currentFilters.priceMin = value;
        });

        priceRangeMax.addEventListener('input', () => {
            const value = parseInt(priceRangeMax.value);
            priceMaxInput.value = value;
            currentFilters.priceMax = value;
        });
    }

    // Поиск
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', () => {
            currentFilters.search = searchInput.value.trim();
            currentPage = 1;
            loadProducts();
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                currentFilters.search = searchInput.value.trim();
                currentPage = 1;
                loadProducts();
            }
        });
    }

    // Сортировка
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentFilters.sort = e.target.value;
            loadProducts();
        });
    }

    // Кнопки фильтров
    document.getElementById('applyFilters')?.addEventListener('click', () => {
        currentPage = 1;
        loadProducts();
        showNotification('Фильтры применены', 'success');
    });

    document.getElementById('resetFilters')?.addEventListener('click', () => {
        resetFilters();
    });

    document.getElementById('clearFilters')?.addEventListener('click', () => {
        resetFilters();
    });
}

function updateGenresFilter() {
    currentFilters.genres = Array.from(
        document.querySelectorAll('.filter-options input[type="checkbox"]:checked')
    ).map(cb => cb.value);
}

function updateAgeFilter() {
    currentFilters.age = Array.from(
        document.querySelectorAll('input[name="age"]:checked')
    ).map(cb => cb.value);
}

function updateStatusFilter() {
    currentFilters.status = Array.from(
        document.querySelectorAll('input[name="status"]:checked')
    ).map(cb => cb.value);
}

function resetFilters() {
    // Сброс чекбоксов
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });

    // Сброс типа
    document.querySelectorAll('.type-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.type === 'all') {
            btn.classList.add('active');
        }
    });

    // Сброс цены
    document.getElementById('priceMin').value = '';
    document.getElementById('priceMax').value = '';
    document.getElementById('priceRangeMin').value = 0;
    document.getElementById('priceRangeMax').value = 10000;

    // Сброс поиска
    document.getElementById('searchInput').value = '';

    // Сброс сортировки
    document.getElementById('sortSelect').value = 'popular';

    // Сброс фильтров
    currentFilters = {
        type: 'all',
        genres: [],
        age: [],
        status: [],
        priceMin: 0,
        priceMax: 10000,
        search: '',
        sort: 'popular'
    };

    currentPage = 1;
    loadProducts();
    showNotification('Все фильтры сброшены', 'info');
}

// ===== ЗАГРУЗКА ТОВАРОВ =====
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    // Показать индикатор загрузки
    productsGrid.innerHTML = `
        <div class="loading-indicator">
            <div class="loading-spinner"></div>
            <p>Загрузка товаров...</p>
        </div>
    `;

    // Имитация загрузки
    setTimeout(() => {
        let products = [...PRODUCTS_DATA[currentFilters.type]];

        // Применение фильтров
        products = applyFilters(products);

        // Сортировка
        products = sortProducts(products);

        // Пагинация
        const totalProducts = products.length;
        totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
        const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
        const endIndex = startIndex + PRODUCTS_PER_PAGE;
        const paginatedProducts = products.slice(startIndex, endIndex);

        // Обновление счетчика
        updateProductsCount(totalProducts);

        // Обновление пагинации
        updatePagination();

        // Отображение товаров
        if (paginatedProducts.length === 0) {
            productsGrid.innerHTML = `
                <div class="empty-results">
                    <i class="fas fa-search"></i>
                    <h3>Ничего не найдено</h3>
                    <p>Попробуйте изменить параметры поиска или сбросить фильтры</p>
                    <button class="btn-primary" onclick="resetFilters()">
                        <i class="fas fa-redo"></i> Сбросить фильтры
                    </button>
                </div>
            `;
        } else {
            productsGrid.innerHTML = paginatedProducts.map((product, index) => `
                <div class="product-card" style="animation-delay: ${index * 0.1}s;">
                    ${product.badge ? `<div class="product-badge ${product.badge}">${getBadgeText(product.badge)}</div>` : ''}
                    ${!product.inStock ? '<div class="product-badge out-of-stock">Нет в наличии</div>' : ''}
                    
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.title}" loading="lazy">
                    </div>
                    
                    <div class="product-info">
                        <div class="product-category">
                            <i class="fas fa-book"></i> ${product.category}
                        </div>
                        <h3 class="product-title">${product.title}</h3>
                        <div class="product-author">${product.author}</div>
                        
                        <div class="product-price">
                            <span class="price-current">${formatPrice(product.price)}</span>
                            ${product.oldPrice ? `<span class="price-old">${formatPrice(product.oldPrice)}</span>` : ''}
                        </div>
                        
                        <div class="product-rating">
                            ${renderStars(product.rating)}
                            <span class="rating-value">${product.rating}</span>
                        </div>
                        
                        <div class="product-actions">
                            <button class="btn-add-cart" onclick="addToCartFromCatalog(${product.id})"
                                <i class="fas fa-shopping-cart"></i> ${!product.inStock ? 'Нет в наличии' : 'В корзину'}
                            </button>
                            <button class="btn-favorite ${favorites.includes(product.id) ? 'active' : ''}" onclick="toggleFavorite(${product.id}, this)">
                                <i class="${favorites.includes(product.id) ? 'fas' : 'far'} fa-heart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }, 500);
}

function applyFilters(products) {
    return products.filter(product => {
        // Фильтр по жанрам
        if (currentFilters.genres.length > 0) {
            const hasGenre = currentFilters.genres.some(genre =>
                product.genre.includes(genre.toLowerCase())
            );
            if (!hasGenre) return false;
        }

        // Фильтр по возрасту
        if (currentFilters.age.length > 0) {
            if (!currentFilters.age.includes(product.age)) return false;
        }

        // Фильтр по статусу
        if (currentFilters.status.length > 0) {
            if (!currentFilters.status.includes(product.status)) return false;
        }

        // Фильтр по цене
        if (product.price < currentFilters.priceMin || product.price > currentFilters.priceMax) {
            return false;
        }

        // Фильтр по поиску
        if (currentFilters.search) {
            const searchTerm = currentFilters.search.toLowerCase();
            const title = product.title.toLowerCase();
            const author = product.author.toLowerCase();
            if (!title.includes(searchTerm) && !author.includes(searchTerm)) {
                return false;
            }
        }

        return true;
    });
}

function sortProducts(products) {
    switch (currentFilters.sort) {
        case 'new':
            return [...products].sort((a, b) => b.id - a.id);
        case 'price-low':
            return [...products].sort((a, b) => a.price - b.price);
        case 'price-high':
            return [...products].sort((a, b) => b.price - a.price);
        case 'rating':
            return [...products].sort((a, b) => b.rating - a.rating);
        case 'name':
            return [...products].sort((a, b) => a.title.localeCompare(b.title));
        case 'popular':
        default:
            return [...products].sort((a, b) => {
                // Сначала товары с бейджами, потом по рейтингу
                const aHasBadge = a.badge !== null;
                const bHasBadge = b.badge !== null;
                if (aHasBadge && !bHasBadge) return -1;
                if (!aHasBadge && bHasBadge) return 1;
                return b.rating - a.rating;
            });
    }
}

function formatPrice(price) {
    return price.toLocaleString('ru-RU') + ' ₽';
}

function getBadgeText(badge) {
    const badgeTexts = {
        'хит': 'ХИТ',
        'новинка': 'НОВИНКА',
        'скидка': '-15%',
        'эксклюзив': 'ЭКСКЛЮЗИВ',
        'бестселлер': 'БЕСТСЕЛЛЕР'
    };
    return badgeTexts[badge] || badge.toUpperCase();
}

function renderStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

function updateProductsCount(count) {
    const countElement = document.getElementById('productsCount');
    if (countElement) {
        countElement.textContent = `Найдено ${count} товаров`;
    }
}

// ===== ПАГИНАЦИЯ =====
function updatePagination() {
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const pageNumbers = document.getElementById('pageNumbers');

    if (!prevBtn || !nextBtn || !pageNumbers) return;

    // Обновление состояния кнопок
    prevBtn.classList.toggle('disabled', currentPage === 1);
    nextBtn.classList.toggle('disabled', currentPage === totalPages);

    // Обновление номеров страниц
    pageNumbers.innerHTML = '';
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-number ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            loadProducts();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        pageNumbers.appendChild(pageBtn);
    }
}

// ===== КОРЗИНА =====
function addToCart(productId) {
    console.log('Функция addToCart вызвана с productId:', productId);

    const product = getAllProducts().find(p => p.id === productId);
    console.log('Найден товар:', product);

    if (!product) {
        console.error('Товар не найден');
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Текущая корзина (до добавления):', cart);

    if (existingItem) {
        existingItem.quantity += 1;
        console.log('Увеличен quantity товара:', existingItem);
    } else {
        cart.push({
            id: product.id,
            name: product.title,
            category: product.category,
            price: product.price,
            oldPrice: product.oldPrice || null,
            image: product.image,
            quantity: 1,
            fandom: product.genre?.[0] || 'аниме',
            size: null
        });
        console.log('Добавлен новый товар в корзину:', product);
    }

    // Сохраняем в localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    // Анимация кнопки
    const button = event.target.closest('.btn-add-cart');
    if (button) {
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Добавлено';
        button.style.background = 'var(--success-color)';
        button.disabled = true;

        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.background = '';
            button.disabled = !product.inStock;
        }, 2000);
    }

    showNotification(`"${product.title}" добавлен в корзину`, 'success');
    console.log('Корзина (после добавления):', JSON.parse(localStorage.getItem('cart')));
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(element => {
        element.textContent = totalItems;
    });
}

function addToCartFromCatalog(productId) {
    const product = getAllProducts().find(p => p.id === productId);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Проверяем, есть ли товар уже в корзине
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.title,
            category: product.category,
            price: product.price,
            image: product.image,
            quantity: 1,
            fandom: product.genre?.[0] || 'аниме',
            size: null
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    // Анимация и уведомление
    const button = event.target.closest('.btn-add-cart');
    if (button) {
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Добавлено';
        button.style.background = 'var(--success-color)';
        button.disabled = true;

        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.background = '';
            button.disabled = !product.inStock;
        }, 2000);
    }

    showNotification(`"${product.title}" добавлен в корзину`, 'success');
}

// ===== ИЗБРАННОЕ =====
function toggleFavorite(productId, button) {
    const index = favorites.indexOf(productId);

    if (index === -1) {
        favorites.push(productId);
        button.classList.add('active');
        button.innerHTML = '<i class="fas fa-heart"></i>';
        showNotification('Добавлено в избранное', 'success');
    } else {
        favorites.splice(index, 1);
        button.classList.remove('active');
        button.innerHTML = '<i class="far fa-heart"></i>';
        showNotification('Удалено из избранного', 'info');
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// ===== УТИЛИТЫ =====
function getAllProducts() {
    return [...PRODUCTS_DATA.manga, ...PRODUCTS_DATA.manhwa, ...PRODUCTS_DATA.manhua, ...PRODUCTS_DATA.comics];
}

function showNotification(message, type = 'info') {
    const container = document.getElementById('notificationContainer');
    if (!container) return;

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    const icons = {
        'success': 'fa-check-circle',
        'error': 'fa-times-circle',
        'warning': 'fa-exclamation-triangle',
        'info': 'fa-info-circle'
    };

    notification.innerHTML = `
        <i class="fas ${icons[type] || 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;

    container.appendChild(notification);

    // Автоматическое удаление
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);

    // Закрытие по клику
    notification.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
}

// ===== СОБЫТИЯ =====
function initEvents() {
    // Переключение темы
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const theme = this.dataset.theme;
            document.body.className = theme + '-theme';
            localStorage.setItem('theme', theme);

            document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const themeLogo = document.getElementById('themeLogo');
            if (themeLogo) {
                themeLogo.className = theme === 'light' ? 'fas fa-sun' :
                    theme === 'dark' ? 'fas fa-moon' : 'fas fa-heart';
            }
        });
    });

    // Кнопка наверх
    const scrollTopBtn = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Кнопка пагинации
    document.getElementById('prevPage')?.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            loadProducts();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    document.getElementById('nextPage')?.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            loadProducts();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // Мобильное меню
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');

    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            mobileMenuBtn.querySelector('i').className =
                mainNav.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
        });

        // Закрытие при клике на ссылку
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
            });
        });
    }

    // Рекламная кнопка
    document.getElementById('adDetailsBtn')?.addEventListener('click', () => {
        showNotification('Акция: при заказе от 3-х товаров скидка 15% + бесплатная доставка!', 'success');
    });

    function showNotification(message, type = 'info') {
        const container = document.getElementById('notificationContainer');
        if (!container) {
            console.log('Notification:', message);
            return;
        }

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;

        const icons = {
            'success': 'fa-check-circle',
            'error': 'fa-times-circle',
            'warning': 'fa-exclamation-triangle',
            'info': 'fa-info-circle'
        };

        notification.innerHTML = `
        <i class="fas ${icons[type] || 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;

        container.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);

        notification.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

        document.querySelectorAll('.cart-count').forEach(element => {
            element.textContent = totalItems;
        });
    }

    // Вызовите при загрузке
    updateCartCount();
}

// Инициализация при загрузке
initCatalog();