document.addEventListener('DOMContentLoaded', function() {
    const sun = document.querySelector(".sun");
    const can = document.querySelector(".can");

    sun.addEventListener("click", () => {
        can.style.backgroundColor = "red";
    });

    const starLimit = 20;
    
    const lampses = [
        { lamp: 'radiationlamp', light: 'radiationlamplight', imgClass: 'radiation_rock', imgSrc: '/img/radiation_rock.png' },
        { lamp: 'crimelamp', light: 'crimelamplight', imgClass: 'crime_rock', imgSrc: '/img/crime_rock.png' },
        { lamp: 'animallamp', light: 'animallamplight', imgClass: 'animal_rock', imgSrc: '/img/animal_rock.png' },
        { lamp: 'timelamp', light: 'timelamplight', imgClass: 'time_rock', imgSrc: '/img/time_rock.png' },
        { lamp: 'spacelamp', light: 'spacelamplight', imgClass: 'space_rock', imgSrc: '/img/space_rock.png' }
    ];

    let activeLight = null;

    lampses.forEach(lamps => {
        const lampElement = document.querySelector(`.${lamps.lamp}`);
        const lightElement = document.querySelector(`.${lamps.light}`);

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
                    star.innerHTML = `<img draggable="true" class="${lamps.imgClass}" src="${lamps.imgSrc}" alt="">`;

                    // 무작위 위치 설정 (vw, vh 단위 사용)
                    const endY = getRandomInt(90, 10); // 화면 높이의 10% ~ 90% 사이
                    const endX = getRandomInt(10, 90); // 화면 너비의 10% ~ 90% 사이
                    const rotateAngle = getRandomInt(-90, 90);

                    star.style.transform = `translateY(${endY}vh) translateX(${endX}vw) rotate(${rotateAngle}deg)`;
                    star.style.transition = 'transform 5s ease-in-out';

                    star.addEventListener('dragstart', dragStart);

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

    function dragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.src);
    }

    const dropZone = document.getElementById('drop-zone');
    dropZone.addEventListener('dragover', dragOver);
    dropZone.addEventListener('drop', drop);

    function dragOver(event) {
        event.preventDefault();
    }

    function drop(event) {
        event.preventDefault();
        const src = event.dataTransfer.getData('text/plain');
        const star = document.querySelector(`img[src='${src}']`);
        if (star) {
            dropZone.appendChild(star.parentElement);
            sendDataToServer(src);
        }
    }

    function sendDataToServer(data) {
        fetch('/your-server-endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: data })
        })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch((error) => console.error('Error:', error));
    }
});