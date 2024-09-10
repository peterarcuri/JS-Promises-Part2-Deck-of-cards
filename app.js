// ======================================
// ====== PART 2: DECK OF CARDS =========
// ======================================

$(function() {
    let baseURL = "https://deckofcardsapi.com/api/deck";

// 1.)
$.getJSON(`${baseURL}/new/draw/`).then(data => {
    let { suit, value } = data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
});

// 2.)
let firstCard = null;

$.getJSON(`${baseURL}/new/draw`)
    .then(data => {
        firstCard = data.cards[0];
        let deck_id = data.deck_id;
        return $.getJSON(`${baseURL}/${deck_id}/draw/`);
    })
    .then(data => {
        let secondCard = data.cards[0];
        [firstCard, secondCard].forEach(function(card) {
            console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`);
        });
    });
});

// 3.)

let deckID = null;
let $btn = $('button');
let $cardArea = $('#cardHolder');
let baseURL = "https://deckofcardsapi.com/api/deck";

$.getJSON(`${baseURL}/new/shuffle/`).then(data => {
        deckID = data.deck_id;
        $btn.show();
});

$btn.on('click', function() {
    $.getJSON(`${baseURL}/${deckID}/draw/`).then(data => {
        let cardSource = data.cards[0].image;
        let angle = Math.random() * 90 - 45;
        let randomX = Math.random() * 40 - 20;
        let randomY = Math.random() * 40 - 20;
        $cardArea.append(
            $('<img>', {
                src: cardSource,
                css: { transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`}
            })
        );
        if (data.remaining === 0) $btn.remove();
    });
});


