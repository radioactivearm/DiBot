console.log('static/js/dice.js loaded');

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

function RollDice(dice) {

    let mark;

    if (dice.includes('d')) {
        mark = dice.split('d');
    } else if (dice.inclues('D')) {
        mark = dice.split('D');
    }
    roll = mark[0] * Math.ceil(Math.random() * mark[1]);


    return roll;
}

function CollectRoll() {
    let spread = document.getElementById('roll').value; 

    let axedSpread = ShatterDice(spread);
    console.log(axedSpread);
}


