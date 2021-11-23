console.log('static/app.js');


// =====================================


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

    soundThree.play();

    input.value = newRoll;

}


//==================================================

function PlusOne() {
    // grabbing input line
    let input = document.getElementById('roll');

    // grabbing value (roll) from input line
    const currentRoll = input.value;

    // dividing roll by components by splitting on the '+' sign
    let spread = currentRoll.split('+');

    // getting length of spread inorder to find the last element of array
    const sLen = spread.length;

    // grabbing last element of the array
    let num;

    if (sLen == 1) {
        num = spread[0];
        if (num.includes('d')) {
            spread.push('1');
        } else if (spread[0] == '') {
            spread[0] = '1';
        } else {
            spread[0] = String(parseInt(spread[0]) + 1);
        }
    } else {
        num = spread[sLen - 1];
        if (num.includes('d')) {
            spread.push('1');
        } else {
            spread[sLen - 1] = String(parseInt(num) + 1);
        }
    }
    



    let newRoll = spread.join('+');

    input.value = newRoll;

    soundFour.play();

}

//==================================================


function Clear() {
    document.getElementById('roll').value = '';
    document.getElementById('addedResult').innerHTML = '';
    document.getElementById('unaddedResult').innerHTML = '';


    // playing the sound of picking up dice
    soundTwo.play();
}


//===================================================

function PopUp() {
    let diceImage = document.getElementById('icard');

    diceImage.classList.remove('invisible');
    diceImage.classList.add('visisble');
}

//==================================================
// got this chunck of code from https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp


var input = document.getElementById("roll");

input.addEventListener("keydown", function (event) {

    if (event.keyCode === 13) {

        event.preventDefault();

        document.getElementById("enter").click();
    }
});