#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const appLink = "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple";
let fetchData = async (data) => {
    let fetchQuiz = await fetch(data);
    let res = await fetchQuiz.json();
    return res.results;
};
let data = await fetchData(appLink);
let startQuiz = async () => {
    let score = 0;
    //
    let ask;
    while (!ask || !ask.fname.trim()) {
        ask = await inquirer.prompt([
            {
                name: "fname",
                type: "input",
                message: `${chalk.blue.bold(`Please Enter Your Name`)}`,
                transformer: (input, answers, flags) => {
                    return chalk.green(input); // Change the input color
                }
            }
        ]);
        if (!ask.fname.trim()) {
            console.log('Name cannot be empty. Please enter your name.');
        }
    }
    for (let i = 0; i < data.length; i++) {
        let answers = [...data[i].incorrect_answers, data[i].correct_answer];
        let ans = await inquirer.prompt([
            {
                name: "quiz",
                type: "list",
                message: data[i].question,
                choices: answers.map((val) => val)
            }
        ]);
        if (ans.quiz == data[i].correct_answer) {
            score++;
            console.log(chalk.bold.italic.yellowBright("Correct"));
        }
        else {
            console.log(`Correct answer is ${chalk.bold.italic.red(data[i].correct_answer)}`);
        }
    }
    console.log(`Dear ${chalk.green.bold.italic(ask.fname)} Your Score is ${chalk.bold.yellowBright(score)}`);
};
startQuiz();
