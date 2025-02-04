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
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
class Manager {
    constructor() {
        this.users = [];
    }
    addUser(user) {
        this.users.push(user);
    }
}
function displayMenu() {
    console.log("Please select your choice");
    console.log("1. Login");
    console.log("2. Create new user");
    console.log("0. Exit");
}
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function mainMenu(manager) {
    displayMenu();
    rl.question('Enter your choice: ', (input) => {
        const userChoice = parseInt(input);
        switch (userChoice) {
            case 1:
                console.log("You selected Login.");
                break;
            case 2:
                console.log("You selected Create New User.");
                break;
            case 0:
                console.log("Exiting... Goodbye!");
                rl.close();
                return;
            default:
                console.log("Invalid choice. Please try again.");
        }
        mainMenu(manager);
    });
}
const manager = new Manager();
mainMenu(manager);
//# sourceMappingURL=app.js.map