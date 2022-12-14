"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.system = exports.error = void 0;
function error(msg, err) {
    console.error(msg);
    console.error(err);
}
exports.error = error;
function system(msg) {
    console.log(msg);
}
exports.system = system;
//# sourceMappingURL=logController.js.map