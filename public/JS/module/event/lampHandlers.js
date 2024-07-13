import { getCurrentCoins, setCurrentCoins, addCoins } from './coinState.js';
import { updateCoinCount as updateLampCoinCount } from './coinHandlers.js';
import { dragStart, setDropZoneEventListeners } from './dragDropHandlers.js';
import { createStars, setCloudAnimation, updateBinaryText } from './animations.js';
import { getRandomInt } from './helpers.js';
import { lamps } from '../../vending.js';

export let activeLamp = null;
let styleElements = [];
const starLimit = 20;
const main = document.querySelector('main');
const initialContent = main.innerHTML;
const initialClassName = main.className;
let initialProductsHTML = '';
let coinDisplay = document.getElementById('coin-display');
let currentCoins = 0;
let deletedProducts = [];
let lampCoins = {};
let productState = {};

function saveLampCoins() {
    localStorage.setItem('lampCoins', JSON.stringify(lampCoins));
}

function loadLampCoins() {
    const savedCoins = localStorage.getItem('lampCoins');
    if (savedCoins) {
        lampCoins = JSON.parse(savedCoins);
    }
}

function clearLampCoins() {
    lampCoins = {}; // 램프 코인 초기화
    localStorage.removeItem('lampCoins'); // 로컬 스토리지에서 삭제
}

function initializeProductState() {
    lamps.forEach((lamp, lampIndex) => {
        const products = document.querySelectorAll(`.products .row:nth-child(${lamp.rowIndex + 1}) .can`);
        products.forEach((product, productIndex) => {
            const productId = `lamp${lampIndex + 1}-product${productIndex + 1}`;
            if (productState[productId] === undefined) {
                productState[productId] = true; // true는 상품이 보이는 상태를 의미
            }
        });
    });
    loadProductState(); // 로컬 스토리지에서 상품 상태를 로드
    updateAllProductVisibility(); // 모든 램프에 대해 상품 가시성 업데이트
}

function loadProductState() {
    const savedState = localStorage.getItem('productState');
    if (savedState) {
        productState = JSON.parse(savedState);
    }
}

function saveProductState() {
    localStorage.setItem('productState', JSON.stringify(productState));
}

function updateAllProductVisibility() {
    lamps.forEach((lampData, lampIndex) => {
        const products = document.querySelectorAll(`.products .row:nth-child(${lampData.rowIndex + 1}) .can`);
        products.forEach((product, index) => {
            const productId = `lamp${lampIndex + 1}-product${index + 1}`;
            if (!productState[productId]) {
                product.style.visibility = 'hidden'; // 상품 숨김
            }
        });
    });
}

// 초기 .products 요소의 HTML을 저장
function saveInitialProductsHTML() {
    const productsElement = document.querySelector('.products');
    if (productsElement) {
        initialProductsHTML = productsElement.innerHTML;
    }
}

// .products 요소를 초기 상태로 복원
function restoreProductsHTML() {
    const productsElement = document.querySelector('.products');
    if (productsElement) {
        productsElement.innerHTML = initialProductsHTML;
    }
}

export function resetLampImages(lamps) {
    lamps.forEach(({ light, imgClass }) => {
        const lightElement = document.querySelector(light);
        if (lightElement) {
            lightElement.style.display = 'none';
        }
        const starsContainer = document.getElementById('stars-container');
        if (starsContainer) {
            starsContainer.innerHTML = '';
            starsContainer.style.opacity = 0;
        }
        const lampElement = document.querySelector(imgClass);
        if (lampElement) {
            lampElement.src = '';
        }
    });
}

