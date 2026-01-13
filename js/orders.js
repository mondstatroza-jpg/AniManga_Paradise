// orders.js - Управление заказами администратора

console.log('orders.js загружен');

class OrdersManager {
    constructor() {
        console.log('OrdersManager конструктор вызван');
        this.orders = [];
        this.filteredOrders = [];
        this.currentFilter = 'all';
        this.currentDateFilter = 'all';
        this.searchQuery = '';
        this.currentPage = 1;
        this.ordersPerPage = 10;

        this.init();
    }

    checkAdminAccess() {
        const isAdmin = sessionStorage.getItem('adminMode') === 'true';
        console.log('Проверка прав администратора:', isAdmin);

        if (!isAdmin) {
            this.showAccessDenied();
            return false;
        }

        return true;
    }

    showAccessDenied() {
        console.log('Показываем сообщение об отказе в доступе');

        // Заменяем содержимое main
        const main = document.querySelector('main');
        if (!main) return;

        main.innerHTML = `
            <div class="access-denied">
                <div class="access-denied-content">
                    <i class="fas fa-lock"></i>
                    <h1>Доступ запрещен</h1>
                    <p>Эта страница доступна только администраторам.</p>
                    <p>Для входа используйте комбинацию клавиш <strong>Z+O+V</strong> на главной странице.</p>
                    <div class="access-actions">
                        <a href="index.html" class="btn-primary">
                            <i class="fas fa-home"></i> На главную
                        </a>
                        <button class="btn-secondary" id="tryAgainBtn">
                            <i class="fas fa-redo"></i> Попробовать снова
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('tryAgainBtn')?.addEventListener('click', () => {
            console.log('Попытка входа снова');
            sessionStorage.setItem('adminMode', 'true');
            location.reload();
        });
    }

    init() {
        console.log('Инициализация OrdersManager');

        if (!this.checkAdminAccess()) {
            console.log('Доступ запрещен, останавливаем инициализацию');
            return;
        }

        this.loadOrders();
        this.setupEventListeners();
        this.renderStats();
        this.renderOrders();
        this.renderPagination();

        // Показываем бейдж администратора
        const adminBadge = document.getElementById('adminBadge');
        if (adminBadge) {
            adminBadge.style.display = 'inline-flex';
        }

        console.log('OrdersManager инициализирован');
    }

    loadOrders() {
        const savedOrders = localStorage.getItem('orders');
        console.log('Загружаем заказы из localStorage:', savedOrders);

        if (savedOrders) {
            try {
                this.orders = JSON.parse(savedOrders);
                console.log('Заказы загружены:', this.orders.length);
            } catch (e) {
                console.error('Ошибка загрузки заказов:', e);
                this.orders = [];
            }
        } else {
            this.orders = [];
            console.log('Заказы не найдены, создаем пустой массив');
        }

        this.applyFilters();
    }

    saveOrders() {
        console.log('Сохраняем заказы в localStorage:', this.orders.length);
        localStorage.setItem('orders', JSON.stringify(this.orders));
    }

    setupEventListeners() {
        console.log('Настраиваем обработчики событий');

        // Фильтры
        const statusFilter = document.getElementById('statusFilter');
        const dateFilter = document.getElementById('dateFilter');
        const searchOrders = document.getElementById('searchOrders');

        if (statusFilter) {
            statusFilter.addEventListener('change', (e) => {
                this.currentFilter = e.target.value;
                this.currentPage = 1;
                this.applyFilters();
                this.renderOrders();
                this.renderPagination();
            });
        }

        if (dateFilter) {
            dateFilter.addEventListener('change', (e) => {
                this.currentDateFilter = e.target.value;
                this.currentPage = 1;
                this.applyFilters();
                this.renderOrders();
                this.renderPagination();
            });
        }

        if (searchOrders) {
            searchOrders.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase();
                this.currentPage = 1;
                this.applyFilters();
                this.renderOrders();
                this.renderPagination();
            });
        }

        // Кнопки действий
        document.getElementById('refreshOrdersBtn')?.addEventListener('click', () => {
            this.loadOrders();
            this.renderStats();
            this.renderOrders();
            this.showNotification('Список заказов обновлен', 'success');
        });

        document.getElementById('exportOrdersBtn')?.addEventListener('click', () => {
            this.exportOrders();
        });

        document.getElementById('clearOldOrdersBtn')?.addEventListener('click', () => {
            this.clearOldOrders();
        });

        document.getElementById('logoutAdminBtn')?.addEventListener('click', () => {
            this.logoutAdmin();
        });

        // Закрытие модального окна
        document.getElementById('closeOrderDetailsModal')?.addEventListener('click', () => {
            this.closeOrderDetails();
        });

        const orderDetailsModal = document.getElementById('orderDetailsModal');
        if (orderDetailsModal) {
            orderDetailsModal.addEventListener('click', (e) => {
                if (e.target === orderDetailsModal) {
                    this.closeOrderDetails();
                }
            });
        }

        // Закрытие по ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeOrderDetails();
            }
        });
    }

    applyFilters() {
        console.log('Применяем фильтры');
        let filtered = [...this.orders];

        // Фильтр по статусу
        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(order => order.status === this.currentFilter);
            console.log(`Фильтр по статусу "${this.currentFilter}":`, filtered.length);
        }

        // Фильтр по дате
        if (this.currentDateFilter !== 'all') {
            const now = new Date();
            let startDate = new Date();

            switch (this.currentDateFilter) {
                case 'today':
                    startDate.setHours(0, 0, 0, 0);
                    break;
                case 'week':
                    startDate.setDate(now.getDate() - 7);
                    break;
                case 'month':
                    startDate.setMonth(now.getMonth() - 1);
                    break;
            }

            filtered = filtered.filter(order => {
                const orderDate = new Date(order.date);
                return orderDate >= startDate;
            });

            console.log(`Фильтр по дате "${this.currentDateFilter}":`, filtered.length);
        }

        // Поиск
        if (this.searchQuery) {
            filtered = filtered.filter(order => {
                const searchIn = [
                    order.number,
                    order.customer.firstName,
                    order.customer.lastName,
                    order.customer.phone,
                    order.customer.email
                ].join(' ').toLowerCase();

                return searchIn.includes(this.searchQuery);
            });

            console.log(`Фильтр по поиску "${this.searchQuery}":`, filtered.length);
        }

        // Сортировка по дате (новые сначала)
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

        this.filteredOrders = filtered;
        console.log('Отфильтровано заказов:', this.filteredOrders.length);
    }

    renderStats() {
        console.log('Отрисовываем статистику');
        const stats = {
            total: this.orders.length,
            new: this.orders.filter(o => o.status === 'новый').length,
            processing: this.orders.filter(o => o.status === 'в обработке').length,
            shipped: this.orders.filter(o => o.status === 'отправлен').length,
            delivered: this.orders.filter(o => o.status === 'доставлен').length,
            cancelled: this.orders.filter(o => o.status === 'отменен').length
        };

        const statsElement = document.getElementById('ordersStats');
        if (statsElement) {
            statsElement.innerHTML = `
                <div class="stat-card">
                    <div class="stat-label">Всего заказов</div>
                    <div class="stat-value">${stats.total}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Новые</div>
                    <div class="stat-value" style="color: #4a6fa5;">${stats.new}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">В обработке</div>
                    <div class="stat-value" style="color: #ffc107;">${stats.processing}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Отправлено</div>
                    <div class="stat-value" style="color: #198754;">${stats.shipped}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Доставлено</div>
                    <div class="stat-value" style="color: #0d6efd;">${stats.delivered}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Отменено</div>
                    <div class="stat-value" style="color: #dc3545;">${stats.cancelled}</div>
                </div>
            `;
        }
    }

    renderOrders() {
        console.log('Отрисовываем таблицу заказов');
        const tableBody = document.getElementById('ordersTableBody');
        const noOrdersMessage = document.getElementById('noOrdersMessage');

        if (!tableBody || !noOrdersMessage) {
            console.error('Не найдены элементы таблицы заказов');
            return;
        }

        if (this.filteredOrders.length === 0) {
            tableBody.innerHTML = '';
            noOrdersMessage.style.display = 'block';
            console.log('Нет заказов для отображения');
            return;
        }

        noOrdersMessage.style.display = 'none';

        // Пагинация
        const startIndex = (this.currentPage - 1) * this.ordersPerPage;
        const endIndex = startIndex + this.ordersPerPage;
        const ordersToShow = this.filteredOrders.slice(startIndex, endIndex);

        tableBody.innerHTML = ordersToShow.map(order => {
            const statusClass = this.getStatusClass(order.status);
            const total = order.total ? order.total.toLocaleString('ru-RU') : '0';

            return `
                <tr>
                    <td>
                        <strong>${order.number || 'Без номера'}</strong>
                    </td>
                    <td>${order.dateFormatted || new Date(order.date).toLocaleDateString('ru-RU')}</td>
                    <td>
                        <div>${order.customer?.firstName || ''} ${order.customer?.lastName || ''}</div>
                        <small>${order.customer?.email || ''}</small>
                    </td>
                    <td>${order.customer?.phone || ''}</td>
                    <td>${total} ₽</td>
                    <td>
                        <select class="status-select ${statusClass}" 
                                data-order-id="${order.id}"
                                onchange="window.ordersManager.updateStatus('${order.id}', this.value)">
                            <option value="новый" ${order.status === 'новый' ? 'selected' : ''}>Новый</option>
                            <option value="в обработке" ${order.status === 'в обработке' ? 'selected' : ''}>В обработке</option>
                            <option value="отправлен" ${order.status === 'отправлен' ? 'selected' : ''}>Отправлен</option>
                            <option value="доставлен" ${order.status === 'доставлен' ? 'selected' : ''}>Доставлен</option>
                            <option value="отменен" ${order.status === 'отменен' ? 'selected' : ''}>Отменен</option>
                        </select>
                    </td>
                    <td>
                        <div class="table-actions">
                            <button class="btn-table btn-view" 
                                    onclick="window.ordersManager.viewOrderDetails('${order.id}')"
                                    title="Просмотреть детали">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn-table btn-edit" 
                                    onclick="window.ordersManager.editOrder('${order.id}')"
                                    title="Редактировать">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-table btn-delete" 
                                    onclick="window.ordersManager.deleteOrder('${order.id}')"
                                    title="Удалить заказ">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');

        console.log('Таблица заказов отрисована');
    }

