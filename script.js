document.addEventListener('DOMContentLoaded', function () {
    const gameArea = document.getElementById('game-area');
    const sensitivityRange = document.getElementById('sensitivity');
    let sensitivity = parseInt(sensitivityRange.value);
    let score = 0;
    let timerId;

    function startGame() {
        score = 0;
        document.getElementById('score').textContent = score;
        gameArea.innerHTML = '';
        spawnDot();
        timerId = setInterval(moveDots, 1000 / sensitivity);
        gameArea.addEventListener('click', handleClick);
    }

    function endGame() {
        clearInterval(timerId);
        gameArea.removeEventListener('click', handleClick);
    }

    function handleClick(event) {
        if (event.target.classList.contains('dot')) {
            score++;
            document.getElementById('score').textContent = score;
            event.target.remove();
            spawnDot();
        }
    }

    function spawnDot() {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.style.left = Math.random() * (gameArea.offsetWidth - 20) + 'px';
        dot.style.top = Math.random() * (gameArea.offsetHeight - 20) + 'px';
        gameArea.appendChild(dot);
    }

    function moveDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => {
            const dx = Math.random() * 20 - 10; // Random horizontal movement in a larger range (-10 to 10)
            const dy = Math.random() * 20 - 10; // Random vertical movement in a larger range (-10 to 10)
            const left = parseFloat(dot.style.left) + dx;
            const top = parseFloat(dot.style.top) + dy;
            dot.style.left = Math.max(0, Math.min(left, gameArea.offsetWidth - 20)) + 'px';
            dot.style.top = Math.max(0, Math.min(top, gameArea.offsetHeight - 20)) + 'px';
        });
    }

    sensitivityRange.addEventListener('input', function () {
        sensitivity = parseInt(this.value);
        clearInterval(timerId);
        timerId = setInterval(moveDots, 1000 / sensitivity);
    });

    document.getElementById('start-btn').addEventListener('click', startGame);
});
