// ============================================================
// TaskFlow — app.js
// Persistent: localStorage simulating db.json { users, todos }
// ============================================================

// ── Database Layer ──────────────────────────────────────────
const DB = {
    _read: (key, fallback) => {
        try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
        catch { return fallback; }
    },
    _write: (key, value) => localStorage.setItem(key, JSON.stringify(value)),

    getUsers: () => DB._read('users', []),
    saveUsers: (users) => DB._write('users', users),

    getTodos: () => DB._read('todos', []),
    saveTodos: (todos) => DB._write('todos', todos),

    getCurrentUser: () => DB._read('currentUser', null),
    setCurrentUser: (user) => DB._write('currentUser', user),
    clearCurrentUser: () => localStorage.removeItem('currentUser'),
};

// Seed empty DB structure on first load
if (!localStorage.getItem('users')) DB.saveUsers([]);
if (!localStorage.getItem('todos')) DB.saveTodos([]);

// ── Validation Helpers ───────────────────────────────────────
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const showError = (id, msg) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = msg || el.textContent;
    el.classList.add('visible');
};

const hideError = (id) => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('visible');
};

const clearErrors = (...ids) => ids.forEach(hideError);

// ── View Management ──────────────────────────────────────────
const switchView = (viewId) => {
    document.querySelectorAll('[data-view]').forEach(v => v.classList.remove('active'));
    const target = document.getElementById(viewId);
    if (target) target.classList.add('active');
};

const showPanel = (panelId) => {
    ['login-panel', 'register-panel'].forEach(id => {
        document.getElementById(id)?.classList.add('hidden');
    });
    document.getElementById(panelId)?.classList.remove('hidden');
};

// ── Auth Controller ──────────────────────────────────────────
const Auth = {
    login(email, password) {
        clearErrors('err-login-email', 'err-login-password', 'err-login-general');
        let valid = true;

        if (!email) { showError('err-login-email', 'Informe seu e-mail.'); valid = false; }
        else if (!isValidEmail(email)) { showError('err-login-email', 'E-mail em formato inválido.'); valid = false; }

        if (!password) { showError('err-login-password', 'A senha é obrigatória.'); valid = false; }

        if (!valid) return;

        const users = DB.getUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            showError('err-login-general', 'E-mail não encontrado ou senha incorreta.');
            return;
        }

        DB.setCurrentUser({ id: user.id, name: user.name, email: user.email });
        document.getElementById('login-form').reset();
        App.boot();
    },

    register(name, email, password) {
        clearErrors('err-reg-name', 'err-reg-email', 'err-reg-password', 'err-reg-general', 'success-reg');
        let valid = true;

        if (!name.trim()) { showError('err-reg-name', 'Informe seu nome.'); valid = false; }
        if (!email) { showError('err-reg-email', 'Informe seu e-mail.'); valid = false; }
        else if (!isValidEmail(email)) { showError('err-reg-email', 'E-mail em formato inválido.'); valid = false; }
        if (!password) { showError('err-reg-password', 'A senha é obrigatória.'); valid = false; }
        else if (password.length < 6) { showError('err-reg-password', 'Mínimo de 6 caracteres.'); valid = false; }

        if (!valid) return;

        const users = DB.getUsers();
        if (users.some(u => u.email === email)) {
            showError('err-reg-general', 'Este e-mail já está em uso por outra conta.');
            return;
        }

        const newUser = {
            id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
            name: name.trim(),
            email,
            password,
        };

        users.push(newUser);
        DB.saveUsers(users);

        const successEl = document.getElementById('success-reg');
        if (successEl) successEl.classList.add('visible');

        setTimeout(() => {
            DB.setCurrentUser({ id: newUser.id, name: newUser.name, email: newUser.email });
            document.getElementById('register-form').reset();
            successEl?.classList.remove('visible');
            App.boot();
        }, 1200);
    },

    logout() {
        DB.clearCurrentUser();
        App.currentFilter = 'all';
        switchView('view-auth');
        showPanel('login-panel');
    },
};

