import * as readline from 'readline';

type Credentials = [string, string]; // Username and Password

interface User{
    credentials: Credentials; // Username and Password
    id: number;
}

// The manager class
class Manager{
    private users: User[] = [];

    addUser(user: User): void {
        this.users.push(user);
    }
    deleteUser(username: string): boolean {
        const index = this.users.findIndex(user => user.credentials[0] === username);
        if (index !== -1){
            this.users.splice(index, 1);
            return true;
        }
        else{
            return false;
        }
    }
    checkUser(username: string, password: string): boolean {
        return this.users.some(user => user.credentials[0] === username && user.credentials[1] === password);
    }
    isUsernameTaken(username: string): boolean{
        return this.users.some(user => user.credentials[0] === username);
    }
    displayUsers(){
        console.log(this.users);
    }
}

// Displaying the main menu function
function displayMenu(): void{
    console.log("Please select your choice");
    console.log("1. Login");
    console.log("2. Create new user");
    console.log("3. See all users (DEBUG)");
    console.log("0. Exit")
}

// Displaying the user management menu function
function displayUserMenu(): void{
    console.log("Authentication Sucessful!");
    console.log("Welcome! What would you like to do with your account?");
    console.log("1. Delete");
    console.log("2. Logout");
}

// Global readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
  
// Reusable input function
const askQuestion = (query: string): Promise<string> => {
   return new Promise((resolve) => {
     rl.question(query, (answer) => resolve(answer));
   });
};

// Main Menu function
async function mainMenu(manager: Manager): Promise<void> {
    displayMenu();
    const choice = await askQuestion('Choose an option: ');
    switch (choice) {
      case '1':
        await login(manager);
        break;
      case '2':
        await createUser(manager);
        break;
      case '3':
        console.log(manager.displayUsers())
        break;
      case '0':
        console.log('Exiting...');
        rl.close(); // Close the readline interface
        return; // Exit the loop
      default:
        console.log('Invalid choice. Please try again.');
    }
  
    // Call mainMenu again for the next input
    mainMenu(manager);
}

// Login function
async function login(manager: Manager): Promise<Manager> {
    const username = await askQuestion('Enter your username: ');
    console.clear();
    const password = await askQuestion('Enter your password: ');
    console.clear();
    const valid = manager.checkUser(username, password);
    if (valid){
        console.clear();
        await manageUser(username, manager);
    }
    else{
        console.clear();
        console.log("We couldn't verify your information, please try again.");
    }
    return manager;
  
}

// User Management function
async function manageUser(username: string, manager: Manager): Promise<Manager> {
    displayUserMenu();
    const choice = await askQuestion('Please select an option ' + username + '! ');
    switch(choice){
        case '1':
            await deleteUser(username, manager);
            break;
        case '2':
            console.clear();
            console.log("Logging out....");
            break;
    }
    return manager;
}

// User Deletion function
async function deleteUser(username: string, manager: Manager): Promise<Manager> {
    const password = await askQuestion("Hi " + username + "! Please enter your password: ")
    const valid = manager.checkUser(username, password);
    if (valid){
        manager.deleteUser(username);
        console.clear();
    }
    else{
        console.clear();
        console.log("We couldn't verify your information, please try again.");
    }
    return manager;
}

// User Creation function
async function createUser(manager: Manager): Promise<Manager> {
    const newUsername = await askQuestion('Create a username: ');
    const valid = manager.isUsernameTaken(newUsername);
    if (!valid){
        console.clear();
        const newPassword = await askQuestion('Create a password: ');
        console.clear();
        const newUser: User = {
            credentials: [newUsername, newPassword],
            id: Date.now()
        };
        manager.addUser(newUser);
        return manager;
    }
    else{
        console.clear();
        console.log("Sorry, that username is unavailable, please try again with a different username");
    }
    return manager;
}

// Make a new manager and start the mainMenu function
const manager = new Manager();
mainMenu(manager);


    



