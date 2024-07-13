let currentCoins = 0;

export function getCurrentCoins() {
    return currentCoins;
}

export function setCurrentCoins(amount) {
    currentCoins = amount;
}

export function addCoins(amount) {
    currentCoins += amount;
    if (currentCoins < 0) {
        currentCoins = 0;
    }
}

export function resetCoins() {
    currentCoins = 0;
}