    getStatusClass(status) {
        const classes = {
            'новый': 'status-new',
            'в обработке': 'status-processing',
            'отправлен': 'status-shipped',
            'доставлен': 'status-delivered',
            'отменен': 'status-cancelled'
        };
        return classes[status] || '';
    }

    renderPagination() {
        console.log('Отрисовываем пагинацию');
        const totalPages = Math.ceil(this.filteredOrders.length / this.ordersPerPage);
        const paginationElement = document.getElementById('ordersPagination');

        if (!paginationElement) {
            console.error('Элемент пагинации не найден');
            return;
        }

        if (totalPages <= 1) {
            paginationElement.innerHTML = '';
            return;
        }

        let paginationHTML = `
            <button class="pagination-btn prev" ${this.currentPage === 1 ? 'disabled' : ''}
                    onclick="window.ordersManager.changePage(${this.currentPage - 1})">
                <i class="fas fa-chevron-left"></i> Назад
            </button>
            
            <div class="pagination-numbers">
        `;

        // Показываем первые страницы, последние и текущую с соседями
        for (let i = 1; i <= Math.min(3, totalPages); i++) {
            paginationHTML += `
                <button class="pagination-number ${i === this.currentPage ? 'active' : ''}"
                        onclick="window.ordersManager.changePage(${i})">
                    ${i}
                </button>
            `;
        }

        if (totalPages > 3) {
            if (this.currentPage > 3 && this.currentPage < totalPages - 2) {
                paginationHTML += `<span>...</span>`;
                for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++) {
                    if (i > 3 && i < totalPages - 2) {
                        paginationHTML += `
                            <button class="pagination-number ${i === this.currentPage ? 'active' : ''}"
                                    onclick="window.ordersManager.changePage(${i})">
                                ${i}
                            </button>
                        `;
                    }
                }
                paginationHTML += `<span>...</span>`;
            } else if (totalPages > 6) {
                paginationHTML += `<span>...</span>`;
            }

            for (let i = Math.max(totalPages - 2, 4); i <= totalPages; i++) {
                if (i > 3) {
                    paginationHTML += `
                        <button class="pagination-number ${i === this.currentPage ? 'active' : ''}"
                                onclick="window.ordersManager.changePage(${i})">
                            ${i}
                        </button>
                    `;
                }
            }
        }