// ── Task Controller ──────────────────────────────────────────
const Tasks = {
    getForUser(userId) {
        const all = DB.getTodos();
        return all.filter(t => t.userId === userId);
    },

    add(userId, { title, type, description }) {
        const todos = DB.getTodos();
        const task = {
            id: Date.now(),
            userId,
            title: title.trim(),
            type,
            description: description.trim(),
            done: false,
            createdAt: new Date().toISOString(),
        };
        todos.push(task);
        DB.saveTodos(todos);
        return task;
    },

    toggleDone(taskId) {
        const todos = DB.getTodos();
        const task = todos.find(t => t.id === taskId);
        if (task) task.done = !task.done;
        DB.saveTodos(todos);
        return task;
    },

    delete(taskId) {
        const todos = DB.getTodos().filter(t => t.id !== taskId);
        DB.saveTodos(todos);
    },
};

// ── Render Helpers ───────────────────────────────────────────
const TYPE_CONFIG = {
    work:     { label: 'Trabalho', badgeClass: 'badge-work',     icon: '💼' },
    personal: { label: 'Pessoal',  badgeClass: 'badge-personal', icon: '🏠' },
    study:    { label: 'Estudos',  badgeClass: 'badge-study',    icon: '📚' },
};

const createTaskCard = (task) => {
    const config = TYPE_CONFIG[task.type] || TYPE_CONFIG.work;
    const card = document.createElement('div');
    card.id = `task-${task.id}`;
    card.className = `task-card glass rounded-xl p-4 transition-all duration-300 ${task.done ? 'task-done' : ''}`;
    card.innerHTML = `
        <div class="flex items-start gap-3">
            <button class="btn-toggle-done mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
                task.done
                    ? 'bg-green-500 border-green-500'
                    : 'border-slate-600 hover:border-blue-400'
            }" data-id="${task.id}" title="${task.done ? 'Reabrir' : 'Concluir'}">
                ${task.done ? `<svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>` : ''}
            </button>
            <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap mb-1">
                    <span class="task-title text-sm font-semibold text-white truncate">${escapeHtml(task.title)}</span>
                    <span class="text-xs px-2 py-0.5 rounded-full font-medium ${config.badgeClass}">${config.icon} ${config.label}</span>
                </div>
                ${task.description ? `<p class="text-xs text-slate-400 leading-relaxed mt-1 line-clamp-2">${escapeHtml(task.description)}</p>` : ''}
            </div>
            <button class="btn-delete-task text-slate-600 hover:text-red-400 transition-colors ml-1 flex-shrink-0" data-id="${task.id}" title="Remover tarefa">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
            </button>
        </div>
        ${task.done ? `<div class="mt-2 text-xs text-green-500/70 font-medium flex items-center gap-1"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4"/></svg>Concluída</div>` : ''}
    `;
    return card;
};

const escapeHtml = (str) => {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
};

// ── App Controller ───────────────────────────────────────────
const App = {
    currentFilter: 'all',

    boot() {
        const user = DB.getCurrentUser();
        if (!user) {
            switchView('view-auth');
            showPanel('login-panel');
            return;
        }

        // Update greeting
        const firstName = user.name.split(' ')[0];
        document.getElementById('user-greeting').textContent = `Olá, ${firstName} 👋`;

        switchView('view-dashboard');
        App.renderTasks(user.email);
    },

    renderTasks(userId) {
        const user = userId || DB.getCurrentUser()?.email;
        if (!user) return;

        let tasks = Tasks.getForUser(user);

        // Apply filter
        if (App.currentFilter === 'pending') tasks = tasks.filter(t => !t.done);
        if (App.currentFilter === 'done')    tasks = tasks.filter(t => t.done);

        // Sort: pending first, done last
        tasks.sort((a, b) => {
            if (a.done !== b.done) return a.done ? 1 : -1;
            return b.id - a.id; // newest first within each group
        });

        const list = document.getElementById('task-list');
        const empty = document.getElementById('empty-state');
        const counter = document.getElementById('task-counter');
        const counterNum = document.getElementById('task-count-num');

        list.innerHTML = '';

        if (tasks.length === 0) {
            empty.classList.remove('hidden');
            counter.classList.add('hidden');
        } else {
            empty.classList.add('hidden');
            tasks.forEach(task => list.appendChild(createTaskCard(task)));

            // Update pending counter
            const pendingCount = Tasks.getForUser(user).filter(t => !t.done).length;
            if (pendingCount > 0) {
                counter.classList.remove('hidden');
                counter.classList.add('flex');
                counterNum.textContent = pendingCount;
            } else {
                counter.classList.add('hidden');
            }
        }
    },
};

// ── Event Listeners ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

    // — Auth Navigation —
    document.getElementById('go-register').addEventListener('click', () => {
        clearErrors('err-login-email', 'err-login-password', 'err-login-general');
        document.getElementById('login-form').reset();
        showPanel('register-panel');
    });

    document.getElementById('go-login').addEventListener('click', () => {
        clearErrors('err-reg-name', 'err-reg-email', 'err-reg-password', 'err-reg-general');
        document.getElementById('register-form').reset();
        showPanel('login-panel');
    });

    // — Login Submit —
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email    = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;
        Auth.login(email, password);
    });

    // — Register Submit —
    document.getElementById('register-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name     = document.getElementById('reg-name').value;
        const email    = document.getElementById('reg-email').value.trim();
        const password = document.getElementById('reg-password').value;
        Auth.register(name, email, password);
    });

    // — Logout —
    document.getElementById('btn-logout').addEventListener('click', Auth.logout);

    // — Add Task Submit —
    document.getElementById('task-form').addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors('err-task-title');

        const title       = document.getElementById('task-title').value;
        const type        = document.getElementById('task-type').value;
        const description = document.getElementById('task-description').value;

        if (!title.trim()) {
            showError('err-task-title', 'O título é obrigatório.');
            document.getElementById('task-title').focus();
            return;
        }

        const user = DB.getCurrentUser();
        if (!user) return;

        Tasks.add(user.email, { title, type, description });
        document.getElementById('task-form').reset();
        App.renderTasks(user.email);
        document.getElementById('task-title').focus();
    });

    // — Task List Events (delegation) —
    document.getElementById('task-list').addEventListener('click', (e) => {
        const user = DB.getCurrentUser();
        if (!user) return;

        // Toggle Done
        const toggleBtn = e.target.closest('.btn-toggle-done');
        if (toggleBtn) {
            const id = parseInt(toggleBtn.dataset.id, 10);
            Tasks.toggleDone(id);
            App.renderTasks(user.email);
            return;
        }

        // Delete Task
        const deleteBtn = e.target.closest('.btn-delete-task');
        if (deleteBtn) {
            const id = parseInt(deleteBtn.dataset.id, 10);
            const card = document.getElementById(`task-${id}`);
            if (card) {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                card.style.transition = 'all 0.2s ease';
                setTimeout(() => {
                    Tasks.delete(id);
                    App.renderTasks(user.email);
                }, 200);
            }
        }
    });

    // — Filter Buttons —
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('active', 'bg-blue-500/20', 'text-blue-300', 'border-blue-500/30');
                b.classList.add('text-slate-400', 'border-transparent');
            });
            btn.classList.add('active', 'bg-blue-500/20', 'text-blue-300', 'border-blue-500/30');
            btn.classList.remove('text-slate-400', 'border-transparent');

            App.currentFilter = btn.dataset.filter;
            const user = DB.getCurrentUser();
            if (user) App.renderTasks(user.email);
        });
    });

    // — Bootstrap —
    App.boot();
});
