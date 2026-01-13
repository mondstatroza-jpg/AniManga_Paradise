document.addEventListener('DOMContentLoaded', function () {
    // Инициализация всех компонентов
    initBannerSlider();
    initGalleryNavigation();
    initModals();
    initThemeSwitcher();
    initMobileMenu();
    initCartButtons();
    initNewsAccordion();
});

// РУЧНОЙ СЛАЙДЕР БАННЕРОВ
function initManualSlider() {
    const slider = document.querySelector('.manual-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.slider-slide');
    const indicators = slider.querySelectorAll('.indicator');
    const prevBtn = slider.querySelector('.prev-btn');
    const nextBtn = slider.querySelector('.next-btn');

    let currentSlide = 0;
    const totalSlides = slides.length;

    // Функция показа слайда
    function showSlide(index) {
        // Скрываем все слайды
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Показываем нужный слайд
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }

    // Следующий слайд
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % totalSlides;
        showSlide(nextIndex);
    }

    // Предыдущий слайд
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prevIndex);
    }

    // Обработчики для кнопок
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            prevSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            nextSlide();
        });
    }

    // Обработчики для индикаторов
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', (e) => {
            e.stopPropagation();
            showSlide(index);
        });
    });

    // Клик по слайдеру переключает слайд
    slider.addEventListener('click', (e) => {
        // Проверяем, что клик не по кнопке управления
        if (!e.target.closest('.slider-btn') && !e.target.closest('.indicator')) {
            nextSlide();
        }
    });

    // Инициализация
    showSlide(0);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
    initManualSlider();
    // ... остальной существующий код
});

// Вызовите эту функцию в DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    initManualBannerSlider();
    // ... остальные инициализации
});

// Инициализация слайдера после загрузки DOM
document.addEventListener('DOMContentLoaded', initBannerSlider);

// Навигация по галереям (арты и косплеи)
function initGalleryNavigation() {
    // Инициализация галереи артов
    const artGallery = document.getElementById('artGallery');
    if (artGallery) {
        initGallery('artGallery', 'artPrev', 'artNext', 'artCurrentPage', 'artTotalPages');
    }

    // Инициализация галереи косплеев
    const cosplayGallery = document.getElementById('cosplayGallery');
    if (cosplayGallery) {
        initGallery('cosplayGallery', 'cosplayPrev', 'cosplayNext', 'cosplayCurrentPage', 'cosplayTotalPages');
    }

    // Функция для инициализации конкретной галереи
    function initGallery(galleryId, prevBtnId, nextBtnId, currentPageId, totalPagesId) {
        const gallery = document.getElementById(galleryId);
        if (!gallery) return;

        const pages = gallery.querySelectorAll('.gallery-page');
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);
        const currentPageSpan = document.getElementById(currentPageId);
        const totalPagesSpan = document.getElementById(totalPagesId);

        let currentPage = 1;
        const totalPages = pages.length;

        // Устанавливаем общее количество страниц
        if (totalPagesSpan) {
            totalPagesSpan.textContent = totalPages;
        }

        function showPage(pageNumber) {
            // Скрываем все страницы
            pages.forEach(page => {
                page.classList.remove('active');
            });

            // Показываем нужную страницу
            const targetPage = gallery.querySelector(`.gallery-page[data-page="${pageNumber}"]`);
            if (targetPage) {
                targetPage.classList.add('active');
                currentPage = pageNumber;

                // Обновляем счетчик
                if (currentPageSpan) {
                    currentPageSpan.textContent = currentPage;
                }

                // Обновляем состояние кнопок
                if (prevBtn) {
                    prevBtn.disabled = currentPage === 1;
                }
                if (nextBtn) {
                    nextBtn.disabled = currentPage === totalPages;
                }
            }
        }

        // Инициализация
        showPage(1);

        // Обработчики кнопок
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentPage > 1) {
                    showPage(currentPage - 1);
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentPage < totalPages) {
                    showPage(currentPage + 1);
                }
            });
        }

        // Инициализация hover-эффектов
        const galleryItems = gallery.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            item.addEventListener('mouseenter', function () {
                const overlay = this.querySelector('.gallery-overlay');
                if (overlay) {
                    overlay.style.opacity = '1';
                    overlay.style.transform = 'translateY(0)';
                }
            });

            item.addEventListener('mouseleave', function () {
                const overlay = this.querySelector('.gallery-overlay');
                if (overlay) {
                    overlay.style.opacity = '0';
                    overlay.style.transform = 'translateY(100%)';
                }
            });

            // Кнопка "Написать автору в ВК"
            const vkButton = item.querySelector('.view-artist');
            if (vkButton) {
                vkButton.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    const vkLink = this.getAttribute('data-vk');
                    if (vkLink) {
                        window.open(`https://vk.com/${vkLink}`, '_blank');
                    }
                });
            }
        });
    }
}

