"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextTick = void 0;
function nextTick() {
    return new Promise(resolve => setTimeout(resolve, 0));
}
exports.nextTick = nextTick;
//# sourceMappingURL=nextTick.js.map