export function handleLampClick(lampData, lamps, lampIndex) {
    const { lamp, light, backgroundClass, additionalContent, backgroundImage, additionalScript, additionalCSS, additionalHTML, imgClass, imgSrc, rowIndex } = lampData;
    const lightElement = document.querySelector(light);

    console.log('Lamp clicked:', lampData);
    console.log('lightElement:', lightElement);
    console.log('imgClass:', imgClass, 'imgSrc:', imgSrc);

    // Click 이벤트 중복 방지
    if (activeLamp === lamp) {
        lightElement.style.display = 'none';
        main.classList.remove(backgroundClass);
        main.style.backgroundImage = '';
        resetMainContent(lamps);
        activeLamp = null;
        setCurrentCoins(0); // 처음 시작화면에서는 코인을 0으로 유지
        updateLampCoinCount(0, -1);
    } else {
        if (activeLamp) {
            const activeLampData = lamps.find(({ lamp }) => lamp === activeLamp);
            lampCoins[activeLamp] = getCurrentCoins();
            saveLampCoins(); // 로컬 스토리지에 저장
            document.querySelector(activeLampData.light).style.display = 'none';
            resetMainContent(lamps);
        }

        requestAnimationFrame(() => {
            lightElement.style.display = 'block';

            if (backgroundClass) {
                main.classList.add(backgroundClass);
            }
            if (backgroundImage) {
                main.style.backgroundImage = `url(${backgroundImage})`;
            }

            if (additionalContent) {
                if (!document.getElementById('c')) {
                    main.insertAdjacentHTML('beforeend', additionalContent);
                } else {
                    console.warn('Canvas with id "c" already exists.');
                }
            }
            if (additionalHTML) {
                main.insertAdjacentHTML('beforeend', additionalHTML);
            }
            if (additionalScript) {
                const existingScript = document.getElementById(`${lamp}-script`);
                if (existingScript) {
                    document.body.removeChild(existingScript);
                }
                const scriptElement = document.createElement('script');
                scriptElement.id = `${lamp}-script`;
                scriptElement.innerHTML = `
                    (function() {
                        try {
                            ${additionalScript}
                        } catch (e) {
                            console.error(e);
                        }
                    })();
                `;
                document.body.appendChild(scriptElement);
            }
            if (additionalCSS) {
                const styleElement = document.createElement('style');
                styleElement.innerHTML = additionalCSS;
                document.head.appendChild(styleElement);
                styleElements.push(styleElement);
            }

            activeLamp = lamp;

            const newCoins = lampCoins[lamp] || 0;
            setCurrentCoins(newCoins);
            updateLampCoinCount(newCoins, lampIndex);
            updatePriceTagsBasedOnCoins(newCoins, lampIndex); // 텍스트 색상 업데이트

            if (backgroundClass === 'animal-scene') {
                setCloudAnimation();
            }

            if (backgroundClass === 'time-scene') {
                updateBinaryText();
            }

            if (backgroundClass === 'space-scene') {
                createStars();
            }

            const starsContainer = document.getElementById('stars-container');
            if (imgClass && imgSrc && starsContainer) {
                console.log('Creating stars for:', imgClass);
                starsContainer.innerHTML = '';
                starsContainer.style.opacity = 1;

                for (let i = 0; i < starLimit; i++) {
                    const star = document.createElement('div');
                    star.className = 'star';
                    const coinId = `coin-${imgClass}-${i}`;
                    star.innerHTML = `<img draggable="true" id="${coinId}" data-message="This is coin ${i} from ${imgClass}" class="${imgClass}" src="${imgSrc}" alt="">`;

                    const endY = getRandomInt(90, 90);
                    const endX = getRandomInt(10, 90);
                    const rotateAngle = getRandomInt(-90, 90);

                    star.style.transform = `translateY(${endY}vh) translateX(${endX}vw) rotate(${rotateAngle}deg)`;
                    star.style.transition = 'transform 5s ease-in-out';

                    star.querySelector('img').addEventListener('dragstart', dragStart);

                    starsContainer.appendChild(star);
                }
            }
            setDropZoneEventListeners();

            coinDisplay = document.getElementById('coin-display');
            console.log('coinDisplay:', coinDisplay);
            console.log('coinCount:', lampData.coinCount);
            updateLampCoinCount(getCurrentCoins(), lampIndex);

            const products = document.querySelectorAll(`.products .row:nth-child(${lampData.rowIndex + 1}) .can`);
            products.forEach((product, index) => {
                product.addEventListener('click', () => showAlert(product, getCurrentCoins(), lampIndex + 1, index + 1));
            });

            if (lamp === '.radiationlamp') {
                updatePriceTagsBasedOnCoins(getCurrentCoins(), lampIndex);
            }
        });
    }
}

export function attachLampEventListeners(lamps) {
    initializeProductState();
    lamps.forEach((lampData, index) => {
        const lampElement = document.querySelector(lampData.lamp);
        lampElement.addEventListener('click', () => handleLampClick(lampData, lamps, index));
    });
}

