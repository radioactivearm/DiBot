console.log('static/app.js');

var randy = Math.ceil(Math.random() * 20);

console.log(randy);


function rTwenty() {
    let randy = Math.ceil(Math.random() * 20);
    return randy;
}

function printrTwenty() {
    console.log(rTwenty());
}

function insertRoll() {
    d3.select('#result').text('Roll here');
}

let btn = d3.select(".r20");

btn.on('click', printrTwenty);

d3.select(".enter").on('click', insertRoll);

