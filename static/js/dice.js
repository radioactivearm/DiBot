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

// roll for crit auto high roll
function CritRollHigh(dice) {

    // init roll
    let roll;

    if (dice.includes('d')) {
        // add max roll possible
        let bananaSplit = dice.split('d');

        roll = bananaSplit[0] * bananaSplit[1];

        // then roll dice as normal
        roll = roll + '+' + RollDice(dice);

    } else {
        roll = dice;
    }

    return roll;
}

function CritRollNorm(dice) {

    // init roll
    let roll;

    if (dice.includes('d')) {
        // add max roll possible
        roll = RollDice(dice);


        // then roll dice as normal
        roll = roll + '+' + RollDice(dice);


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

function Display(array, adv=true) {

    

    let html = '';
    let total = 0;
    const len = array.length;
    for (di = 0; di < len; di++) {
        if (array[di].includes('h') && di != len - 1) {
            let hi = array[di].replace('h', '');
            html = html + '<span class="high">' + hi + '</span><span>+</span>';
        } else if (array[di].includes('h') && di == len - 1) {
            let hi = array[di].replace('h', '');
            html = html + '<span class="high">' + hi + '</span>';
        } else if (array[di].includes('l') && di != len - 1) {
            let lo = array[di].replace('l', '');
            html = html + '<span class="low">' + lo + '</span><span>+</span>';
        } else if (array[di].includes('l') && di == len - 1) {
            let lo = array[di].replace('l', '');
            html = html + '<span class="low">' + lo + '</span>';
        } else if (di != len - 1) {
            let ki = array[di].replace('k', '');
            html = html + '<span class="number">' + ki + '</span><span>+</span>';
        } else {
            let ki = array[di].replace('k', '');
            html = html + '<span class="number">' + ki + '</span>';
        }
        document.getElementById('unaddedResult').innerHTML = html;
    }


    document.getElementById('addedResult').innerHTML = AddAdvantage(array, adv);
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


// function add advantage
function AddAdvantage(array, adv = true) {

    let destroyed = [];

    let whatIadd;
    let not;

    if (adv == true) {
        whatIadd = 'h';
        not = 'l';
    } else {
        whatIadd = 'l';
        not = 'h';
    }

    array.forEach(a => {
        if (a.includes('h') && adv == true) {
            destroyed.push(a.split('h')[0]);

        } else if (a.includes('l') && adv == false) {
            destroyed.push(a.split('l')[0]);
 
        } else if (a.includes('k')) {
            destroyed.push(a.split('k')[0]);

        }
    });

    return AddArray(destroyed);
    

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

    let adv = AdvRoll(axedSpread, true);


    let newAdv = TakeAdvantage(adv);

    Display(newAdv);

}


function Disadvantage() {
    let spread = document.getElementById('roll').value;

    let axedSpread = ShatterDice(spread);

    let adv = AdvRoll(axedSpread, true);


    let newAdv = TakeAdvantage(adv);

    Display(newAdv, adv=false);

}


// Roll if clicked button Critical, runs if rolled a nat 20 previously
function Critical() {
    // get value of roll
    let spread = document.getElementById('roll').value;

    // seperate value
    let axedSpread = ShatterDice(spread);

    let roll = [];

    const len = axedSpread.length;
    // roll dice
    for (i = 0; i < len; i++) {
        roll.push(CritRollNorm(axedSpread[i]));
    }

    const added = AddArray(ShatterDice(Rejoin(roll)));
    const unadded = Rejoin(roll);

    PutReturn(added, unadded);
}


// Roll if clicked button Critical, runs if rolled a nat 20 previously
function CriticalHigh() {
    // get value of roll
    let spread = document.getElementById('roll').value;

    // seperate value
    let axedSpread = ShatterDice(spread);

    let roll = [];

    const len = axedSpread.length;
    // roll dice
    for (i = 0; i < len; i++) {
        roll.push(CritRollHigh(axedSpread[i]));
    }

    const added = AddArray(ShatterDice(Rejoin(roll)));
    const unadded = Rejoin(roll);

    PutReturn(added, unadded);
}