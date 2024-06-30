document.addEventListener('DOMContentLoaded', function () {
            const main = document.querySelector('main');
            const coinContainer = document.createElement('div');
            coinContainer.classList.add('coin-container');
            document.body.appendChild(coinContainer);
            const insertCoinSlot = document.querySelector('.coin-slot .slot');

            const lamps = [
                {
                    lamp: '.radiationlamp',
                    light: '.radiationlamplight',
                    backgroundClass: 'radiation-scene',
                    backgroundImage: 'url("../../img/radiation_background.png")',
                    coinImage: 'radiation_rock.png'
                },
                {
                    lamp: '.animallamp',
                    light: '.animallamplight',
                    backgroundClass: 'animal-scene',
                    coinImage: 'animal_rock.png',
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

                        const cloud1Speed = getRandomSpeed(30, 60); // Random speed between 30s and 60s
                        const cloud2Speed = getRandomSpeed(30, 60); // Random speed between 30s and 60s

                        const cloud1Direction = Math.random() < 0.5 ? 'Left' : 'Right';
                        const cloud2Direction = cloud1Direction === 'Left' ? 'Right' : 'Left';

                        cloud1.parentElement.style.animation = \`moveCloud\${cloud1Direction} \${cloud1Speed}s linear infinite\`;
                        cloud2.parentElement.style.animation = \`moveCloud\${cloud2Direction} \${cloud2Speed}s linear infinite\`;
                    }

                    window.addEventListener('load', setCloudAnimation);
                `
                },
                {
                    lamp: '.crimelamp',
                    light: '.crimelamplight',
                    backgroundClass: 'crime-scene',
                    coinImage: 'crime_rock.png',
                    additionalContent: `
                    <div class="blood-stain2"><img src="../../img/bloodstain2.png" alt=""></div>
                    <div class="blood-stain"><img src="../../img/bloodstain.png" alt=""></div>
                    <h1 class="police-tape police-tape--1">
                        &nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE
                    </h1>
                    <h1 class="police-tape police-tape--2">POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>
                `
                },
                {
                    lamp: '.timelamp',
                    light: '.timelamplight',
                    backgroundClass: 'time-scene',
                    coinImage: 'time_rock.png',
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
                        const { innerWidth, innerHeight } = window;
                        const rows = Math.ceil(innerHeight / 20); // 20 is approximate line height with padding
                        const cols = Math.ceil(innerWidth / 16); // 16 is approximate character width with padding
                        binaryContainer.innerHTML = generateBinaryText(rows, cols);
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
                `
                },
                {
                    lamp: '.spacelamp',
                    light: '.spacelamplight',
                    backgroundClass: 'space-scene',
                    coinImage: 'space_rock.png',
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
                    
                    .star {
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
                            star.className = 'star';
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
                            star.className = 'star';
                            star.style.top = \`\${Math.random() * 100}vh\`;
                            star.style.left = \`\${Math.random() * 100}vw\`;
                            star.style.animationDelay = \`\${Math.random() * 5}s\`; // 랜덤한 딜레이를 추가합니다.
                            star.style.animationDuration = \`\${2 + Math.random() * 3}s\`;
                            container.appendChild(star);
                        }
                    });
                `
                }
            ];

            const initialContent = main.innerHTML; // 초기 main 콘텐츠 상태 저장
            const initialClassName = main.className; // 초기 main 클래스 상태 저장
            let activeLamp = null; // 현재 활성화된 가로등
            let styleElements = []; // 추가된 스타일 요소를 추적하는 배열

            // 코인 카운트 변수
            let coinCount = 0;
            
            // 가로등 이미지를 초기 상태로 되돌리는 함수
            function resetLampImages() {
                lamps.forEach(({ light }) => {
                    const lightElement = document.querySelector(light);
                    if (lightElement) {
                        lightElement.style.display = 'none';
                    }
                });
                // 코인 제거
                while (coinContainer.firstChild) {
                    coinContainer.removeChild(coinContainer.firstChild);
                }
            }

            function makeCoinDraggable(coin) {
                coin.style.position = 'absolute';
                coin.draggable = true;

                coin.addEventListener('dragstart', (e) => {
                    e.dataTransfer.setData('coin', coin.style.backgroundImage);
                    setTimeout(() => {
                        coin.style.visibility = 'hidden';
                    }, 0);
                });

                coin.addEventListener('dragend', (e) => {
                    coin.style.visibility = 'visible';
                });
            }

            function makeAllCoinsDraggable() {
                const coins = document.querySelectorAll('.coin');
                coins.forEach((coin) => {
                    makeCoinDraggable(coin);
                });
            }

            function createCoins(coinImage) {
                for (let i = 0; i < 20; i++) {
                    const coin = document.createElement('div');
                    coin.classList.add('coin');
                    coin.style.backgroundImage = `url("../../img/${coinImage}")`;
                    coin.style.left = `${Math.random() * 90 + 5}%`;
                    coin.style.bottom = '10px'; // 코인이 잘리지 않도록 bottom 값을 10px로 조정
                    coinContainer.appendChild(coin);
                    makeCoinDraggable(coin);
                }
            }

            function setDropEventListener() {
                insertCoinSlot.addEventListener('dragover', (e) => {
                    e.preventDefault();
                });

                insertCoinSlot.addEventListener('drop', (e) => {
                    e.preventDefault();
                    const coinData = e.dataTransfer.getData('coin');
                    console.log('Dropped coin data:', coinData);

                    // 서버에 데이터 전송
                    fetch('/insert-coin', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ coin: coinData })
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log('Server response:', data);
                            coinCount++;
                            console.log('Total coins inserted:', coinCount);
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                });
            }

            // 모든 코인을 드래그 가능하게 설정
            makeAllCoinsDraggable();

            // 가로등 클릭 시 코인 생성 및 드래그 설정
            lamps.forEach(({ lamp, light, backgroundClass, additionalContent, backgroundImage, additionalScript, additionalCSS, additionalHTML, coinImage }) => {
                const lampElement = document.querySelector(lamp);
                const lightElement = document.querySelector(light);

                lampElement.addEventListener('click', function () {
                    resetLampImages(); // 모든 가로등 이미지를 초기 상태로 되돌림

                    if (activeLamp === lamp) {
                        lightElement.style.display = 'none';
                        if (backgroundClass && main.classList.contains(backgroundClass)) {
                            main.classList.remove(backgroundClass);
                        }
                        if (backgroundImage) {
                            main.style.backgroundImage = ''; // 배경 이미지 제거
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
                                main.style.backgroundImage = backgroundImage; // 배경 이미지 설정
                            }

                            // 추가 요소가 있는 경우에만 main에 추가
                            if (additionalContent) {
                                main.insertAdjacentHTML('beforeend', additionalContent);
                            }
                            if (additionalHTML) {
                                main.insertAdjacentHTML('beforeend', additionalHTML);
                            }
                            // 추가 스크립트가 있는 경우에만 실행
                            if (additionalScript) {
                                const scriptElement = document.createElement('script');
                                scriptElement.innerHTML = additionalScript;
                                document.body.appendChild(scriptElement);
                            }
                            // 추가 CSS가 있는 경우에만 실행
                            if (additionalCSS) {
                                const styleElement = document.createElement('style');
                                styleElement.innerHTML = additionalCSS;
                                document.head.appendChild(styleElement);
                                styleElements.push(styleElement); // 스타일 요소를 배열에 추가
                            }

                            // 강제로 렌더링을 트리거
                            main.offsetHeight; // 강제 재렌더링을 트리거

                            activeLamp = lamp;

                            // 코인 생성
                            createCoins(coinImage);
                            makeAllCoinsDraggable();
                            setDropEventListener(); // 드롭 이벤트 리스너 설정

                            // 업데이트 함수 추가
                            if (backgroundClass === 'time-scene') {
                                updateBinaryText();
                            }
                        });
                    }
                });
            });

            function resetMainContent() {
                main.className = initialClassName; // 초기 클래스로 복원
                main.innerHTML = initialContent; // 초기 콘텐츠로 복원
                main.style.backgroundImage = ''; // 초기 배경 이미지 제거
                // 추가된 스타일 요소를 제거
                styleElements.forEach(styleElement => {
                    document.head.removeChild(styleElement);
                });
                styleElements = []; // 배열 초기화
                // 이벤트 리스너를 다시 설정
                lamps.forEach(({ lamp, light, backgroundClass, additionalContent, backgroundImage, additionalScript, additionalCSS, additionalHTML, coinImage }) => {
                    const lampElement = document.querySelector(lamp);
                    const lightElement = document.querySelector(light);

                    lampElement.addEventListener('click', function () {
                        resetLampImages(); // 모든 가로등 이미지를 초기 상태로 되돌림

                        if (activeLamp === lamp) {
                            lightElement.style.display = 'none';
                            if (backgroundClass && main.classList.contains(backgroundClass)) {
                                main.classList.remove(backgroundClass);
                            }
                            if (backgroundImage) {
                                main.style.backgroundImage = ''; // 배경 이미지 제거
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
                                    main.style.backgroundImage = backgroundImage; // 배경 이미지 설정
                                }

                                // 추가 요소가 있는 경우에만 main에 추가
                                if (additionalContent) {
                                    main.insertAdjacentHTML('beforeend', additionalContent);
                                }
                                if (additionalHTML) {
                                    main.insertAdjacentHTML('beforeend', additionalHTML);
                                }
                                // 추가 스크립트가 있는 경우에만 실행
                                if (additionalScript) {
                                    const scriptElement = document.createElement('script');
                                    scriptElement.innerHTML = additionalScript;
                                    document.body.appendChild(scriptElement);
                                }
                                // 추가 CSS가 있는 경우에만 실행
                                if (additionalCSS) {
                                    const styleElement = document.createElement('style');
                                    styleElement.innerHTML = additionalCSS;
                                    document.head.appendChild(styleElement);
                                    styleElements.push(styleElement); // 스타일 요소를 배열에 추가
                                }

                                // 강제로 렌더링을 트리거
                                main.offsetHeight; // 강제 재렌더링을 트리거

                                activeLamp = lamp;

                                // 코인 생성
                                createCoins(coinImage);
                                makeAllCoinsDraggable();
                                setDropEventListener(); // 드롭 이벤트 리스너 설정

                                // 업데이트 함수 추가
                                if (backgroundClass === 'time-scene') {
                                    updateBinaryText();
                                }
                            });
                        }
                    });
                });
            }

            // main의 클래스 변경을 감지하여 해당 가로등의 불을 켜는 함수
            const observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    if (mutation.attributeName === 'class') {
                        lamps.forEach(({ light, backgroundClass, coinImage }) => {
                            const lightElement = document.querySelector(light);
                            if (main.classList.contains(backgroundClass)) {
                                lightElement.style.display = 'block';
                                // 코인 드롭 이벤트 발생
                                while (coinContainer.firstChild) {
                                    coinContainer.removeChild(coinContainer.firstChild);
                                }
                                createCoins(coinImage);
                                makeAllCoinsDraggable();
                                setDropEventListener(); // 드롭 이벤트 리스너 설정
                            } else {
                                lightElement.style.display = 'none';
                            }
                        });
                    }
                });
            });

            observer.observe(main, { attributes: true });

            // 드롭 영역에 드롭 이벤트 추가
            insertCoinSlot.addEventListener('dragover', (e) => {
                e.preventDefault();
            });

            insertCoinSlot.addEventListener('drop', (e) => {
                e.preventDefault();
                const coinData = e.dataTransfer.getData('coin');
                console.log('Dropped coin data:', coinData); // 콘솔에 코인 데이터 출력

                // 서버에 데이터 전송
                fetch('/insert-coin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ coin: coinData })
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Server response:', data);
                        coinCount++;
                        console.log('Total coins inserted:', coinCount); // 콘솔에 누적된 코인 수 출력
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            });

            // 처음 로드 시 드롭 이벤트 리스너 설정
            setDropEventListener();
        });
        document.addEventListener('DOMContentLoaded', function() {
          let coinCount = 0;
          const coinCountDisplay = document.getElementById('coin-count');
          const coinSlot = document.getElementById('coin-slot');
          const coins = document.querySelectorAll('.coin');
        
          coins.forEach(coin => {
              coin.addEventListener('dragstart', function(event) {
                  event.dataTransfer.setData('text/plain', null); 
                  event.dataTransfer.setData('text', 'coin');
              });
          });
        
          coinSlot.addEventListener('dragover', function(event) {
              event.preventDefault();
          });
        
          coinSlot.addEventListener('drop', function(event) {
              event.preventDefault();
              const data = event.dataTransfer.getData('text');
              if (data === 'coin') {
                  const draggedCoin = document.querySelector('.coin[draggable="true"]:hover');
                  if (draggedCoin) {
                      // 동전 수 증가
                      coinCount++;
                      // 동전 수 업데이트
                      coinCountDisplay.textContent = coinCount;
        
                      // 동전 제거
                      draggedCoin.parentNode.removeChild(draggedCoin);
        
                      // 애니메이션 효과
                      coinCountDisplay.classList.add('coin-inserted');
                      setTimeout(() => {
                          coinCountDisplay.classList.remove('coin-inserted');
                      }, 500); // 0.5초 동안 애니메이션
                  }
              }
          });
        });
        document.addEventListener('DOMContentLoaded', function() {
          const starLimit = 20;
          
          const lampClasses = [
              { lamp: 'radiationlamp', light: 'radiationlamplight', imgClass: 'radiation_rock', imgSrc: '/img/radiation_rock.png' },
              { lamp: 'crimelamp', light: 'crimelamplight', imgClass: 'crime_rock', imgSrc: '/img/crime_rock.png' },
              { lamp: 'animallamp', light: 'animallamplight', imgClass: 'animal_rock', imgSrc: '/img/animal_rock.png' },
              { lamp: 'timelamp', light: 'timelamplight', imgClass: 'time_rock', imgSrc: '/img/time_rock.png' },
              { lamp: 'spacelamp', light: 'spacelamplight', imgClass: 'space_rock', imgSrc: '/img/space_rock.png' }
          ];
      
          let activeLight = null;
      
          lampClasses.forEach(lampClass => {
              const lampElement = document.querySelector(`.${lampClass.lamp}`);
              const lightElement = document.querySelector(`.${lampClass.light}`);
      
              lampElement.addEventListener('click', function() {
                  if (activeLight && activeLight !== lightElement) {
                      activeLight.style.display = 'none';
                  }
      
                  lightElement.style.display = (lightElement.style.display === 'none' || lightElement.style.display === '') ? 'block' : 'none';
                  activeLight = (lightElement.style.display === 'block') ? lightElement : null;
      
                  if (lightElement.style.display === 'block') {
                      const starsContainer = document.getElementById('stars-container');
                      starsContainer.innerHTML = ''; // 기존 별들을 모두 삭제
                      starsContainer.style.opacity = 1; // 별들을 보이도록 설정
      
                      for (let i = 0; i < starLimit; i++) {
                          const star = document.createElement('div');
                          star.className = 'star';
                          star.innerHTML = `<img draggable="true" class="${lampClass.imgClass}" src="${lampClass.imgSrc}" alt="">`;
      
                          // 무작위 위치 설정 (vw, vh 단위 사용)
                          const endY = getRandomInt(90, 80); // 화면 높이의 10% ~ 90% 사이
                          const endX = getRandomInt(10, 90); // 화면 너비의 10% ~ 90% 사이
                          const rotateAngle = getRandomInt(-90, 90);
      
                          star.style.transform = `translateY(${endY}vh) translateX(${endX}vw) rotate(${rotateAngle}deg)`;
                          star.style.transition = 'transform 5s ease-in-out';
      
                          starsContainer.appendChild(star);
                      }
                  } else {
                      document.getElementById('stars-container').style.opacity = 0; // 별들을 숨기도록 설정
                  }
              });
          });
      
          function getRandomInt(min, max) {
              return Math.floor(Math.random() * (max - min + 1)) + min;
          }
      });
        