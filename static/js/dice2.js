// reworking of rolling functionality (using objects)

//====================================

// Object of a unrolled Die
function die(d, rType) {

    // spliting dice input into number of rolls and size of die 
    this.d = d;
    let spli = d.split('d');
    this.size = spli[1];
    

    if (d.includes('+')) {
        this.sign = '+';
        this.rolls = spli[0].split(/\+|\-/)[1];
    } else if (d.includes('-')) {
        this.sign = '-';
        this.rolls = spli[0].split(/\+|\-/)[1];
    } else {
        this.sign = '+';
        this.rolls = spli[0];
    }

    // this is the type of roll this die will under go (reg, adv, dis, critN, critH)
    this.rType = rType;
}

// object for bonus
function bonus(b) {

    // size of bonus
    this.size = b.split(/\+|\-/)[1];

    if (b.includes('+')) {
        this.sign = '+';
    } else if (b.includes('-')) {
        this.sign = '-';
    } else {
        this.sign = '+';
    }
}

// stopped here in adding in minus signs ===========================================


// Object of a rolled Die (rType is int)
function rDie(d, sign, rType, pairID=null) {

    const rConst = ['r'];
    const rColor = ['white'];

    // making tag go infront of subtotal dice rolls
    let spli = d.split('d');
    this.bTag = '1d' + spli[1];

    this.sign = sign;

    // the value of the roll
    switch (sign) {
        case '+':
            if (rConst[rType] == 'r') {
                this.value = Math.ceil(Math.random() * spli[1]);
            }
            break;
        case '-':
            if (rConst[rType] == 'r') {
                this.value = -Math.ceil(Math.random() * spli[1]);
            }
            break;
    }


    // an ID used to pair two rolls
    // (such as in adv rolls)
    this.pairID = pairID;

    // used to determine color in viewing
    this.color = rColor[rType];
}

// Object of a bonus 
function rBonus(value, sign, color='white') {

    // the value of bonus roll

    this.sign = sign;

    switch (sign) {
        case '+':
            this.value = value;
            break;
        case '-':
            this.value = -value;
            break;
    }
    

    // the color I want a bonus roll to be
    // defaulted to white, probs just always going to be white
    this.color = color;

}

//====================================


// split Roll up into usable array
function SplitRoll(str) {
    
    let newStr = str.replace(/\+/g, ',+').replace(/\-/g, ',-').split(',');
    console.log(newStr);

    let newerStr = [];
    
    if (newStr[0] == '') {
        newerStr = newStr.filter(function (x) { return x != ''; });
    } else {
        newerStr = newStr;
    }

    return newerStr;

}

// this function takes an array of a roll
// and creates dice and bonus objects out of it
function Dicify(array, rType) {
    let dice = [];
    array.forEach(a => {
        if (a.includes('d')) {
            dice.push(new die(a, rType));
        } else {
            dice.push(new bonus(a));
        }
    });
    return dice;
}

// this function takes in an array of objects
// and returns an array of objects
function ConvertDice2Roll(array) {
    let newArray = [];
    let count = 0;
    array.forEach(e => {
        console.log(e);
        console.log(e.constructor.name);
        if (e.constructor.name == 'die') {
            let len = e.rolls;
            for (r = 0; r < len; r++) {
                newArray.push(new rDie(e.d, e.sign, e.rType, pairID = count));
                count = count + 1;
                console.log('i was here');
            }
        } else if (e.constructor.name == 'bonus') {
            newArray.push(new rBonus(e.size, e.sign, 'white'));
        }
        console.log(newArray);
    });

    return newArray;
}

// this function adds things up
function Adder(array) {
    let total = 0;
    array.forEach(e => {
        total = parseInt(total) + parseInt(e.value);
    });

    return String(total);
}

function dropNegative(entry) {
    return String(entry).replace('-', '');
}

// this function constructs an HTML string of all rolls
function r2HTML(array) {
    let len = array.length;

    let html = '';

    
    for (i = 0; i < len; i++) {
        switch (array[i].sign) {
            case '+':
                if (i == 0 && array[i].constructor.name == 'rDie') {
                    html = html + '<span class="' + array[i].color + '">' + array[i].bTag + '(' + array[i].value + ')</span>';
                } else if (i == 0 && array[i].constructor.name == 'rBonus') {
                    html = html + '<span class="' + array[i].color + '">' + array[i].value + '</span>';
                } else if (array[i].constructor.name == 'rDie') {
                    html = html + '<span>+</span><span class="' + array[i].color + '">' + array[i].bTag + '(' + array[i].value + ')</span>';
                } else if (array[i].constructor.name == 'rBonus') {
                    html = html + '<span>+</span><span class="' + array[i].color + '">' + array[i].value + '</span>';
                }
                break;
            case '-':
                if (i == 0 && array[i].constructor.name == 'rDie') {
                    html = html + '<span>-</span><span class="' + array[i].color + '">' + dropNegative(array[i].bTag) + '(' + dropNegative(array[i].value) + ')</span>';
                } else if (i == 0 && array[i].constructor.name == 'rBonus') {
                    html = html + '<span>-</span><span class="' + array[i].color + '">' + dropNegative(array[i].value) + '</span>';
                } else if (array[i].constructor.name == 'rDie') {
                    html = html + '<span>-</span><span class="' + array[i].color + '">' + dropNegative(array[i].bTag) + '(' + dropNegative(array[i].value) + ')</span>';
                } else if (array[i].constructor.name == 'rBonus') {
                    html = html + '<span>-</span><span class="' + array[i].color + '">' + dropNegative(array[i].value) + '</span>';
                }
                break;
        }

    }
    console.log(html);

    return html;
}

//===============================================
function Roll() {
    let re = document.getElementById('roll').value;

    let splitRe = SplitRoll(re);
    console.log(splitRe);

    let dice = Dicify(splitRe, 0);
    console.log(dice);

    let rolled = ConvertDice2Roll(dice);

    console.log(rolled);

    document.getElementById('addedResult').innerHTML = Adder(rolled);
    document.getElementById('unaddedResult').innerHTML = r2HTML(rolled);
}