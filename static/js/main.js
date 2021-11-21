console.log('static/app.js');


// =====================================

function Twenty() {
/*    let dTwenty = document.getElementById('d20');*/

    let input = document.getElementById('roll');

    const currentRoll = input.value;

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


function Twelve() {

    let input = document.getElementById('roll');

    const currentRoll = input.value;

    let newRoll = '';

    let diceArray = ShatterDice(currentRoll);
    const len = diceArray.length;

    if (diceArray[len - 1].includes('d12')) {
        let timArray = diceArray[len - 1].split('d12');

        let tim = timArray[0];

        let plusTime = parseInt(tim) + 1;

        diceArray[len - 1] = plusTime + 'd12';

        newRoll = Rejoin(diceArray);
    } else if (currentRoll == '') {
        newRoll = '1d12';
    } else {
        newRoll = currentRoll + '+1d12';
    }

    console.log(newRoll);

    input.value = newRoll;
}

function PlusDice(whatIwant) {

    let input = document.getElementById('roll');

    const currentRoll = input.value;

    let newRoll = '';

    let diceArray = ShatterDice(currentRoll);
    const len = diceArray.length;

    const dice = ['1d20', '1d12', '1d10', '1d8', '1d6', '1d4'];

    let di = whatIwant;


    dice.forEach(d => {

        dsplit = d.split('1');

        if (di == d) {
            let num;
            if (di.includes('10') || di.includes('12')) {
                num = dsplit[1] + '1' + dsplit[2];
            } else {
                num = dsplit[1];

            }


            if (diceArray[len - 1].includes(num)) {
                let timArray = diceArray[len - 1].split(num);

                let tim = timArray[0];

                let plusTime = parseInt(tim) + 1;

                diceArray[len - 1] = plusTime + num;

                newRoll = Rejoin(diceArray);
            } else if (currentRoll == '') {
                newRoll = di;
            } else {
                newRoll = currentRoll + '+' + di;
            }
        } 

    });




    console.log(newRoll);

    input.value = newRoll;

}

//==================================================


function Clear() {
    document.getElementById('roll').value = '';
    document.getElementById('addedResult').innerHTML = '';
    document.getElementById('unaddedResult').innerHTML = '';
}
