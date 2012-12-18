//######################################
// Contains all constants and variables.
//######################################

// Common constants and variables.
var canvas, ctx;
var hero;
var apples = [];
var width;
var height;
var direction;
var TotalScore;
var gameOver;
var gameLevel;
var pause;
var newAppleInterval;
var db;
var InGameMenu = null;
var newPos;
var clickedEvent = false;
var gameTime = 0;

var catchedMessages = ["Catched!", "YEAH!", "Pick!", "Good!", "Perfect!", "Excellent!", "RAMPAGE!!!"];

var ApplesType = {
    NORMAL : 1,
    WORMY : 2,
    CONFUSED : 3,
    BONUS : 4
}

var Bonus = {
    UMBRELLA : 1,
    SLOW : 2,
    JOLT : 3,
    LIFE : 4,
    STUN : 5
}

// Hero constants and variables.
var frameWidth = 60;
var heroWidth = 60;
var heroHeight = 65;
var maxSpeedY = 15;
var maxSpeedX = 10;
var gravity = 9.8;
var frameCount = 5;
var fallingLambda = 0.5;
var confuseTimeout = 4000;

// Constants and variables related to game objects (apples, bonuses etc.)
var appleWidth = 50;
var appleHeight = 57;
var appleFrameCount = 5;
var appleRiperingSpeed = 2;
var appleLowSpeed = 2;

// disappearing timeouts
var normalDisTimeout = 5000;
var wormyDisTimeout = 3000;
var bonusDisTimeout = 4000;
var dissapearingTick = 40;

var normalAppleTexture = new Image();
normalAppleTexture.src = 'img/normalApple.png';

var bonusAppleTexture = new Image();
bonusAppleTexture.src = 'img/bonusApple.png';

var wormyAppleTexture = new Image();
wormyAppleTexture.src = 'img/wormyApple.png';

// audio
var prevSelected;
var gatheringAudio;
var strikeAudio;
var menuChangeAudio;
var gameOverAudio;