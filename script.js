// Academic Planner - Uses Arrays + localStorage
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.toggle('completed', task.completed);
        li.innerHTML = `
            <span>
                <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}">
                ${task.text}
            </span>
            <button data-index="${index}">Delete</button>
        `;
        taskList.appendChild(li);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

if (taskForm) {
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (taskInput.value.trim()) {
            tasks.push({ text: taskInput.value.trim(), completed: false });
            taskInput.value = '';
            renderTasks();
        }
    });

    taskList.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        if (e.target.type === 'checkbox') {
            tasks[index].completed = !tasks[index].completed;
        }
        if (e.target.tagName === 'BUTTON') {
            tasks.splice(index, 1);
        }
        renderTasks();
    });
}

// Contact Form Validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Clear errors
        document.querySelectorAll('.error').forEach(el => el.textContent = '');

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        // No field empty
        if (!name) { document.getElementById('name-error').textContent = 'Name is required'; isValid = false; }
        if (!email) { document.getElementById('email-error').textContent = 'Email is required'; isValid = false; }
        if (!phone) { document.getElementById('phone-error').textContent = 'Phone is required'; isValid = false; }
        if (!message) { document.getElementById('message-error').textContent = 'Message is required'; isValid = false; }

        // Valid email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            document.getElementById('email-error').textContent = 'Enter a valid email';
            isValid = false;
        }

        // Phone digits only
        const phoneRegex = /^\d+$/;
        if (phone && !phoneRegex.test(phone)) {
            document.getElementById('phone-error').textContent = 'Phone must contain digits only';
            isValid = false;
        }

        if (isValid) {
            alert('Message sent successfully! I\'ll get back to you soon.');
            contactForm.reset();
        }
    });
}

renderTasks();
