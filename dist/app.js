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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const readline = __importStar(require("readline"));
class Manager {
    constructor() {
        this.users = [];
    }
    addUser(user) {
        this.users.push(user);
    }
    deleteUser(username) {
        const index = this.users.findIndex(user => user.credentials[0] === username);
        if (index !== -1) {
            this.users.splice(index, 1);
            return true;
        }
        else {
            return false;
        }
    }
    checkUser(username, password) {
        return this.users.some(user => user.credentials[0] === username && user.credentials[1] === password);
    }
    isUsernameTaken(username) {
        return this.users.some(user => user.credentials[0] === username);
    }
    displayUsers() {
        console.log(this.users);
    }
}
function displayMenu() {
    console.log("Please select your choice");
    console.log("1. Login");
    console.log("2. Create new user");
    console.log("3. See all users (DEBUG)");
    console.log("0. Exit");
}
function displayUserMenu() {
    console.log("Authentication Sucessful!");
    console.log("Welcome! What would you like to do with your account?");
    console.log("1. Delete");
    console.log("2. Logout");
}
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const askQuestion = (query) => {
    return new Promise((resolve) => {
        rl.question(query, (answer) => resolve(answer));
    });
};
function mainMenu(manager) {
    return __awaiter(this, void 0, void 0, function* () {
        displayMenu();
        const choice = yield askQuestion('Choose an option: ');
        switch (choice) {
            case '1':
                yield login(manager);
                break;
            case '2':
                yield createUser(manager);
                break;
            case '3':
                console.log(manager.displayUsers());
                break;
            case '0':
                console.log('Exiting...');
                rl.close();
                return;
            default:
                console.log('Invalid choice. Please try again.');
        }
        mainMenu(manager);
    });
}
function login(manager) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = yield askQuestion('Enter your username: ');
        console.clear();
        const password = yield askQuestion('Enter your password: ');
        console.clear();
        const valid = manager.checkUser(username, password);
        if (valid) {
            console.clear();
            yield manageUser(username, manager);
        }
        else {
            console.clear();
            console.log("We couldn't verify your information, please try again.");
        }
        return manager;
    });
}
function manageUser(username, manager) {
    return __awaiter(this, void 0, void 0, function* () {
        displayUserMenu();
        const choice = yield askQuestion('Please select an option ' + username + '! ');
        switch (choice) {
            case '1':
                yield deleteUser(username, manager);
                break;
            case '2':
                console.clear();
                console.log("Logging out....");
                break;
        }
        return manager;
    });
}
function deleteUser(username, manager) {
    return __awaiter(this, void 0, void 0, function* () {
        const password = yield askQuestion("Hi " + username + "! Please enter your password: ");
        const valid = manager.checkUser(username, password);
        if (valid) {
            manager.deleteUser(username);
            console.clear();
        }
        else {
            console.clear();
            console.log("We couldn't verify your information, please try again.");
        }
        return manager;
    });
}
function createUser(manager) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUsername = yield askQuestion('Create a username: ');
        const valid = manager.isUsernameTaken(newUsername);
        if (!valid) {
            console.clear();
            const newPassword = yield askQuestion('Create a password: ');
            console.clear();
            const newUser = {
                credentials: [newUsername, newPassword],
                id: Date.now()
            };
            manager.addUser(newUser);
            return manager;
        }
        else {
            console.clear();
            console.log("Sorry, that username is unavailable, please try again with a different username");
        }
        return manager;
    });
}
const manager = new Manager();
mainMenu(manager);
//# sourceMappingURL=app.js.map