export function resetMainContent(lamps) {
    main.className = initialClassName;
    main.innerHTML = initialContent;
    main.style.backgroundImage = '';
    restoreProductsHTML(); // .products 요소 복원
    styleElements.forEach(styleElement => {
        document.head.removeChild(styleElement);
    });
    styleElements = [];
    attachLampEventListeners(lamps);
    coinDisplay = document.getElementById('coin-display');
    console.log('resetMainContent coinDisplay:', coinDisplay);
    if (activeLamp) {
        updateLampCoinCount(getCurrentCoins(), activeLamp.rowIndex);
    } else {
        updateLampCoinCount(0, -1); // 코인 초기화
    }
    updateDeletedProducts(); // 삭제된 상품 복원
    resetPriceTags(); // 텍스트 색상 초기화
    console.log('Called updateDeletedProducts on lamp change'); // 로그 추가
    if (activeLamp) {
        const lampIndex = lamps.findIndex(lamp => lamp.lamp === activeLamp);
        updatePriceTagsBasedOnCoins(getCurrentCoins(), lampIndex); // 텍스트 색상 업데이트
    }
}

const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.attributeName === 'class') {
            lamps.forEach(({ light, backgroundClass }) => {
                const lightElement = document.querySelector(light);
                if (main.classList.contains(backgroundClass)) {
                    lightElement.style.display = 'block';
                    console.log(`MutationObserver: Light element ${light} display set to block`);
                } else {
                    lightElement.style.display = 'none';
                    console.log(`MutationObserver: Light element ${light} display set to none`);
                }
            });
        }
    });
});

observer.observe(main, { attributes: true });

function updatePriceTagsBasedOnCoins(coins, lampIndex) {
    const products = document.querySelectorAll(`.products .row:nth-child(${lamps[lampIndex].rowIndex + 1}) .label`);
    products.forEach((priceTag) => {
        const coinValue = parseInt(priceTag.textContent.match(/\d+/)[0], 10);
        if (coinValue <= coins) {
            // priceTag.style.color = 'red';
        } else {
            priceTag.style.color = '';
        }
    });
}

function resetPriceTags() {
    const products = document.querySelectorAll('.products .label');
    products.forEach((priceTag) => {
        priceTag.style.color = '';
    });
}

function isProductDeleted(productId) {
    const deletedProducts = JSON.parse(localStorage.getItem('deletedProducts')) || [];
    return deletedProducts.includes(productId);
}

// 상품 삭제 함수
function deleteProduct(productId) {
    if (!productId) {
        console.error('Invalid productId:', productId); // 추가된 로그
        return;
    }
    console.log('Before adding:', deletedProducts); // 로그 추가
    if (!deletedProducts.includes(productId)) {
        deletedProducts.push(productId);
    }
    console.log('After adding:', deletedProducts); // 로그 추가
    const productElement = document.querySelector(`.can[data-product-id="${productId}"]`);
    if (productElement) {
        productElement.style.visibility = 'hidden';
        console.log(`Product ${productId} deleted and hidden`); // 로그 추가
    }
    saveDeletedProducts(); // 로컬 스토리지에 저장
}

function saveDeletedProducts() {
    localStorage.setItem('deletedProducts', JSON.stringify(deletedProducts));
}

