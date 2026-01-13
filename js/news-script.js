// Данные для календаря
// Данные для календаря (обновленные на 2025-2026)
const calendarEvents = {
    // Декабрь 2025
    '2025-12-01': [
        { title: 'Старт предновогодней распродажи', description: 'Скидки до 50% на весь ассортимент', time: '10:00' }
    ],
    '2025-12-15': [
        { title: 'Начало зимнего фестиваля "Snow Festival 2025"', description: 'Санкт-Петербург, Ледовый дворец', time: '12:00' }
    ],
    '2025-12-18': [
        { title: 'Косплей-конкурс "Зимняя сказка"', description: 'Призовой фонд 100,000₽', time: '15:00' }
    ],
    '2025-12-20': [
        { title: 'Встреча с режиссером Макото Синкаем', description: 'Москва, кинотеатр "Октябрь"', time: '18:00' }
    ],
    '2025-12-31': [
        { title: 'Новогодний аниме-стрим 2026', description: '6-часовой марафон с призами', time: '22:00' }
    ],

    // Январь 2026
    '2026-01-01': [
        { title: 'Новогодний турнир по аниме-викторине', description: 'Приз 25,000₽ за знания аниме', time: '14:00' }
    ],
    '2026-01-03': [
        { title: 'Распродажа коллекционных фигурок', description: 'Скидки до 60% на 300+ товаров', time: '10:00' }
    ],
    '2026-01-05': [
        { title: 'Лекция "История манги"', description: 'Профессор Танака, онлайн/офлайн', time: '16:00' },
        { title: 'Премьера фильма "Наруто: Последний путь"', description: 'В кинотеатрах по всей России', time: '19:00' }
    ],
    '2026-01-08': [
        { title: 'Презентация новой манги "Cyber Tokyo 2077"', description: 'Автор: Юки Табата', time: '18:00' }
    ],
    '2026-01-10': [
        { title: 'Закрытие новогодних мероприятий', description: 'Награждение, концерт, фейерверк', time: '17:00' }
    ],

    // Существующие события 2024 (для обратной совместимости)
    '2024-04-15': [
        { title: 'Выход новой манги "Demon Slayer: College Days"', description: 'Спин-офф в современном мире', time: '10:00' }
    ],
    '2024-04-20': [
        { title: 'Онлайн-встреча с мангакой Юки Табата', description: 'Трансляция в VK Live', time: '19:00' }
    ],
    '2024-04-30': [
        { title: 'Конец предзаказа коллекционного "Наруто"', description: 'Последний день для заказа', time: '23:59' }
    ],
    '2024-05-01': [
        { title: 'Golden Week - скидки 30%', description: 'Скидки на весь каталог', time: '00:00' }
    ],
    '2024-05-15': [
        { title: 'Начало регистрации на косплей-конкурс', description: 'Регистрация на сайте', time: '12:00' }
    ],
    '2024-05-25': [
        { title: 'Фестиваль "Sakura Fest 2024"', description: 'Москва, Крокус Сити', time: '10:00' }
    ],
    '2024-06-01': [
        { title: 'Конец регистрации на косплей-конкурс', description: 'Последний шанс!', time: '23:59' }
    ],
    '2024-06-15': [
        { title: 'Финал косплей-конкурса "Best of Anime 2024"', description: 'Прямая трансляция', time: '18:00' }
    ]
};

// Данные для игровой зоны
const gamesData = {
    'genshin': {
        title: 'Genshin Impact Турнир',
        description: 'Ежемесячный турнир по Genshin Impact с призовым фондом 50,000₽',
        requirements: [
            'Уровень игрока: 50+',
            'Команда из 4 персонажей',
            'Прохождение 8 этапов',
            'Регистрация до 20 числа каждого месяца'
        ],
        prizes: [
            { icon: 'fas fa-trophy', text: '1 место: 25,000₽ + эксклюзивный мерч' },
            { icon: 'fas fa-medal', text: '2 место: 15,000₽ + набор кристаллов' },
            { icon: 'fas fa-award', text: '3 место: 10,000₽ + 30 дней Welkin Moon' }
        ]
    },
    'honkai': {
        title: 'Honkai: Star Rail Ивент',
        description: 'Специальный ивент "Звёздный экспресс" с эксклюзивными наградами',
        requirements: [
            'Достичь Равновесия 3',
            'Выполнить все ежедневные задания',
            'Накопить 1000 очков активности',
            'Пригласить 3 друзей'
        ],
        prizes: [
            { icon: 'fas fa-star', text: 'Эксклюзивный аватар "Проводник"', },
            { icon: 'fas fa-gem', text: '1600 Звёздных самоцветов' },
            { icon: 'fas fa-ticket-alt', text: '10 Специальных пропусков' }
        ]
    },
    'zenless': {
        title: 'Zenless Zone Zero Турнир',
        description: 'Первый официальный турнир по Zenless Zone Zero в России',
        requirements: [
            'Прохождение 5 главы сюжета',
            'Уровень агента 40+',
            'Регистрация команды из 3 человек',
            'Наличие Discord для связи'
        ],
        prizes: [
            { icon: 'fas fa-crown', text: 'Золотой набор: 30,000₽ + артбук' },
            { icon: 'fas fa-chess-queen', text: 'Серебряный набор: 15,000₽ + фигурка' },
            { icon: 'fas fa-chess-knight', text: 'Бронзовый набор: 5,000₽ + стикерпак' }
        ]
    }
};

