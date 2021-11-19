let P1_UP = 87; // 'W'
let P1_DOWN = 83; // 'S'
let P1_CTRL = 86; // 'V'
let P2_UP = 38; // 'UP_ARROW'
let P2_DOWN = 40; // 'DOWN_ARROW'
let P2_CTRL = 191; // '/'
let PLAYER_MOVEMENT = 4;

let player1 = document.getElementsByClassName("player1")[0];
let player2 = document.getElementsByClassName("player2")[0];
let laser = document.getElementsByClassName("laser")[0];

let p1y = window.innerHeight / 2 - 35;
let p2y = window.innerHeight / 2 - 35;

function toggleKey(keyCode, isPressed) {
    console.log(keyCode);
    if (keyCode == P1_UP) {
        controller.p1Up = isPressed;
    }
    if (keyCode == P1_DOWN) {
        controller.p1Down = isPressed;
    }
    if (keyCode == P2_UP) {
        controller.p2Up = isPressed;
    }
    if (keyCode == P2_DOWN) {
        controller.p2Down = isPressed;
    }
}

let controller = new Object();

function handleControls() {
    if (controller.p1Up) {
        p1y -= PLAYER_MOVEMENT;
    }
    if (controller.p1Down) {
        p1y += PLAYER_MOVEMENT;
    }
    if (controller.p2Up) {
        p2y -= PLAYER_MOVEMENT;
    }
    if (controller.p2Down) {
        p2y += PLAYER_MOVEMENT;
    }

    setBoundary();
}

function setPosition() {
    player1.style.top = p1y + "px";
    player2.style.top = p2y + "px";
}

let lastLoopRun = 0;

function loop() {
    if (new Date().getTime() - lastLoopRun > 15) {
        handleControls();
        setPosition();
        lastLoopRun = new Date().getTime();
    }
    setTimeout(loop, 2);
}

function setBoundary(){
    if(p1y < 20) p1y = 20;
    if(p1y > (window.innerHeight - 20 - 35 - 20 - 20)) p1y = window.innerHeight - 20 - 35 - 20 - 20;
    if(p2y < 20) p2y = 20;
    if(p2y > (window.innerHeight - 20 - 35 - 20 - 20)) p2y = window.innerHeight - 20 - 35 - 20 - 20;
}

loop();

document.onkeydown = function (evt) {
    toggleKey(evt.keyCode, true);
};

document.onkeyup = function (evt) {
    toggleKey(evt.keyCode, false);
};