        paginationHTML += `
            </div>
            
            <button class="pagination-btn next" ${this.currentPage === totalPages ? 'disabled' : ''}
                    onclick="window.ordersManager.changePage(${this.currentPage + 1})">
                Вперед <i class="fas fa-chevron-right"></i>
            </button>
        `;

        paginationElement.innerHTML = paginationHTML;
    }

    changePage(page) {
        console.log('Меняем страницу на:', page);
        this.currentPage = page;
        this.renderOrders();
        this.renderPagination();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    updateStatus(orderId, newStatus) {
        console.log('Обновляем статус заказа:', orderId, newStatus);
        const order = this.orders.find(o => o.id === orderId);
        if (!order) {
            console.error('Заказ не найден:', orderId);
            return;
        }

        const oldStatus = order.status;
        order.status = newStatus;

        // Добавляем историю изменений
        if (!order.history) order.history = [];
        order.history.push({
            date: new Date().toISOString(),
            action: 'Изменение статуса',
            from: oldStatus,
            to: newStatus,
            by: 'Администратор'
        });

        this.saveOrders();
        this.applyFilters();
        this.renderStats();
        this.renderOrders();

        this.showNotification(`Статус заказа ${order.number} изменен на "${newStatus}"`, 'success');
    }

    viewOrderDetails(orderId) {
        console.log('Просмотр деталей заказа:', orderId);
        const order = this.orders.find(o => o.id === orderId);
        if (!order) {
            console.error('Заказ не найден:', orderId);
            return;
        }

        const modalContent = document.getElementById('orderDetailsContent');
        if (!modalContent) {
            console.error('Модальное окно не найдено');
            return;
        }

        modalContent.innerHTML = this.renderOrderDetails(order);

        document.getElementById('orderDetailsModal').classList.add('active');
        document.body.style.overflow = 'hidden';

        // Добавляем обработчики для кнопок внутри модального окна
        setTimeout(() => {
            document.getElementById('saveNotesBtn')?.addEventListener('click', () => {
                this.saveOrderNotes(orderId);
            });

            document.getElementById('printOrderBtn')?.addEventListener('click', () => {
                this.printOrder(order);
            });

            document.getElementById('copyOrderNumberBtn')?.addEventListener('click', () => {
                this.copyOrderNumber(order.number);
            });
        }, 100);
    }

    renderOrderDetails(order) {
        console.log('Отрисовываем детали заказа:', order.id);
        const statusClass = this.getStatusClass(order.status);
        const itemsHTML = order.items?.map(item => `
            <div class="order-item">
                <div class="order-item-image">
                    <img src="${item.image || 'https://via.placeholder.com/80'}" alt="${item.name || 'Товар'}">
                </div>
                <div class="order-item-info">
                    <div class="order-item-name">${item.name || 'Неизвестный товар'}</div>
                    <div class="order-item-meta">
                        ${item.category || ''} ${item.size ? `· Размер: ${item.size}` : ''}
                    </div>
                    <div class="order-item-price">
                        ${(item.price || 0).toLocaleString('ru-RU')} ₽ × ${item.quantity || 1} = 
                        <span class="order-item-total">
                            ${((item.price || 0) * (item.quantity || 1)).toLocaleString('ru-RU')} ₽
                        </span>
                    </div>
                </div>
            </div>
        `).join('') || '<p>Товары не найдены</p>';

        return `
            <div class="order-details-header">
                <div>
                    <h2>Детали заказа</h2>
                    <div class="order-number-large">${order.number || 'Без номера'}</div>
                </div>
                <div class="status-badge ${statusClass}">${order.status || 'новый'}</div>
            </div>

            <div class="order-details-grid">
                <div class="details-section">
                    <h3><i class="fas fa-user"></i> Информация о клиенте</h3>
                    <div class="detail-item">
                        <span class="detail-label">Имя:</span>
                        <span class="detail-value">${order.customer?.firstName || ''} ${order.customer?.lastName || ''}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Телефон:</span>
                        <span class="detail-value">${order.customer?.phone || ''}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Email:</span>
                        <span class="detail-value">${order.customer?.email || ''}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Адрес:</span>
                        <span class="detail-value">${order.customer?.address || 'Самовывоз'}</span>
                    </div>
                </div>

                <div class="details-section">
                    <h3><i class="fas fa-shipping-fast"></i> Информация о доставке</h3>
                    <div class="detail-item">
                        <span class="detail-label">Способ доставки:</span>
                        <span class="detail-value">${order.deliveryMethod || 'Не указан'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Способ оплаты:</span>
                        <span class="detail-value">${order.paymentMethod || 'Не указан'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Дата оформления:</span>
                        <span class="detail-value">${order.dateFormatted || new Date(order.date).toLocaleDateString('ru-RU')}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Комментарий:</span>
                        <span class="detail-value">${order.customer?.comment || 'Нет комментария'}</span>
                    </div>
                </div>

                <div class="details-section order-items">
                    <h3><i class="fas fa-shopping-cart"></i> Состав заказа</h3>
                    ${itemsHTML}
                </div>

                <div class="details-section order-summary-section">
                    <h3><i class="fas fa-calculator"></i> Итоговая сумма</h3>
                    <div class="detail-item">
                        <span class="detail-label">Товары:</span>
                        <span class="detail-value">${(order.subtotal || 0).toLocaleString('ru-RU')} ₽</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Скидка:</span>
                        <span class="detail-value">-${(order.discount || 0).toLocaleString('ru-RU')} ₽</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Доставка:</span>
                        <span class="detail-value">${(order.shipping || 0).toLocaleString('ru-RU')} ₽</span>
                    </div>
                    <div class="detail-item total">
                        <span class="detail-label">К оплате:</span>
                        <span class="detail-value">${(order.total || 0).toLocaleString('ru-RU')} ₽</span>
                    </div>
                </div>
            </div>

            <div class="order-notes">
                <h3><i class="fas fa-sticky-note"></i> Заметки администратора</h3>
                <textarea id="orderNotes" placeholder="Добавьте заметки по заказу...">${order.notes || ''}</textarea>
            </div>

            <div class="order-details-actions">
                <button class="btn-primary" id="saveNotesBtn">
                    <i class="fas fa-save"></i> Сохранить заметки
                </button>
                <button class="btn-secondary" id="printOrderBtn">
                    <i class="fas fa-print"></i> Распечатать
                </button>
                <button class="btn-secondary" id="copyOrderNumberBtn">
                    <i class="fas fa-copy"></i> Копировать номер
                </button>
                <button class="btn-secondary" onclick="window.ordersManager.closeOrderDetails()">
                    <i class="fas fa-times"></i> Закрыть
                </button>
            </div>
        `;
    }

    saveOrderNotes(orderId) {
        console.log('Сохраняем заметки для заказа:', orderId);
        const order = this.orders.find(o => o.id === orderId);
        if (!order) {
            console.error('Заказ не найден:', orderId);
            return;
        }

        const notes = document.getElementById('orderNotes').value;
        order.notes = notes;

        if (!order.history) order.history = [];
        order.history.push({
            date: new Date().toISOString(),
            action: 'Изменение заметок',
            by: 'Администратор'
        });

        this.saveOrders();
        this.showNotification('Заметки сохранены', 'success');
    }

    printOrder(order) {
        console.log('Печать заказа:', order.id);
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Заказ ${order.number}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    .print-header { text-align: center; margin-bottom: 30px; }
                    .order-number { font-size: 24px; font-weight: bold; color: #4a6fa5; }
                    .print-section { margin-bottom: 20px; }
                    .print-label { font-weight: bold; }
                    .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                    .items-table th, .items-table td { border: 1px solid #ddd; padding: 8px; }
                    .total-row { font-weight: bold; }
                    @media print {
                        button { display: none; }
                    }
                </style>
            </head>
            <body>
                <div class="print-header">
                    <h1>AniManga Paradise</h1>
                    <div class="order-number">Заказ № ${order.number}</div>
                    <div>Дата: ${order.dateFormatted}</div>
                </div>

                <div class="print-section">
                    <h3>Информация о клиенте:</h3>
                    <div><span class="print-label">Имя:</span> ${order.customer?.firstName || ''} ${order.customer?.lastName || ''}</div>
                    <div><span class="print-label">Телефон:</span> ${order.customer?.phone || ''}</div>
                    <div><span class="print-label">Email:</span> ${order.customer?.email || ''}</div>
                    <div><span class="print-label">Адрес:</span> ${order.customer?.address || 'Самовывоз'}</div>
                </div>

                <div class="print-section">
                    <h3>Состав заказа:</h3>
                    <table class="items-table">
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Товар</th>
                                <th>Цена</th>
                                <th>Кол-во</th>
                                <th>Сумма</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${order.items?.map((item, index) => `
                                <tr>
                                    <td>${index + 1}</td>
                                    <td>${item.name || 'Товар'}</td>
                                    <td>${(item.price || 0).toLocaleString('ru-RU')} ₽</td>
                                    <td>${item.quantity || 1}</td>
                                    <td>${((item.price || 0) * (item.quantity || 1)).toLocaleString('ru-RU')} ₽</td>
                                </tr>
                            `).join('') || '<tr><td colspan="5">Товары не найдены</td></tr>'}
                            <tr class="total-row">
                                <td colspan="4" style="text-align: right;">Итого:</td>
                                <td>${(order.total || 0).toLocaleString('ru-RU')} ₽</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="print-section">
                    <h3>Дополнительная информация:</h3>
                    <div><span class="print-label">Статус:</span> ${order.status || 'новый'}</div>
                    <div><span class="print-label">Способ оплаты:</span> ${order.paymentMethod || 'Не указан'}</div>
                    <div><span class="print-label">Способ доставки:</span> ${order.deliveryMethod || 'Не указан'}</div>
                    <div><span class="print-label">Комментарий клиента:</span> ${order.customer?.comment || 'Нет'}</div>
                    <div><span class="print-label">Заметки администратора:</span> ${order.notes || 'Нет'}</div>
                </div>

                <div style="margin-top: 40px; text-align: center; font-size: 12px; color: #666;">
                    <p>AniManga Paradise • ул. Мира 82, Красноярск • +7 (391) 123-45-67</p>
                    <p>Дата печати: ${new Date().toLocaleDateString('ru-RU')}</p>
                </div>

                <div style="margin-top: 20px; text-align: center;">
                    <button onclick="window.print()">Печатать</button>
                    <button onclick="window.close()">Закрыть</button>
                </div>
            </body>
            </html>
        `);
        printWindow.document.close();
    }

    copyOrderNumber(orderNumber) {
        navigator.clipboard.writeText(orderNumber).then(() => {
            this.showNotification('Номер заказа скопирован', 'success');
        }).catch(err => {
            console.error('Ошибка копирования:', err);
            this.showNotification('Не удалось скопировать номер', 'error');
        });
    }

    closeOrderDetails() {
        const modal = document.getElementById('orderDetailsModal');
        if (modal) {
            modal.classList.remove('active');
        }
        document.body.style.overflow = 'auto';
    }

    editOrder(orderId) {
        console.log('Редактирование заказа:', orderId);
        this.showNotification('Редактирование заказа в разработке', 'info');
    }

    deleteOrder(orderId) {
        console.log('Удаление заказа:', orderId);
        if (!confirm('Вы уверены, что хотите удалить этот заказ? Это действие нельзя отменить.')) {
            return;
        }

        const orderIndex = this.orders.findIndex(o => o.id === orderId);
        if (orderIndex === -1) {
            console.error('Заказ не найден для удаления:', orderId);
            return;
        }

        const orderNumber = this.orders[orderIndex].number;
        this.orders.splice(orderIndex, 1);
        this.saveOrders();
        this.applyFilters();
        this.renderStats();
        this.renderOrders();
        this.renderPagination();

        this.showNotification(`Заказ ${orderNumber} удален`, 'info');
    }

    exportOrders() {
        console.log('Экспорт заказов в JSON');
        const exportData = {
            exportDate: new Date().toISOString(),
            totalOrders: this.orders.length,
            orders: this.orders
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const exportDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const link = document.createElement('a');
        link.href = url;
        link.download = `orders_export_${exportDate}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        this.showNotification(`Экспортировано ${this.orders.length} заказов`, 'success');
    }

    clearOldOrders() {
        console.log('Очистка старых заказов');
        if (!confirm('Удалить все доставленные и отмененные заказы старше 30 дней?')) {
            return;
        }

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const oldOrders = this.orders.filter(order => {
            const orderDate = new Date(order.date);
            const isOld = orderDate < thirtyDaysAgo;
            const isDeliveredOrCancelled = order.status === 'доставлен' || order.status === 'отменен';
            return isOld && isDeliveredOrCancelled;
        });

        if (oldOrders.length === 0) {
            this.showNotification('Нет старых заказов для удаления', 'info');
            return;
        }

        this.orders = this.orders.filter(order => {
            const orderDate = new Date(order.date);
            const isOld = orderDate < thirtyDaysAgo;
            const isDeliveredOrCancelled = order.status === 'доставлен' || order.status === 'отменен';
            return !(isOld && isDeliveredOrCancelled);
        });

        this.saveOrders();
        this.applyFilters();
        this.renderStats();
        this.renderOrders();
        this.renderPagination();

        this.showNotification(`Удалено ${oldOrders.length} старых заказов`, 'success');
    }

    logoutAdmin() {
        console.log('Выход из режима администратора');
        sessionStorage.removeItem('adminMode');
        window.location.href = 'index.html';
    }

    showNotification(message, type = 'info') {
        console.log(`Уведомление [${type}]:`, message);
        const container = document.getElementById('notificationContainer');
        if (!container) {
            console.error('Контейнер для уведомлений не найден');
            return;
        }

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

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);

        notification.querySelector('.close-notification').addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM загружен, инициализируем OrdersManager');
    window.ordersManager = new OrdersManager();

    // Инициализация темы
    if (typeof initTheme === 'function') {
        initTheme();
    }
});

console.log('orders.js загружен и готов');