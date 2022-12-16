const variants = ['🍎', '🍌', '🍍', '🥐', '🍪'];
const slot_change_time = 100;

const name = getName();
window.tries = 0;

document.getElementById('name').textContent = name;
const tryText = document.getElementById('try-text');
const slots = document.getElementById('slots').children;
const button = document.getElementById('start');

button.addEventListener('click', performSlot);

rebuildTry();

function isWinRow() {
    return slots[0].textContent === slots[1].textContent &&
        slots[1].textContent === slots[2].textContent;
}

function getRandomSlotK(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getName() {
    while (true) {
        let name = prompt('Enter your name:');
        if (name.length < 4) alert('Your name length should be at least 4 characters. Try again!');
        else return name;
    }
}

function rebuildTry() {
    tryText.textContent = `Спроба ${window.tries} з 3`;
}

function performSlot() {
    button.disabled = true;
    window.tries += 1;
    rebuildTry();

    let c1 = 0;
    let interval1 = window.setInterval(() => {
        slots[0].textContent = variants[c1 % 5];
        c1++;
        if (c1 >= getRandomSlotK(80, 100)) clearInterval(interval1);
        }, slot_change_time);

    let c2 = 2;
    let interval2 = window.setInterval(() => {
        slots[1].textContent = variants[c2 % 5];
        c2++;
        if (c2 >= getRandomSlotK(100, 120)) clearInterval(interval2);
        }, slot_change_time);

    let c3 = 4;
    let interval3 = window.setInterval(() => {
        slots[2].textContent = variants[c3 % 5];
        c3++;
        if (c3 >= getRandomSlotK(120, 140)) {
            clearInterval(interval3);
            button.disabled = false;
            window.setTimeout(resultilize, 200);
        }
        }, slot_change_time);
}

function resultilize() {
    if (isWinRow()) {
        alert(`${name} won!`);
    } else if (window.tries === 3) {
        alert('Casino won!');
    }

    if (isWinRow() || window.tries === 3) {
        button.textContent = 'Try Again';
        button.removeEventListener('click', performSlot);
        button.addEventListener('click', () => window.location.reload());
    }
}
