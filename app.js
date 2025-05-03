// Game elements
const startScreen = document.getElementById('startScreen');
const gameArea = document.getElementById('gameArea');
const gameOver = document.getElementById('gameOver');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const finalScoreElement = document.getElementById('finalScore');
const soundToggle = document.getElementById('soundToggle');
const soundIcon = document.getElementById('soundIcon');
const offlineMessage = document.getElementById('offlineMessage');
const spawnNotification = document.getElementById('spawnNotification');

// Game variables
let score = 0;
let timeLeft = 60;
let gameInterval;
let cockroachSpawnInterval;
let cockroachSpawnRate = 1500; // milliseconds
let soundEnabled = true;
let gameActive = false;
let currentLevel = 1;

// Audio
const backgroundMusic = new Audio('sounds/background-music.mp3');
backgroundMusic.loop = true;
const killSound = new Audio('sounds/squish.mp3');

// Check online status
function updateOnlineStatus() {
    if (navigator.onLine) {
        offlineMessage.style.display = 'none';
    } else {
        offlineMessage.style.display = 'block';
    }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
updateOnlineStatus(); // Initial check

// Sound control
soundToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    
    if (soundEnabled) {
        soundIcon.src = 'images/sound-on.png';
        if (gameActive) backgroundMusic.play();
    } else {
        soundIcon.src = 'images/sound-off.png';
        backgroundMusic.pause();
    }
});

// Start game
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);

function startGame() {
    // Reset game variables
    score = 0;
    timeLeft = 60;
    cockroachSpawnRate = 1500;
    gameActive = true;
    currentLevel = 1;
    
    // Update display
    scoreElement.textContent = score;
    timerElement.textContent = timeLeft;
    
    // Hide start/end screens and show game area
    startScreen.style.display = 'none';
    gameOver.style.display = 'none';
    
    // Clear any existing cockroaches
    gameArea.innerHTML = '';
    
    // Start background music if enabled
    if (soundEnabled) {
        backgroundMusic.currentTime = 0;
        backgroundMusic.play();
    }
    
    // Start timer
    gameInterval = setInterval(updateGame, 1000);
    
    // Start spawning cockroaches
    spawnCockroach();
    cockroachSpawnInterval = setInterval(spawnCockroach, cockroachSpawnRate);
}

function showSpawnNotification() {
    // Show notification
    spawnNotification.classList.add('visible');
    
    // Hide after 2 seconds
    setTimeout(() => {
        spawnNotification.classList.remove('visible');
    }, 2000);
}

function updateGame() {
    timeLeft--;
    timerElement.textContent = timeLeft;
    
    // Increase cockroach spawn rate every 10 seconds
    if (timeLeft % 10 === 0 && timeLeft > 0) {
        clearInterval(cockroachSpawnInterval);
        cockroachSpawnRate = Math.max(300, cockroachSpawnRate - 200);
        cockroachSpawnInterval = setInterval(spawnCockroach, cockroachSpawnRate);
        
        // Show notification about faster spawn rate
        currentLevel++;
        showSpawnNotification();
    }
    
    // End game when timer runs out
    if (timeLeft <= 0) {
        endGame();
    }
}

function spawnCockroach() {
    if (!gameActive) return;
    
    const cockroach = document.createElement('div');
    cockroach.className = 'cockroach';
    
    // Get header height to avoid spawning cockroaches there
    const headerHeight = document.querySelector('.game-header').offsetHeight + 10; // Adding 10px margin
    
    // Random position within game area (not overlapping header)
    const maxX = gameArea.clientWidth - 60;
    const maxY = gameArea.clientHeight - 60;
    const posX = Math.floor(Math.random() * maxX);
    const posY = Math.floor(Math.random() * maxY);
    
    cockroach.style.left = posX + 'px';
    cockroach.style.top = posY + 'px';
    
    // Random rotation for variety
    const rotation = Math.floor(Math.random() * 360);
    cockroach.style.transform = `rotate(${rotation}deg)`;
    
    // Kill cockroach on click
    cockroach.addEventListener('click', () => {
        if (cockroach.classList.contains('dead')) return;
        
        cockroach.classList.add('dead');
        if (soundEnabled) {
            killSound.currentTime = 0;
            killSound.play();
        }
        
        score++;
        scoreElement.textContent = score;
        
        // Remove dead cockroach after a delay
        setTimeout(() => {
            if (gameArea.contains(cockroach)) {
                gameArea.removeChild(cockroach);
            }
        }, 1000);
    });
    
    gameArea.appendChild(cockroach);
    
    // Move cockroach randomly
    moveCockroach(cockroach);
}

function moveCockroach(cockroach) {
    if (!gameActive || cockroach.classList.contains('dead')) return;

    const maxX = gameArea.clientWidth - 60;
    const maxY = gameArea.clientHeight - 60;
    
    // Current position
    let posX = parseInt(cockroach.style.left);
    let posY = parseInt(cockroach.style.top);
    
    // Random movement
    const moveX = (Math.random() - 0.5) * 20;
    const moveY = (Math.random() - 0.5) * 20;
    
    // New position (kept within boundaries)
    posX = Math.max(0, Math.min(maxX, posX + moveX));
    posY = Math.max(0, Math.min(maxY, posY + moveY));
    
    cockroach.style.left = posX + 'px';
    cockroach.style.top = posY + 'px';
    
    // Continue movement if game is active
    if (gameActive) {
        setTimeout(() => moveCockroach(cockroach), 100);
    }
}

function endGame() {
    gameActive = false;
    
    // Stop all intervals
    clearInterval(gameInterval);
    clearInterval(cockroachSpawnInterval);
    
    // Stop background music
    backgroundMusic.pause();
    
    // Update final score
    finalScoreElement.textContent = score;
    
    // Show game over screen
    gameOver.style.display = 'flex';
}

// Prevent context menu on right-click (for better gaming experience)
document.addEventListener('contextmenu', event => event.preventDefault());