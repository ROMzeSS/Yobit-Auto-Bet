var min_bet = 0.00000100,
    current_bet = min_bet,
    max_lose = 12,
    lose_count = 0;

var betting = false;

function start() {

    if (betting)
        return;
    betting = true;
    var balance = getBalance();
    if (balance < current_bet) {
        alert('Empty balance !');
        return;
    }

    // Set bet amount
    $('.dice_htable input[name=bet]').val(parseFloat(current_bet).toFixed(8));

    // Random roll
    var roll = Math.floor(Math.random() * 2);
    var dicePlayBtn = $('.dice_htable .clDicePlay')[roll];
    dicePlayBtn.click();

    checkResult(balance);
}

function checkResult(last_balance) {
    setTimeout(function() {
        if (last_balance < getBalance()) {
            // Win
            current_bet = min_bet;
            lose_count = 0;
            betting = false;
        } else if (last_balance > getBalance()) {
            // Lose
            if (++lose_count >= max_lose) {
                current_bet = min_bet;
                lose_count = 0;
                betting = false;
            } else {
                current_bet = current_bet * 2;
                betting = false;
            }
        } else {
            checkResult(last_balance);
        }
    }, 500);
}

function getBalance() {
    var dice_text = $('.dice_select .chosen-single span').text();

    var regex = /[+-]?\d+(\.\d+)?/g;
    var floats = dice_text.match(regex).map(function(v) {
        return parseFloat(v).toFixed(8);
    });

    return floats[0];
}

setInterval(start, 100);
