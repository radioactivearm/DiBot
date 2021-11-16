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
        roll = mark[0] * Math.ceil(Math.random() * mark[1]);
    } else if (dice.includes('D')) {
        mark = dice.split('D');
        roll = mark[0] * Math.ceil(Math.random() * mark[1]);
    } else {
        roll = dice;
    }
    
    return roll;
}

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


