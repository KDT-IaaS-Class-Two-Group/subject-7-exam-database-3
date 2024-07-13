import { updateCoinCount } from './coinHandlers.js';
import { activeLamp } from './lampHandlers.js';
import { lamps } from '../../vending.js';
import { getCurrentCoins } from './coinState.js';
import { setCurrentCoins } from './coinState.js';
export function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
}

export function dragOver(event) {
    event.preventDefault();
}

export function drop(event) {
    event.preventDefault();
    const id = event.dataTransfer.getData('text/plain');
    const coin = document.getElementById(id);
    if (coin) {
        const activeLampData = lamps.find(({ lamp }) => lamp === activeLamp);
        if (activeLampData) {
            // 드래그한 코인의 값을 가져와 현재 코인에 더합니다.
            const currentCoins = getCurrentCoins();
            const newTotalCoins = currentCoins + 1;
            setCurrentCoins(newTotalCoins);
            console.log('drop newTotalCoins:', newTotalCoins); // newTotalCoins 값 확인
            console.log('drop rowIndex:', lamps.indexOf(activeLampData)); // rowIndex 값 확인
            updateCoinCount(newTotalCoins, activeLampData.rowIndex); // lamps.indexOf(activeLampData)에서 activeLampData.rowIndex로 변경
            coin.parentElement.remove(); // 코인을 드롭한 후 사라지게 합니다.
            console.log(activeLampData.coinCount);
        }
    }
}

export function setDropZoneEventListeners() {
    const dropZone = document.getElementById('drop-zone');
    dropZone.addEventListener('dragover', dragOver);
    dropZone.addEventListener('drop', drop);
}
