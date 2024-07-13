// eventListeners.js
import { attachLampEventListeners } from './lampHandlers.js';

export function addEventListeners(lamps) {
    document.addEventListener('DOMContentLoaded', function () {
        attachLampEventListeners(lamps);
    });
}
