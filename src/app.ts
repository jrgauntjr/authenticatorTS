import * as readline from 'readline';

type Credentials = [string, string]; // Username and Password

// User interface
interface User{
    credentials: Credentials; // Username and Password
    id: number;
}

// The manager class
class Manager{

    // User Storage via Array
    private users: User[] = [];

    // Adds user to the list
    addUser(user: User): void {
        this.users.push(user);
    }

    // Deletes user from the list
    deleteUser(username: string): boolean {

        // Check if username exists, if not return false
        const index = this.users.findIndex(user => user.credentials[0] === username);
        if (index !== -1){
            this.users.splice(index, 1);
            return true;
        }
        else{
            return false;
        }
    }

    // Checks if username and password are correct
    checkUser(username: string, password: string): boolean {
        return this.users.some(user => user.credentials[0] === username && user.credentials[1] === password);
    }

    // Check if username is used
    isUsernameTaken(username: string): boolean{
        return this.users.some(user => user.credentials[0] === username);
    }
}

// Displaying the main menu function
function displayMenu(): void{
    console.log("Please select your choice");
    console.log("1. Login");
    console.log("2. Create new user");
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

    // Display the menu and ask the user to choose
    displayMenu();
    const choice = await askQuestion('Choose an option: ');

    // Choice logic
    switch (choice) {

      // Login
      case '1':
        await login(manager);
        break;

      // Create a user
      case '2':
        await createUser(manager);
        break;

      // Exit Program
      case '0':
        console.log('Exiting...');
        rl.close(); // Close the readline interface
        return; // Exit the loop

      // If the user doesn't put 0, 1 or 2
      default:
        console.log('Invalid choice. Please try again.');
    }
  
    // Call mainMenu again for the next input
    mainMenu(manager);
}

// Login function
async function login(manager: Manager): Promise<Manager> {

    // Askign for username and password, clearing console for privacy reasons
    const username = await askQuestion('Enter your username: ');
    console.clear();
    const password = await askQuestion('Enter your password: ');
    console.clear();

    // See if the information is valid, if not, send back to main menu
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

    // Display the menu and ask the user to choose
    displayUserMenu();
    const choice = await askQuestion('Please select an option ' + username + '! ');

    // Choice logic
    switch(choice){

        // Delete user
        case '1':
            await deleteUser(username, manager);
            break;
        
        // Log out
        case '2':
            console.clear();
            console.log("Logging out....");
            break;
    }
    return manager;
}

// User Deletion function
async function deleteUser(username: string, manager: Manager): Promise<Manager> {

    // Ask for the user's password and check if it's correct
    const password = await askQuestion("Hi " + username + "! Please enter your password: ")
    const valid = manager.checkUser(username, password);

    // If valid, delete the user, if not, tell the user the information is wrong
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
    // Ask for a username and see if it's available
    const newUsername = await askQuestion('Create a username: ');
    const valid = manager.isUsernameTaken(newUsername);

    // If the username is available, create a password and store it in the user base
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

    // If the username isn't available, then tell the user to try again with a different username
    else{
        console.clear();
        console.log("Sorry, that username is unavailable, please try again with a different username");
    }
    return manager;
}

// Make a new manager and start the mainMenu function
const manager = new Manager();
mainMenu(manager);


    



