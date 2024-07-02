const sun = document.querySelector(".sun");
const can = document.querySelector(".can");

sun.addEventListener("click", (event) => {
  event.preventDefault();
  can.style.backgroundColor = "red";
  fetch("/Gologin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify("로그인 요청"),
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      document.open();
      document.write(data);
      document.close();
    })
    .catch((error) => console.error("Error:", error));
});
document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');
    const starLimit = 20;
    const lamps = [
        {
            lamp: '.radiationlamp',
            light: '.radiationlamplight',
            backgroundClass: 'radiation-scene',
            backgroundImage: 'url("../../img/radiation_background.png")',
            imgClass: 'radiation_rock',
            imgSrc: '../../img/radiation_rock.png'
        },
        {
            lamp: '.animallamp',
            light: '.animallamplight',
            backgroundClass: 'animal-scene',
            additionalContent: `
                <div class="cloud1"><img src="../img/cloud1.png" alt=""></div>
                <div class="cloud2"><img src="../img/cloud2.png" alt=""></div>
                <div class="grass1"></div>
                <div class="grass2"></div>
            `,
            additionalScript: `
                function getRandomSpeed(min, max) {
                    return Math.random() * (max - min) + min;
                }

                function setCloudAnimation() {
                    const cloud1 = document.querySelector('.cloud1 img');
                    const cloud2 = document.querySelector('.cloud2 img');

                    const cloud1Speed = getRandomSpeed(30, 60); // 30초에서 60초 사이의 무작위 속도
                    const cloud2Speed = getRandomSpeed(30, 60); // 30초에서 60초 사이의 무작위 속도

                    const cloud1Direction = Math.random() < 0.5 ? 'Left' : 'Right';
                    const cloud2Direction = cloud1Direction === 'Left' ? 'Right' : 'Left';

                    cloud1.parentElement.style.animation = \`moveCloud\${cloud1Direction} \${cloud1Speed}s linear infinite\`;
                    cloud2.parentElement.style.animation = \`moveCloud\${cloud2Direction} \${cloud2Speed}s linear infinite\`;
                }

                window.addEventListener('load', setCloudAnimation);
            `,
            imgClass: 'animal_rock',
            imgSrc: '../../img/animal_rock.png'
        },
        {
            lamp: '.crimelamp',
            light: '.crimelamplight',
            backgroundClass: 'crime-scene',
            additionalContent: `
                <div class="blood-stain2"><img src="../../img/bloodstain2.png" alt=""></div>
                <div class="blood-stain"><img src="../../img/bloodstain.png" alt=""></div>
                <h1 class="police-tape police-tape--1">
                    &nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE
                </h1>
                <h1 class="police-tape police-tape--2">POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>
            `,
            imgClass: 'crime_rock',
            imgSrc: '../../img/crime_rock.png'
        },
        {
            lamp: '.timelamp',
            light: '.timelamplight',
            backgroundClass: 'time-scene',
            additionalContent: `
                <div id="binary-container" class="binary-text press-start-2p-regular"></div>
            `,
            additionalScript: `
                function generateBinaryText(rows, cols) {
                    let binaryText = '';
                    for (let i = 0; i < rows; i++) {
                        for (let j = 0; j < cols; j++) {
                            const binary = Math.random() < 0.5 ? '0' : '1';
                            const visibilityClass = Math.random() < 0.05 ? 'hidden' : ''; // 5% 확률로 숨기기
                            binaryText += \`<span class="\${visibilityClass}">\${binary}</span>\`;
                        }
                        binaryText += '<br>'; // 줄 바꿈을 위한 <br> 태그
                    }
                    return binaryText;
                }

                function updateBinaryText() {
                    const binaryContainer = document.getElementById('binary-container');
                    if (binaryContainer) {
                        const { innerWidth, innerHeight } = window;
                        const rows = Math.ceil(innerHeight / 20); // 20은 패딩이 포함된 대략적인 줄 높이
                        const cols = Math.ceil(innerWidth / 16); // 16은 패딩이 포함된 대략적인 문자 너비
                        binaryContainer.innerHTML = generateBinaryText(rows, cols);
                    }
                }

                window.addEventListener('resize', updateBinaryText);
                window.addEventListener('load', updateBinaryText);
            `,
            additionalCSS: `
                @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

                body {
                    background-color: black;
                    margin: 0;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    -webkit-user-select:none;
                    -moz-user-select:none;
                    -ms-user-select:none;
                    user-select:none
                }

                .press-start-2p-regular {
                    font-family: "Press Start 2P", system-ui;
                    font-weight: 400;
                    font-style: normal;
                    color: green;
                    white-space: pre-wrap;
                }

                .binary-text {
                    display: flex;
                    flex-wrap: wrap;
                    align-content: center;
                }

                .binary-text span {
                    padding: 2px 4px; /* padding으로 간격 조정 */
                }

                .hidden {
                    visibility: hidden;
                }

                #binary-container {
                    filter: blur(1px);
                    position: absolute; /* 추가된 코드: 배경 텍스트 위치를 절대 위치로 설정 */
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: -1; /* 추가된 코드: 배경 텍스트를 뒤로 보내기 위해 z-index를 -1로 설정 */
                }
            `,
            imgClass: 'time_rock',
            imgSrc: '../../img/time_rock.png'
        },
        {
            lamp: '.spacelamp',
            light: '.spacelamplight',
            backgroundClass: 'space-scene',
            additionalHTML: `
                <div class="shooting-stars"></div>
            `,
            additionalCSS: `
                .shooting-stars {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    z-index: -1; /* 배경 요소를 뒤로 보내기 위해 z-index를 -1로 설정 */
                }
                
                .space-star { /* 클래스 이름 변경 */
                    position: absolute;
                    background-color: #fff;
                    width: 2px;
                    height: 2px;
                    border-radius: 50%;
                    animation: twinkling 2s infinite;
                }
                
                @keyframes twinkling {
                    0% { opacity: 1; }
                    50% { opacity: 0; }
                    100% { opacity: 1; }
                }
                
                @keyframes shoot {
                    0% {
                        transform: translate3d(0, 0, 0) scale(0);
                        opacity: 1;
                    }
                    70% {
                        opacity: 1;
                    }
                    100% {
                        transform: translate3d(100vw, -100vh, 0) scale(0.5);
                        opacity: 0;
                    }
                }
            `,
            additionalScript: `
                function createStars() {
                    const numberOfStars = 200; // 생성할 별의 개수
                    const container = document.querySelector('.shooting-stars');
                    for (let i = 0; i < numberOfStars; i++) {
                        const star = document.createElement('div');
                        star.className = 'space-star'; /* 클래스 이름 변경 */
                        star.style.left = \`\${Math.random() * 100}%\`;
                        star.style.top = \`\${Math.random() * 100}%\`;
                        star.style.animationDelay = \`\${Math.random() * 2}s\`; // 랜덤한 딜레이를 추가합니다.
                        container.appendChild(star);
                    }
                }
                createStars();
                
                document.addEventListener('DOMContentLoaded', () => {
                    const numStars = 100;
                    const container = document.querySelector('.shooting-stars');
                
                    for (let i = 0; i < numStars; i++) {
                        const star = document.createElement('div');
                        star.className = 'space-star';
                        star.style.top = \`\${Math.random() * 100}vh\`;
                        star.style.left = \`\${Math.random() * 100}vw\`;
                        star.style.animationDelay = \`\${Math.random() * 5}s\`; // 랜덤한 딜레이를 추가합니다.
                        star.style.animationDuration = \`\${2 + Math.random() * 3}s\`;
                        container.appendChild(star);
                    }
                });
            `,
            imgClass: 'space_rock',
            imgSrc: '../../img/space_rock.png'
        }
    ];

    const initialContent = main.innerHTML;
    const initialClassName = main.className;
    let activeLamp = null;
    let styleElements = [];

    function resetLampImages() {
        lamps.forEach(({ light }) => {
            const lightElement = document.querySelector(light);
            if (lightElement) {
                lightElement.style.display = 'none';
            }
        });
    }

    function setDropZoneEventListeners() {
        const dropZone = document.getElementById('drop-zone');
        dropZone.addEventListener('dragover', dragOver);
        dropZone.addEventListener('drop', drop);
    }

    setDropZoneEventListeners();

    lamps.forEach(({ lamp, light, backgroundClass, additionalContent, backgroundImage, additionalScript, additionalCSS, additionalHTML, imgClass, imgSrc }) => {
        const lampElement = document.querySelector(lamp);
        const lightElement = document.querySelector(light);

        lampElement.addEventListener('click', function () {
            resetLampImages();

            if (activeLamp === lamp) {
                lightElement.style.display = 'none';
                if (backgroundClass && main.classList.contains(backgroundClass)) {
                    main.classList.remove(backgroundClass);
                }
                if (backgroundImage) {
                    main.style.backgroundImage = '';
                }
                resetMainContent();
                activeLamp = null;
            } else {
                if (activeLamp) {
                    const activeLampData = lamps.find(({ lamp }) => lamp === activeLamp);
                    document.querySelector(activeLampData.light).style.display = 'none';
                    resetMainContent();
                }

                lightElement.style.display = 'block';

                requestAnimationFrame(() => {
                    if (backgroundClass) {
                        main.classList.add(backgroundClass);
                    }
                    if (backgroundImage) {
                        main.style.backgroundImage = backgroundImage;
                    }

                    if (additionalContent) {
                        main.insertAdjacentHTML('beforeend', additionalContent);
                    }
                    if (additionalHTML) {
                        main.insertAdjacentHTML('beforeend', additionalHTML);
                    }
                    if (additionalScript) {
                        const scriptElement = document.createElement('script');
                        scriptElement.innerHTML = additionalScript;
                        document.body.appendChild(scriptElement);
                    }
                    if (additionalCSS) {
                        const styleElement = document.createElement('style');
                        styleElement.innerHTML = additionalCSS;
                        document.head.appendChild(styleElement);
                        styleElements.push(styleElement);
                    }

                    main.offsetHeight;

                    activeLamp = lamp;

                    if (backgroundClass === 'time-scene') {
                        updateBinaryText();
                    }

                    if (imgClass && imgSrc) {
                        const starsContainer = document.getElementById('stars-container');
                        starsContainer.innerHTML = '';
                        starsContainer.style.opacity = 1;

                        for (let i = 0; i < starLimit; i++) {
                            const star = document.createElement('div');
                            star.className = 'star';
                            const coinId = `coin-${imgClass}-${i}`;
                            star.innerHTML = `<img draggable="true" id="${coinId}" data-message="This is coin ${i} from ${imgClass}" class="${imgClass}" src="${imgSrc}" alt="">`;

                            const endY = getRandomInt(90, 80);
                            const endX = getRandomInt(10, 90);
                            const rotateAngle = getRandomInt(-90, 90);

                            star.style.transform = `translateY(${endY}vh) translateX(${endX}vw) rotate(${rotateAngle}deg)`;
                            star.style.transition = 'transform 5s ease-in-out';

                            star.querySelector('img').addEventListener('dragstart', dragStart);

                            starsContainer.appendChild(star);
                        }
                    }
                    setDropZoneEventListeners();
                });
            }
        });
    });

    function resetMainContent() {
        main.className = initialClassName;
        main.innerHTML = initialContent;
        main.style.backgroundImage = '';
        styleElements.forEach(styleElement => {
            document.head.removeChild(styleElement);
        });
        styleElements = [];
        lamps.forEach(({ lamp, light, backgroundClass, additionalContent, backgroundImage, additionalScript, additionalCSS, additionalHTML, imgClass, imgSrc }) => {
            const lampElement = document.querySelector(lamp);
            const lightElement = document.querySelector(light);

            lampElement.addEventListener('click', function () {
                resetLampImages();

                if (activeLamp === lamp) {
                    lightElement.style.display = 'none';
                    if (backgroundClass && main.classList.contains(backgroundClass)) {
                        main.classList.remove(backgroundClass);
                    }
                    if (backgroundImage) {
                        main.style.backgroundImage = '';
                    }
                    resetMainContent();
                    activeLamp = null;
                } else {
                    if (activeLamp) {
                        const activeLampData = lamps.find(({ lamp }) => lamp === activeLamp);
                        document.querySelector(activeLampData.light).style.display = 'none';
                        resetMainContent();
                    }

                    lightElement.style.display = 'block';

                    requestAnimationFrame(() => {
                        if (backgroundClass) {
                            main.classList.add(backgroundClass);
                        }
                        if (backgroundImage) {
                            main.style.backgroundImage = backgroundImage;
                        }

                        if (additionalContent) {
                            main.insertAdjacentHTML('beforeend', additionalContent);
                        }
                        if (additionalHTML) {
                            main.insertAdjacentHTML('beforeend', additionalHTML);
                        }
                        if (additionalScript) {
                            const scriptElement = document.createElement('script');
                            scriptElement.innerHTML = additionalScript;
                            document.body.appendChild(scriptElement);
                        }
                        if (additionalCSS) {
                            const styleElement = document.createElement('style');
                            styleElement.innerHTML = additionalCSS;
                            document.head.appendChild(styleElement);
                            styleElements.push(styleElement);
                        }

                        main.offsetHeight;

                        activeLamp = lamp;

                        if (backgroundClass === 'time-scene') {
                            updateBinaryText();
                        }

                        if (imgClass && imgSrc) {
                            const starsContainer = document.getElementById('stars-container');
                            starsContainer.innerHTML = '';
                            starsContainer.style.opacity = 1;

                            for (let i = 0; i < starLimit; i++) {
                                const star = document.createElement('div');
                                star.className = 'star';
                                const coinId = `coin-${imgClass}-${i}`;
                                star.innerHTML = `<img draggable="true" id="${coinId}" data-message="This is coin ${i} from ${imgClass}" class="${imgClass}" src="${imgSrc}" alt="">`;

                                const endY = getRandomInt(90, 80);
                                const endX = getRandomInt(10, 90);
                                const rotateAngle = getRandomInt(-90, 90);

                                star.style.transform = `translateY(${endY}vh) translateX(${endX}vw) rotate(${rotateAngle}deg)`;
                                star.style.transition = 'transform 5s ease-in-out';

                                star.querySelector('img').addEventListener('dragstart', dragStart);

                                starsContainer.appendChild(star);
                            }
                        }
                        setDropZoneEventListeners();
                    });
                }
            });
        });
    }

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.attributeName === 'class') {
                lamps.forEach(({ light, backgroundClass }) => {
                    const lightElement = document.querySelector(light);
                    if (main.classList.contains(backgroundClass)) {
                        lightElement.style.display = 'block';
                    } else {
                        lightElement.style.display = 'none';
                    }
                });
            }
        });
    });

    observer.observe(main, { attributes: true });

    let totalCoins = 0;
    const coinDisplay = document.getElementById('coin-display');

    function dragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.id);
        const message = event.target.getAttribute('data-message');
        console.log('Drag started:', message);
    }

    const dropZone = document.getElementById('drop-zone');
    dropZone.addEventListener('dragover', dragOver);
    dropZone.addEventListener('drop', drop);

    function dragOver(event) {
        event.preventDefault();
    }

    function drop(event) {
        event.preventDefault();
        const id = event.dataTransfer.getData('text/plain');
        console.log('Dropped ID:', id); // 드롭된 ID를 출력하여 확인
        const coin = document.getElementById(id);
        if (coin) {
            const message = coin.getAttribute('data-message');
            console.log('Dropped:', message);
            updateCoinCount(1);
            sendDataToServer(id);
        } else {
            console.error('Coin not found for id:', id);
        }
    }

    function updateCoinCount(amount) {
        totalCoins += amount;
        coinDisplay.textContent = `${totalCoins} COIN`;
    }

    function sendDataToServer(data) {
        console.log('Sending data to server:', data);
        fetch('/insert-coin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: data })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error.message);
            console.error(error);
        });
    }

    const coins = document.querySelectorAll('.coin');
    coins.forEach((coin, index) => {
        coin.id = `coin-${index}`;
        coin.addEventListener('dragstart', dragStart);
    });

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
});