class Forum {
    constructor() {
        this.currentUser = this.getCurrentUser();
        this.topics = this.loadTopics();
        this.messages = this.loadMessages();
        this.onlineUsers = [];
        this.achievements = this.loadAchievements();

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadTopicsList();
        this.loadOnlineUsers();
        this.loadMessagesList();
        this.setupTopicCreation();
        this.setupSearch();
    }

    getCurrentUser() {
        // Получаем текущего пользователя из localStorage
        const user = localStorage.getItem('currentUser');
        if (user) {
            return JSON.parse(user);
        }

        // Демо-пользователь
        return {
            id: 1,
            name: 'Анонимный пользователь',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
            rank: 'Новичок',
            posts: 0,
            isAnonymous: true
        };
    }

    loadTopics() {
        const saved = localStorage.getItem('forumTopics');
        if (saved) {
            return JSON.parse(saved);
        }

        // Демо-темы
        return this.generateDemoTopics();
    }

    generateDemoTopics() {
        const titles = [
            'Обсуждение новой арки Наруто',
            'Кто ваш любимый персонаж из Истребителя демонов?',
            'Фан-арты: делитесь своими работами!',
            'Косплей на аниме-фестивале 2024',
            'Рекомендации похожих на Магическую битву',
            'Игра по мотивам Ван Пис: стоит ли играть?',
            'Обсуждение финала Атаки титанов',
            'Создаем мангу вместе: идеи и обсуждение'
        ];

        const categories = ['naruto', 'demon_slayer', 'art', 'cosplay', 'general', 'games', 'attack_titan', 'art'];
        const authors = ['АнимеГуру', 'КосплейМастер', 'МангаЭксперт', 'Новичок123'];

        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            title: titles[Math.floor(Math.random() * titles.length)],
            category: categories[Math.floor(Math.random() * categories.length)],
            author: authors[Math.floor(Math.random() * authors.length)],
            authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
            replies: Math.floor(Math.random() * 100),
            views: Math.floor(Math.random() * 1000),
            lastActivity: this.getRandomDate(),
            isPinned: i < 3,
            isHot: i < 10 && Math.random() > 0.5,
            tags: ['обсуждение', 'аниме', 'фанаты'].slice(0, Math.floor(Math.random() * 3) + 1)
        }));
    }

    getRandomDate() {
        const now = new Date();
        const daysAgo = Math.floor(Math.random() * 30);
        const date = new Date(now);
        date.setDate(date.getDate() - daysAgo);
        return date.toISOString();
    }

    loadMessages() {
        const saved = localStorage.getItem('forumMessages');
        return saved ? JSON.parse(saved) : [];
    }

    loadAchievements() {
        return [
            { id: 1, name: 'Первый пост', description: 'Опубликовать первое сообщение', icon: 'fa-comment', unlocked: true },
            { id: 2, name: 'Активный участник', description: '50 сообщений на форуме', icon: 'fa-users', unlocked: true },
            { id: 3, name: 'Эксперт форума', description: '500 сообщений', icon: 'fa-crown', unlocked: false, progress: 245 },
            { id: 4, name: 'Популярная тема', description: 'Создать тему с 100+ ответами', icon: 'fa-fire', unlocked: false }
        ];
    }

    setupEventListeners() {
        // Создание темы
        document.getElementById('createTopicBtn')?.addEventListener('click', () => {
            this.openCreateTopicModal();
        });

        // Личные сообщения
        document.getElementById('newMessagesBtn')?.addEventListener('click', () => {
            this.openMessagesModal();
        });

        document.getElementById('newMessageBtn')?.addEventListener('click', () => {
            this.openNewMessageModal();
        });

        // Фильтры тем
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterTopics(e.target.dataset.filter);
            });
        });

        // Отметить всё как прочитанное
        document.getElementById('markAllRead')?.addEventListener('click', () => {
            this.markAllAsRead();
        });

        // Показать всех онлайн
        document.getElementById('showAllOnline')?.addEventListener('click', () => {
            this.showAllOnlineUsers();
        });

        // Показать все достижения
        document.getElementById('viewAllAchievements')?.addEventListener('click', () => {
            this.showAllAchievements();
        });
    }

    loadTopicsList() {
        const container = document.getElementById('topicsList');
        if (!container) return;

        // Сортируем: закрепленные сначала, затем по активности
        const sortedTopics = [...this.topics].sort((a, b) => {
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;
            return new Date(b.lastActivity) - new Date(a.lastActivity);
        });

        // Показываем первые 10 тем
        const topicsToShow = sortedTopics.slice(0, 10);

        container.innerHTML = topicsToShow.map(topic => this.createTopicElement(topic)).join('');

        // Добавляем обработчики
        this.addTopicEventListeners();
    }

    createTopicElement(topic) {
        const timeAgo = this.getTimeAgo(topic.lastActivity);
        const categoryClass = this.getCategoryClass(topic.category);

        return `
            <div class="topic-item ${topic.isHot ? 'hot' : ''} ${topic.isPinned ? 'pinned' : ''}" data-id="${topic.id}">
                <div class="topic-icon">
                    <i class="fas ${topic.isPinned ? 'fa-thumbtack' : 'fa-comment'}"></i>
                </div>
                <div class="topic-content">
                    <div class="topic-header">
                        <span class="topic-category ${categoryClass}">${this.getCategoryName(topic.category)}</span>
                        ${topic.isHot ? '<span class="topic-hot"><i class="fas fa-fire"></i> Горячая</span>' : ''}
                    </div>
                    <h4 class="topic-title">${topic.title}</h4>
                    <div class="topic-meta">
                        <div class="topic-author">
                            <img src="${topic.authorAvatar}" alt="${topic.author}">
                            <span>${topic.author}</span>
                        </div>
                        <div class="topic-stats">
                            <span><i class="far fa-comment"></i> ${topic.replies}</span>
                            <span><i class="far fa-eye"></i> ${topic.views}</span>
                            <span class="topic-time">${timeAgo}</span>
                        </div>
                    </div>
                    ${topic.tags.length > 0 ? `
                        <div class="topic-tags">
                            ${topic.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    getCategoryClass(category) {
        const classes = {
            naruto: 'category-naruto',
            demon_slayer: 'category-demon-slayer',
            jujutsu: 'category-jujutsu',
            one_piece: 'category-one-piece',
            art: 'category-art',
            cosplay: 'category-cosplay',
            games: 'category-games'
        };
        return classes[category] || 'category-general';
    }

    getCategoryName(category) {
        const names = {
            naruto: 'Наруто',
            demon_slayer: 'Истребитель демонов',
            jujutsu: 'Магическая битва',
            one_piece: 'Ван Пис',
            art: 'Арты',
            cosplay: 'Косплей',
            games: 'Игры'
        };
        return names[category] || 'Общее';
    }

    getTimeAgo(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) {
            return `${diffMins} мин. назад`;
        } else if (diffHours < 24) {
            return `${diffHours} ч. назад`;
        } else if (diffDays < 7) {
            return `${diffDays} дн. назад`;
        } else {
            return date.toLocaleDateString();
        }
    }

    addTopicEventListeners() {
        document.querySelectorAll('.topic-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.closest('.topic-tags') && !e.target.closest('.topic-author')) {
                    const topicId = item.dataset.id;
                    this.openTopic(topicId);
                }
            });
        });
    }

    openTopic(topicId) {
        // В реальном проекте здесь будет переход на страницу темы
        const topic = this.topics.find(t => t.id == topicId);
        if (topic) {
            this.showTopicModal(topic);
        }
    }

    showTopicModal(topic) {
        const modal = document.createElement('div');
        modal.className = 'modal topic-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="topic-modal-header">
                    <h3>${topic.title}</h3>
                    <div class="topic-modal-meta">
                        <div class="author">
                            <img src="${topic.authorAvatar}" alt="${topic.author}">
                            <span>${topic.author}</span>
                        </div>
                        <span class="time">${this.getTimeAgo(topic.lastActivity)}</span>
                    </div>
                </div>
                <div class="topic-modal-content">
                    <p>Это демо-содержание темы. В реальном проекте здесь будет полное содержание темы и комментарии.</p>
                    <div class="topic-stats">
                        <span><i class="far fa-comment"></i> ${topic.replies} ответов</span>
                        <span><i class="far fa-eye"></i> ${topic.views} просмотров</span>
                    </div>
                </div>
                <div class="topic-modal-actions">
                    <button class="btn-primary reply-topic">
                        <i class="fas fa-reply"></i> Ответить
                    </button>
                    <button class="btn-secondary subscribe-topic">
                        <i class="far fa-bell"></i> Подписаться
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.classList.add('active');

        // Закрытие модального окна
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    filterTopics(filterType) {
        const container = document.getElementById('topicsList');
        if (!container) return;

        // Сбрасываем активные кнопки
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Активируем текущую кнопку
        event.target.classList.add('active');

        let filteredTopics;

        switch (filterType) {
            case 'popular':
                filteredTopics = [...this.topics].sort((a, b) => b.views - a.views);
                break;
            case 'unanswered':
                filteredTopics = this.topics.filter(t => t.replies === 0);
                break;
            case 'subscribed':
                // В демо просто показываем случайные темы
                filteredTopics = this.topics.filter(() => Math.random() > 0.5);
                break;
            default: // 'all'
                filteredTopics = [...this.topics].sort((a, b) =>
                    new Date(b.lastActivity) - new Date(a.lastActivity)
                );
        }

        // Показываем первые 10
        const topicsToShow = filteredTopics.slice(0, 10);
        container.innerHTML = topicsToShow.map(topic => this.createTopicElement(topic)).join('');

        this.addTopicEventListeners();
    }

    loadOnlineUsers() {
        const container = document.querySelector('.users-grid');
        if (!container) return;

        // Демо-пользователи онлайн
        const users = [
            { name: 'АнимеГуру', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', status: 'online' },
            { name: 'КосплейМастер', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', status: 'online' },
            { name: 'МангаЭксперт', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', status: 'online' },
            { name: 'Новичок123', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', status: 'idle' }
        ];

        this.onlineUsers = users;

        container.innerHTML = users.map(user => `
            <div class="user-online" data-user="${user.name}">
                <div class="user-avatar">
                    <img src="${user.avatar}" alt="${user.name}">
                    <span class="user-status ${user.status}"></span>
                </div>
                <span class="user-name">${user.name}</span>
            </div>
        `).join('');

        // Добавляем обработчики кликов на пользователей
        document.querySelectorAll('.user-online').forEach(userEl => {
            userEl.addEventListener('click', () => {
                const userName = userEl.dataset.user;
                const user = users.find(u => u.name === userName);
                if (user) {
                    this.openUserProfile(user);
                }
            });
        });
    }

    openUserProfile(user) {
        const modal = document.createElement('div');
        modal.className = 'modal user-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="user-profile">
                    <div class="user-avatar-large">
                        <img src="${user.avatar}" alt="${user.name}">
                        <span class="user-status-large ${user.status}"></span>
                    </div>
                    <h3>${user.name}</h3>
                    <div class="user-stats">
                        <div class="stat">
                            <span class="stat-value">245</span>
                            <span class="stat-label">Сообщений</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">12</span>
                            <span class="stat-label">Тем</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">2 года</span>
                            <span class="stat-label">На форуме</span>
                        </div>
                    </div>
                    <div class="user-actions">
                        <button class="btn-primary send-message">
                            <i class="fas fa-envelope"></i> Написать
                        </button>
                        <button class="btn-secondary view-posts">
                            <i class="fas fa-comments"></i> Сообщения
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.classList.add('active');

        // Закрытие модального окна
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Написать сообщение
        modal.querySelector('.send-message').addEventListener('click', () => {
            modal.remove();
            this.openNewMessageModal(user);
        });
    }

    loadMessagesList() {
        const container = document.getElementById('messagesList');
        if (!container) return;

        // Демо-сообщения
        const messages = [
            {
                id: 1, from: 'АнимеГуру', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
                preview: 'Привет! Как тебе новая арка Наруто?', time: '2 часа назад', unread: true
            },
            {
                id: 2, from: 'КосплейМастер', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
                preview: 'Спасибо за помощь с косплеем!', time: '5 часов назад', unread: false
            },
            {
                id: 3, from: 'МангаЭксперт', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
                preview: 'Рекомендую почитать новую мангу...', time: '1 день назад', unread: true
            }
        ];

        this.messages = messages;

        container.innerHTML = messages.map(msg => `
            <div class="message-item ${msg.unread ? 'unread' : ''}" data-id="${msg.id}">
                <div class="message-avatar">
                    <img src="${msg.avatar}" alt="${msg.from}">
                </div>
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-from">${msg.from}</span>
                        <span class="message-time">${msg.time}</span>
                    </div>
                    <p class="message-preview">${msg.preview}</p>
                </div>
            </div>
        `).join('');

        // Добавляем обработчики кликов на сообщения
        document.querySelectorAll('.message-item').forEach(msgEl => {
            msgEl.addEventListener('click', () => {
                const msgId = msgEl.dataset.id;
                const message = messages.find(m => m.id == msgId);
                if (message) {
                    this.openMessage(message);
                }
            });
        });
    }

    openMessage(message) {
        const modal = document.getElementById('messageModal');
        const modalBody = document.getElementById('messageModalBody');

        modalBody.innerHTML = `
            <div class="message-detail">
                <div class="message-header">
                    <div class="message-author">
                        <img src="${message.avatar}" alt="${message.from}">
                        <div>
                            <h4>${message.from}</h4>
                            <span class="message-date">${message.time}</span>
                        </div>
                    </div>
                </div>
                <div class="message-text">
                    <p>${message.preview}</p>
                    <p>Это демо-сообщение. В реальном проексте здесь будет полный текст сообщения и история переписки.</p>
                </div>
                <div class="message-actions">
                    <button class="btn-primary reply-message">
                        <i class="fas fa-reply"></i> Ответить
                    </button>
                    <button class="btn-secondary delete-message">
                        <i class="fas fa-trash"></i> Удалить
                    </button>
                </div>
            </div>
        `;

        modal.classList.add('active');

        // Ответить на сообщение
        modalBody.querySelector('.reply-message').addEventListener('click', () => {
            modal.classList.remove('active');
            this.openNewMessageModal({ name: message.from, avatar: message.avatar });
        });

        // Удалить сообщение
        modalBody.querySelector('.delete-message').addEventListener('click', () => {
            if (confirm('Удалить это сообщение?')) {
                this.messages = this.messages.filter(m => m.id !== message.id);
                localStorage.setItem('forumMessages', JSON.stringify(this.messages));
                this.loadMessagesList();
                modal.classList.remove('active');
                this.showNotification('Сообщение удалено', 'success');
            }
        });
    }

    openMessagesModal() {
        const modal = document.getElementById('messageModal');
        const modalBody = document.getElementById('messageModalBody');

        modalBody.innerHTML = `
            <div class="messages-inbox">
                <h3 class="modal-title">
                    <i class="fas fa-envelope"></i> Личные сообщения
                </h3>
                <div class="messages-list">
                    ${this.messages.map(msg => `
                        <div class="message-item ${msg.unread ? 'unread' : ''}" data-id="${msg.id}">
                            <img src="${msg.avatar}" alt="${msg.from}" class="message-avatar">
                            <div class="message-info">
                                <h4>${msg.from}</h4>
                                <p>${msg.preview}</p>
                                <span class="message-time">${msg.time}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="messages-actions">
                    <button class="btn-primary" id="composeNewMessage">
                        <i class="fas fa-edit"></i> Новое сообщение
                    </button>
                </div>
            </div>
        `;

        modal.classList.add('active');

        // Открыть конкретное сообщение
        modalBody.querySelectorAll('.message-item').forEach(item => {
            item.addEventListener('click', () => {
                const msgId = item.dataset.id;
                const message = this.messages.find(m => m.id == msgId);
                if (message) {
                    this.openMessage(message);
                }
            });
        });

        // Новое сообщение
        modalBody.querySelector('#composeNewMessage').addEventListener('click', () => {
            modal.classList.remove('active');
            this.openNewMessageModal();
        });
    }

    openNewMessageModal(recipient = null) {
        const modal = document.createElement('div');
        modal.className = 'modal new-message-modal';

        const recipientField = recipient ?
            `<input type="text" id="messageTo" value="${recipient.name}" readonly>` :
            `<input type="text" id="messageTo" placeholder="Кому (никнейм)" required>`;

        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h3 class="modal-title">
                    <i class="fas fa-edit"></i> Новое сообщение
                </h3>
                <form id="newMessageForm">
                    <div class="form-group">
                        <label for="messageTo">Кому</label>
                        ${recipientField}
                    </div>
                    <div class="form-group">
                        <label for="messageSubject">Тема</label>
                        <input type="text" id="messageSubject" placeholder="Тема сообщения" required>
                    </div>
                    <div class="form-group">
                        <label for="messageContent">Сообщение</label>
                        <textarea id="messageContent" rows="6" placeholder="Текст сообщения..." required></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn-secondary cancel-message">Отмена</button>
                        <button type="submit" class="btn-primary send-message">
                            <i class="fas fa-paper-plane"></i> Отправить
                        </button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(modal);
        modal.classList.add('active');

        // Закрытие модального окна
        const closeBtn = modal.querySelector('.modal-close');
        const cancelBtn = modal.querySelector('.cancel-message');

        const closeModal = () => modal.remove();

        closeBtn.addEventListener('click', closeModal);
        cancelBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // Отправка сообщения
        const form = modal.querySelector('#newMessageForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const to = document.getElementById('messageTo').value;
            const subject = document.getElementById('messageSubject').value;
            const content = document.getElementById('messageContent').value;

            // В реальном проекте здесь будет отправка на сервер
            this.showNotification(`Сообщение отправлено пользователю ${to}`, 'success');
            modal.remove();
        });
    }

    openCreateTopicModal() {
        const modal = document.getElementById('createTopicModal');
        if (modal) {
            modal.classList.add('active');

            // Заполняем форму для анонимного пользователя
            if (this.currentUser.isAnonymous) {
                const authorField = modal.querySelector('#topicAuthor');
                if (authorField) {
                    authorField.value = 'Анонимный пользователь';
                    authorField.disabled = true;
                }
            }
        }
    }

    setupTopicCreation() {
        const modal = document.getElementById('createTopicModal');
        if (!modal) return;

        // Закрытие модального окна
        const closeBtn = document.getElementById('closeTopicModal');
        const cancelBtn = document.getElementById('cancelTopic');

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        cancelBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });

        // Отправка формы
        const form = document.getElementById('createTopicForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const title = document.getElementById('topicTitle').value;
            const category = document.getElementById('topicCategory').value;
            const content = document.getElementById('topicContent').value;
            const tags = document.getElementById('topicTags').value;
            const isAnonymous = document.getElementById('topicAnonymous').checked;

            // Создаем новую тему
            const newTopic = {
                id: this.topics.length + 1,
                title: title,
                category: category,
                author: isAnonymous ? 'Аноним' : this.currentUser.name,
                authorAvatar: isAnonymous ? 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' : this.currentUser.avatar,
                replies: 0,
                views: 0,
                lastActivity: new Date().toISOString(),
                isPinned: false,
                isHot: false,
                tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag)
            };

            this.topics.unshift(newTopic);
            localStorage.setItem('forumTopics', JSON.stringify(this.topics));

            // Обновляем список тем
            this.loadTopicsList();

            // Закрываем модальное окно
            modal.classList.remove('active');

            // Показываем уведомление
            this.showNotification('Тема успешно создана!', 'success');

            // Очищаем форму
            form.reset();
        });
    }

    setupSearch() {
        const searchInput = document.getElementById('forumSearch');
        const searchBtn = document.querySelector('.forum-search .search-btn');

        if (searchInput && searchBtn) {
            const performSearch = () => {
                const query = searchInput.value.toLowerCase();
                if (query.trim() === '') return;

                // Ищем по названиям тем
                const results = this.topics.filter(topic =>
                    topic.title.toLowerCase().includes(query) ||
                    topic.author.toLowerCase().includes(query)
                );

                this.showSearchResults(results);
            };

            searchBtn.addEventListener('click', performSearch);
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') performSearch();
            });
        }
    }

    showSearchResults(results) {
        const modal = document.createElement('div');
        modal.className = 'modal search-results-modal';

        if (results.length === 0) {
            modal.innerHTML = `
                <div class="modal-content">
                    <button class="modal-close">&times;</button>
                    <h3 class="modal-title">
                        <i class="fas fa-search"></i> Результаты поиска
                    </h3>
                    <div class="no-results">
                        <i class="fas fa-search"></i>
                        <h4>Ничего не найдено</h4>
                        <p>Попробуйте другие ключевые слова</p>
                    </div>
                </div>
            `;
        } else {
            modal.innerHTML = `
                <div class="modal-content">
                    <button class="modal-close">&times;</button>
                    <h3 class="modal-title">
                        <i class="fas fa-search"></i> Найдено ${results.length} тем
                    </h3>
                    <div class="search-results">
                        ${results.slice(0, 10).map(topic => `
                            <div class="search-result-item" data-id="${topic.id}">
                                <h4>${topic.title}</h4>
                                <div class="result-meta">
                                    <span class="author">${topic.author}</span>
                                    <span class="category">${this.getCategoryName(topic.category)}</span>
                                    <span class="time">${this.getTimeAgo(topic.lastActivity)}</span>
                                </div>
                                <p class="result-preview">${topic.title}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        document.body.appendChild(modal);
        modal.classList.add('active');

        // Закрытие модального окна
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Открытие тем из результатов
        modal.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const topicId = item.dataset.id;
                const topic = this.topics.find(t => t.id == topicId);
                if (topic) {
                    modal.remove();
                    this.openTopic(topicId);
                }
            });
        });
    }

    markAllAsRead() {
        // Помечаем все сообщения как прочитанные
        this.messages.forEach(msg => msg.unread = false);
        localStorage.setItem('forumMessages', JSON.stringify(this.messages));

        // Обновляем список сообщений
        this.loadMessagesList();

        // Обновляем счетчик в шапке
        const badge = document.querySelector('#newMessagesBtn .badge');
        if (badge) badge.remove();

        this.showNotification('Все сообщения отмечены как прочитанные', 'success');
    }

    showAllOnlineUsers() {
        const modal = document.createElement('div');
        modal.className = 'modal online-users-modal';

        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h3 class="modal-title">
                    <i class="fas fa-users"></i> Пользователи онлайн (${this.onlineUsers.length})
                </h3>
                <div class="online-users-list">
                    ${this.onlineUsers.map(user => `
                        <div class="online-user" data-user="${user.name}">
                            <div class="user-avatar">
                                <img src="${user.avatar}" alt="${user.name}">
                                <span class="user-status ${user.status}"></span>
                            </div>
                            <div class="user-info">
                                <h4>${user.name}</h4>
                                <span class="user-activity">В сети</span>
                            </div>
                            <button class="btn-secondary message-user">
                                <i class="fas fa-envelope"></i>
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.classList.add('active');

        // Закрытие модального окна
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Написать пользователю
        modal.querySelectorAll('.message-user').forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const user = this.onlineUsers[index];
                modal.remove();
                this.openNewMessageModal(user);
            });
        });

        // Открыть профиль пользователя
        modal.querySelectorAll('.online-user').forEach((userEl, index) => {
            userEl.addEventListener('click', (e) => {
                if (!e.target.closest('.message-user')) {
                    const user = this.onlineUsers[index];
                    modal.remove();
                    this.openUserProfile(user);
                }
            });
        });
    }

    showAllAchievements() {
        const modal = document.createElement('div');
        modal.className = 'modal achievements-modal';

        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h3 class="modal-title">
                    <i class="fas fa-trophy"></i> Все достижения
                </h3>
                <div class="all-achievements">
                    ${this.achievements.map(achievement => `
                        <div class="achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}">
                            <div class="achievement-icon">
                                <i class="fas ${achievement.icon}"></i>
                            </div>
                            <div class="achievement-info">
                                <h4>${achievement.name}</h4>
                                <p>${achievement.description}</p>
                                ${achievement.progress ? `
                                    <div class="achievement-progress">
                                        <div class="progress-bar" style="width: ${(achievement.progress / 500) * 100}%"></div>
                                        <span>${achievement.progress}/500</span>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.classList.add('active');

        // Закрытие модального окна
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Инициализация форума при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.forum-main')) {
        window.forum = new Forum();
    }
});