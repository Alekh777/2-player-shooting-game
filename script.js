let P1_UP = 87; // 'W'
let P1_DOWN = 83; // 'S'
let P1_CTRL = 86; // 'V'
let P2_UP = 38; // 'UP_ARROW'
let P2_DOWN = 40; // 'DOWN_ARROW'
let P2_CTRL = 191; // '/'
let START = 32; // 'SPACE'

let PLAYER_MOVEMENT = 4;
let LASER_MOVEMENT = 40;

let player1 = document.getElementsByClassName("player1")[0];
let player2 = document.getElementsByClassName("player2")[0];
let laser = document.getElementsByClassName("laser")[0];
let container = document.getElementsByClassName("container")[0]
let startText = document.getElementsByClassName('text')[0]
let healthDiv = document.getElementsByClassName('health')[0]
let p1HealthDiv = document.getElementsByClassName('p1HealthDiv')[0]
let p2HealthDiv = document.getElementsByClassName('p2HealthDiv')[0]
let winsScreen = document.getElementsByClassName('winsScreen')[0]
let winsDiv = document.getElementsByClassName('winsDiv')[0]

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

isMoving = {
    p1: false,
    p2: false
}

let p1L = document.createElement('div');
let p2L = document.createElement('div');

let isGameOn = false;

let health = {
    p1: 100,
    p2: 100
}

let wins = {
    p1: 0,
    p2: 0
}

let gameCount = 0;

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
    if(keyCode == START && !isGameOn){
        startGame();
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

function createLaser(player, isPressed){
    if(isGameOn){
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

function isColliding(p1Laser, p2Pos, p2Laser, p1Pos){
    if(p1Laser){
        if( ( p1Laser.x2 >= p2Pos.x1 ) && ( (p1Laser.y2 >= p2Pos.y1) && (p1Laser.y1 <= p2Pos.y2) ) ){
            return true;
        }
        else
            return false;
    }
    
    if(p2Laser){
        if( ( p2Laser.x1 <= p1Pos.x2 ) && ( (p2Laser.y2 >= p1Pos.y1) && (p2Laser.y1 <= p1Pos.y2) ) ){
            return true;
        }
        else
            return false;
    }
}

let collision1 = 0;
let collision2 = 0;

function collision(){
    if(!isMoving.p1) collision1 = 0;
    if(!isMoving.p2) collision2 = 0;
    let p1Laser = {
        x1: p1LaserPos.x,
        x2: p1LaserPos.x + 40,
        y1: p1LaserPos.y,
        y2: p1LaserPos.y + 6
     }
 
     let p2Pos = {
         x1: window.innerWidth - 70 - 20,
         x2: window.innerWidth - 20,
         y1: p2y,
         y2: p2y + 70
    }

    let p2Laser = {
        x1: p2LaserPos.x,
        x2: p2LaserPos.x + 40,
        y1: p2LaserPos.y,
        y2: p2LaserPos.y + 6
    }

    let p1Pos = {
            x1: 20,
            x2: 70 + 20,
            y1: p1y,
            y2: p1y + 70
    }

    if(isMoving.p1){
        if(isColliding(p1Laser, p2Pos, null, null) && collision1 == 0){
            collision1++;
            health.p2 -= Math.floor(Math.random() * 6);
            updateHealth();
        }
    }

    if(isMoving.p2){
        if(isColliding(null, null, p2Laser, p1Pos) && collision2 == 0){
            collision2++;
            health.p1 -= Math.floor(Math.random() * 6);
            updateHealth();
        }
    }
}

function updateHealth(){
    p1HealthDiv.innerHTML = `${health.p1}`
    p2HealthDiv.innerHTML = `${health.p2}`
}

function checkHealth(){
    if(health.p1 <= 0 || health.p2 <= 0){
        isGameOn = false;
        if(health.p1 <= 0){
            wins.p2++;
        }
        if(health.p2 <= 0){
            wins.p1++;
        }
        showWinsScreen();
    }
}

function deleteLasers(){
    lasers1 = document.getElementsByClassName('created1');
    for(i = 0; i < lasers1.length; i++) {
        lasers1[i].remove();
    };
    lasers2 = document.getElementsByClassName('created2');
    for(i = 0; i < lasers2.length; i++) {
        lasers2[i].remove();
    };
}

function declareWinner(){
    if((gameCount === 5 && wins.p1 > wins.p2) || wins.p1 === 3){
        winsDiv.innerHTML = `
        Player 1 - Won: ${wins.p1} <br />
        Player 2 - Won: ${wins.p2} <br />
        Player 1 won the match! <br /> <br />
        PRESS <code>"SPACE"</code> TO START
        `
        wins.p1 = 0;
        wins.p2 = 0;
        gameCount = 0;
    }
    if((gameCount === 5 && wins.p2 > wins.p1) || wins.p2 === 3){
        winsDiv.innerHTML = `
        Player 1 - Won: ${wins.p1} <br />
        Player 2 - Won: ${wins.p2} <br />
        Player 2 won the match! <br /> <br />
        PRESS <code>"SPACE"</code> TO START
        `
        wins.p1 = 0;
        wins.p2 = 0;
        gameCount = 0;
    }
}

function showWinsScreen(){
    winsScreen.style.display = 'block'
    winsDiv.innerHTML = `
    Player 1 - Won: ${wins.p1} <br />
    Player 2 - Won: ${wins.p2} <br /> <br />
    PRESS <code>"SPACE"</code> TO START
    `;
    declareWinner();
}

function startGame(){
    isGameOn = true;
    container.classList.remove('start_screen')
    startText.style.display = 'none';
    
    healthDiv.style.display = 'flex';
    health.p1 = 100;
    health.p2 = 100;
    updateHealth();

    deleteLasers();
    
    p1y = window.innerHeight / 2 - 35;
    p2y = window.innerHeight / 2 - 35;
    
    winsScreen.style.display = 'none'
    gameCount++;
    loop();
}

function loop() {
    if (new Date().getTime() - lastLoopRun > 15) {
        handleControls();
        setPosition();
        if(isMoving.p1)
            moveLaser('p1');
        if(isMoving.p2)
            moveLaser('p2');
        collision();
        checkHealth();
        lastLoopRun = new Date().getTime();
    }
    if(isGameOn)
        setTimeout(loop, 2);
}

document.onkeydown = function (evt) {
    toggleKey(evt.keyCode, true);
};

document.onkeyup = function (evt) {
    toggleKey(evt.keyCode, false);
};
