import { getCurrentCoins, setCurrentCoins, addCoins } from './coinState.js';

export function updateCoinCount(amount, rowIndex) {
    setCurrentCoins(amount); // currentCoins 값을 설정
    const coinDisplay = document.getElementById('coin-display'); // coinDisplay 요소 참조
    console.log('updateCoinCount coinDisplay:', coinDisplay); // coinDisplay 참조 확인
    console.log('updateCoinCount amount:', amount); // amount 값 확인
    if (coinDisplay) {
        coinDisplay.textContent = `${amount || 0} COIN`; // amount가 undefined일 경우 0으로 설정
    } else {
        console.error('coinDisplay element not found');
    }
    updateActiveProducts(amount || 0, rowIndex); // amount가 undefined일 경우 0으로 설정
}

function updateActiveProducts(coinCount, rowIndex) {
    if (typeof rowIndex !== 'number' || rowIndex < 0) {
        console.error('Invalid rowIndex:', rowIndex);
        return;
    }

    console.log('updateActiveProducts rowIndex:', rowIndex); // rowIndex 값 확인
    console.log('updateActiveProducts coinCount:', coinCount); // coinCount 값 확인
    
    const rowSelector = `.products .row:nth-child(${rowIndex + 1}) .can .label`;
    const products = document.querySelectorAll(rowSelector);
    products.forEach((product) => {
        const productCoinValue = parseInt(product.textContent.match(/\d+/)[0], 10); // 상품의 코인 값을 읽어옴
        console.log('Product coin value:', productCoinValue); // 상품 코인 값 확인
        if (productCoinValue <= coinCount) {
            product.style.color = 'red'; // 활성화된 상품의 가격 텍스트 색 변경
        } else {
            product.style.color = ''; // 원래 색으로 복원
        }
    });
}
