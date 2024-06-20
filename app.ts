#! /usr/bin/env node

import inquirer from "inquirer"
import chalk from "chalk"
import {differenceInSeconds} from "date-fns"


console.log("\n")
console.log(chalk.magenta("**************************** COUNTDOWN TIMER ****************************"))
console.log("\n")


const res = await inquirer.prompt([
    {
        name: "userInput",
        type: "number",
        message: chalk.magenta("Enter the Amount of Second"),
        validate: (input) => {
           if (isNaN(input)) {
                return chalk.red("Please enter a valid Amount of Second!");
            }
            else if(input > 60){
                return chalk.red("Seconds must be in 60!");
            }
            else{
                return true;
            }
        } 
    }    
])

let input = res.userInput;

function startTime(val:number){
    const initialTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(initialTime);
    setInterval(() => {
        const currentTime = new Date();
        const timeDifference = differenceInSeconds(intervalTime,currentTime);

        if(timeDifference <= 0){
            console.log("\n")
            console.log(chalk.red("************* Timer has Expired *************"))
            console.log("\n")
            process.exit()
        }

        const minute = Math.floor((timeDifference % (3600 * 24) / 3600));
        const second = Math.floor(timeDifference % 60)

        console.log(chalk.yellow(`${minute.toString().padStart(2,"0")} : ${second.toString().padStart(2,"0")}`));
    },1000);
}

startTime(input);