// Инициализация модальных окон
function initModals() {
    // Присоединиться к отряду
    const joinTeamBtn = document.getElementById('joinTeamBtn');
    if (joinTeamBtn) {
        joinTeamBtn.addEventListener('click', () => {
            document.getElementById('authModal').classList.add('active');
        });
    }

    // Закрытие модального окна авторизации
    const closeAuthModal = document.getElementById('closeAuthModal');
    if (closeAuthModal) {
        closeAuthModal.addEventListener('click', () => {
            document.getElementById('authModal').classList.remove('active');
        });
    }

    // Обработка формы авторизации
    const authForm = document.getElementById('authForm');
    if (authForm) {
        authForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // Закрываем окно авторизации
            document.getElementById('authModal').classList.remove('active');
            // Показываем окно ошибки через 300мс
            setTimeout(() => {
                document.getElementById('errorModal').classList.add('active');
            }, 300);
        });
    }

    // Закрытие окна ошибки
    const closeErrorModal = document.getElementById('closeErrorModal');
    if (closeErrorModal) {
        closeErrorModal.addEventListener('click', () => {
            document.getElementById('errorModal').classList.remove('active');
        });
    }

    // Кофейня
    const coffeePromoBtn = document.getElementById('coffeePromoBtn');
    if (coffeePromoBtn) {
        coffeePromoBtn.addEventListener('click', () => {
            document.getElementById('coffeeModal').classList.add('active');
        });
    }

    const closeCoffeeModal = document.getElementById('closeCoffeeModal');
    if (closeCoffeeModal) {
        closeCoffeeModal.addEventListener('click', () => {
            document.getElementById('coffeeModal').classList.remove('active');
        });
    }

    // Такси
    const callTaxi = document.getElementById('callTaxi');
    if (callTaxi) {
        callTaxi.addEventListener('click', () => {
            document.getElementById('taxiModal').classList.add('active');
        });
    }

    const closeTaxiModal = document.getElementById('closeTaxiModal');
    if (closeTaxiModal) {
        closeTaxiModal.addEventListener('click', () => {
            document.getElementById('taxiModal').classList.remove('active');
        });
    }

    // Закрытие модальных окон по клику вне окна
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    // Закрытие по клавише ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });
}

// Аккордеон для новостей
function initNewsAccordion() {
    const newsItems = document.querySelectorAll('.news-item');
    if (newsItems.length === 0) return;

    // Показываем первую новость по умолчанию
    if (newsItems.length > 0) {
        newsItems[0].classList.add('active');
    }

    newsItems.forEach(item => {
        const header = item.querySelector('.news-header');
        if (header) {
            header.addEventListener('click', () => {
                // Закрываем все другие новости
                newsItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });

                // Переключаем текущую новость
                item.classList.toggle('active');
            });
        }
    });
}

