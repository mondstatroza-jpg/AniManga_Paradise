const ADMIN_SECRET_COMBINATION = ['Z', 'O', 'V']; // Комбинация Ctrl+Shift+A
let adminMode = sessionStorage.getItem('adminMode') === 'true'; 
class ShoppingCart {
    constructor() {
        this.cart = [];
        this.promoCodes = [];
        this.deliveryOptions = [];
        this.paymentMethods = [];
        this.recommendedProducts = [];
        this.currentPromoCodes = [];
        this.orders = this.loadOrders();

        this.init();
        this.setupAdminShortcut();

        // Слушаем изменения в localStorage из других вкладок
        window.addEventListener('storage', (e) => {
            if (e.key === 'cart') {
                console.log('Корзина изменена в другой вкладке');
                this.loadCart();
                this.renderCart();
                this.updateCartSummary();
                this.updateCartCount();
            }
        });
    }

    loadOrders() {
        const savedOrders = localStorage.getItem('orders');
        return savedOrders ? JSON.parse(savedOrders) : [];
    }

    saveOrders() {
        localStorage.setItem('orders', JSON.stringify(this.orders));
    }

    setupAdminShortcut() {
        let pressedKeys = new Set();

        document.addEventListener('keydown', (e) => {
            pressedKeys.add(e.key);

            const combinationPressed = ADMIN_SECRET_COMBINATION.every(key =>
                pressedKeys.has(key)
            );

            if (combinationPressed) {
                this.activateAdminMode();
                pressedKeys.clear();
            }
        });

        document.addEventListener('keyup', (e) => {
            pressedKeys.delete(e.key);
        });
    }

    activateAdminMode() {
        adminMode = true;
        sessionStorage.setItem('adminMode', 'true');

        // Показываем пункт меню "Заказы"
        const mainNav = document.getElementById('mainNav');
        if (mainNav && !document.querySelector('.nav-link[href="orders.html"]')) {
            const ordersLink = document.createElement('a');
            ordersLink.href = 'orders.html';
            ordersLink.className = 'nav-link';
            ordersLink.innerHTML = '<i class="fas fa-clipboard-list"></i> Заказы';
            mainNav.appendChild(ordersLink);
        }

        this.showNotification('Режим администратора активирован!', 'success');
        console.log('Режим администратора активирован');
    }

    init() {
        // Загрузка данных
        this.loadCart();
        this.loadPromoCodes();
        this.loadDeliveryOptions();
        this.loadPaymentMethods();
        this.loadRecommendedProducts();

        // Инициализация событий
        this.initEvents();

        // Отображение данных
        this.renderCart();
        this.renderPromoCodes();
        this.renderDeliveryOptions();
        this.renderPaymentMethods();
        this.renderRecommendedProducts();
        this.updateCartSummary();
    }

