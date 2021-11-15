console.log('static/js/dice.js loaded');

function ShatterDice(rolls) {
    let axe = rolls.split('+');
    console.log(axe);
    const undesirables = [' ', '!r'];
    for (i = 0; i < undesirables.length; i++) {
        for (j = 0; j < axe.length; j++) {
            axe[j] = axe[j].replace(undesirables[i], '');
        }
    }
    console.log(axe);
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

    console.log(roll);
    return roll;
}

function CollectRoll() {
    let spread = d3.select('#roll').text;
    let axedSpread = ShatterDice(spread);
    console.log(axedSpread);
}

d3.select('.enter').on('click', CollectRoll());
