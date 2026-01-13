class ProductModal {
    constructor() {
        this.currentProduct = null;
        this.quantity = 1;
        this.selectedSize = null;
        this.init();
    }

    init() {
        // Загружаем данные продуктов
        this.products = this.getProductsData();

        // Слушаем клики на кнопки "Подробнее"
        document.addEventListener('click', (e) => {
            const detailBtn = e.target.closest('.view-details, .product-detail-btn');
            if (detailBtn) {
                const productId = detailBtn.dataset.id || detailBtn.closest('[data-id]')?.dataset.id;
                if (productId) {
                    this.openModal(productId);
                }
            }
        });

        // Слушаем клики на карточки товаров
        document.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card, .promo-card');
            if (productCard && !e.target.closest('button')) {
                const productId = productCard.dataset.id;
                if (productId) {
                    this.openModal(productId);
                }
            }
        });
    }

    getProductsData() {
        // Возвращаем данные продуктов
        return {
            // Манга (5 товаров)
            1: {
                id: 1,
                type: 'manga',
                name: 'Наруто: Том 1',
                author: 'Масаси Кишимото',
                price: 599,
                discount: 499,
                image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                description: 'Первый том легендарной манги о ниндзя Наруто Узумаки',
                details: {
                    pages: 192,
                    publisher: 'VIZ Media',
                    releaseDate: '2003',
                    language: 'Русский',
                    ageRating: '16+',
                    genre: 'Экшен, Приключение, Комедия'
                },
                inStock: true,
                rating: 4.8
            },
            2: {
                id: 2,
                type: 'manga',
                name: 'Атака Титанов: Том 34',
                author: 'Хадзимэ Исаяма',
                price: 699,
                discount: 599,
                image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                description: 'Финальный том эпической саги о борьбе человечества с титанами',
                details: {
                    pages: 208,
                    publisher: 'Коданся',
                    releaseDate: '2021',
                    language: 'Русский',
                    ageRating: '18+',
                    genre: 'Драма, Ужасы, Фэнтези'
                },
                inStock: true,
                rating: 4.9
            },

            // Манхва (5 товаров)
            11: {
                id: 11,
                type: 'manhwa',
                name: 'Соло Левеллинг',
                author: 'Jang Sung-lak',
                price: 799,
                discount: null,
                image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                description: 'Популярная манхва о игроке, оказавшемся в жестоком мире',
                details: {
                    pages: 180,
                    publisher: 'D&C Media',
                    releaseDate: '2022',
                    language: 'Русский',
                    ageRating: '16+',
                    genre: 'Фэнтези, Экшен, Исекай'
                },
                inStock: true,
                rating: 4.7
            },

            // Комиксы (5 товаров)
            21: {
                id: 21,
                type: 'comics',
                name: 'Человек-паук: Конец',
                author: 'Дж. Майкл Стражински',
                price: 899,
                discount: 749,
                image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                description: 'Эпическое завершение истории Человека-паука',
                details: {
                    pages: 160,
                    publisher: 'Marvel',
                    releaseDate: '2023',
                    language: 'Русский',
                    ageRating: '12+',
                    genre: 'Супергерои, Экшен'
                },
                inStock: true,
                rating: 4.8
            },

            // Мерч (10 товаров)
            31: {
                id: 31,
                type: 'merch',
                name: 'Фигурка "Пикачу"',
                category: 'figures',
                price: 3499,
                discount: 2999,
                image: 'https://images.unsplash.com/photo-1572635148818-ef6fd45eb394?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                description: 'Коллекционная PVC фигурка Пикачу, высота 25 см',
                details: {
                    material: 'PVC пластик',
                    height: '25 см',
                    weight: '500 г',
                    manufacturer: 'Good Smile Company',
                    includes: 'Сменные лица, аксессуары'
                },
                inStock: true,
                rating: 4.9,
                sizes: []
            },
            32: {
                id: 32,
                type: 'merch',
                name: 'Футболка "Наруто"',
                category: 'clothing',
                price: 1299,
                discount: 1099,
                image: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                description: 'Хлопковая футболка с принтом Наруто Узумаки',
                details: {
                    material: '100% хлопок',
                    sizes: ['S', 'M', 'L', 'XL'],
                    care: 'Машинная стирка 30°C',
                    manufacturer: 'AniManga Wear'
                },
                inStock: true,
                rating: 4.6,
                sizes: ['S', 'M', 'L', 'XL']
            }
        };
    }

    openModal(productId) {
        this.currentProduct = this.products[productId];
        if (!this.currentProduct) {
            this.showNotAvailableModal();
            return;
        }

        this.createModal();
    }

    createModal() {
        // Удаляем предыдущее модальное окно, если есть
        const existingModal = document.querySelector('.product-detail-modal');
        if (existingModal) existingModal.remove();

        const product = this.currentProduct;
        const hasSizes = product.sizes && product.sizes.length > 0;

        // Создаем модальное окно
        const modal = document.createElement('div');
        modal.className = 'modal product-detail-modal active';

        // Определяем контент в зависимости от типа продукта
        let detailsContent = '';

        if (product.type === 'manga' || product.type === 'manhwa' || product.type === 'comics') {
            detailsContent = `
                <div class="product-type-badge">${this.getTypeName(product.type)}</div>
                <div class="product-details-grid">
                    <div class="detail-item">
                        <span class="detail-label">Автор:</span>
                        <span class="detail-value">${product.author}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Страниц:</span>
                        <span class="detail-value">${product.details.pages}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Издатель:</span>
                        <span class="detail-value">${product.details.publisher}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Год издания:</span>
                        <span class="detail-value">${product.details.releaseDate}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Возрастной рейтинг:</span>
                        <span class="detail-value">${product.details.ageRating}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Жанр:</span>
                        <span class="detail-value">${product.details.genre}</span>
                    </div>
                </div>
            `;
        } else if (product.type === 'merch') {
            detailsContent = `
                <div class="product-type-badge">Мерч</div>
                <div class="product-details-grid">
                    <div class="detail-item">
                        <span class="detail-label">Категория:</span>
                        <span class="detail-value">${this.getCategoryName(product.category)}</span>
                    </div>
                    ${product.details.material ? `
                    <div class="detail-item">
                        <span class="detail-label">Материал:</span>
                        <span class="detail-value">${product.details.material}</span>
                    </div>
                    ` : ''}
                    ${product.details.height ? `
                    <div class="detail-item">
                        <span class="detail-label">Размер:</span>
                        <span class="detail-value">${product.details.height}</span>
                    </div>
                    ` : ''}
                    ${product.details.manufacturer ? `
                    <div class="detail-item">
                        <span class="detail-label">Производитель:</span>
                        <span class="detail-value">${product.details.manufacturer}</span>
                    </div>
                    ` : ''}
                    ${product.details.includes ? `
                    <div class="detail-item">
                        <span class="detail-label">В комплекте:</span>
                        <span class="detail-value">${product.details.includes}</span>
                    </div>
                    ` : ''}
                </div>
            `;
        }

        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                
                <div class="product-modal-header">
                    <h2>${product.name}</h2>
                    <div class="product-rating">
                        ${this.renderStars(product.rating)}
                        <span class="rating-value">${product.rating}/5</span>
                    </div>
                </div>
                
                <div class="product-modal-content">
                    <div class="product-image-section">
                        <img src="${product.image}" alt="${product.name}" class="product-main-image">
                        ${!product.inStock ? '<div class="out-of-stock-badge">Нет в наличии</div>' : ''}
                    </div>
                    
                    <div class="product-info-section">
                        <p class="product-description">${product.description}</p>
                        
                        ${detailsContent}
                        
                        <div class="product-price-section">
                            ${product.discount ? `
                                <div class="price-with-discount">
                                    <span class="old-price">${product.price} ₽</span>
                                    <span class="current-price">${product.discount} ₽</span>
                                    <span class="discount-percent">
                                        -${Math.round((1 - product.discount / product.price) * 100)}%
                                    </span>
                                </div>
                            ` : `
                                <div class="current-price">${product.price} ₽</div>
                            `}
                        </div>
                        
                        ${product.inStock ? `
                            <div class="product-actions">
                                ${hasSizes ? `
                                    <div class="size-selector">
                                        <h4>Выберите размер:</h4>
                                        <div class="size-options">
                                            ${product.sizes.map(size => `
                                                <label class="size-option ${this.selectedSize === size ? 'selected' : ''}">
                                                    <input type="radio" name="size" value="${size}" 
                                                           ${this.selectedSize === size ? 'checked' : ''}>
                                                    <span>${size}</span>
                                                </label>
                                            `).join('')}
                                        </div>
                                    </div>
                                ` : ''}
                                
                                <div class="quantity-selector">
                                    <h4>Количество:</h4>
                                    <div class="quantity-controls">
                                        <button class="quantity-btn minus">-</button>
                                        <input type="number" class="quantity-input" value="${this.quantity}" min="1" max="10">
                                        <button class="quantity-btn plus">+</button>
                                    </div>
                                </div>
                                
                                <div class="action-buttons">
                                    <button class="btn-primary add-to-cart-btn" 
                                            ${hasSizes && !this.selectedSize ? 'disabled' : ''}>
                                        <i class="fas fa-shopping-cart"></i> Добавить в корзину
                                    </button>
                                    <button class="btn-secondary add-to-favorites-btn">
                                        <i class="far fa-heart"></i> В избранное
                                    </button>
                                </div>
                            </div>
                        ` : `
                            <div class="out-of-stock-message">
                                <i class="fas fa-times-circle"></i>
                                <p>Товар временно отсутствует на складе</p>
                                <button class="btn-secondary notify-btn">
                                    <i class="fas fa-bell"></i> Уведомить о поступлении
                                </button>
                            </div>
                        `}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.setupModalEvents(modal);
    }

    showNotAvailableModal() {
        const modal = document.createElement('div');
        modal.className = 'modal cat-modal active';

        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="cat-image">
                    <img src="https://i.imgur.com/Q7l6e5r.png" alt="Котик">
                </div>
                <h2>Мяу-информация</h2>
                <p class="cat-message">
                    К сожалению, полную информацию просмотреть невозможно. Мы активно работаем над наполнением сайта. 
                    Пожалуйста, зайдите позже или свяжитесь с нами для уточнения деталей.
                </p>
                <p class="cat-signature">— Ваш аниме-кот 🐾</p>
                <button class="btn-primary close-modal" style="margin-top: 1rem;">
                    Понял, спасибо!
                </button>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });

        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    setupModalEvents(modal) {
        // Кнопка закрытия
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });

        // Закрытие по клику вне окна
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Выбор размера
        modal.querySelectorAll('.size-option input').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.selectedSize = e.target.value;
                modal.querySelectorAll('.size-option').forEach(option => {
                    option.classList.remove('selected');
                });
                e.target.closest('.size-option').classList.add('selected');

                // Активируем кнопку добавления в корзину
                const addBtn = modal.querySelector('.add-to-cart-btn');
                addBtn.disabled = false;
            });
        });

        // Изменение количества
        const quantityInput = modal.querySelector('.quantity-input');
        modal.querySelector('.quantity-btn.minus').addEventListener('click', () => {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
                this.quantity = quantityInput.value;
            }
        });

        modal.querySelector('.quantity-btn.plus').addEventListener('click', () => {
            let value = parseInt(quantityInput.value);
            if (value < 10) {
                quantityInput.value = value + 1;
                this.quantity = quantityInput.value;
            }
        });

        quantityInput.addEventListener('change', () => {
            let value = parseInt(quantityInput.value);
            if (value < 1) quantityInput.value = 1;
            if (value > 10) quantityInput.value = 10;
            this.quantity = quantityInput.value;
        });

        // Добавление в корзину
        modal.querySelector('.add-to-cart-btn').addEventListener('click', () => {
            this.addToCart();
            modal.remove();
            this.showSuccessMessage();
        });

        // Добавление в избранное
        modal.querySelector('.add-to-favorites-btn').addEventListener('click', () => {
            this.addToFavorites();
            const heartIcon = modal.querySelector('.add-to-favorites-btn i');
            heartIcon.className = 'fas fa-heart';
            heartIcon.style.color = '#ff4757';
        });

        // Уведомление о поступлении
        const notifyBtn = modal.querySelector('.notify-btn');
        if (notifyBtn) {
            notifyBtn.addEventListener('click', () => {
                this.requestNotification();
                modal.remove();
            });
        }
    }

    addToCart() {
        const product = this.currentProduct;

        // Получаем корзину из localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Проверяем, есть ли товар уже в корзине
        const existingItemIndex = cart.findIndex(item =>
            item.id === product.id &&
            (!product.sizes || item.selectedSize === this.selectedSize)
        );

        if (existingItemIndex !== -1) {
            // Увеличиваем количество
            cart[existingItemIndex].quantity += this.quantity;
        } else {
            // Добавляем новый товар
            cart.push({
                ...product,
                quantity: this.quantity,
                selectedSize: this.selectedSize
            });
        }

        // Сохраняем корзину
        localStorage.setItem('cart', JSON.stringify(cart));

        // Обновляем счетчик в шапке
        this.updateCartCount();
    }

    addToFavorites() {
        const product = this.currentProduct;

        // Получаем избранное из localStorage
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        // Проверяем, есть ли уже в избранном
        const isFavorite = favorites.some(fav => fav.id === product.id);

        if (!isFavorite) {
            favorites.push(product);
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    }

    requestNotification() {
        // В реальном проекте здесь будет запрос на сервер
        alert('Мы уведомим вас, когда товар появится в наличии!');
    }

    updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

        // Обновляем счетчик в шапке
        document.querySelectorAll('.cart-count').forEach(span => {
            span.textContent = totalItems;
        });
    }

    showSuccessMessage() {
        // Показываем уведомление
        const notification = document.createElement('div');
        notification.className = 'notification success';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>Товар добавлен в корзину!</span>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            gap: 0.5rem;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Удаляем через 3 секунды
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    getTypeName(type) {
        const types = {
            'manga': 'Манга',
            'manhwa': 'Манхва',
            'comics': 'Комикс',
            'merch': 'Мерч'
        };
        return types[type] || type;
    }

    getCategoryName(category) {
        const categories = {
            'clothing': 'Одежда',
            'figures': 'Фигурки',
            'home': 'Для дома',
            'posters': 'Постеры',
            'accessories': 'Аксессуары'
        };
        return categories[category] || category;
    }

    renderStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
                stars += '<i class="fas fa-star"></i>';
            } else if (i === Math.ceil(rating) && rating % 1 >= 0.5) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        return stars;
    }
}