// Функция инициализации страницы
function initNewsPage() {
    initAccordion();
    initCalendar();
    initGameModals();
    initNotifications();
    showWelcomeNotification();
}

// Функция для переключения аккордеона
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const item = this.parentElement;
            const content = item.querySelector('.accordion-content');
            const icon = this.querySelector('.accordion-icon');

            // Закрываем все другие аккордеоны
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.accordion-header').classList.remove('active');
                    otherItem.querySelector('.accordion-content').classList.remove('active');
                    otherItem.querySelector('.accordion-icon').classList.remove('fa-chevron-up');
                    otherItem.querySelector('.accordion-icon').classList.add('fa-chevron-down');
                }
            });

            // Переключаем текущий
            this.classList.toggle('active');
            content.classList.toggle('active');

            if (content.classList.contains('active')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });
}

// Функция для инициализации календаря
function initCalendar() {
    const calendarContainer = document.getElementById('calendarContainer');
    if (!calendarContainer) return;

    // Создаем календарь
    createCalendar(new Date().getFullYear(), new Date().getMonth());

    // Обработчики для кнопок навигации
    document.querySelector('.calendar-prev')?.addEventListener('click', function () {
        const currentMonth = document.querySelector('.calendar-month').dataset.month;
        const currentYear = document.querySelector('.calendar-month').dataset.year;
        const date = new Date(currentYear, currentMonth);
        date.setMonth(date.getMonth() - 1);
        createCalendar(date.getFullYear(), date.getMonth());
    });

    document.querySelector('.calendar-next')?.addEventListener('click', function () {
        const currentMonth = document.querySelector('.calendar-month').dataset.month;
        const currentYear = document.querySelector('.calendar-month').dataset.year;
        const date = new Date(currentYear, currentMonth);
        date.setMonth(date.getMonth() + 1);
        createCalendar(date.getFullYear(), date.getMonth());
    });
}

// Функция создания календаря
function createCalendar(year, month) {
    const calendarContainer = document.getElementById('calendarContainer');
    const eventsList = document.getElementById('eventsList');

    const date = new Date(year, month);
    const monthNames = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];

    // Обновляем заголовок
    document.querySelector('.calendar-month').textContent = `${monthNames[month]} ${year}`;
    document.querySelector('.calendar-month').dataset.month = month;
    document.querySelector('.calendar-month').dataset.year = year;

    // Создаем сетку календаря
    let calendarHTML = `
        <div class="calendar-grid">
            <div class="calendar-day-name">Пн</div>
            <div class="calendar-day-name">Вт</div>
            <div class="calendar-day-name">Ср</div>
            <div class="calendar-day-name">Чт</div>
            <div class="calendar-day-name">Пт</div>
            <div class="calendar-day-name">Сб</div>
            <div class="calendar-day-name">Вс</div>
    `;

    // Первый день месяца
    const firstDay = new Date(year, month, 1).getDay();
    // Количество дней в месяце
    const lastDay = new Date(year, month + 1, 0).getDate();

    // Пустые ячейки перед первым днем
    for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
        calendarHTML += `<div class="calendar-day empty"></div>`;
    }

    // Дни месяца
    const today = new Date();
    const currentDate = new Date(year, month, 1);

    for (let day = 1; day <= lastDay; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const hasEvent = calendarEvents[dateStr];
        const isToday = today.getFullYear() === year &&
            today.getMonth() === month &&
            today.getDate() === day;

        let dayClass = 'calendar-day';
        if (isToday) dayClass += ' today';
        if (hasEvent) dayClass += ' event';

        calendarHTML += `
            <div class="${dayClass}" data-date="${dateStr}" onclick="selectDate('${dateStr}')">
                ${day}
            </div>
        `;
    }

    calendarHTML += `</div>`;
    calendarContainer.innerHTML = calendarHTML;

    // Выбираем сегодняшнюю дату по умолчанию
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    selectDate(todayStr);
}

// Функция выбора даты
function selectDate(dateStr) {
    // Убираем выделение у всех дней
    document.querySelectorAll('.calendar-day').forEach(day => {
        day.classList.remove('selected');
    });

    // Выделяем выбранный день
    const selectedDay = document.querySelector(`[data-date="${dateStr}"]`);
    if (selectedDay) {
        selectedDay.classList.add('selected');
    }

    // Показываем события на эту дату
    showEventsForDate(dateStr);
}

