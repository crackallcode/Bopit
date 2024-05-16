var keys = ['a', 's', 'd', 'f'];
var timeoutDuration = 3000; 
var currentKey = '';
var correctCount = 0;
var timeout;

function getRandomKey() {
    var newKey;
    do {
        newKey = keys[Math.floor(Math.random() * keys.length)];
    } while (newKey === currentKey); 
    return newKey;
}

function showRandomKey() {
    currentKey = getRandomKey();
    document.getElementById('keyImage').src = currentKey + '.png';
    resetTimeout();
}

function updateCounter() { 
    document.getElementById('correctCounter').textContent = 'Score: ' + correctCount;
}

function resetTimeout() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        document.getElementById('statusMessage').textContent = 'Too Slow! You Lose!';
        updateCounter(); 
        document.removeEventListener('keydown', handleKeyPress);
    }, timeoutDuration); 
}

function handleKeyPress(event) {
    if (event.key === currentKey) { 
        correctCount++;
        document.getElementById('statusMessage').textContent = "Correct! Wait for the next key...";
        updateCounter(); 
        setTimeout(showRandomKey, 1000);
    } else {
        document.getElementById('statusMessage').textContent = "Wrong Key! You Lose!";
        updateCounter();
        document.removeEventListener('keydown', handleKeyPress);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', handleKeyPress);
    showRandomKey();
    updateCounter(); 
});
