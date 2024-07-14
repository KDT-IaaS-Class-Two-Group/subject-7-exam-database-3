import { addEventListeners } from './module/event/eventListeners.js';
import { setCurrentCoins } from './module/event/coinState.js';
import { attachLampEventListeners } from './module/event/lampHandlers.js';
import { getCurrentCoins } from './module/event/coinState.js';
import { setDropZoneEventListeners } from './module/event/dragDropHandlers.js';
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

document.addEventListener('DOMContentLoaded', () => {
    const productElements = document.querySelectorAll('.product');

    productElements.forEach(product => {
        product.addEventListener('click', () => {
            const productId = product.dataset.id;
            fetch(`/api/product/${productId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.product) {
                        showAlert(data.product.productName, data.product.description);
                    } else {
                        showAlert('Error', 'Product not found');
                    }
                })
                .catch(error => {
                    console.error('Error fetching product data:', error);
                    showAlert('Error', 'Failed to fetch product data');
                });
        });
    });

    restoreDeletedProducts(); // 페이지 로드 시 삭제된 상품을 반영
    initializeCoins(); // 페이지 로드 시 코인 초기화
    attachLampEventListeners(lamps);
    setDropZoneEventListeners();
    addEventListeners(lamps);
});

function showAlert(title, description) {
    let alertBox = document.getElementById('alertBox');
    if (!alertBox) {
        alertBox = document.createElement('div');
        alertBox.id = 'alertBox';
        alertBox.style.position = 'fixed';
        alertBox.style.top = '50%';
        alertBox.style.left = '50%';
        alertBox.style.transform = 'translate(-50%, -50%)';
        alertBox.style.backgroundColor = 'white';
        alertBox.style.padding = '20px';
        alertBox.style.border = '1px solid black';
        alertBox.style.zIndex = '1000';
        document.body.appendChild(alertBox);
    }

    alertBox.innerHTML = `
        <div class="alert-title">${title}</div>
        <div class="alert-description">${description}</div>
    `;
    alertBox.style.display = 'block';
}

function deleteProduct(productId) {
    let deletedProducts = JSON.parse(localStorage.getItem('deletedProducts')) || [];
    if (!deletedProducts.includes(productId)) {
        deletedProducts.push(productId);
    }
    localStorage.setItem('deletedProducts', JSON.stringify(deletedProducts));
    const allLabels = document.querySelectorAll(`.label[data-product-id="${productId}"]`);
    allLabels.forEach(lbl => lbl.parentElement.remove());
}

function restoreDeletedProducts() {
    let deletedProducts = JSON.parse(localStorage.getItem('deletedProducts')) || [];
    deletedProducts.forEach(productId => {
        const allLabels = document.querySelectorAll(`.label[data-product-id="${productId}"]`);
        allLabels.forEach(lbl => lbl.parentElement.remove());
    });
}

function updateLampCoinCount(coins, lampIndex) {
    const coinDisplay = document.querySelector(`#coin-display-${lampIndex}`);
    if (coinDisplay) {
        coinDisplay.textContent = `${coins} COIN`;
    }
}

document.querySelectorAll('.label').forEach((label, index) => {
    label.addEventListener('click', () => {
        const alertContainer = document.getElementById('alert-container');
        const alertMessage = document.getElementById('alert-message');
        alertMessage.textContent = 'Do you want to purchase this item?';
        alertContainer.classList.remove('hidden');
        alertContainer.classList.add('visible');

        const yesButton = document.getElementById('yes-button');
        const noButton = document.getElementById('no-button');

        yesButton.onclick = () => {
            const productId = label.getAttribute('data-product-id'); // 상품 고유 ID
            deleteProduct(productId);

            alertContainer.classList.remove('visible');
            alertContainer.classList.add('hidden');

            // 상품 구매 시 코인 차감 (예시)
            lampCoins[index] -= parseInt(label.dataset.price, 10);
            setCurrentCoins(lampCoins[index]);
            updateLampCoinCount(lampCoins[index], index);
        };

        noButton.onclick = () => {
            alertContainer.classList.remove('visible');
            alertContainer.classList.add('hidden');
        };
    });
});

export const lamps = [
    {
        lamp: '.radiationlamp',
        light: '.radiationlamplight',
        backgroundClass: 'radiation-scene',
        lampName: 'radiation',
        rowIndex: 0,
        additionalContent: `
        <canvas id="canvas"></canvas>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
                <filter id="shadowed-goo">
                    <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7" result="goo" />
                    <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
                    <feColorMatrix in="shadow" mode="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 -0.2" result="shadow" />
                    <feOffset in="shadow" dx="1" dy="1" result="shadow" />
                    <feBlend in2="shadow" in="goo" result="goo" />
                    <feBlend in2="goo" in="SourceGraphic" result="mix" />
                </filter>
                <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7" result="goo" />
                    <feBlend in2="goo" in="SourceGraphic" result="mix" />
                </filter>
            </defs>
        </svg>`,
        additionalCSS: `
html, body{
    margin:0;
    padding:0;
    background-color:hsl(195, 100%, 7%);
}

#canvas{
    z-index:1;
    position:absolute;
    background-color: "black";
    margin:0 auto;
    display:block;
    filter:url('#shadowed-goo');
}`,
        additionalScript: `
class Application {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        this.center = {
            x: this.width / 2,
            y: this.height / 2
        };

        this.circleContainers = [];

        window.addEventListener('resize', () => this.resizeCanvas(), false);
    }

    resizeCanvas() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        this.center = {
            x: this.width / 2,
            y: this.height / 2
        };

        this.circleContainers = [];
        this.initializeCircleContainers();
    }

    initializeCircleContainers() {
        for (let x = 0; x < this.width + 100; x += 100) {
            for (let y = 0; y < this.height + 100; y += 100) {
                let circleContainer = new CircleContainer(this.context, x, y);
                circleContainer.initializeCircles();
                this.circleContainers.push(circleContainer);
            }
        }
    }

    update() {
        for (let i = 0; i < this.circleContainers.length; i++) {
            this.circleContainers[i].update();
        }
    }

    render() {
        this.context.clearRect(0, 0, this.width, this.height);
        for (let i = 0; i < this.circleContainers.length; i++) {
            this.circleContainers[i].render();
        }
    }

    loop() {
        this.update();
        this.render();
        window.requestAnimationFrame(() => this.loop());
    }
}

class CircleContainer {
    constructor(context, x, y) {
        this.context = context;
        this.position = { x, y };

        this.numberOfCircles = 19;
        this.circles = [];

        this.baseRadius = 20;
        this.bounceRadius = 150;
        this.singleSlice = Math.PI * 2 / this.numberOfCircles;
    }

    initializeCircles() {
        for (let i = 0; i < this.numberOfCircles; i++) {
            this.circles.push(new Circle(this.position.x, this.position.y + Math.random(), this.baseRadius, this.bounceRadius, i * this.singleSlice));
        }
    }

    update() {
        for (let i = 0; i < this.numberOfCircles; i++) {
            this.circles[i].update(this.context);
        }
    }

    render() {
        for (let i = 0; i < this.numberOfCircles; i++) {
            this.circles[i].render(this.context);
        }
    }
}

class Circle {
    constructor(x, y, baseRadius, bounceRadius, angleCircle) {
        this.basePosition = { x, y };
        this.position = { x, y };
        this.speed = 0.01;
        this.baseSize = 10;
        this.size = 10;
        this.angle = (x + y);
        this.baseRadius = baseRadius;
        this.bounceRadius = bounceRadius;
        this.angleCircle = angleCircle;
    }

    update() {
        this.position.x = this.basePosition.x + Math.cos(this.angleCircle) * (Math.sin(this.angle + this.angleCircle) * this.bounceRadius + this.baseRadius);
        this.position.y = this.basePosition.y + Math.sin(this.angleCircle) * (Math.sin(this.angle + this.angleCircle) * this.bounceRadius + this.baseRadius);
        this.size = Math.cos(this.angle) * 8 + this.baseSize;
        this.angle += this.speed;
    }

    render(context) {
        context.fillStyle = "hsl(50, 100%, " + this.size * 3 + "%)";
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
        context.fill();
    }
}

const application = new Application();
application.initializeCircleContainers();
application.loop();

window.onload = function () {
    const application = new Application();
    application.initializeCircleContainers();
    application.loop();
};`,
        imgClass: 'radiation_rock',
        imgSrc: '../../img/radiation_rock.png',
        coinCount: 0
    },
    {
        lamp: '.animallamp',
        light: '.animallamplight',
        backgroundClass: 'animal-scene',
        lampName: 'animal',
        rowIndex: 1,
        additionalContent: `
<div id="background-wrap">
  <div class="x1">
      <div class="cloud"></div>
  </div>
  <div class="x2">
      <div class="cloud"></div>
  </div>
  <div class="x3">
      <div class="cloud"></div>
  </div>
  <div class="x4">
      <div class="cloud"></div>
  </div>
  <div class="x5">
      <div class="cloud"></div>
  </div>
</div>`,
        additionalCSS: `
body {
    background: lightblue;
    color: #333;
    font: 100% Arial, Sans Serif;
    height: 100vh;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    background: repeating-linear-gradient(
          180deg,
          #c8dfff,
          #c8dfff 10px,
          #ffffff 10px,
          #ffffff 25px
      );
}

#background-wrap {
    bottom: 0;
    left: 0;
    padding-top: 50px;
    position: fixed;
    right: 0;
    top: 0;
    z-index: -1;
}

/* KEYFRAMES */

@-webkit-keyframes animateCloud {
    0% {
        margin-left: -1000px;
    }
    100% {
        margin-left: 100%;
    }
}

@-moz-keyframes animateCloud {
    0% {
        margin-left: -1000px;
    }
    100% {
        margin-left: 100%;
    }
}

@keyframes animateCloud {
    0% {
        margin-left: -1000px;
    }
    100% {
        margin-left: 100%;
    }
}

/* ANIMATIONS */

.x1 {
    -webkit-animation: animateCloud 35s linear infinite;
    -moz-animation: animateCloud 35s linear infinite;
    animation: animateCloud 35s linear infinite;

    -webkit-transform: scale(0.65);
    -moz-transform: scale(0.65);
    transform: scale(0.65);
}

.x2 {
    -webkit-animation: animateCloud 20s linear infinite;
    -moz-animation: animateCloud 20s linear infinite;
    animation: animateCloud 20s linear infinite;

    -webkit-transform: scale(0.3);
    -moz-transform: scale(0.3);
    transform: scale(0.3);
}

.x3 {
    -webkit-animation: animateCloud 30s linear infinite;
    -moz-animation: animateCloud 30s linear infinite;
    animation: animateCloud 30s linear infinite;

    -webkit-transform: scale(0.5);
    -moz-transform: scale(0.5);
    transform: scale(0.5);
}

.x4 {
    -webkit-animation: animateCloud 18s linear infinite;
    -moz-animation: animateCloud 18s linear infinite;
    animation: animateCloud 18s linear infinite;

    -webkit-transform: scale(0.4);
    -moz-transform: scale(0.4);
    transform: scale(0.4);
}

.x5 {
    -webkit-animation: animateCloud 25s linear infinite;
    -moz-animation: animateCloud 25s linear infinite;
    animation: animateCloud 25s linear infinite;

    -webkit-transform: scale(0.55);
    -moz-transform: scale(0.55);
    transform: scale(0.55);
}

/* OBJECTS */

.cloud {
    background: #fff;
    background: -moz-linear-gradient(top,  #fff 5%, #f1f1f1 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(5%,#fff), color-stop(100%,#f1f1f1));
    background: -webkit-linear-gradient(top,  #fff 5%,#f1f1f1 100%);
    background: -o-linear-gradient(top,  #fff 5%,#f1f1f1 100%);
    background: -ms-linear-gradient(top,  #fff 5%,#f1f1f1 100%);
    background: linear-gradient(top,  #fff 5%,#f1f1f1 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fff', endColorstr='#f1f1f1',GradientType=0 );

    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    border-radius: 100px;

    -webkit-box-shadow: 0 8px 5px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0 8px 5px rgba(0, 0, 0, 0.1);
    box-shadow: 0 8px 5px rgba(0, 0, 0, 0.1);

    height: 120px;
    position: relative;
    width: 350px;
}

.cloud:after, .cloud:before {
    background: #fff;
    content: '';
    position: absolute;
    z-indeX: -1;
}

.cloud:after {
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    border-radius: 100px;

    height: 100px;
    left: 50px;
    top: -50px;
    width: 100px;
}

.cloud:before {
    -webkit-border-radius: 200px;
    -moz-border-radius: 200px;
    border-radius: 200px;

    width: 180px;
    height: 180px;
    right: 50px;
    top: -90px;
}`,
        imgClass: 'animal_rock',
        imgSrc: '../../img/animal_rock.png',
        coinCount: 0
    },
    {
        lamp: '.crimelamp',
        light: '.crimelamplight',
        backgroundClass: 'crime-scene',
        lampName: 'crime',
        rowIndex: 2,
        additionalContent: `
<div class="slide-text-wrapper">
    <div class="slide-container">
      <ul class="slide-wrapper">
        <div class="slide original">
          <li>
            <div class="item">
              POLICE&nbsp;LINE
            </div>
          </li>
        </div>
        <div class="slide clone">
          <li>
            <div class="item">
              POLICE&nbsp;LINE
            </div>
          </li>
        </div>
        <div class="slide clone">
          <li>
            <div class="item">
              POLICE&nbsp;LINE
            </div>
          </li>
        </div>
        <div class="slide clone">
          <li>
            <div class="item">
              POLICE&nbsp;LINE
            </div>
          </li>
        </div>
        <div class="slide clone">
          <li>
            <div class="item">
              POLICE&nbsp;LINE
            </div>
          </li>
        </div>
        <div class="slide clone">
          <li>
            <div class="item">
              POLICE&nbsp;LINE
            </div>
          </li>
        </div>
        <div class="slide clone">
          <li>
            <div class="item">
              POLICE&nbsp;LINE
            </div>
          </li>
        </div>
      </ul>
    </div>
  </div>

  <div class="rotated-text-wrapper">
    <div class="rotated-container">
      <ul class="rotated-wrapper">
        <div class="rotated-slide original">
          <li>
            <div class="item">
              POLICE&nbsp;LINE
            </div>
          </li>
        </div>
        <div class="rotated-slide clone">
          <li>
            <div class="item">
              POLICE&nbsp;LINE
            </div>
          </li>
        </div>
        <div class="rotated-slide clone">
          <li>
            <div class="item">
              POLICE&nbsp;LINE
            </div>
          </li>
        </div>
        <div class="rotated-slide clone">
          <li>
            <div class="item">
              POLICE&nbsp;LINE
            </div>
          </li>
        </div>
        <div class="rotated-slide clone">
          <li>
            <div class="item">
              POLICE&nbsp;LINE
            </div>
          </li>
        </div>
        <div class="rotated-slide clone">
          <li>
            <div class="item">
              POLICE&nbsp;LINE
            </div>
          </li>
        </div>
        <div class="rotated-slide clone">
          <li>
            <div class="item">
              POLICE&nbsp;LINE
            </div>
          </li>
        </div>
      </ul>
    </div>
  </div> `,
        additionalCSS: `
* {
  padding: 0;
  margin: 0;
  list-style: none;
  text-decoration: none;
  }
  
  body {
  background-color: rgb(110, 110, 110);
  background-image: linear-gradient(335deg, #000000 23px, transparent 23px),
    linear-gradient(155deg, #000000 23px, transparent 23px),
    linear-gradient(335deg, #000000 23px, transparent 23px),
    linear-gradient(155deg, #000000 23px, transparent 23px);
  background-size: 58px 58px;
  background-position: 0px 2px, 4px 35px, 29px 31px, 34px 6px;
  height: 100vh;
  position: relative;
  overflow: hidden;
  }

  .slide-text-wrapper {
    position: absolute;
    background-color: #ffcd18;
    text-align: center;
    justify-content: center;
    transform: rotate(10deg); 
    top: 47%;
    left: -3%;
    .slide-container {
      text-align: center;
      overflow: hidden;
      background-color: #ffcd18;
      
  
      .slide-wrapper {
        background-color: #ffcd18;
        display: flex;
        flex-wrap: nowrap;
        
      }
      .slide {
        background-color: #ffcd18;
        padding: 0.5em 5em 1.5em 1em;
        text-align: center;
        white-space: nowrap;
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        position: relative;

        &.original {
          animation: 18s linear infinite normal none running infiniteAnimation1;
        }
        &.clone {
          animation: 18s linear infinite infiniteAnimation2;
        }
  
        li {
          margin: 0 1.25rem;
          .item {
            width: max-content;
            height: 100%;
            color: var(--gray-scale-900, #1a1a1a);
            font-size: 2.5rem;
            font-weight: 700;
            text-align: center;
            line-height: 1.875rem;
            padding-top: 20px;
          }
        }
      }
    }
  }
  /* 반대 */
  .rotated-text-wrapper {
    position: absolute;
    background-color: #ffcd18;
    text-align: center;
    justify-content: center;
    transform: rotate(-10deg); 
    top: 35%;
    left: -2%;
  }
  .rotated-container {
    text-align: center;
    overflow: hidden;
    background-color: #ffcd18;
  }
  .rotated-wrapper {
    background-color: #ffcd18;
    display: flex;
    flex-wrap: nowrap;
  }
  .rotated-slide {
    background-color: #ffcd18;
    padding: 0.5em 5em 1.5em 1em;
    text-align: center;
    white-space: nowrap;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    position: relative;
  }
  .rotated-slide.original {
    animation: 18s linear infinite normal none running infiniteAnimation1;
  }
  .rotated-slide.clone {
    animation: 18s linear infinite infiniteAnimation2;
  }
  li {
    margin: 0 1.25rem;
  }
  .item {
    width: max-content;
    height: 100%;
    color: var(--gray-scale-900, #1a1a1a);
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
    line-height: 1.875rem;
    padding-top: 20px;
  }
  @keyframes infiniteAnimation1 {
    0% {
      transform: translateX(0%);
    }
    50% {
      transform: translateX(-100%);
    }
    50.1% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0%);
    }
  }
  @keyframes infiniteAnimation2 {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-200%);
    }
  }`,
        additionalScript: `
function createPoliceLine(id, repeatCount) {
    const policeLine = '&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;';
    document.getElementById(id).innerHTML = policeLine.repeat(repeatCount);
}
createPoliceLine('police-line-1', 50);
createPoliceLine('police-line-2', 50);`,
        imgClass: 'crime_rock',
        imgSrc: '../../img/crime_rock.png',
        coinCount: 0
    },
    {
        lamp: '.timelamp',
        light: '.timelamplight',
        backgroundClass: 'time-scene',
        lampName: 'time',
        rowIndex: 3,
        additionalContent: `
        <canvas id="c"></canvas>`,
        additionalScript: `
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const dotCount = 3000;
const size = 4;
const f = 3;
const dots = [];
let w, h, cX, cY, mD, nX, nY, sX, sY;

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    cX = w / 2;
    cY = h / 2;
    mD = Math.sqrt((cX * cX) + (cY * cY));

    nX = Math.sqrt((w / h * dotCount) + ((w - h) * (w - h) / ((4 * h) * (4 * h)))) - ((w - h) / (2 * h));
    nY = dotCount / nX;
    sX = w / (nX - 1);
    sY = h / (nY - 1);

    for (let i = 0; i < dotCount; i++) {
        const x = sX * (i % nX);
        const y = sY * (i / nX | 0);
        const t = Math.random() * 3000;
        const c = Math.random() * 360 | 0;
        dots[i] = { x, y, oX: x, oY: y, t, c };
    }
}

window.addEventListener('resize', resize);
resize();

function draw(time = 0) {
    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < dotCount; i++) {
        const d = dots[i];
        const t = (d.t + time) * 0.004;
        const a = Math.sin(t);

        const r = Math.floor(255 * Math.random());
        const g = Math.floor(255 * Math.random());
        const b = Math.floor(255 * Math.random());

        if (Math.abs(d.x - d.oX) > f || Math.abs(d.y - d.oY) > f) {
            ctx.fillStyle = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
        } else {
            ctx.fillStyle = 'rgba(0, 255, 1, ' + a + ')';
        }

        ctx.fillRect(d.x, d.y, size, size);
    }
    requestAnimationFrame(draw);
}

draw();`,
        additionalCSS: `
* {
    margin: 0;
    padding: 0;
}

canvas {
    position:absolute;
    display: block;
    background: black;
    box-sizing: border-box;
    height:100%;
}`,
        imgClass: 'time_rock',
        imgSrc: '../../img/time_rock.png',
        coinCount: 0
    },
    {
        lamp: '.spacelamp',
        light: '.spacelamplight',
        backgroundClass: 'space-scene',
        lampName: 'space',
        rowIndex: 4,
        additionalHTML: `
        <div class="shooting-stars"></div>`,
        additionalCSS: `
.shooting-stars {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -1;
}

.space-star {
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
}`,
        additionalScript: `
function createStars() {
    const numberOfStars = 200;
    const container = document.querySelector('.shooting-stars');
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'space-star';
        star.style.left = \`\${Math.random() * 100}%\`;
        star.style.top = \`\${Math.random() * 100}%\`;
        star.style.animationDelay = \`\${Math.random() * 2}s\`;
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
        star.style.animationDelay = \`\${Math.random() * 5}s\`;
        star.style.animationDuration = \`\${2 + Math.random() * 3}s\`;
        container.appendChild(star);
    }
});`,
        imgClass: 'space_rock',
        imgSrc: '../../img/space_rock.png',
        coinCount: 0
    }
];

function initializeCoins() {
    const initialCoins = getCurrentCoins(); // 기존 코인 값을 로드
    setCurrentCoins(initialCoins);
    updateLampCoinCount(initialCoins, -1); // 전체 업데이트
}
