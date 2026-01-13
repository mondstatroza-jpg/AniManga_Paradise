class MerchStore {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.filters = {
            category: 'all',
            priceRange: [0, 10000],
            fandoms: [],
            sizes: [],
            sortBy: 'new'
        };
        this.currentView = 'grid';
        this.currentPage = 1;
        this.productsPerPage = 12;

        this.init();
        this.initNotifications();
    }

    initNotifications() {
        if (!document.getElementById('notificationContainer')) {
            const container = document.createElement('div');
            container.className = 'notification-container';
            container.id = 'notificationContainer';
            document.body.appendChild(container);
        }
    }

    init() {
        this.loadProducts();
        this.setupEventListeners();
        this.renderProducts();
        this.updateCartCount();
    }

    loadProducts() {
        // Пример данных товаров (в реальном проекте загружаются с сервера)
        this.products = [
            {
                id: 1,
                name: 'Футболка "Человек-бензопила"',
                category: 'clothing',
                subcategory: 't-shirts',
                fandom: 'chainsaw',
                price: 1499,
                discount: 1199,
                image: 'https://i.pinimg.com/736x/92/58/ff/9258ff1f99f33c864f06bf5504c55498.jpg',
                sizes: ['S', 'M', 'L', 'XL'],
                rating: 4.8,
                description: 'Мужская футболка с принтом Денджи. 100% хлопок, печать высшего качества.',
                inStock: true,
                tags: ['хит', 'скидка'],
                createdAt: '2024-03-15'
            },
            {
                id: 2,
                name: 'Фигурка Пикачу (25 см)',
                category: 'figures',
                subcategory: 'collectible',
                fandom: 'pokemon',
                price: 3499,
                discount: null,
                image: 'https://i.pinimg.com/1200x/a6/f9/51/a6f951c87b301e87268ca420d6fd499e.jpg',
                sizes: [],
                rating: 4.9,
                description: 'Высококачественная PVC фигурка с детализированной проработкой. Ограниченный тираж.',
                inStock: true,
                tags: ['эксклюзив', 'коллекционное'],
                createdAt: '2024-03-10'
            },
            {
                id: 3,
                name: 'Кружка "Наруто"',
                category: 'home',
                subcategory: 'mugs',
                fandom: 'naruto',
                price: 899,
                discount: null,
                image: 'https://i.pinimg.com/736x/29/24/02/2924026c8da819faf349beb05f23c29f.jpg',
                sizes: [],
                rating: 4.5,
                description: 'Керамическая кружка 350 мл с меняющимся принтом.',
                inStock: true,
                tags: ['популярное'],
                createdAt: '2024-03-05'
            },
            {
                id: 4,
                name: 'Постер "Атака титанов" A2',
                category: 'posters',
                subcategory: 'art-prints',
                fandom: 'attack_titan',
                price: 1299,
                discount: 999,
                image: 'https://i.pinimg.com/736x/82/32/8e/82328e390a647b7172795cd91b637148.jpg',
                sizes: ['A2'],
                rating: 4.7,
                description: 'Арт-постер 42x59 см на плотной матовой бумаге.',
                inStock: true,
                tags: ['новинка', 'скидка'],
                createdAt: '2024-03-20'
            },
            {
                id: 5,
                name: 'Косплей-костюм Наруто',
                category: 'cosplay',
                subcategory: 'costumes',
                fandom: 'naruto',
                price: 5499,
                discount: 4899,
                image: 'https://i.pinimg.com/1200x/f7/34/c5/f734c50a49a262767de13ed6452d15e0.jpg',
                sizes: ['M', 'L', 'XL'],
                rating: 4.9,
                description: 'Полный косплей-костюм Наруто Узумаки с аксессуарами.',
                inStock: true,
                tags: ['косплей', 'премиум'],
                createdAt: '2024-03-12'
            },
            {
                id: 6,
                name: 'Толстовка "One Piece"',
                category: 'clothing',
                subcategory: 'hoodies',
                fandom: 'one_piece',
                price: 2799,
                discount: 2399,
                image: 'https://i.pinimg.com/1200x/b1/b4/b2/b1b4b25446b2024bf25c8f367a5f3f81.jpg',
                sizes: ['L', 'XL', 'XXL'],
                rating: 4.8,
                description: 'Утепленная толстовка с капюшоном. 80% хлопок, 20% полиэстер.',
                inStock: true,
                tags: ['зимняя', 'скидка'],
                createdAt: '2024-03-08'
            },
            {
                id: 7,
                name: 'Брелок "Символ деревни Листа"',
                category: 'accessories',
                subcategory: 'keychains',
                fandom: 'naruto',
                price: 349,
                discount: null,
                image: 'https://i.pinimg.com/1200x/6d/d3/21/6dd3216632cb5a5590ec6411dca2d87f.jpg',
                sizes: [],
                rating: 4.6,
                description: 'Металлический брелок с эмалью. Диаметр 4 см.',
                inStock: true,
                tags: ['аксессуар'],
                createdAt: '2024-03-18'
            },
            {
                id: 8,
                name: 'Фигурка Сон Джин Ву',
                category: 'figures',
                subcategory: 'kaiju',
                fandom: 'godzilla',
                price: 4599,
                discount: 3999,
                image: 'https://i.pinimg.com/1200x/0e/30/70/0e3070811aa57ec1b8f3376ba3a5cd39.jpg',
                sizes: [],
                rating: 4.7,
                description: 'Коллекционная фигурка Сон Джин Ву, 30 см.',
                inStock: true,
                tags: ['фигурка', 'коллекционное'],
                createdAt: '2024-03-22'
            }
        ];

        this.filteredProducts = [...this.products];
    }

    setupEventListeners() {
        // Категории
        document.querySelectorAll('.category-filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                this.setCategory(category);
                this.updateActiveCategory(btn);
                this.applyFilters();
            });
        });

        // Фильтры по фандомам
        document.querySelectorAll('.fandom-option input').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateFandomFilters();
                this.applyFilters();
            });
        });

        // Фильтры по размерам
        document.querySelectorAll('.size-option input').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateSizeFilters();
                this.applyFilters();
            });
        });

        // Сортировка
        document.querySelectorAll('.sort-option input').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.filters.sortBy = e.target.value;
                this.applyFilters();
            });
        });

        // Поиск
        const searchInput = document.getElementById('merchSearch');
        const searchBtn = document.getElementById('searchMerchBtn');

        searchInput.addEventListener('input', () => {
            this.applyFilters();
        });

        searchBtn.addEventListener('click', () => {
            this.applyFilters();
        });

        // Вид отображения
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const view = btn.dataset.view;
                this.setView(view);
                this.updateViewButtons(btn);
            });
        });

        // Фильтры цены
        const priceMin = document.getElementById('priceMin');
        const priceMax = document.getElementById('priceMax');
        const priceRangeMin = document.getElementById('priceRangeMin');
        const priceRangeMax = document.getElementById('priceRangeMax');

        const updatePriceFilters = () => {
            this.filters.priceRange = [
                parseInt(priceMin.value) || 0,
                parseInt(priceMax.value) || 10000
            ];
            this.applyFilters();
        };

        priceMin.addEventListener('change', updatePriceFilters);
        priceMax.addEventListener('change', updatePriceFilters);
        priceRangeMin.addEventListener('input', (e) => {
            priceMin.value = e.target.value;
            updatePriceFilters();
        });
        priceRangeMax.addEventListener('input', (e) => {
            priceMax.value = e.target.value;
            updatePriceFilters();
        });

        // Применение фильтров
        document.getElementById('applyMerchFilters').addEventListener('click', () => {
            this.applyFilters();
        });

        // Сброс фильтров
        document.getElementById('resetMerchFilters').addEventListener('click', () => {
            this.resetFilters();
        });

        // Пагинация
        document.querySelector('.page-nav.next').addEventListener('click', (e) => {
            e.preventDefault();
            if (this.currentPage < Math.ceil(this.filteredProducts.length / this.productsPerPage)) {
                this.currentPage++;
                this.renderProducts();
                this.updatePagination();
            }
        });

        document.querySelector('.page-nav.prev').addEventListener('click', (e) => {
            e.preventDefault();
            if (this.currentPage > 1) {
                this.currentPage--;
                this.renderProducts();
                this.updatePagination();
            }
        });
    }

    setCategory(category) {
        this.filters.category = category;
        this.currentPage = 1;

        // Показываем/скрываем фильтр размеров в зависимости от категории
        const sizeFilterGroup = document.getElementById('sizeFilterGroup');
        if (category === 'clothing' || category === 'cosplay') {
            sizeFilterGroup.style.display = 'block';
        } else {
            sizeFilterGroup.style.display = 'none';
            this.filters.sizes = [];
        }
    }

    updateActiveCategory(activeBtn) {
        document.querySelectorAll('.category-filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');

        const categoryName = activeBtn.querySelector('i').nextSibling.textContent.trim();
        document.getElementById('currentCategory').textContent = categoryName;
    }

    updateFandomFilters() {
        this.filters.fandoms = Array.from(
            document.querySelectorAll('.fandom-option input:checked')
        ).map(cb => cb.value);
    }

    updateSizeFilters() {
        this.filters.sizes = Array.from(
            document.querySelectorAll('.size-option input:checked')
        ).map(cb => cb.value);
    }

    setView(view) {
        this.currentView = view;
        this.renderProducts();
    }

    updateViewButtons(activeBtn) {
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');

        const gridView = document.getElementById('merchGrid');
        const listView = document.getElementById('merchList');

        if (this.currentView === 'grid') {
            gridView.style.display = 'grid';
            listView.style.display = 'none';
        } else {
            gridView.style.display = 'none';
            listView.style.display = 'block';
        }
    }

    applyFilters() {
        const searchQuery = document.getElementById('merchSearch').value.toLowerCase();

        let filtered = [...this.products];

        // Фильтр по категории
        if (this.filters.category !== 'all') {
            filtered = filtered.filter(p => p.category === this.filters.category);
        }

        // Фильтр по поисковому запросу
        if (searchQuery) {
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(searchQuery) ||
                p.description.toLowerCase().includes(searchQuery) ||
                p.tags.some(tag => tag.toLowerCase().includes(searchQuery))
            );
        }

        // Фильтр по фандомам
        if (this.filters.fandoms.length > 0) {
            filtered = filtered.filter(p => this.filters.fandoms.includes(p.fandom));
        }

        // Фильтр по размерам
        if (this.filters.sizes.length > 0) {
            filtered = filtered.filter(p => {
                if (p.sizes.length === 0) return false;
                return p.sizes.some(size => this.filters.sizes.includes(size));
            });
        }

        // Фильтр по цене
        filtered = filtered.filter(p => {
            const price = p.discount || p.price;
            return price >= this.filters.priceRange[0] && price <= this.filters.priceRange[1];
        });

        // Сортировка
        filtered = this.sortProducts(filtered);

        this.filteredProducts = filtered;
        this.currentPage = 1;
        this.renderProducts();
        this.updateProductCount();
        this.updatePagination();
    }

    sortProducts(products) {
        switch (this.filters.sortBy) {
            case 'price_asc':
                return products.sort((a, b) => {
                    const priceA = a.discount || a.price;
                    const priceB = b.discount || b.price;
                    return priceA - priceB;
                });

            case 'price_desc':
                return products.sort((a, b) => {
                    const priceA = a.discount || a.price;
                    const priceB = b.discount || b.price;
                    return priceB - priceA;
                });

            case 'popular':
                return products.sort((a, b) => b.rating - a.rating);

            case 'discount':
                return products.sort((a, b) => {
                    const hasDiscountA = a.discount !== null;
                    const hasDiscountB = b.discount !== null;
                    if (hasDiscountA && !hasDiscountB) return -1;
                    if (!hasDiscountA && hasDiscountB) return 1;
                    return 0;
                });

            case 'new':
            default:
                return products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
    }

    resetFilters() {
        // Сброс категории
        document.querySelector('[data-category="all"]').click();

        // Сброс чекбоксов
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            cb.checked = false;
        });

        // Сброс радио-кнопок сортировки
        document.querySelector('input[value="new"]').checked = true;

        // Сброс цены
        document.getElementById('priceMin').value = 0;
        document.getElementById('priceMax').value = 10000;
        document.getElementById('priceRangeMin').value = 0;
        document.getElementById('priceRangeMax').value = 10000;

        // Сброс поиска
        document.getElementById('merchSearch').value = '';

        // Сброс переменных
        this.filters = {
            category: 'all',
            priceRange: [0, 10000],
            fandoms: [],
            sizes: [],
            sortBy: 'new'
        };

        this.applyFilters();
    }

    renderProducts() {
        const startIndex = (this.currentPage - 1) * this.productsPerPage;
        const endIndex = startIndex + this.productsPerPage;
        const productsToShow = this.filteredProducts.slice(startIndex, endIndex);

        if (this.currentView === 'grid') {
            this.renderGridView(productsToShow);
        } else {
            this.renderListView(productsToShow);
        }
    }

    renderGridView(products) {
        const grid = document.getElementById('merchGrid');
        if (!grid) return;

        if (products.length === 0) {
            grid.innerHTML = `
                <div class="no-products">
                    <i class="fas fa-search"></i>
                    <h3>Товары не найдены</h3>
                    <p>Попробуйте изменить параметры поиска или фильтры</p>
                    <button class="btn-primary" id="resetFiltersBtn">Сбросить фильтры</button>
                </div>
            `;

            document.getElementById('resetFiltersBtn').addEventListener('click', () => {
                this.resetFilters();
            });
            return;
        }

        grid.innerHTML = products.map(product => `
            <div class="merch-card" data-id="${product.id}">
                ${product.discount ? `<div class="product-badge discount">-${Math.round((product.price - product.discount) / product.price * 100)}%</div>` : ''}
                ${product.tags.includes('новинка') ? '<div class="product-badge new">НОВИНКА</div>' : ''}
                ${product.tags.includes('хит') ? '<div class="product-badge hot">ХИТ</div>' : ''}
                
                <div class="merch-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <div class="merch-overlay">
                        <button class="btn-quick-view" data-id="${product.id}">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-favorite" data-id="${product.id}">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
                
                <div class="merch-info">
                    <span class="merch-category">${this.getCategoryName(product.category)}</span>
                    <h3 class="merch-title">${product.name}</h3>
                    <p class="merch-description">${product.description}</p>
                    
                    ${product.sizes.length > 0 ? `
                    <div class="size-selector">
                        <span class="size-label">Размер:</span>
                        <select class="size-select">
                            ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                        </select>
                    </div>
                    ` : ''}
                    
                    <div class="merch-price">
                        ${product.discount ? `
                            <span class="current-price">${product.discount.toLocaleString()} ₽</span>
                            <span class="old-price">${product.price.toLocaleString()} ₽</span>
                        ` : `
                            <span class="current-price">${product.price.toLocaleString()} ₽</span>
                        `}
                    </div>
                    
                    <div class="merch-actions">
                        <button class="btn-add-to-cart" data-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
                            <i class="fas fa-shopping-cart"></i> ${!product.inStock ? 'Нет в наличии' : 'В корзину'}
                        </button>
                        <button class="btn-details" data-id="${product.id}">
                            <i class="fas fa-info-circle"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        this.attachProductEvents();
    }

    renderListView(products) {
        const list = document.getElementById('merchList');
        if (!list) return;

        if (products.length === 0) {
            list.innerHTML = `
                <div class="no-products">
                    <i class="fas fa-search"></i>
                    <h3>Товары не найдены</h3>
                    <p>Попробуйте изменить параметры поиска или фильтры</p>
                    <button class="btn-primary" id="resetFiltersBtnList">Сбросить фильтры</button>
                </div>
            `;

            document.getElementById('resetFiltersBtnList').addEventListener('click', () => {
                this.resetFilters();
            });
            return;
        }

        list.innerHTML = products.map(product => `
            <div class="merch-list-item" data-id="${product.id}">
                <div class="list-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    ${product.discount ? `<span class="list-discount">-${Math.round((product.price - product.discount) / product.price * 100)}%</span>` : ''}
                </div>
                
                <div class="list-details">
                    <div class="list-header">
                        <h3 class="list-title">${product.name}</h3>
                        <span class="list-category">${this.getCategoryName(product.category)}</span>
                    </div>
                    
                    <p class="list-description">${product.description}</p>
                    
                    <div class="list-meta">
                        ${product.sizes.length > 0 ? `
                        <div class="list-sizes">
                            <strong>Размеры:</strong>
                            ${product.sizes.map(size => `<span class="size-tag">${size}</span>`).join('')}
                        </div>
                        ` : ''}
                        
                        <div class="list-rating">
                            <div class="stars">
                                ${this.renderStars(product.rating)}
                            </div>
                            <span class="rating-value">${product.rating}</span>
                        </div>
                    </div>
                </div>
                
                <div class="list-sidebar">
                    <div class="list-price">
                        ${product.discount ? `
                            <span class="current-price">${product.discount.toLocaleString()} ₽</span>
                            <span class="old-price">${product.price.toLocaleString()} ₽</span>
                        ` : `
                            <span class="current-price">${product.price.toLocaleString()} ₽</span>
                        `}
                    </div>
                    
                    <div class="list-actions">
                        <button class="btn-add-to-cart" data-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
                            <i class="fas fa-shopping-cart"></i> ${!product.inStock ? 'Нет в наличии' : 'Купить'}
                        </button>
                        <button class="btn-favorite" data-id="${product.id}">
                            <i class="far fa-heart"></i>
                        </button>
                        <button class="btn-quick-view" data-id="${product.id}">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        this.attachProductEvents();
    }

    renderStars(rating) {
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

    getCategoryName(category) {
        const categories = {
            'clothing': 'Одежда',
            'figures': 'Фигурки',
            'cosplay': 'Косплей',
            'home': 'Для дома',
            'accessories': 'Аксессуары',
            'posters': 'Постеры'
        };
        return categories[category] || category;
    }

    attachProductEvents() {
        // Добавление в корзину
        document.querySelectorAll('.btn-add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const productId = btn.dataset.id;
                this.addToCartFromMerch(productId);
            });
        });

        // Добавление в избранное
        document.querySelectorAll('.btn-favorite').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const productId = btn.dataset.id;
                this.addToCartFromMerch(productId);
            });
        });

        // Быстрый просмотр
        document.querySelectorAll('.btn-quick-view').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const productId = btn.dataset.id;
                this.addToCartFromMerch(productId);
            });
        });

        // Детали товара
        document.querySelectorAll('.btn-details').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const productId = btn.dataset.id;
                this.addToCartFromMerch(productId);
            });
        });

        // Клик по карточке товара
        document.querySelectorAll('.merch-card, .merch-list-item').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('button') && !e.target.closest('select')) {
                    const productId = card.dataset.id;
                    this.showProductDetails(productId);
                }
            });
        });
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id == productId);
        if (!product) {
            console.error('Товар не найден:', productId);
            return;
        }

        // Получаем выбранный размер
        let selectedSize = null;
        if (product.sizes.length > 0) {
            const sizeSelect = document.querySelector(`[data-id="${productId}"] .size-select`);
            if (sizeSelect) {
                selectedSize = sizeSelect.value;
            }
        }

        // Получаем текущую корзину
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        console.log('Текущая корзина:', cart);
        console.log('Добавляем товар:', product);

        // Проверяем, есть ли товар уже в корзине
        const existingItemIndex = cart.findIndex(item =>
            item.id == productId && item.selectedSize === selectedSize
        );

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
            console.log('Увеличен quantity товара:', cart[existingItemIndex]);
        } else {
            cart.push({
                ...product,
                quantity: 1,
                selectedSize: selectedSize,
                type: 'merch',
                oldPrice: product.price,
                price: product.discount || product.price
            });
            console.log('Добавлен новый товар в корзину:', product);
        }

        // Сохраняем корзину
        localStorage.setItem('cart', JSON.stringify(cart));

        // Обновляем счетчик
        this.updateCartCount();

        // Показываем уведомление
        this.showNotification(`"${product.name}" добавлен в корзину!`, 'success');
    }

    toggleFavorite(productId, button) {
        const product = this.products.find(p => p.id == productId);
        if (!product) return;

        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isFavorite = favorites.some(fav => fav.id == productId);

        const heartIcon = button.querySelector('i');

        if (!isFavorite) {
            favorites.push(product);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            heartIcon.className = 'fas fa-heart';
            heartIcon.style.color = '#ff4757';
            this.showNotification(`"${product.name}" добавлен в избранное!`, 'success');
        } else {
            favorites = favorites.filter(fav => fav.id != productId);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            heartIcon.className = 'far fa-heart';
            heartIcon.style.color = '';
            this.showNotification(`"${product.name}" удален из избранного`, 'info');
        }
    }

    showQuickView(productId) {
        const product = this.products.find(p => p.id == productId);
        if (!product) return;

        // Создаем модальное окно для быстрого просмотра
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content quick-view-modal">
                <button class="modal-close">&times;</button>
                <div class="quick-view-content">
                    <div class="quick-view-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="quick-view-details">
                        <h2>${product.name}</h2>
                        <div class="quick-view-meta">
                            <span class="category">${this.getCategoryName(product.category)}</span>
                            <div class="rating">
                                ${this.renderStars(product.rating)}
                                <span class="rating-value">${product.rating}</span>
                            </div>
                        </div>
                        <p class="quick-view-description">${product.description}</p>
                        
                        ${product.sizes.length > 0 ? `
                        <div class="quick-view-sizes">
                            <h4>Размер:</h4>
                            <div class="size-options">
                                ${product.sizes.map(size => `
                                    <label class="size-option">
                                        <input type="radio" name="quick-size" value="${size}">
                                        <span>${size}</span>
                                    </label>
                                `).join('')}
                            </div>
                        </div>
                        ` : ''}
                        
                        <div class="quick-view-price">
                            ${product.discount ? `
                                <span class="current-price">${product.discount.toLocaleString()} ₽</span>
                                <span class="old-price">${product.price.toLocaleString()} ₽</span>
                                <span class="discount-badge">-${Math.round((product.price - product.discount) / product.price * 100)}%</span>
                            ` : `
                                <span class="current-price">${product.price.toLocaleString()} ₽</span>
                            `}
                        </div>
                        
                        <div class="quick-view-actions">
                            <button class="btn-primary add-to-cart-quick" data-id="${product.id}">
                                <i class="fas fa-shopping-cart"></i> Добавить в корзину
                            </button>
                            <button class="btn-secondary add-to-favorites-quick" data-id="${product.id}">
                                <i class="far fa-heart"></i> В избранное
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Обработчики событий для модального окна
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });

        modal.querySelector('.add-to-cart-quick').addEventListener('click', () => {
            this.addToCart(productId);
            modal.remove();
        });

        modal.querySelector('.add-to-favorites-quick').addEventListener('click', (e) => {
            this.toggleFavorite(productId, e.currentTarget);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    showProductDetails(productId) {
        // Здесь можно сделать переход на отдельную страницу товара
        console.log('Просмотр деталей товара:', productId);
        // window.location.href = `product.html?id=${productId}`;
    }

    updateProductCount() {
        const count = this.filteredProducts.length;
        document.getElementById('merchCount').textContent = `${count} товаров`;
    }

    updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

        document.querySelectorAll('.cart-count').forEach(element => {
            element.textContent = totalItems;
        });
    }

    updatePagination() {
        const totalPages = Math.ceil(this.filteredProducts.length / this.productsPerPage);
        const prevBtn = document.querySelector('.page-nav.prev');
        const nextBtn = document.querySelector('.page-nav.next');

        // Обновляем номера страниц
        const pageNumbers = document.querySelector('.page-numbers');
        let pageNumbersHTML = '';

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbersHTML += `<a href="#" class="page-number ${i === this.currentPage ? 'active' : ''}" data-page="${i}">${i}</a>`;
            }
        } else {
            // Логика для многостраничной пагинации
            if (this.currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pageNumbersHTML += `<a href="#" class="page-number ${i === this.currentPage ? 'active' : ''}" data-page="${i}">${i}</a>`;
                }
                pageNumbersHTML += '<span class="page-dots">...</span>';
                pageNumbersHTML += `<a href="#" class="page-number" data-page="${totalPages}">${totalPages}</a>`;
            } else if (this.currentPage >= totalPages - 2) {
                pageNumbersHTML += `<a href="#" class="page-number" data-page="1">1</a>`;
                pageNumbersHTML += '<span class="page-dots">...</span>';
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pageNumbersHTML += `<a href="#" class="page-number ${i === this.currentPage ? 'active' : ''}" data-page="${i}">${i}</a>`;
                }
            } else {
                pageNumbersHTML += `<a href="#" class="page-number" data-page="1">1</a>`;
                pageNumbersHTML += '<span class="page-dots">...</span>';
                for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++) {
                    pageNumbersHTML += `<a href="#" class="page-number ${i === this.currentPage ? 'active' : ''}" data-page="${i}">${i}</a>`;
                }
                pageNumbersHTML += '<span class="page-dots">...</span>';
                pageNumbersHTML += `<a href="#" class="page-number" data-page="${totalPages}">${totalPages}</a>`;
            }
        }

        pageNumbers.innerHTML = pageNumbersHTML;

        // Добавляем обработчики для номеров страниц
        pageNumbers.querySelectorAll('.page-number').forEach(pageBtn => {
            pageBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.currentPage = parseInt(pageBtn.dataset.page);
                this.renderProducts();
                this.updatePagination();
            });
        });

        // Обновляем состояние кнопок
        prevBtn.classList.toggle('disabled', this.currentPage === 1);
        nextBtn.classList.toggle('disabled', this.currentPage === totalPages);
    }

    showNotification(message, type = 'info') {
        // Используем существующую функцию из main.js
        if (typeof showNotification === 'function') {
            showNotification(message, type);
        } else {
            // Фолбэк, если функция не определена
            console.log(`${type.toUpperCase()}: ${message}`);
        }
    }

    addToCartFromMerch(productId) {
        const product = this.products.find(p => p.id == productId);
        if (!product) return;

        // Получаем выбранный размер
        let selectedSize = null;
        if (product.sizes && product.sizes.length > 0) {
            const sizeSelect = document.querySelector(`[data-id="${productId}"] .size-select`);
            if (sizeSelect) {
                selectedSize = sizeSelect.value;
            }
        }

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Проверяем, есть ли товар уже в корзине
        const existingItemIndex = cart.findIndex(item =>
            item.id == productId && item.selectedSize === selectedSize
        );

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                category: product.category,
                price: product.discount || product.price,
                image: product.image,
                quantity: 1,
                fandom: this.getFandomName(product.fandom),
                selectedSize: selectedSize
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        this.updateCartCount();
        this.showNotification(`"${product.name}" добавлен в корзину!`, 'success');
    }

    getFandomName(fandomKey) {
        const fandoms = {
            'chainsaw': 'Человек-бензопила',
            'naruto': 'Наруто',
            'one_piece': 'One Piece',
            'attack_titan': 'Атака титанов',
            'jujutsu': 'Магическая битва',
            'pokemon': 'Покемон',
            'godzilla': 'Годзилла'
        };
        return fandoms[fandomKey] || 'Аниме';
    }

}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
    window.merchStore = new MerchStore();
});