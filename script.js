document.addEventListener('DOMContentLoaded', () => {
    const screen1 = document.getElementById('screen1');
    const screen2 = document.getElementById('screen2');
    const screen3 = document.getElementById('screen3');

    const startButton = document.getElementById('startButton');
    const middleButton = document.getElementById('middleButton');
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');

    const easterEggMessage = document.getElementById('easter-egg-message');

    const heartsContainer = document.getElementById('hearts-container');

    // Screen transitions
    startButton.addEventListener('click', () => {
        screen1.style.display = 'none';
        screen2.style.display = 'block';
    });

    middleButton.addEventListener('click', () => {
        screen2.style.display = 'none';
        screen3.style.display = 'block';
    });

    // "Yes" button functionality
    yesButton.addEventListener('click', () => {
        screen3.innerHTML = '<h1>YAY! Now you get some otters</h1>';
    });

    // "No" button easter egg
    noButton.addEventListener('mouseover', () => {
        const x = Math.random() * (window.innerWidth - noButton.clientWidth);
        const y = Math.random() * (window.innerHeight - noButton.clientHeight);
        noButton.style.left = `${x}px`;
        noButton.style.top = `${y}px`;
    });

    noButton.addEventListener('click', () => {
        easterEggMessage.textContent = "You found the easter egg! But you can't say no!";
        easterEggMessage.style.display = 'block';
    });

    // Floating hearts
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 5 + 5}s`; // 5-10 seconds
        heartsContainer.appendChild(heart);

        heart.addEventListener('click', () => {
            easterEggMessage.textContent = 'You found a secret heart!';
            easterEggMessage.style.display = 'block';
            setTimeout(() => {
                easterEggMessage.style.display = 'none';
            }, 2000);
        });

        setTimeout(() => {
            heart.remove();
        }, 10000);
    }

    setInterval(createHeart, 300);
});