    loadCart() {
        // Загружаем корзину из localStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                this.cart = JSON.parse(savedCart);
                console.log('Корзина загружена из localStorage:', this.cart);
            } catch (e) {
                console.error('Ошибка загрузки корзины:', e);
                this.cart = [];
            }
        } else {
            this.cart = [];
            console.log('Корзина пуста, создаем новую');
        }
    }

    loadPromoCodes() {
        // Рабочие промокоды
        this.promoCodes = [
            {
                code: 'WELCOME10',
                description: 'Скидка 10% для новых покупателей',
                type: 'percentage',
                value: 10,
                minOrder: 0,
                category: 'all'
            },
            {
                code: 'FREESHIP',
                description: 'Бесплатная доставка при заказе от 2000₽',
                type: 'free_shipping',
                value: 0,
                minOrder: 2000,
                category: 'all'
            },
            {
                code: 'ANIME15',
                description: 'Скидка 15% на весь аниме-мерч',
                type: 'percentage',
                value: 15,
                minOrder: 1000,
                category: 'merch'
            },
            {
                code: 'MANGA20',
                description: 'Скидка 20% на всю мангу',
                type: 'percentage',
                value: 20,
                minOrder: 1500,
                category: 'manga'
            },
            {
                code: 'SUMMER2024',
                description: 'Летняя скидка 25% на одежду',
                type: 'percentage',
                value: 25,
                minOrder: 2000,
                category: 'clothing'
            }
        ];
    }

    loadDeliveryOptions() {
        this.deliveryOptions = [
            {
                id: 'courier',
                name: 'Курьерская доставка',
                description: 'Доставка за 2-3 дня',
                cost: 300,
                icon: 'fas fa-truck',
                selected: true
            },
            {
                id: 'pickup',
                name: 'Самовывоз',
                description: 'ул. Мира 82, Красноярск',
                cost: 0,
                icon: 'fas fa-store',
                selected: false
            },
            {
                id: 'post',
                name: 'Почта России',
                description: '5-7 дней',
                cost: 200,
                icon: 'fas fa-box',
                selected: false
            },
            {
                id: 'express',
                name: 'Экспресс-доставка',
                description: '1-2 дня',
                cost: 500,
                icon: 'fas fa-rocket',
                selected: false
            }
        ];
    }

    loadPaymentMethods() {
        this.paymentMethods = [
            {
                id: 'card',
                name: 'Картой онлайн',
                icon: 'fab fa-cc-visa',
                selected: true
            },
            {
                id: 'paypal',
                name: 'PayPal',
                icon: 'fab fa-cc-paypal',
                selected: false
            },
            {
                id: 'cash',
                name: 'Наличные',
                icon: 'fas fa-money-bill-wave',
                selected: false
            },
            {
                id: 'sber',
                name: 'Сбербанк',
                icon: 'fas fa-university',
                selected: false
            },
            {
                id: 'qiwi',
                name: 'QIWI',
                icon: 'fas fa-wallet',
                selected: false
            },
            {
                id: 'yandex',
                name: 'ЮMoney',
                icon: 'fab fa-yandex',
                selected: false
            }
        ];
    }

    loadRecommendedProducts() {
        this.recommendedProducts = [
            {
                id: 4,
                name: 'Постер "Атака титанов" A2',
                category: 'Постер · Арт-принт',
                price: 1299,
                oldPrice: 1599,
                image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                badge: 'НОВИНКА'
            },
            {
                id: 5,
                name: 'Брелок "Символ деревни Листа"',
                category: 'Аксессуары · Брелок',
                price: 349,
                oldPrice: null,
                image: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                badge: null
            },
            {
                id: 6,
                name: 'Толстовка "One Piece" с капюшоном',
                category: 'Одежда · Толстовка',
                price: 2799,
                oldPrice: 3999,
                image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                badge: '-30%'
            },
            {
                id: 7,
                name: 'Футболка "Наруто" коллекционная',
                category: 'Одежда · Футболка',
                price: 1799,
                oldPrice: 2299,
                image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                badge: 'ЭКСКЛЮЗИВ'
            }
        ];
    }

    initEvents() {
        // Применение промокода
        document.getElementById('applyPromoBtn').addEventListener('click', () => {
            this.applyPromoCode();
        });

        // Нажатие Enter в поле промокода
        document.getElementById('promoInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.applyPromoCode();
            }
        });

        // Оформление заказа
        document.getElementById('submitOrderBtn').addEventListener('click', () => {
            this.showCatModal();
        });

        // Закрытие модального окна
        document.getElementById('closeCatModal').addEventListener('click', () => {
            this.hideCatModal();
        });

        document.getElementById('closeModalBtn').addEventListener('click', () => {
            this.hideCatModal();
        });

        // Продолжить покупки
        document.getElementById('continueShoppingBtn').addEventListener('click', () => {
            this.hideCatModal();
            window.location.href = 'catalog.html';
        });

        // Закрытие по клику вне окна
        document.getElementById('catModal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('catModal')) {
                this.hideCatModal();
            }
        });

        // Закрытие по ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideCatModal();
            }
        });

        document.getElementById('clearCartBtn')?.addEventListener('click', () => {
            if (confirm('Вы уверены, что хотите очистить всю корзину?')) {
                this.cart = [];
                localStorage.removeItem('cart');
                this.renderCart();
                this.updateCartSummary();
                this.updateCartCount();
                this.showNotification('Корзина очищена', 'info');
            }
        });
    }

    renderCart() {
        const cartItemsList = document.getElementById('cartItemsList');

        if (this.cart.length === 0) {
            cartItemsList.innerHTML = this.renderEmptyCart();
            return;
        }

        cartItemsList.innerHTML = this.cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                ${item.badge ? `<div class="cart-item-badge">${item.badge}</div>` : ''}
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <p class="cart-item-category">
                        <i class="fas fa-tag"></i> ${item.category}
                        ${item.size ? `· <i class="fas fa-ruler"></i> Размер: ${item.size}` : ''}
                    </p>
                    <div class="cart-item-fandom">
                        <i class="fas fa-users"></i> ${item.fandom}
                    </div>
                    <div class="cart-item-price">
                        ${item.oldPrice ? `
                            <span style="text-decoration: line-through; color: var(--text-secondary); margin-right: 0.5rem;">
                                ${item.oldPrice.toLocaleString('ru-RU')} ₽
                            </span>
                        ` : ''}
                        ${item.price.toLocaleString('ru-RU')} ₽
                    </div>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button class="quantity-btn minus" data-id="${item.id}">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity" data-id="${item.id}">${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <div class="cart-item-total" data-id="${item.id}">
                        ${(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                    </div>
                    <button class="remove-item-btn" data-id="${item.id}" title="Удалить товар">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        // Добавляем обработчики событий для элементов корзины
        this.addCartItemEvents();
    }

    renderEmptyCart() {
        return `
            <div class="empty-cart">
                <div class="empty-cart-icon">
                    <i class="fas fa-shopping-cart"></i>
                </div>
                <h3>Ваша корзина пуста</h3>
                <p>Добавьте товары из каталога или выберите мерч по любимому фандому</p>
                <div class="empty-cart-actions">
                    <a href="catalog.html" class="btn-primary">
                        <i class="fas fa-book"></i> Выбрать мангу для чтения
                    </a>
                    <a href="merch.html" class="btn-secondary">
                        <i class="fas fa-tshirt"></i> Найти мерч по фандому
                    </a>
                </div>
            </div>
        `;
    }

    addCartItemEvents() {
        // Увеличение количества
        document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.closest('.quantity-btn').dataset.id);
                this.increaseQuantity(id);
            });
        });

        // Уменьшение количества
        document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.closest('.quantity-btn').dataset.id);
                this.decreaseQuantity(id);
            });
        });

        // Удаление товара
        document.querySelectorAll('.remove-item-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.closest('.remove-item-btn').dataset.id);
                this.removeItem(id);
            });
        });
    }

    increaseQuantity(itemId) {
        const item = this.cart.find(item => item.id === itemId);
        if (item) {
            item.quantity++;

            // Обновляем отображение
            const quantityElement = document.querySelector(`.quantity[data-id="${itemId}"]`);
            const totalElement = document.querySelector(`.cart-item-total[data-id="${itemId}"]`);

            if (quantityElement) {
                quantityElement.textContent = item.quantity;
            }

            if (totalElement) {
                totalElement.textContent = (item.price * item.quantity).toLocaleString('ru-RU') + ' ₽';
            }

            // Анимация
            const cartItem = document.querySelector(`.cart-item[data-id="${itemId}"]`);
            cartItem.classList.add('item-added');
            setTimeout(() => cartItem.classList.remove('item-added'), 300);

            // Обновляем итоги
            this.updateCartSummary();
            this.updateCartCount();
            this.showNotification(`Количество товара "${item.name}" увеличено`, 'success');
        }
    }

    decreaseQuantity(itemId) {
        const item = this.cart.find(item => item.id === itemId);
        if (item && item.quantity > 1) {
            item.quantity--;

            // Обновляем отображение
            const quantityElement = document.querySelector(`.quantity[data-id="${itemId}"]`);
            const totalElement = document.querySelector(`.cart-item-total[data-id="${itemId}"]`);

            if (quantityElement) {
                quantityElement.textContent = item.quantity;
            }

            if (totalElement) {
                totalElement.textContent = (item.price * item.quantity).toLocaleString('ru-RU') + ' ₽';
            }

            // Анимация
            const cartItem = document.querySelector(`.cart-item[data-id="${itemId}"]`);
            cartItem.classList.add('item-added');
            setTimeout(() => cartItem.classList.remove('item-added'), 300);

            // Обновляем итоги
            this.updateCartSummary();
            this.updateCartCount();
            this.showNotification(`Количество товара "${item.name}" уменьшено`, 'info');
        }
    }

    removeItem(itemId) {
        const item = this.cart.find(item => item.id === itemId);
        if (!item) return;

        console.log('Удаляем товар из корзины:', item);

        // Анимация удаления
        const cartItem = document.querySelector(`.cart-item[data-id="${itemId}"]`);
        if (cartItem) {
            cartItem.classList.add('item-removed');
        }

        setTimeout(() => {
            // Удаляем из массива
            this.cart = this.cart.filter(item => item.id !== itemId);

            // Сохраняем в localStorage
            localStorage.setItem('cart', JSON.stringify(this.cart));

            console.log('Корзина после удаления:', this.cart);

            // Перерисовываем корзину
            this.renderCart();

            // Обновляем итоги
            this.updateCartSummary();
            this.updateCartCount();

            // Показываем уведомление
            this.showNotification(`Товар "${item.name}" удален из корзины`, 'info');
        }, 300);
    }

    renderPromoCodes() {
        const availablePromocodes = document.getElementById('availablePromocodes');

        availablePromocodes.innerHTML = this.promoCodes.map(promo => `
            <div class="promo-item" data-code="${promo.code}">
                <strong>${promo.code}</strong> - ${promo.description}
            </div>
        `).join('');

        // Добавляем обработчики для промокодов
        document.querySelectorAll('.promo-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const code = e.currentTarget.dataset.code;
                document.getElementById('promoInput').value = code;
                this.applyPromoCode();
            });
        });
    }

    applyPromoCode() {
        const promoInput = document.getElementById('promoInput');
        const code = promoInput.value.trim().toUpperCase();

        if (!code) {
            this.showNotification('Введите промокод', 'warning');
            return;
        }

        // Проверяем, не применен ли уже этот промокод
        if (this.currentPromoCodes.includes(code)) {
            this.showNotification('Этот промокод уже применен', 'warning');
            return;
        }

        // Ищем промокод
        const promo = this.promoCodes.find(p => p.code === code);

        if (!promo) {
            this.showNotification('Промокод не найден', 'error');
            return;
        }

        // Проверяем минимальную сумму заказа
        const subtotal = this.calculateSubtotal();
        if (promo.minOrder > 0 && subtotal < promo.minOrder) {
            this.showNotification(`Минимальная сумма заказа для этого промокода: ${promo.minOrder.toLocaleString('ru-RU')}₽`, 'warning');
            return;
        }

        // Проверяем категорию товаров (если указана)
        if (promo.category !== 'all') {
            // Здесь должна быть логика проверки категории товаров в корзине
            // Для демо пропускаем эту проверку
        }

        // Добавляем промокод в список примененных
        this.currentPromoCodes.push(code);

        // Обновляем отображение
        this.renderActivePromoCodes();
        this.updateCartSummary();

        // Очищаем поле ввода
        promoInput.value = '';

        // Показываем уведомление
        this.showNotification(`Промокод "${code}" успешно применен!`, 'success');
    }

    renderActivePromoCodes() {
        const activePromocodes = document.getElementById('activePromocodes');

        if (this.currentPromoCodes.length === 0) {
            activePromocodes.innerHTML = '';
            return;
        }

        activePromocodes.innerHTML = this.currentPromoCodes.map(code => {
            const promo = this.promoCodes.find(p => p.code === code);
            return `
                <div class="promo-card" data-code="${code}">
                    <div>
                        <span class="promo-code">${code}</span>
                        <span class="promo-description">${promo.description}</span>
                    </div>
                    <button class="promo-remove" data-code="${code}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
        }).join('');

        // Добавляем обработчики для удаления промокодов
        document.querySelectorAll('.promo-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const code = e.currentTarget.dataset.code;
                this.removePromoCode(code);
            });
        });
    }

    removePromoCode(code) {
        this.currentPromoCodes = this.currentPromoCodes.filter(c => c !== code);
        this.renderActivePromoCodes();
        this.updateCartSummary();
        this.showNotification(`Промокод "${code}" удален`, 'info');
    }

    renderDeliveryOptions() {
        const deliveryOptions = document.getElementById('deliveryOptions');

        deliveryOptions.innerHTML = this.deliveryOptions.map(option => `
            <label class="delivery-option">
                <input type="radio" name="delivery" value="${option.id}" ${option.selected ? 'checked' : ''}>
                <div class="delivery-option-content">
                    <i class="${option.icon}"></i>
                    <div>
                        <strong>${option.name}</strong>
                        <small>${option.description} ${option.cost > 0 ? `· ${option.cost.toLocaleString('ru-RU')} ₽` : '· Бесплатно'}</small>
                    </div>
                </div>
            </label>
        `).join('');

        // Добавляем обработчики
        document.querySelectorAll('input[name="delivery"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.updateSelectedDelivery(e.target.value);
                this.updateCartSummary();
            });
        });
    }

    updateSelectedDelivery(deliveryId) {
        this.deliveryOptions.forEach(option => {
            option.selected = option.id === deliveryId;
        });
    }

    getSelectedDelivery() {
        return this.deliveryOptions.find(option => option.selected);
    }

    renderPaymentMethods() {
        const paymentMethods = document.getElementById('paymentMethods');

        paymentMethods.innerHTML = this.paymentMethods.map(method => `
            <label class="payment-method">
                <input type="radio" name="payment" value="${method.id}" ${method.selected ? 'checked' : ''}>
                <div class="payment-method-content">
                    <i class="${method.icon}"></i>
                    <span>${method.name}</span>
                </div>
            </label>
        `).join('');

        // Добавляем обработчики
        document.querySelectorAll('input[name="payment"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.updateSelectedPayment(e.target.value);
            });
        });
    }

    updateSelectedPayment(paymentId) {
        this.paymentMethods.forEach(method => {
            method.selected = method.id === paymentId;
        });
    }

    renderRecommendedProducts() {
        const recommendedProducts = document.getElementById('recommendedProducts');

        recommendedProducts.innerHTML = this.recommendedProducts.map(product => `
            <div class="recommended-card" data-id="${product.id}">
                ${product.badge ? `<div class="recommended-badge">${product.badge}</div>` : ''}
                <div class="recommended-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="recommended-info">
                    <h4 class="recommended-name">${product.name}</h4>
                    <p class="recommended-description">${product.category}</p>
                    <div class="recommended-price">
                        ${product.oldPrice ? `
                            <span class="old-price">${product.oldPrice.toLocaleString('ru-RU')} ₽</span>
                        ` : ''}
                        ${product.price.toLocaleString('ru-RU')} ₽
                    </div>
                    <button class="btn-add-recommended" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i> Добавить в корзину
                    </button>
                </div>
            </div>
        `).join('');

        // Добавляем обработчики для кнопок добавления
        document.querySelectorAll('.btn-add-recommended').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                this.addRecommendedProduct(id);
            });
        });
    }

    addRecommendedProduct(productId) {
        const product = this.recommendedProducts.find(p => p.id === productId);

        if (!product) {
            console.error('Товар не найден:', productId);
            return;
        }

        console.log('Добавляем товар в корзину:', product);

        // Проверяем, есть ли уже такой товар в корзине
        const existingItem = this.cart.find(item => item.id === productId);

        if (existingItem) {
            // Увеличиваем количество
            existingItem.quantity++;
            console.log('Увеличен quantity товара:', existingItem);
        } else {
            // Добавляем новый товар
            this.cart.push({
                ...product,
                quantity: 1,
                fandom: this.getRandomFandom(),
                size: product.category.includes('Одежда') ? 'M' : null,
                oldPrice: product.oldPrice || null
            });
            console.log('Добавлен новый товар в корзину:', product);
        }

        // Сохраняем в localStorage
        localStorage.setItem('cart', JSON.stringify(this.cart));

        // Обновляем отображение
        this.renderCart();
        this.updateCartSummary();
        this.updateCartCount();

        // Анимация кнопки
        const button = document.querySelector(`.btn-add-recommended[data-id="${productId}"]`);
        if (button) {
            button.classList.add('added');
            button.innerHTML = '<i class="fas fa-check"></i> Добавлено';

            setTimeout(() => {
                button.classList.remove('added');
                button.innerHTML = '<i class="fas fa-shopping-cart"></i> Добавить в корзину';
            }, 2000);
        }

        // Показываем уведомление
        this.showNotification(`Товар "${product.name}" добавлен в корзину`, 'success');
    }

    getRandomFandom() {
        const fandoms = ['Наруто', 'One Piece', 'Атака титанов', 'Человек-бензопила', 'Моя геройская академия', 'Покемон'];
        return fandoms[Math.floor(Math.random() * fandoms.length)];
    }

    calculateSubtotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    calculateDiscount() {
        let totalDiscount = 0;
        const subtotal = this.calculateSubtotal();

        this.currentPromoCodes.forEach(code => {
            const promo = this.promoCodes.find(p => p.code === code);

            if (promo) {
                if (promo.type === 'percentage') {
                    totalDiscount += subtotal * (promo.value / 100);
                } else if (promo.type === 'free_shipping') {
                    // Для free_shipping скидка будет учтена в доставке
                }
            }
        });

        return Math.round(totalDiscount);
    }

    updateCartSummary() {
        const subtotal = this.calculateSubtotal();
        const discount = this.calculateDiscount();
        const delivery = this.getSelectedDelivery();
        const shippingCost = delivery ? delivery.cost : 0;

        // Применяем скидку на доставку (если есть промокод free_shipping)
        const freeShippingPromo = this.currentPromoCodes.find(code => {
            const promo = this.promoCodes.find(p => p.code === code);
            return promo && promo.type === 'free_shipping' && subtotal >= promo.minOrder;
        });

        const finalShippingCost = freeShippingPromo ? 0 : shippingCost;
        const total = subtotal - discount + finalShippingCost;

        // Обновляем отображение
        document.getElementById('totalItems').textContent = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('subtotal').textContent = subtotal.toLocaleString('ru-RU') + ' ₽';

        if (discount > 0) {
            document.getElementById('discountRow').style.display = 'flex';
            document.getElementById('discountAmount').textContent = '-' + discount.toLocaleString('ru-RU') + ' ₽';
        } else {
            document.getElementById('discountRow').style.display = 'none';
        }

        document.getElementById('shippingCost').textContent = finalShippingCost > 0 ?
            finalShippingCost.toLocaleString('ru-RU') + ' ₽' : 'Бесплатно';

        document.getElementById('totalAmount').textContent = total.toLocaleString('ru-RU') + ' ₽';
    }

    updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

        // Обновляем счетчик в шапке
        document.querySelectorAll('.cart-count').forEach(element => {
            element.textContent = totalItems;
        });

        // Обновляем счетчик в заголовке
        const cartCountBadge = document.querySelector('.cart-count-badge');
        if (cartCountBadge) {
            cartCountBadge.textContent = totalItems;
        }

        console.log('Обновлен счетчик корзины:', totalItems);
    }

    showCatModal() {
        // Проверяем валидность формы
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const address = document.getElementById('address').value.trim();
        const comment = document.getElementById('comment').value.trim();
        const agreement = document.querySelector('#orderForm input[type="checkbox"]').checked;

        if (!firstName || !phone || !email || !agreement) {
            this.showNotification('Заполните все обязательные поля и согласитесь с условиями', 'error');
            return;
        }

        if (this.cart.length === 0) {
            this.showNotification('Добавьте товары в корзину перед оформлением заказа', 'warning');
            return;
        }

        // Создаем заказ
        const order = this.createOrder(firstName, lastName, phone, email, address, comment);

        // Сохраняем заказ
        this.orders.push(order);
        this.saveOrders();

        // Очищаем корзину
        this.cart = [];
        localStorage.removeItem('cart');
        this.renderCart();
        this.updateCartCount();
        this.updateCartSummary();

        // Показываем модальное окно с подтверждением
        this.showOrderConfirmation(order);
    }

    createOrder(firstName, lastName, phone, email, address, comment) {
        const orderId = this.generateOrderId();
        const now = new Date();

        return {
            id: orderId,
            number: this.generateOrderNumber(),
            date: now.toISOString(),
            dateFormatted: now.toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
            customer: {
                firstName,
                lastName,
                phone,
                email,
                address,
                comment
            },
            items: [...this.cart],
            subtotal: this.calculateSubtotal(),
            discount: this.calculateDiscount(),
            shipping: this.getSelectedDelivery()?.cost || 0,
            total: this.calculateSubtotal() - this.calculateDiscount() + (this.getSelectedDelivery()?.cost || 0),
            status: 'новый',
            paymentMethod: this.paymentMethods.find(m => m.selected)?.name || 'Не указан',
            deliveryMethod: this.getSelectedDelivery()?.name || 'Не указана',
            notes: '',
            processedBy: null,
            processedAt: null
        };
    }

    generateOrderId() {
        return Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    generateOrderNumber() {
        const prefix = 'AM';
        const date = new Date();
        const year = date.getFullYear().toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');

        return `${prefix}-${year}${month}${day}-${random}`;
    }

    showOrderConfirmation(order) {
        // Создаем модальное окно подтверждения заказа
        const modal = document.createElement('div');
        modal.className = 'modal active order-confirmation-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="closeOrderModal">&times;</button>
                <div class="order-confirmation-content">
                    <div class="confirmation-header">
                        <i class="fas fa-check-circle"></i>
                        <h2>Заказ оформлен успешно!</h2>
                    </div>
                    
                    <div class="order-details">
                        <div class="detail-row">
                            <strong>Номер заказа:</strong>
                            <span class="order-number">${order.number}</span>
                        </div>
                        <div class="detail-row">
                            <strong>Дата оформления:</strong>
                            <span>${order.dateFormatted}</span>
                        </div>
                        <div class="detail-row">
                            <strong>Статус:</strong>
                            <span class="status-badge new">${order.status}</span>
                        </div>
                        <div class="detail-row">
                            <strong>Сумма заказа:</strong>
                            <span class="order-total">${order.total.toLocaleString('ru-RU')} ₽</span>
                        </div>
                    </div>
                    
                    <div class="order-message">
                        <p><strong>Важно!</strong> Сохраните номер вашего заказа.</p>
                        <p>Покажите его или предъявите скриншот этого окна при получении товара в магазине.</p>
                        <p>Мы свяжемся с вами по телефону <strong>${order.customer.phone}</strong> для подтверждения и уведомим о доставке.</p>
                    </div>
                    
                    <div class="confirmation-actions">
                        <button class="btn-primary" id="downloadReceiptBtn">
                            <i class="fas fa-download"></i> Скачать чек
                        </button>
                        <button class="btn-secondary" id="takeScreenshotBtn">
                            <i class="fas fa-camera"></i> Сделать скриншот
                        </button>
                        <button class="btn-secondary" id="continueShoppingBtn2">
                            <i class="fas fa-shopping-bag"></i> Продолжить покупки
                        </button>
                    </div>
                    
                    <div class="confirmation-footer">
                        <p><i class="fas fa-info-circle"></i> Вы также можете отслеживать статус заказа, обратившись по телефону: +7 (391) 123-45-67</p>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // Обработчики событий
        modal.querySelector('.modal-close').addEventListener('click', () => {
            this.closeModal(modal);
        });

        modal.querySelector('#downloadReceiptBtn').addEventListener('click', () => {
            this.downloadReceipt(order);
        });

        modal.querySelector('#takeScreenshotBtn').addEventListener('click', () => {
            this.takeScreenshot(modal);
        });

        modal.querySelector('#continueShoppingBtn2').addEventListener('click', () => {
            this.closeModal(modal);
            window.location.href = 'catalog.html';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal(modal);
            }
        });
    }

    downloadReceipt(order) {
        const receiptData = {
            "Чек AniManga Paradise": "",
            "----------------------------------------": "",
            "Номер заказа": order.number,
            "Дата": order.dateFormatted,
            "Статус": order.status,
            "----------------------------------------": "",
            "ДАННЫЕ ПОКУПАТЕЛЯ": "",
            "Имя": order.customer.firstName + (order.customer.lastName ? ' ' + order.customer.lastName : ''),
            "Телефон": order.customer.phone,
            "Email": order.customer.email,
            "Адрес": order.customer.address || 'Самовывоз',
            "----------------------------------------": "",
            "СОСТАВ ЗАКАЗА": "",
            ...order.items.reduce((acc, item, index) => {
                acc[`${index + 1}. ${item.name}`] = `${item.quantity} × ${item.price.toLocaleString('ru-RU')} ₽ = ${(item.quantity * item.price).toLocaleString('ru-RU')} ₽`;
                return acc;
            }, {}),
            "----------------------------------------": "",
            "ИТОГО": "",
            "Товары": `${order.subtotal.toLocaleString('ru-RU')} ₽`,
            "Скидка": `${order.discount.toLocaleString('ru-RU')} ₽`,
            "Доставка": `${order.shipping.toLocaleString('ru-RU')} ₽`,
            "К ОПЛАТЕ": `${order.total.toLocaleString('ru-RU')} ₽`,
            "----------------------------------------": "",
            "СПОСОБ ОПЛАТЫ": order.paymentMethod,
            "СПОСОБ ДОСТАВКИ": order.deliveryMethod,
            "----------------------------------------": "",
            "КОММЕНТАРИЙ": order.customer.comment || 'Нет комментария',
            "----------------------------------------": "",
            "СПАСИБО ЗА ПОКУПКУ!": "",
            "AniManga Paradise": "ул. Мира 82, Красноярск",
            "Телефон": "+7 (391) 123-45-67",
            "Email": "info@animanga.ru",
            "Сайт": "https://animanga-paradise.ru"
        };

        // Преобразуем в текст
        let receiptText = '';
        for (const [key, value] of Object.entries(receiptData)) {
            if (value === "") {
                receiptText += key + '\n';
            } else {
                receiptText += `${key}: ${value}\n`;
            }
        }

        // Создаем и скачиваем файл
        const blob = new Blob([receiptText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Чек_${order.number}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        this.showNotification('Чек скачан успешно!', 'success');
    }

    takeScreenshot(modal) {
        // В реальном проекте здесь можно использовать библиотеку html2canvas
        // Но для простоты покажем инструкцию
        this.showNotification('Нажмите Ctrl+P и выберите "Сохранить как PDF" для сохранения чека', 'info');

        // Можно предложить альтернативу
        const printWindow = window.open('', '_blank');
        const receiptContent = modal.querySelector('.order-confirmation-content').innerHTML;
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Чек заказа ${this.orders[this.orders.length - 1]?.number}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    .order-number { font-size: 24px; font-weight: bold; color: #4a6fa5; }
                    .status-badge { display: inline-block; padding: 5px 10px; background: #4a6fa5; color: white; border-radius: 5px; }
                </style>
            </head>
            <body>
                ${receiptContent}
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }

    closeModal(modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    }

    hideCatModal() {
        document.getElementById('catModal').classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    showNotification(message, type = 'info') {
        const container = document.getElementById('notificationContainer');
        if (!container) return;

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;

        const icons = {
            'success': 'fa-check-circle',
            'error': 'fa-exclamation-circle',
            'warning': 'fa-exclamation-triangle',
            'info': 'fa-info-circle'
        };

        notification.innerHTML = `
            <i class="fas ${icons[type] || 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="close-notification">
                <i class="fas fa-times"></i>
            </button>
        `;

        container.appendChild(notification);

        // Автоматическое удаление через 5 секунд
        const autoRemove = setTimeout(() => {
            this.removeNotification(notification);
        }, 5000);

        // Закрытие по кнопке
        const closeBtn = notification.querySelector('.close-notification');
        closeBtn.addEventListener('click', () => {
            clearTimeout(autoRemove);
            this.removeNotification(notification);
        });

        // Ограничение количества уведомлений
        if (container.children.length > 3) {
            this.removeNotification(container.children[0]);
        }
    }

    removeNotification(notification) {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
    window.shoppingCart = new ShoppingCart();

    // Инициализация темы
    if (typeof initTheme === 'function') {
        initTheme();
    }
});