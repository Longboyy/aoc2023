import fs from "fs";

function part1(){
    const fileInput = fs.readFileSync("res/day1/input.txt", "utf8");
    let sum = 0;
    let iter = 0;
    for(const line of fileInput.split("\n")){
        if(line === ""){
            continue;
        }

        iter++;
        const digits = line.match(/\d/g);
        if(digits == null){
            console.log(`Digits should not be null(${iter}): ${line}`);
            continue;
        }

        if(digits.length === 1){
            sum += parseInt(`${digits[0]}${digits[0]}`);
        }else{
            sum += parseInt(`${digits[0]}${digits[digits.length-1]}`);
        }
    }

    console.log(`Total sum: ${sum}`);
}

function part2(){

    const lookupTable = {
        "one": 1,
        "two": 2,
        "three": 3,
        "four": 4,
        "five": 5,
        "six": 6,
        "seven": 7,
        "eight": 8,
        "nine": 9,
    }

    const realParseInt = (s: string) => {
        let num = parseInt(s);
        if(isNaN(num)){
            return lookupTable[s];
        }else{
            return num;
        }
    }


    const fileInput = fs.readFileSync("res/day1/james.txt", "utf8");
    let sum = 0;
    let iter = 0;
    for(const line of fileInput.split("\n")){
        if(line === ""){
            continue;
        }

        iter++;
        const digits = line.match(/\d|one|two|three|four|five|six|seven|eight|nine/g);
        if(digits == null){
            console.log(`Digits should not be null(${iter}): ${line}`);
            continue;
        }

        if(digits.length === 1){
            sum += parseInt(`${realParseInt(digits[0])}${realParseInt(digits[0])}`);
        }else{
            sum += parseInt(`${realParseInt(digits[0])}${realParseInt(digits[digits.length-1])}`);
        }
    }

    console.log(`Total sum: ${sum}`);
}

export default function init(){
    part2();
}