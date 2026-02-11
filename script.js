document.addEventListener('DOMContentLoaded', () => {
    const screens = {
        screen1: document.getElementById('screen1'),
        screen2: document.getElementById('screen2'),
        screen3: document.getElementById('screen3'),
        screen4: document.getElementById('screen4'),
        screen5: document.getElementById('screen5'),
        screen6: document.getElementById('screen6'),
        screen7: document.getElementById('screen7'),
        finalScreen: document.getElementById('finalScreen')
    };

    const buttons = {
        startButton: document.getElementById('startButton'),
        continueButton2: document.getElementById('continueButton2'),
        continueButton3: document.getElementById('continueButton3'),
        continueButton4: document.getElementById('continueButton4'),
        continueButton5: document.getElementById('continueButton5'),
        whosThereButton: document.getElementById('whosThereButton'),
        willWhoButton: document.getElementById('willWhoButton'),
        yesButton: document.getElementById('yesButton'),
        noButton: document.getElementById('noButton')
    };

    const intermediateButtons = [
        buttons.continueButton2,
        buttons.continueButton3,
        buttons.continueButton4,
        buttons.continueButton5,
        buttons.whosThereButton,
        buttons.willWhoButton,
    ];

    const easterEggBox = document.getElementById('easter-egg-box');
    const easterEggMessage = document.getElementById('easter-egg-message');
    const heartsContainer = document.getElementById('hearts-container');

    function transition(fromScreen, toScreen) {
        fromScreen.style.display = 'none';
        toScreen.style.display = 'block';

        const nextButton = toScreen.querySelector('button');
        if (intermediateButtons.includes(nextButton)) {

            setTimeout(() => {
                // Remove the class if it exists to reset the animation
                nextButton.classList.remove('appearing-button');
                // Add the class after a delay to allow the screen to fade in first
                nextButton.classList.add('appearing-button');
            }, 1900); // 1.5s delay to match screen fade-in
        }
    }
    buttons.willWhoButton.addEventListener('click', () => transition(screens.screen1, screens.finalScreen));

    //buttons.startButton.addEventListener('click', () => transition(screens.screen1, screens.screen2));
    //buttons.continueButton2.addEventListener('click', () => transition(screens.screen2, screens.screen3));
    //buttons.continueButton3.addEventListener('click', () => transition(screens.screen3, screens.screen4));
    //buttons.continueButton4.addEventListener('click', () => transition(screens.screen4, screens.screen5));
    //buttons.continueButton5.addEventListener('click', () => transition(screens.screen5, screens.screen6));
    //buttons.whosThereButton.addEventListener('click', () => transition(screens.screen6, screens.screen7));
    //buttons.willWhoButton.addEventListener('click', () => transition(screens.screen7, screens.finalScreen));

    buttons.yesButton.addEventListener('click', () => {
        screens.finalScreen.innerHTML = '<h1>YAY!!</h1>';
    });

    let noButtonClicks = 0;
    const moveButton = () => {
        const x = Math.random() * (window.innerWidth - buttons.noButton.clientWidth);
        const y = Math.random() * (window.innerHeight - buttons.noButton.clientHeight);
        buttons.noButton.style.left = `${x}px`;
        buttons.noButton.style.top = `${y}px`;
    };

    const noButtonClickHandler = () => {
        noButtonClicks++;
        if (noButtonClicks < 5) {
            const currentScale = buttons.noButton.style.transform ? parseFloat(buttons.noButton.style.transform.replace('scale(', '').replace(')', '')) : 1;
            const newScale = currentScale * 0.8;
            buttons.noButton.style.transform = `scale(${newScale})`;
        } else {
            buttons.noButton.style.position = 'absolute';
            buttons.noButton.removeEventListener('click', noButtonClickHandler);
            buttons.noButton.addEventListener('click', moveButton);
            buttons.noButton.addEventListener('mouseover', moveButton);
            moveButton(); // Move it once right away
        }

        easterEggBox.style.display = 'flex';
        easterEggMessage.textContent = "You sure about that??";
        easterEggMessage.style.display = 'block';
    };

    buttons.noButton.addEventListener('click', noButtonClickHandler);


    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 5 + 5}s`;
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