// Переключение тем
function initThemeSwitcher() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const body = document.body;
    const themeLogo = document.getElementById('themeLogo');

    if (themeButtons.length === 0) return;

    // Восстановление сохраненной темы
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    themeButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const theme = this.getAttribute('data-theme');
            setTheme(theme);
            localStorage.setItem('theme', theme);
        });
    });

    function setTheme(theme) {
        // Удаляем все классы тем
        body.classList.remove('light-theme', 'dark-theme', 'anime-theme');

        // Добавляем новую тему
        body.classList.add(theme + '-theme');

        // Обновление активной кнопки
        themeButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-theme') === theme) {
                btn.classList.add('active');
            }
        });

        // Обновление логотипа
        if (themeLogo) {
            if (theme === 'light') themeLogo.className = 'fas fa-sun';
            else if (theme === 'dark') themeLogo.className = 'fas fa-moon';
            else themeLogo.className = 'fas fa-heart';
        }
    }
}

// Мобильное меню
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('mainNav');

    if (!menuBtn || !nav) return;

    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuBtn.querySelector('i').className =
            nav.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
    });

    // Закрытие при клике на ссылку
    nav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuBtn.querySelector('i').className = 'fas fa-bars';
        });
    });
}

// Кнопки добавления в корзину
function initCartButtons() {
    let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;

    // Обновляем счетчик корзины
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }

    // Функция для обновления счетчика
    function updateCartCount() {
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
        }
        localStorage.setItem('cartCount', cartCount);

        // Анимация счетчика
        if (cartCountElement) {
            cartCountElement.style.transform = 'scale(1.5)';
            setTimeout(() => {
                cartCountElement.style.transform = 'scale(1)';
            }, 300);
        }
    }

    // Обработчик для всех кнопок добавления в корзину
    document.addEventListener('click', function (e) {
        const addToCartBtn = e.target.closest('.btn-add-to-cart');
        if (addToCartBtn) {
            e.preventDefault();
            e.stopPropagation();

            // Увеличиваем счетчик
            cartCount++;
            updateCartCount();

            // Анимация кнопки
            addToCartBtn.classList.add('added');
            const originalText = addToCartBtn.innerHTML;
            addToCartBtn.innerHTML = '<i class="fas fa-check"></i> Добавлено!';

            setTimeout(() => {
                addToCartBtn.classList.remove('added');
                addToCartBtn.innerHTML = originalText;
            }, 2000);

            // Показываем уведомление
            showNotification('Товар добавлен в корзину!', 'success');
        }
    });
}

// Вспомогательная функция для уведомлений
function showNotification(message, type = 'info') {
    const container = document.getElementById('notificationContainer');
    if (!container) {
        // Создаем контейнер для уведомлений, если его нет
        const newContainer = document.createElement('div');
        newContainer.className = 'notification-container';
        newContainer.id = 'notificationContainer';
        document.body.appendChild(newContainer);
        container = newContainer;
    }

    // Создаем уведомление
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    // Выбираем иконку в зависимости от типа
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    else if (type === 'error') icon = 'exclamation-circle';
    else if (type === 'warning') icon = 'exclamation-triangle';

    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;

    container.appendChild(notification);

    // Автоматическое удаление через 3 секунды
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode === container) {
                container.removeChild(notification);
            }
        }, 300);
    }, 3000);

    // Возможность закрыть кликом
    notification.addEventListener('click', () => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode === container) {
                container.removeChild(notification);
            }
        }, 300);
    });
}

// Функция для показа уведомлений
function showNotification(message, type = 'success') {
    // Создаем элемент уведомления, если его нет
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.className = 'notification hidden';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <div class="notification-content"></div>
        `;
        document.body.appendChild(notification);
    }

    const content = notification.querySelector('.notification-content');
    const icon = notification.querySelector('i');

    content.textContent = message;
    notification.className = `notification ${type}`;

    if (type === 'success') {
        icon.className = 'fas fa-check-circle';
        notification.style.borderLeftColor = 'var(--success-color)';
    } else {
        icon.className = 'fas fa-exclamation-circle';
        notification.style.borderLeftColor = 'var(--error-color)';
    }

    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);

}

// Экспортируем функции для использования в других скриптах
window.initBannerSlider = initBannerSlider;
window.initGalleryNavigation = initGalleryNavigation;
window.initThemeSwitcher = initThemeSwitcher;
window.showNotification = showNotification;