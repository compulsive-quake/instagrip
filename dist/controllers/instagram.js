"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const instagram_private_api_1 = require("instagram-private-api");
const queue = __importStar(require("./queue"));
function cookieSave(username, data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queue.write('instagram:cookies', username, data);
    });
}
function cookieExists() {
    // here you would check if the data exists
    return false;
}
function cookieLoad() {
    // here you would load the data
    return '';
}
function getAccounts() {
    return __awaiter(this, void 0, void 0, function* () {
        const accounts = yield queue.all('instagram:cookies');
        console.log(accounts);
    });
}
function login(username, password, proxyUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const ig = new instagram_private_api_1.IgApiClient();
        ig.state.generateDevice(username);
        if (proxyUrl) {
            ig.state.proxyUrl = proxyUrl;
        }
        ig.request.end$.subscribe(() => __awaiter(this, void 0, void 0, function* () {
            const serialized = yield ig.state.serialize();
            delete serialized.constants;
            yield cookieSave(username, serialized);
        }));
        yield ig.account.login(username, password);
    });
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
//# sourceMappingURL=instagram.js.map