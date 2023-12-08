import fs from "fs";

const LIMITS = {
    "green": 13,
    "red": 12,
    "blue": 14
}

function parseGames(){
    const fileInput = fs.readFileSync("res/day2/input.txt", "utf8");
    const lines = fileInput.split("\n").filter(l => l !== "");
    const output = [];
    for(const line of lines){
        const regex = /^Game (\d+): (.*)$/g;
        const match = regex.exec(line);
        if(!match){
            console.log("Did not match?");
            continue;
        }
        
        const groups = match[2].split("; ");
        const outputGroups = [];
        for(const group of groups){
            const output = {
                "red": 0,
                "green": 0,
                "blue": 0
            }
            const items = group.split(", ");
            for(const item of items){
                const itemRegex = /^(\d+) (blue|red|green)$/g;
                const itemMatch = itemRegex.exec(item);
                if(!itemMatch){
                    console.log("We shouldn't error here.");
                    return;
                }

                output[itemMatch[2]] = parseInt(itemMatch[1]);
            }
            outputGroups.push(output);
        }
        output.push(outputGroups);
    }

    return output;
}

function checkPossible(game: any){
    for(const round of game){
        for(const key in round){
            if(round[key] > LIMITS[key]){
                return false;
            }
        }
    }

    return true;
}

function part1(){
    const games = parseGames();
    const possibleGames = []
    for(const gameId in games){
        const game = games[gameId];
        if(checkPossible(game)){
            possibleGames.push(parseInt(gameId)+1);
        }
    }

    let total = 0;
    possibleGames.forEach(id => {
        total += id;
    });
    
    console.log(`Total: ${total}`);
}

function part2(){
    const games: any[] = parseGames();
    const mappedGames = games.flatMap(game => {
        const vals = {}
        game.forEach(round => {
            for(const key in round){
                //console.log(typeof(round[key]))
                vals[key] = Math.max(vals[key] ?? 0, round[key]);
            }
        });
        return vals;
        //console.log(game);
    });
    let total = 0;
    mappedGames.forEach(game => {
        total += game["red"] * game["green"] * game["blue"];
    });
    console.log(`Total: ${total}`);

}

export default function init(){
    part2();
}