// Функция показа событий на выбранную дату
function showEventsForDate(dateStr) {
    const eventsList = document.getElementById('eventsList');
    const events = calendarEvents[dateStr];

    if (events && events.length > 0) {
        let eventsHTML = '';

        events.forEach(event => {
            eventsHTML += `
                <div class="event-item">
                    <div class="event-date">${event.time}</div>
                    <div class="event-title">${event.title}</div>
                    <div class="event-description">${event.description}</div>
                </div>
            `;
        });

        eventsList.innerHTML = eventsHTML;
    } else {
        eventsList.innerHTML = `
            <div class="no-events">
                <i class="fas fa-cat"></i>
                <h4>Событий в этот день нет</h4>
                <p>Или мы, мур-мяу коты, не заметили, что проводилось событие или акция</p>
            </div>
        `;
    }
}

// Функция для инициализации модальных окон игр
function initGameModals() {
    // Обработчики для карточек игр
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', function () {
            const gameId = this.dataset.game;
            openGameModal(gameId);
        });
    });

    // Закрытие модальных окон
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function () {
            this.closest('.modal').classList.remove('active');
        });
    });
}

// Функция открытия модального окна игры
function openGameModal(gameId) {
    const game = gamesData[gameId];
    if (!game) return;

    const modal = document.getElementById('gameModal');
    const title = document.getElementById('gameModalTitle');
    const content = document.getElementById('gameModalContent');

    // Устанавливаем заголовок
    title.textContent = game.title;

    // Формируем содержимое
    let contentHTML = `
        <p>${game.description}</p>
        <div class="game-details">
            <div class="game-requirements">
                <h4><i class="fas fa-clipboard-list"></i> Условия участия:</h4>
                <ul>
    `;

    // Добавляем требования
    game.requirements.forEach(req => {
        contentHTML += `<li>${req}</li>`;
    });

    contentHTML += `
                </ul>
            </div>
            <div class="game-prizes">
                <h4><i class="fas fa-gift"></i> Награды:</h4>
                <div class="prizes-grid">
    `;

    // Добавляем призы
    game.prizes.forEach(prize => {
        contentHTML += `
            <div class="prize-item">
                <i class="${prize.icon}"></i>
                <p>${prize.text}</p>
            </div>
        `;
    });

    contentHTML += `
                </div>
            </div>
        </div>
        <button class="btn-primary" style="margin-top: 1.5rem; width: 100%;" onclick="registerForGame('${gameId}')">
            <i class="fas fa-user-plus"></i> Зарегистрироваться
        </button>
    `;

    content.innerHTML = contentHTML;
    modal.classList.add('active');
}

// Функция регистрации на игру
function registerForGame(gameId) {
    const game = gamesData[gameId];
    showNotification(`Вы зарегистрированы на "${game.title}"! Мы свяжемся с вами по email.`, 'success');

    // Закрываем модальное окно
    document.getElementById('gameModal').classList.remove('active');
}

// Функция инициализации системы уведомлений
function initNotifications() {
    // Создаем область для уведомлений, если её нет
    if (!document.getElementById('notificationArea')) {
        const notificationArea = document.createElement('div');
        notificationArea.id = 'notificationArea';
        notificationArea.className = 'notification-area';
        document.body.appendChild(notificationArea);
    }
}

// Функция показа уведомления
function showNotification(message, type = 'info', duration = 5000) {
    const notificationArea = document.getElementById('notificationArea');
    const notification = document.createElement('div');

    // Определяем иконку по типу
    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    else if (type === 'error') icon = 'fa-exclamation-circle';
    else if (type === 'warning') icon = 'fa-exclamation-triangle';

    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;

    notificationArea.appendChild(notification);

    // Удаляем уведомление через указанное время
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, duration);
}

// Функция показа приветственного уведомления
function showWelcomeNotification() {
    setTimeout(() => {
        showNotification('Добро пожаловать в мир аниме-новостей! 🐱', 'success');
    }, 1000);
}

// Функция показа формы комментария
function showCommentForm(button) {
    // Показываем модальное окно с котиком
    document.getElementById('commentAuthModal').classList.add('active');

}

// Функция отправки комментария
function submitComment(form) {
    const textarea = form.querySelector('textarea');
    if (textarea.value.trim() === '') {
        showNotification('Введите текст комментария!', 'warning');
        return;
    }

    showNotification('Комментарий отправлен на модерацию!', 'success');
    textarea.value = '';
    form.classList.remove('active');
}

// Функция открытия модального окна авторизации
function openAuthModal() {
    showNotification('Форма авторизации будет доступна в полной версии сайта!', 'info');
}

// Закрытие модальных окон по клику вне окна
document.addEventListener('DOMContentLoaded', function () {
    // Инициализация страницы
    initNewsPage();

    // Закрытие модальных окон по клику вне окна
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function (e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });

    // Закрытие по ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });

    // Мобильное меню
    document.getElementById('mobileMenuBtn')?.addEventListener('click', function () {
        document.getElementById('mainNav').classList.toggle('active');
    });

    // Закрытие модальных окон
    document.getElementById('closeCommentModal')?.addEventListener('click', function () {
        document.getElementById('commentAuthModal').classList.remove('active');
    });


});