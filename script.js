/* ==========================================
   ЗАВДАННЯ 1: Поміняти місцями тексти блоків 1 і 6
   ========================================== */
function swapHeaderAndFooter() {
    const block1 = document.getElementById('block-1'); // Лого
    const block6 = document.getElementById('block-6'); // Футер текст

    if (block1 && block6) {
        let temp = block1.innerHTML;
        block1.innerHTML = block6.innerHTML;
        block6.innerHTML = temp;
        console.log("Тексти блоків 1 та 6 поміняно місцями.");
    }
}
// Викликаємо функцію відразу при завантаженні
swapHeaderAndFooter();


/* ==========================================
   ЗАВДАННЯ 2: Площа ромба
   ========================================== */
function calculateRhombusArea() {
    // Беремо значення зі змінних скрипта (як у завданні)
    const d1 = 10; // діагональ 1
    const d2 = 15; // діагональ 2
    
    const area = (d1 * d2) / 2;

    const resultBlock = document.getElementById('rhombus-result');
    if (resultBlock) {
        resultBlock.innerText = `Площа ромба (d1=${d1}, d2=${d2}) = ${area}`;
    }
}
// Викликаємо розрахунок
calculateRhombusArea();


/* ==========================================
   ЗАВДАННЯ 3: Трикутник + Cookies
   ========================================== */
// Функція для отримання cookie за іменем
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

// Функція перевірки при завантаженні
function checkCookieOnLoad() {
    const triangleResult = getCookie("triangleResult");
    const formContainer = document.getElementById('triangle-form-container');

    if (triangleResult) {
        // а) Є cookie -> ховаємо форму, питаємо про видалення
        formContainer.style.display = 'none';
        
        const deleteData = confirm(`У cookies збережено результат: "${triangleResult}".\nВидалити дані?`);

        if (deleteData) {
            // б) Видаляємо cookie і перезавантажуємо (показуємо форму)
            document.cookie = "triangleResult=; max-age=-1"; // видалення
            location.reload(); 
        } else {
            // в) Відмова -> нагадуємо про cookie
            alert("Cookies залишились. Потрібно перезавантажити сторінку, щоб побачити форму знову (або очистити cookies).");
            // Форма залишається прихованою
        }
    } else {
        // Форма відображається за замовчуванням
        formContainer.style.display = 'block';
    }
}

// Функція розрахунку трикутника (на кнопці)
function checkTriangle() {
    const a = parseFloat(document.getElementById('side-a').value);
    const b = parseFloat(document.getElementById('side-b').value);
    const c = parseFloat(document.getElementById('side-c').value);

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        alert("Будь ласка, введіть коректні числа.");
        return;
    }

    // Перевірка існування трикутника: сума двох сторін має бути більшою за третю
    const isPossible = (a + b > c) && (a + c > b) && (b + c > a);
    const message = isPossible ? "Трикутник МОЖНА побудувати" : "Трикутник НЕ МОЖНА побудувати";

    alert(message);
    
    // Зберігаємо в cookie
    document.cookie = `triangleResult=${message}; max-age=3600`; // зберігаємо на 1 годину
    
    // Перезавантажуємо сторінку, щоб спрацювала логіка з cookie
    location.reload();
}

// Запускаємо перевірку cookie при старті
checkCookieOnLoad();


/* ==========================================
   ЗАВДАННЯ 4: Курсив + LocalStorage
   ========================================== */
const block2 = document.getElementById('block-2');
const italicRadio = document.getElementById('italic-radio');

// Перевіряємо localStorage при завантаженні
if (localStorage.getItem('isItalic') === 'true') {
    block2.style.fontStyle = 'italic';
    italicRadio.checked = true;
}

// Подія mouseover (наведення миші)
block2.addEventListener('mouseover', () => {
    // Якщо радіокнопка натиснута
    if (italicRadio.checked) {
        block2.style.fontStyle = 'italic';
        localStorage.setItem('isItalic', 'true');
    } else {
        block2.style.fontStyle = 'normal';
        localStorage.setItem('isItalic', 'false');
    }
});

// Додатково: якщо просто клікнули на радіо, теж збережемо
italicRadio.addEventListener('change', () => {
    if (italicRadio.checked) {
        localStorage.setItem('isItalic', 'true');
    }
});


/* ==========================================
   ЗАВДАННЯ 5: Нумерований список + LocalStorage
   ========================================== */
function showListForm() {
    const listContainer = document.getElementById('list-container');
    // а) Форма з'являється після кліку
    if (listContainer.style.display === 'none') {
        listContainer.style.display = 'block';
        loadList(); // Завантажуємо збережений список
    } else {
        listContainer.style.display = 'none';
    }
}

function addListItem() {
    const input = document.getElementById('list-item-input');
    const text = input.value;
    
    if (text) {
        createLiElement(text);
        input.value = ''; // Очистити поле
    }
}

function createLiElement(text) {
    const list = document.getElementById('dynamic-list');
    const li = document.createElement('li');
    li.textContent = text;
    // б) Кольори "зебра" задані в CSS через nth-child, JS тут не треба мучити
    list.appendChild(li);
}

// в) Збереження в LocalStorage
function saveList() {
    const list = document.getElementById('dynamic-list');
    const items = [];
    list.querySelectorAll('li').forEach(li => {
        items.push(li.textContent);
    });
    
    localStorage.setItem('savedList', JSON.stringify(items));
    alert("Список збережено!");
}

// г) Відновлення списку при завантаженні (якщо він має бути на місці)
function loadList() {
    const saved = localStorage.getItem('savedList');
    if (saved) {
        const items = JSON.parse(saved);
        const list = document.getElementById('dynamic-list');
        list.innerHTML = ''; // Очистити перед завантаженням
        items.forEach(text => createLiElement(text));
    }
}

// Якщо завдання вимагає показати список відразу при перезавантаженні:
if (localStorage.getItem('savedList')) {
    // Показуємо контейнер і список відразу
    document.getElementById('list-container').style.display = 'block';
    loadList();
}