// Добавляем стили для модального окна продукта
const productModalStyles = `
    .product-detail-modal .modal-content {
        max-width: 900px;
        width: 95%;
        max-height: 90vh;
        overflow-y: auto;
    }
    
    .product-modal-header {
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid var(--border-color);
    }
    
    .product-modal-header h2 {
        font-size: 1.8rem;
        margin-bottom: 0.5rem;
        color: var(--text-primary);
    }
    
    .product-rating {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #ffc107;
    }
    
    .product-modal-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
    }
    
    @media (max-width: 768px) {
        .product-modal-content {
            grid-template-columns: 1fr;
        }
    }
    
    .product-image-section {
        position: relative;
    }
    
    .product-main-image {
        width: 100%;
        height: 400px;
        object-fit: cover;
        border-radius: 15px;
        box-shadow: 0 5px 20px var(--shadow-color);
    }
    
    .out-of-stock-badge {
        position: absolute;
        top: 1rem;
        left: 1rem;
        background: #ef4444;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 25px;
        font-weight: 600;
    }
    
    .product-type-badge {
        display: inline-block;
        background: var(--accent-color);
        color: white;
        padding: 0.3rem 1rem;
        border-radius: 15px;
        font-size: 0.9rem;
        margin-bottom: 1.5rem;
    }
    
    .product-details-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        margin: 1.5rem 0;
        padding: 1.5rem;
        background: var(--bg-accent);
        border-radius: 15px;
    }
    
    .detail-item {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
    }
    
    .detail-label {
        font-size: 0.9rem;
        color: var(--text-secondary);
        font-weight: 600;
    }
    
    .detail-value {
        font-weight: 500;
    }
    
    .product-price-section {
        margin: 1.5rem 0;
    }
    
    .price-with-discount {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .old-price {
        font-size: 1.2rem;
        text-decoration: line-through;
        color: var(--text-secondary);
    }
    
    .current-price {
        font-size: 2rem;
        font-weight: 700;
        color: var(--accent-color);
    }
    
    .discount-percent {
        background: #10b981;
        color: white;
        padding: 0.3rem 0.8rem;
        border-radius: 15px;
        font-weight: 600;
    }
    
    .size-selector {
        margin: 1.5rem 0;
    }
    
    .size-options {
        display: flex;
        gap: 0.5rem;
        margin-top: 0.5rem;
        flex-wrap: wrap;
    }
    
    .size-option {
        position: relative;
    }
    
    .size-option input {
        display: none;
    }
    
    .size-option span {
        display: inline-block;
        padding: 0.5rem 1rem;
        border: 2px solid var(--border-color);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s;
        min-width: 50px;
        text-align: center;
    }
    
    .size-option.selected span {
        border-color: var(--accent-color);
        background: var(--accent-color-3);
        color: var(--accent-color);
        font-weight: 600;
    }
    
    .quantity-selector {
        margin: 1.5rem 0;
    }
    
    .quantity-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 0.5rem;
    }
    
    .quantity-btn {
        width: 40px;
        height: 40px;
        border: 2px solid var(--border-color);
        background: var(--bg-secondary);
        border-radius: 8px;
        font-size: 1.2rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .quantity-btn:hover {
        border-color: var(--accent-color);
    }
    
    .quantity-input {
        width: 60px;
        height: 40px;
        text-align: center;
        border: 2px solid var(--border-color);
        border-radius: 8px;
        font-size: 1.1rem;
        font-weight: 600;
    }
    
    .action-buttons {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
    }
    
    .add-to-cart-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    
    .out-of-stock-message {
        text-align: center;
        padding: 2rem;
        background: var(--bg-accent);
        border-radius: 15px;
        margin-top: 2rem;
    }
    
    .out-of-stock-message i {
        font-size: 3rem;
        color: #ef4444;
        margin-bottom: 1rem;
    }
    
    .notify-btn {
        margin-top: 1rem;
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
    // Добавляем стили
    const style = document.createElement('style');
    style.textContent = productModalStyles;
    document.head.appendChild(style);

    // Создаем экземпляр класса
    window.productModal = new ProductModal();
});