function updateDeletedProducts() {
    console.log('Updating deleted products:', deletedProducts); // 로그 추가
    deletedProducts.forEach(productId => {
        if (productId) {
            const productElement = document.querySelector(`.can[data-product-id="${productId}"]`);
            if (productElement) {
                productElement.style.visibility = 'hidden';
                console.log(`Product ${productId} hidden`); // 로그 추가
            }
        } else {
            console.error('Invalid productId in deletedProducts:', productId); // 추가된 로그
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    saveInitialProductsHTML(); // 초기 .products HTML 저장
    clearLampCoins(); // 페이지 로드 시 램프 코인 초기화
    loadLampCoins(); // 로컬 스토리지에서 램프 코인 로드
    initializeProductState(); // 상품 상태 초기화 및 로드
    updateDeletedProducts(); // 페이지 로드 시 삭제된 상품을 복원
    console.log('Called updateDeletedProducts on page load'); // 로그 추가
    // attachLampEventListeners(lamps); // 램프 이벤트 리스너 설정

    // 페이지 로드 시 코인 초기화
    setCurrentCoins(0);
    updateCoinDisplay(0);
    resetPriceTags(); // 텍스트 색상 초기화
    if (activeLamp) {
        const lampIndex = lamps.findIndex(lamp => lamp.lamp === activeLamp);
        updatePriceTagsBasedOnCoins(0, lampIndex); // 텍스트 색상 업데이트
    }
});

document.querySelectorAll('.products .can').forEach((product, index) => {
    product.addEventListener('click', () => {
        const productId = product.getAttribute('data-product-id');
        const lampType = activeLamp.replace('.', ''); // '.radiationlamp' -> 'radiationlamp'
        const lampNames = ['animal', 'crime', 'radiation', 'time', 'space'];
        const lampName = lampNames.find(name => lampType.includes(name));

        console.log('Product clicked:', productId); // 추가된 로그
        showAlert(product, getCurrentCoins(), lampName, index + 1); // lampName과 productIndex를 전달
    });
});

function showAlert(product, coinCount, lampName, productIndex) {
    const productCoinValue = parseInt(product.querySelector('.label').textContent.match(/\d+/)[0], 10);
  
    fetch(`/api/products/${lampName}?id=${productIndex}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log('Product data fetched from server:', data); // 서버에서 받아온 데이터 출력
        const productData = data.product;
        const alertContainer = document.getElementById('alert-container');
        const alertMessage = document.getElementById('alert-message');
  
        if (coinCount < productData.price) {
          alertMessage.textContent = `구매할 수 없습니다. 코인이 부족합니다.\n필요한 코인: ${productData.price}\n현재 코인: ${coinCount}`;
        } else {
          alertMessage.innerHTML = `
            <p>상품: ${productData.productName}</p>
            <p>설명: ${productData.description}</p>
            <p>구매하시겠습니까?</p>
          `;
        }
  
        alertContainer.classList.remove('hidden');
        alertContainer.classList.add('visible');
  
        const yesButton = document.getElementById('yes-button');
        const noButton = document.getElementById('no-button');
  
        // 기존 이벤트 핸들러 제거
        yesButton.replaceWith(yesButton.cloneNode(true));
        noButton.replaceWith(noButton.cloneNode(true));
  
        // 새로운 이벤트 핸들러 설정
        document.getElementById('yes-button').onclick = () => {
          if (coinCount >= productData.price) {
            const newCoins = coinCount - productData.price;
            setCurrentCoins(newCoins); // 코인 상태 업데이트
            updateCoinDisplay(newCoins); // 코인 디스플레이 업데이트
            updatePriceTagsBasedOnCoins(newCoins, lamps.findIndex(lamp => lamp.lamp === activeLamp)); // 가격 태그 업데이트
  
            // 로컬 스토리지에 램프 코인 상태 저장
            lampCoins[activeLamp] = newCoins;
            saveLampCoins();
  
            alertContainer.classList.remove('visible');
            alertContainer.classList.add('hidden');
            product.style.visibility = 'hidden'; // 상품을 숨깁니다.
  
            // 상품 삭제 로직 추가
            deleteProduct(product.dataset.productId);
  
            // 서버로 구매 정보 전송
            fetch('http://localhost:3500/api/purchase', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                productName: productData.productName // id 제거
              })
            }).then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
              }
              return response.json();
            }).then(data => {
              console.log('Purchase saved to purchase table:', data);
            }).catch(error => {
              console.error('Error saving purchase:', error);
            });
          } else {
            alertContainer.classList.remove('visible');
            alertContainer.classList.add('hidden');
          }
        };
  
        document.getElementById('no-button').onclick = () => {
          alertContainer.classList.remove('visible');
          alertContainer.classList.add('hidden');
        };
      })
      .catch(error => {
        const alertContainer = document.getElementById('alert-container');
        const alertMessage = document.getElementById('alert-message');
        alertMessage.textContent = `Error: ${error.message}`;
        alertContainer.classList.remove('hidden');
        alertContainer.classList.add('visible');
      });
  }
  

function updateCoinDisplay(coins) {
    if (coinDisplay) {
        coinDisplay.textContent = `${coins} COIN`;
    }
}

// 코인 추가 기능을 구현하는 예제 함수
function addCoin(amount) {
    addCoins(amount);
    const currentCoins = getCurrentCoins();
    if (activeLamp) {
        lampCoins[activeLamp] = currentCoins;
        saveLampCoins(); // 코인 상태 저장
    }
    updateLampCoinCount(currentCoins, -1); // 전체 업데이트
    updatePriceTagsBasedOnCoins(currentCoins, lamps.findIndex(lamp => lamp.lamp === activeLamp)); // 텍스트 색상 업데이트
}

// 드롭존 이벤트 리스너 설정을 호출
setDropZoneEventListeners();
