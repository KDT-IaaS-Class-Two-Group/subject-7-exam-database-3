// animations.js
export function createStars() {
    const numberOfStars = 200;
    const container = document.querySelector('.shooting-stars');
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'space-star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(star);
    }
}

export function setCloudAnimation() {
    function getRandomSpeed(min, max) {
        return Math.random() * (max - min) + min;
    }

    function initializeCloudAnimation() {
        const cloud1 = document.querySelector('.cloud1 img');
        const cloud2 = document.querySelector('.cloud2 img');

        if (!cloud1 || !cloud2) {
            console.error('Cloud elements not found');
            return;
        }

        const cloud1Speed = getRandomSpeed(30, 60); // 30초에서 60초 사이의 무작위 속도
        const cloud2Speed = getRandomSpeed(30, 60); // 30초에서 60초 사이의 무작위 속도

        const cloud1Direction = Math.random() < 0.5 ? 'Left' : 'Right';
        const cloud2Direction = cloud1Direction === 'Left' ? 'Right' : 'Left';

        cloud1.parentElement.style.animation = `moveCloud${cloud1Direction} ${cloud1Speed}s linear infinite`;
        cloud2.parentElement.style.animation = `moveCloud${cloud2Direction} ${cloud2Speed}s linear infinite`;
    }

    const observer = new MutationObserver(() => {
        const cloud1 = document.querySelector('.cloud1 img');
        const cloud2 = document.querySelector('.cloud2 img');

        if (cloud1 && cloud2) {
            initializeCloudAnimation();
            observer.disconnect();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}




window.addEventListener('load', setCloudAnimation);


function getRandomSpeed(min, max) {
    return Math.random() * (max - min) + min;
}

export function updateBinaryText() {
    const binaryContainer = document.getElementById('binary-container');
    if (binaryContainer) {
        const { innerWidth, innerHeight } = window;
        const rows = Math.ceil(innerHeight / 20);
        const cols = Math.ceil(innerWidth / 16);
        binaryContainer.innerHTML = generateBinaryText(rows, cols);
    }
}

function generateBinaryText(rows, cols) {
    let binaryText = '';
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const binary = Math.random() < 0.5 ? '0' : '1';
            const visibilityClass = Math.random() < 0.05 ? 'hidden' : '';
            binaryText += `<span class="${visibilityClass}">${binary}</span>`;
        }
        binaryText += '<br>';
    }
    return binaryText;
}
