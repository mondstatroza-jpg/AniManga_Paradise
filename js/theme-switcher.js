// Функция для создания анимированных фонов
function createBackgroundAnimation(theme) {
    const container = document.getElementById('backgroundAnimation');
    if (!container) return;

    container.innerHTML = '';
    container.className = 'background-animation';

    // Создание фона в зависимости от темы
    if (theme === 'light') {
        container.classList.add('light-background');

        // Создаем солнце
        const sun = document.createElement('div');
        sun.className = 'sun';
        container.appendChild(sun);

        // Создаем 3 облака
        for (let i = 0; i < 3; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'clouds';

            const size = Math.random() * 50 + 150;
            const top = Math.random() * 70 + 10;
            const delay = Math.random() * 30;
            const duration = Math.random() * 20 + 40;

            cloud.style.width = `${size}px`;
            cloud.style.height = `${size * 0.3}px`;
            cloud.style.top = `${top}%`;
            cloud.style.left = `-${size}px`;
            cloud.style.animationDelay = `${delay}s`;
            cloud.style.animationDuration = `${duration}s`;
            cloud.style.opacity = Math.random() * 0.3 + 0.7;

            container.appendChild(cloud);
        }

    } else if (theme === 'dark') {
        container.classList.add('dark-background');

        // Создаем луну
        const moon = document.createElement('div');
        moon.className = 'moon';
        container.appendChild(moon);

        // Создаем звезды
        for (let i = 0; i < 150; i++) {
            const star = document.createElement('div');
            star.className = 'star';

            const size = Math.random() * 4 + 1;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 3 + 2;
            const isNeon = Math.random() > 0.7;

            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            star.style.animationDelay = `${delay}s`;
            star.style.animationDuration = `${duration}s`;

            if (isNeon) {
                star.classList.add('neon');
            }

            container.appendChild(star);
        }

    } else if (theme === 'anime') {
        container.classList.add('anime-background');

        // Создаем лепестки сакуры
        for (let i = 0; i < 40; i++) {
            const petal = document.createElement('div');
            petal.className = 'sakura-petal';

            const size = Math.random() * 15 + 10;
            const x = Math.random() * 100;
            const delay = Math.random() * 10;
            const duration = Math.random() * 10 + 10;
            const opacity = Math.random() * 0.5 + 0.2;
            const rotateSpeed = Math.random() * 8 + 4;

            petal.style.width = `${size}px`;
            petal.style.height = `${size}px`;
            petal.style.left = `${x}%`;
            petal.style.top = `-${size}px`;
            petal.style.opacity = opacity;
            petal.style.animationDelay = `${delay}s`;
            petal.style.animationDuration = `${duration}s`;

            container.appendChild(petal);
        }

        // Создаем сердечки
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart';

            const size = Math.random() * 10 + 8;
            const x = Math.random() * 100;
            const delay = Math.random() * 15;
            const duration = Math.random() * 15 + 15;
            const opacity = Math.random() * 0.7 + 0.3;

            heart.style.width = `${size}px`;
            heart.style.height = `${size}px`;
            heart.style.left = `${x}%`;
            heart.style.top = `-${size}px`;
            heart.style.opacity = opacity;
            heart.style.animationDelay = `${delay}s`;
            heart.style.animationDuration = `${duration}s`;

            container.appendChild(heart);
        }
    }
}

// Установка темы
function setTheme(theme) {
    // Удаляем все классы тем
    document.body.classList.remove('light-theme', 'dark-theme', 'anime-theme');
    // Добавляем новую тему
    document.body.classList.add(theme + '-theme');

    // Обновление активной кнопки
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.theme === theme) {
            btn.classList.add('active');
        }
    });

    // Обновление логотипа
    const logo = document.getElementById('themeLogo');
    if (logo) {
        if (theme === 'light') logo.className = 'fas fa-sun';
        else if (theme === 'dark') logo.className = 'fas fa-moon';
        else logo.className = 'fas fa-heart';
    }

    // Создание анимированного фона
    createBackgroundAnimation(theme);

    // Сохранение в localStorage
    localStorage.setItem('theme', theme);
}

// Инициализация темы при загрузке
document.addEventListener('DOMContentLoaded', function () {
    // Проверяем сохраненную тему или устанавливаем светлую по умолчанию
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // Добавляем обработчики для кнопок переключения тем
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            setTheme(this.dataset.theme);
        });
    });
});