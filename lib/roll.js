export function roll(numberOfSides, numberOfDice, numberOfRolls){
    let result = [];
    let diceSum = 0;
    for(let i = 0; i < numberOfRolls; i++){
        diceSum = 0;
        for(let j = 0; j < numberOfDice; j++){
            diceSum += Math.floor((Math.random() * numberOfSides) + 1);
        }
        result.push(diceSum);
    }
    return {
        sides: numberOfSides, 
        dice: numberOfDice, 
        rolls: numberOfRolls, 
        results: result
    };
}