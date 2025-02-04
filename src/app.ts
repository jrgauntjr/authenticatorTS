import * as readline from 'readline';

interface User{
    username: string;
    password: string;
    id: number;
}


class Manager{
    private users: User[] = [];

    addUser(user: User): void {
        this.users.push(user);
    }
}

function displayMenu(): void{
    console.log("Please select your choice");
    console.log("1. Login");
    console.log("2. Create new user");
    console.log("0. Exit")
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function mainMenu(manager: Manager): void {
    displayMenu();
    rl.question('Enter your choice: ', (input: string) => {
      const userChoice = parseInt(input); // Convert input to a number
  
      switch (userChoice) {
        case 1:
          console.log("You selected Login.");
          break;
        case 2:
          console.log("You selected Create New User.");
          break;
        case 0:
          console.log("Exiting... Goodbye!");
          rl.close(); // Close readline interface
          return; // Exit the function to stop recursion
        default:
          console.log("Invalid choice. Please try again.");
      }
  
      // Call mainMenu again for the next input
      mainMenu(manager);
    });
  }

const manager = new Manager();
mainMenu(manager);


    



