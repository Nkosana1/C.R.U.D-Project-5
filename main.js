document.getElementById('burgundy').onclick = partyBurgundy
document.getElementById('purple').onclick = partyPurple
document.getElementById('crimson').onclick = partyCrimson

function partyBurgundy() {
    document.querySelector('body').style.backgroundColor = 'rgba(128,0,32,1)'
    document.querySelector('body').style.color = 'white'
}

function partyPurple() {
    document.querySelector('body').style.backgroundColor = 'rgba(128,0,128,1)'
    document.querySelector('body').style.color = 'white'
}

function partyCrimson() {
    document.querySelector('body').style.backgroundColor = 'rgba(220,20,60,1)'
    document.querySelector('body').style.color = 'white'
}