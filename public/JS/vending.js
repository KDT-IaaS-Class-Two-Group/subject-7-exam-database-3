document.addEventListener('DOMContentLoaded', function() {
  const main = document.querySelector('main');

  const lamps = [
    { lamp: '.radiationlamp', light: '.radiationlamplight', backgroundClass: 'radiation-scene', backgroundImage: 'url("/img/radiation_background.png")' },
    { lamp: '.animallamp', light: '.animallamplight', backgroundClass: 'animal-scene', additionalContent: `
      <div class="cloud1"><img src="../img/cloud1.png" alt=""></div>
      <div class="cloud2"><img src="../img/cloud2.png" alt=""></div>
      <div class="grass1"></div>
      <div class="grass2"></div>
    `, additionalScript: `
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
    ` },
    { lamp: '.crimelamp', light: '.crimelamplight', backgroundClass: 'crime-scene', additionalContent: `
      <div class="blood-stain2"><img src="../../img/bloodstain2.png" alt=""></div>
      <div class="blood-stain"><img src="../../img/bloodstain.png" alt=""></div>
      <h1 class="police-tape police-tape--1">
        &nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE
      </h1>
      <h1 class="police-tape police-tape--2">POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>
    ` },
    { lamp: '.timelamp', light: '.timelamplight', backgroundClass: 'time-scene', additionalContent: `
      <div id="binary-container" class="binary-text press-start-2p-regular"></div>
    `, additionalScript: `
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
    `, additionalCSS: `
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
    `},
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

  // 가로등 이미지를 초기 상태로 되돌리는 함수
  function resetLampImages() {
    lamps.forEach(({ light }) => {
      const lightElement = document.querySelector(light);
      if (lightElement) {
        lightElement.style.display = 'none';
      }
    });
  }

  lamps.forEach(({ lamp, light, backgroundClass, additionalContent, backgroundImage, additionalScript, additionalCSS, additionalHTML }) => {
    const lampElement = document.querySelector(lamp);
    const lightElement = document.querySelector(light);

    lampElement.addEventListener('click', function() {
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
    lamps.forEach(({ lamp, light, backgroundClass, additionalContent, backgroundImage, additionalScript, additionalCSS, additionalHTML }) => {
      const lampElement = document.querySelector(lamp);
      const lightElement = document.querySelector(light);

      lampElement.addEventListener('click', function() {
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
});

// Second JavaScript
document.addEventListener("DOMContentLoaded", function () {
  const sun = document.querySelector(".sun");
  const can = document.querySelector(".can");
  if (sun) {
    sun.addEventListener("click", (event) => {
      event.preventDefault();
      can.style.backgroundColor = "red";
      fetch("/Gologin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "로그인 요청" }),
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
  } else {
    console.error("Element with class 'sun' not found");
  }
  const lamps = [
    { lamp: ".radiationlamp", light: ".radiationlamplight" },
    { lamp: ".animallamp", light: ".animallamplight" },
    { lamp: ".timelamp", light: ".timelamplamplight" },
    { lamp: ".crimelamp", light: ".crimelamplight" },
    { lamp: ".spacelamp", light: ".spacelamplight" },
  ];
  lamps.forEach(({ lamp, light }) => {
    const lampElement = document.querySelector(lamp);
    const lightElement = document.querySelector(light);
    lightElement.style.display = "none"; // 초기 상태를 'none'으로 설정
    lampElement.addEventListener("click", function () {
      // 클릭할 때마다 lightElement의 display 속성을 토글
      lightElement.style.display =
        lightElement.style.display === "none" ? "block" : "none";
    });
  });
});
