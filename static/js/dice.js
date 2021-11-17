console.log('static/js/dice.js loaded');


// Splits Roll input on plus sign, into individual di
// dropping possible !r/!roll that one may put infront
function ShatterDice(rolls) {
    let axe = rolls.split('+');

    const undesirables = [' ', '!r'];
    for (i = 0; i < undesirables.length; i++) {
        for (j = 0; j < axe.length; j++) {
            axe[j] = axe[j].replace(undesirables[i], '');
        }
    }

    return axe
}

// this one rolls the dice if it has a d/D in the middle
function RollDice(dice) {

    let mark;

    if (dice.includes('d')) {
        mark = dice.split('d');
        roll = 0;
        for (m = 0; m < mark[0]; m++) {
            roll = roll + Math.ceil(Math.random() * mark[1]);
        }
    } else if (dice.includes('D')) {
        mark = dice.split('D');
        roll = 0;
        for (m = 0; m < mark[0]; m++) {
            roll = roll + Math.ceil(Math.random() * mark[1]);
        }
    } else {
        roll = dice;
    }
    
    return roll;
}


//========================================

function AdvRoll(diceArray, adv = true) {
    let rolls = [];

    diceArray.forEach(dice => {
        let mark;
        if (dice.includes('d')) {
            mark = dice.split('d');
            for (m = 0; m < mark[0]; m++) {
                rolls.push(String(Math.ceil(Math.random() * mark[1])) + 'i');
                rolls.push(String(Math.ceil(Math.random() * mark[1])) + 'j');
            }
        } else {
            rolls.push(String(dice) + 'k');
        }
    });

    return rolls;
}

//========================================



// This puts the return on the page
function PutReturn(added, unadded) {
    document.getElementById('addedResult').innerHTML = added;
    document.getElementById('unaddedResult').innerHTML = unadded;

  
}

// This rejoins the rolled dice out puts so you can see
// each di's out put
function Rejoin(array) {
    let jarray = array.join('+');
    return jarray;

}


// this adds up all the dies out puts
function AddArray(array) {

    const reducer = (a, b) => parseInt(a) + parseInt(b);
    return array.reduce(reducer);
}

function TakeAdvantage(array) {
    
    for (i = 0; i < array.length - 1; i++) {
        let diceOne;
        let diceTwo;
        if (array[i].includes('i') && array[i + 1].includes('j')) {
            diceOne = array[i].replace('i', '');
            diceTwo = array[i + 1].replace('j', '');
            if (parseInt(diceOne) > parseInt(diceTwo)) {
                array[i] = diceOne + 'h';
                array[i + 1] = diceTwo + 'l';
            } else {
                array[i] = diceOne + 'l';
                array[i + 1] = diceTwo + 'h';
            }
        }

    }

    return array;
}

//=========================================
// this runs everything
function CollectRoll() {
    // get value of roll
    let spread = document.getElementById('roll').value; 

    // seperate value
    let axedSpread = ShatterDice(spread);

    let roll = [];

    const len = axedSpread.length;
    // roll dice
    for (i = 0; i < len; i++) {
        roll.push(RollDice(axedSpread[i]));
    }

    const added = AddArray(roll);
    const unadded = Rejoin(roll);

    PutReturn(added, unadded);
    
}
//============================================

// advantage

function Advantage() {
    let spread = document.getElementById('roll').value;

    let axedSpread = ShatterDice(spread);
    console.log(axedSpread);
    let adv = AdvRoll(axedSpread, true);

    console.log(adv);

    let newAdv = TakeAdvantage(adv);

    console.log(newAdv);

}

