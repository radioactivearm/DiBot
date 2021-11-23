console.log('static/js/dice.js loaded');


// Splits Roll input on plus sign, into individual di
// dropping possible !r/!roll that one may put infront
function ShatterDice(rolls) {

    // split at '+' inorder to allow for operations in later functions and rolls
    let axe = rolls.split('+');

    const undesirables = [' ', '!r'];
    for (i = 0; i < undesirables.length; i++) {
        for (j = 0; j < axe.length; j++) {
            axe[j] = axe[j].replace(undesirables[i], '');
        }
    }

    // return split array
    return axe
}

// takes in a single element (like from an array) and if its a dice it rolls it
// if it is not it just returns it as is
function RollDice(dice) {

    // empty holder for split
    let mark;

    // looks for capital or lowercase 'd' and splits on it
    if (dice.includes('d')) {
        mark = dice.split('d');
        // init roll at zero, this holds total roll to eventually be returned
        roll = 0;
        // loop over roll number of times infront of 'd'
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
        // if just an added bonus, and not a roll just add it
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

// roll function for Advantage and Disadvantage rolls
function AdvRoll(diceArray, adv = true) {
    // init empty array to hold new rolls
    let rolls = [];

    // interate over all elements in diceArray
    diceArray.forEach(dice => {
        // mark will be a holder for the split dice
        let mark;
        if (dice.includes('d')) {
            mark = dice.split('d');
            for (m = 0; m < mark[0]; m++) {
                // iterate over the njmber of times supposed to roll dice
                // roll dice twice assign first one 'i' and second 'j' inorder to differentiate later
                rolls.push(String(Math.ceil(Math.random() * mark[1])) + 'i');
                rolls.push(String(Math.ceil(Math.random() * mark[1])) + 'j');
            }
        } else {
            // if a bonus just add a 'k'
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
    // looping over length of array
    for (di = 0; di < len; di++) {
        if (array[di].includes('h') && di != len - 1) {
            // if the element is a high roll and not the last element
            // it addes a class of high for color
            let hi = array[di].replace('h', '');
            html = html + '<span class="high">' + hi + '</span><span>+</span>';
        } else if (array[di].includes('h') && di == len - 1) {
            // if the element is a high roll and is the last element
            // it addes a class of high for color has not '+' at the end
            let hi = array[di].replace('h', '');
            html = html + '<span class="high">' + hi + '</span>';
        } else if (array[di].includes('l') && di != len - 1) {
            // if the element is a low roll and no the last element
            // it addes a class of low for color
            let lo = array[di].replace('l', '');
            html = html + '<span class="low">' + lo + '</span><span>+</span>';
        } else if (array[di].includes('l') && di == len - 1) {
            // if the element is a low roll and is the last element
            // it addes a class of high for color and has no '+' at the end
            let lo = array[di].replace('l', '');
            html = html + '<span class="low">' + lo + '</span>';
        } else if (di != len - 1) {
            // if it is not the end and is not a high or low roll (ie a bonus)
            // it just addes the roll
            let ki = array[di].replace('k', '');
            html = html + '<span class="number">' + ki + '</span><span>+</span>';
        } else {
            // if it is at the end there is no '+' at the end
            let ki = array[di].replace('k', '');
            html = html + '<span class="number">' + ki + '</span>';
        }
        // puts long span spot into innerHTML of unaddedResult
        document.getElementById('unaddedResult').innerHTML = html;
    }
    // used <span> to get this all on one line and added it to innerHTML to get it in the h4 spot.

    // adds the results using AddAdvantage and puts them in the addedResult spot
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


// this function adds total for dis and adv rolls and runs in Display function
// when adv true it takes rolls marked 'h', and when false it takes rolls marked 'l'
function AddAdvantage(array, adv = true) {

    // init empty array to push elemnents (rolls) to
    let destroyed = [];

    //let whatIadd;
    //let not;

    //if (adv == true) {
    //    whatIadd = 'h';
    //    not = 'l';
    //} else {
    //    whatIadd = 'l';
    //    not = 'h';
    //}

    array.forEach(a => {
        if (a.includes('h') && adv == true) {
            // only takes high roll if advantage roll pushes into array
            destroyed.push(a.split('h')[0]);

        } else if (a.includes('l') && adv == false) {
            // only takes low roll if disadvantage roll pushes into array
            destroyed.push(a.split('l')[0]);
 
        } else if (a.includes('k')) {
            // always takes bonuses pushes into array
            destroyed.push(a.split('k')[0]);

        }
    });

    // uses AddArray function to add the created array and returns
    return AddArray(destroyed);
    

}

// this function iterates of an inputed array and marks high rolls and low rolls
// works in conjuction with AdvRoll() function
function TakeAdvantage(array) {
    // iterate over array
    for (i = 0; i < array.length - 1; i++) {
        // need to create holding variables otherwise would overwrite one dice with the other
        let diceOne;
        let diceTwo;

        // looking for when the advantage rolls are in the array so it looks like this [.., 9i, 5j, ..]
        if (array[i].includes('i') && array[i + 1].includes('j')) {
            // assigning dice to be array elements with out tags
            diceOne = array[i].replace('i', '');
            diceTwo = array[i + 1].replace('j', '');
            if (parseInt(diceOne) > parseInt(diceTwo)) {
                // assigning which ever dice is higher to have a 'h' tag
                // and lower to have a 'l' tag for the Display() function to use later
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

//===========================================

// some sounds i made with some dice :)
let soundOne = new Audio('static/images/many_dice_roll.wav');
let soundTwo = new Audio('static/images/picking_up_dice.wav');
let soundThree = new Audio('static/images/die_drop.wav');
let soundFour = new Audio('static/images/marker.wav');

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

    // playes my dice sound
    soundOne.play();

    PutReturn(added, unadded);

}
//============================================

// advantage

function Advantage() {
    // grabbing the roll
    let spread = document.getElementById('roll').value;

    // splitting the roll up
    let axedSpread = ShatterDice(spread);

    let adv = AdvRoll(axedSpread, true);

    let newAdv = TakeAdvantage(adv);;

    // playes my dice sound
    soundOne.play();

    Display(newAdv);

}


function Disadvantage() {
    let spread = document.getElementById('roll').value;

    let axedSpread = ShatterDice(spread);

    let adv = AdvRoll(axedSpread, true);


    let newAdv = TakeAdvantage(adv);

    // playes my dice sound
    soundOne.play();

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

    // playes my dice sound
    soundOne.play();

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

    // playes my dice sound
    soundOne.play();

    PutReturn(added, unadded);
}