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
exports.init = exports.addAccount = void 0;
const instagram_private_api_1 = require("instagram-private-api");
const redisController = __importStar(require("./redisController"));
function cookieSave(username, data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield redisController.put('instagram:cookies', username, data);
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
        const accounts = yield redisController.getAll('instagram:accounts');
        return accounts;
    });
}
function addAccount(account) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = account;
        if (!username) {
            throw new Error('empty username');
        }
        if (!password) {
            throw new Error('empty password');
        }
        yield redisController.put('instagram:accounts', username, { username, password });
        const ig = new instagram_private_api_1.IgApiClient();
        ig.state.generateDevice(username);
        ig.request.end$.subscribe(() => __awaiter(this, void 0, void 0, function* () {
            const serialized = yield ig.state.serialize();
            delete serialized.constants;
            yield cookieSave(username, serialized);
        }));
        yield ig.account.login(username, password);
    });
}
exports.addAccount = addAccount;
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        getAccounts();
    });
}
exports.init = init;
//# sourceMappingURL=instagramController.js.map