console.log('static/app.js');


// =====================================

function Twenty() {
/*    let dTwenty = document.getElementById('d20');*/

    let input = document.getElementById('roll');

    const currentRoll = input.value

    let newRoll = '';

    let diceArray = ShatterDice(currentRoll);
    const len = diceArray.length;

    if (diceArray[len - 1].includes('d20')) {
        let timArray = diceArray[len - 1].split('d20');

        let tim = timArray[0];

        let plusTime = parseInt(tim) + 1;

        diceArray[len - 1] = plusTime + 'd20';

        newRoll = Rejoin(diceArray);
    } else if (currentRoll == '') {
        newRoll = '1d20';
    } else {
        newRoll = currentRoll + '+1d20';
    }



    console.log(newRoll);

    input.value = newRoll;
}


//==================================================
