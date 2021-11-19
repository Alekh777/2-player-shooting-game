let P1_UP = 87; // 'W'
let P1_DOWN = 83; // 'S'
let P1_CTRL = 86; // 'V'
let P2_UP = 38; // 'UP_ARROW'
let P2_DOWN = 40; // 'DOWN_ARROW'
let P2_CTRL = 191; // '/'

let PLAYER_MOVEMENT = 4;
let LASER_MOVEMENT = 15;

let player1 = document.getElementsByClassName("player1")[0];
let player2 = document.getElementsByClassName("player2")[0];
let laser = document.getElementsByClassName("laser")[0];
let container = document.getElementsByClassName("container")[0]

let p1y = window.innerHeight / 2 - 35;
let p2y = window.innerHeight / 2 - 35;

let p1LaserPos = {
    x: 55 + 40,
    y: p1y + 33
}

let p2LaserPos = {
    x: window.innerWidth - 70 - 40 - 20 - 5,
    y: p2y + 33
}

function toggleKey(keyCode, isPressed) {
    if (keyCode == P1_UP) {
        controller.p1Up = isPressed;
    }
    if (keyCode == P1_DOWN) {
        controller.p1Down = isPressed;
    }
    if(keyCode == P1_CTRL){
        createLaser('p1', isPressed);
    }
    if (keyCode == P2_UP) {
        controller.p2Up = isPressed;
    }
    if (keyCode == P2_DOWN) {
        controller.p2Down = isPressed;
    }
    if(keyCode == P2_CTRL){
        createLaser('p2', isPressed)
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

isMoving = {
    p1: false,
    p2: false
}

let p1L = document.createElement('div');
let p2L = document.createElement('div');

function createLaser(player, isPressed){
    if(player === 'p1' && isPressed && !isMoving.p1){
        p1L = laser.cloneNode(true)
        p1L.style.display = 'block'
        p1LaserPos.x = 55 + 40;
        p1LaserPos.y = p1y + 33;
        p1L.style.top = p1LaserPos.y + "px"
        p1L.classList.add('created1')
        container.appendChild(p1L)
        moveLaser('p1')
    }
    
    if(player === 'p2' && isPressed && !isMoving.p2){
        p2L = laser.cloneNode(true)
        p2L.style.display = 'block'
        p2LaserPos.x = window.innerWidth - 70 - 40 - 20 - 5;
        p2LaserPos.y = p2y + 33;
        p2L.style.top = p2LaserPos.y + "px"
        p2L.classList.add('created2')
        container.appendChild(p2L)
        moveLaser('p2')
    }
}

function moveLaser(calledFor){
    if(p1LaserPos.x > window.innerWidth - 20 - 30){
        isMoving.p1 = false;
        lasers = document.getElementsByClassName('created1');
        for(i = 0; i < lasers.length; i++) {
            lasers[i].remove();
        };
    }
    else if(calledFor === 'p1'){
        isMoving.p1 = true;
        p1LaserPos.x += LASER_MOVEMENT;
        p1L.style.left = p1LaserPos.x + "px"
    }

    if(p2LaserPos.x < 20){
        isMoving.p2 = false;
        lasers = document.getElementsByClassName('created2');
        for(i = 0; i < lasers.length; i++) {
            lasers[i].remove();
        };
    }
    else if(calledFor === 'p2'){
        isMoving.p2 = true;
        p2LaserPos.x -= LASER_MOVEMENT;
        p2L.style.left = p2LaserPos.x + "px"
    }
}

function setPosition() {
    player1.style.top = p1y + "px";
    player2.style.top = p2y + "px";
}

let lastLoopRun = 0;

function setBoundary(){
    if(p1y < 20) p1y = 20;
    if(p1y > (window.innerHeight - 20 - 35 - 20 - 20)) p1y = window.innerHeight - 20 - 35 - 20 - 20;
    if(p2y < 20) p2y = 20;
    if(p2y > (window.innerHeight - 20 - 35 - 20 - 20)) p2y = window.innerHeight - 20 - 35 - 20 - 20;
}

function loop() {
    if (new Date().getTime() - lastLoopRun > 15) {
        handleControls();
        setPosition();
        if(isMoving.p1)
            moveLaser('p1');
        if(isMoving.p2)
            moveLaser('p2');
        lastLoopRun = new Date().getTime();
    }
    setTimeout(loop, 2);
}

loop();

document.onkeydown = function (evt) {
    toggleKey(evt.keyCode, true);
};

document.onkeyup = function (evt) {
    toggleKey(evt.keyCode, false);
};
