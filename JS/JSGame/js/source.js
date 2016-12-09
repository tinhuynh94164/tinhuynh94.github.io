
const FPS = 60;
const TICKS = 1000/FPS;
var speedArr = [1,2,5,10,20];

var score = 0;

var monsterWidth = 100;
var monsterHeight = 100;
var running = true;
var heart = 3;
var end = false;
var highScore = 0;
var level = 0;
var speed = 1;

// var killedMonsters = 0;

var boomNum = 3;
var bloodList = new Array();
//Init High Score
if(sessionStorage.getItem("highscore") == null) {
	sessionStorage.setItem("highscore",0);
} else {
	highScore = sessionStorage.getItem("highscore");
}

/*Declare and initiate monster attributes */
var monster1 = {
	initX:0,
	initY:0,
	x:0,
	y:0,
	toX:100,
	toY:100,
	initToX:100,
	initToY:100,
	die:false,
	dieX:0,
	dieY:0,
	visible:true
};
var monster2 = {
	initX:200,
	initY:0,
	x:200,
	y:0,
	toX:200,
	toY:100,
	initToX:200,
	initToY:100,
	die:false,
	dieX:0,
	dieY:0,
	visible:false
}

var monster3 = {
	initX:400,
	initY:0,
	x:400,
	y:0,
	toX:300,
	toY:100,
	initToX:300,
	initToY:100,
	die:false,
	dieX:0,
	dieY:0,
	visible:false
};

var monster4 = {
	initX:0,
	initY:200,
	x:0,
	y:200,
	toX:100,
	toY:200,
	initToX:100,
	initToY:200,
	die:false,
	dieX:0,
	dieY:0,
	visible:false
};

var monster5 = {
	initX:400,
	initY:200,
	x:400,
	y:200,
	toX:300,
	toY:200,
	initToX:300,
	initToY:200,
	die:false,
	dieX:0,
	dieY:0,
	visible:false
}

var monster6 = {
	initX:0,
	initY:400,
	x:0,
	y:400,
	toX:100,
	toY:300,
	initToX:100,
	initToY:300,
	die:false,
	dieX:0,
	dieY:0,
	visible:false
};

var monster7 = {
	initX:200,
	initY:400,
	x:200,
	y:400,
	toX:200,
	toY:300,
	initToX:200,
	initToY:300,
	die:false,
	dieX:0,
	dieY:0,
	visible:false
};

var monster8 = {
	initX:400,
	initY:400,
	x:400,
	y:400,
	toX:300,
	toY:300,
	initToX:300,
	initToY:300,
	die:false,
	dieX:0,
	dieY:0,
	visible:false
};


//Declare Main Canvas
mainCanvas = document.getElementById("mainCanvas");
ctx = mainCanvas.getContext("2d");

//Declare Footer Canvas
footerCanvas = document.getElementById("footerCanvas");
ctxFooter = footerCanvas.getContext("2d");

//Main Background
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function() {
	bgReady = true;
}
bgImage.src = "images/bg.png";

//Footer Background
var bgFooterReady = false;
var bgFooterImage = new Image();
bgFooterImage.onload = function() {
	bgFooterReady = true;
}
bgFooterImage.src = "images/footerbg.png";

//Heart
var heartReady = false;
var heartImage = new Image();
heartImage.onload = function() {
	heartReady = true;
}
heartImage.src  = "images/heart.png";

//Bom
var boomReady = false;
var boomImage = new Image();
boomImage.onload = function() {
	boomReady = true;
}
boomImage.src = "images/nuclear.png";

//Monster
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function() {
	monsterReady = true;
}
monsterImage.src = "images/monster.png";


//Blood
var bloodReady = false;
var bloodImage = new Image();
bloodImage.onload = function() {
	bloodReady = true;
}
bloodImage.src = "images/blood.png";

//Pause
var pauseReady = false;
var pauseImage = new Image();
pauseImage.onload = function() {
	pauseReady = true;
}
pauseImage.src = "images/pause.png";

//Restart
var resetReady = false;
var resetImage = new Image();
resetImage.onload = function() {
	resetReady = true;
}
resetImage.src = "images/reset.png";

//SOUND EFFECT 

var thumpSound = new Audio("res/thump.wav");
var gameoverSound = new Audio("res/gameover.wav");
var explosionSound = new Audio("res/bomb.wav");


//Add Event for objects
mainCanvas.addEventListener("click",function(e) {
	var xPosition = e.pageX - this.offsetLeft;
	var yPosition = e.pageY - this.offsetTop;
	score -= 5;
	heart--;

	if(monster1.visible) {
		clickMonster(xPosition,yPosition,monster1);
	}
	if(monster2.visible) {
		clickMonster(xPosition,yPosition,monster2);
	}
	if(monster3.visible) {
		clickMonster(xPosition,yPosition,monster3);
	}
	if(monster4.visible) {
		clickMonster(xPosition,yPosition,monster4);
	}
	if(monster5.visible) {
		clickMonster(xPosition,yPosition,monster5);
	}
	if(monster6.visible) {
		clickMonster(xPosition,yPosition,monster6);
	}
	if(monster7.visible) {
		clickMonster(xPosition,yPosition,monster7);
	}
	if(monster8.visible) {
		clickMonster(xPosition,yPosition,monster8);
	}
});

//Add right click event.
mainCanvas.addEventListener("contextmenu", function(e) {
	e.preventDefault();
	if(boomNum > 0) {
		boomNum--;
		if(running) {
			explosionSound.play();
		}
		if(monster1.visible == true) {
			monster1.visible = false;
			score += 10;
		}
		if(monster2.visible == true) {
			monster2.visible = false;
			score += 10;
		}
		if(monster3.visible == true) {
			monster3.visible = false;
			score += 10;
		}
		if(monster4.visible == true) {
			monster4.visible = false;
			score += 10;
		}
		if(monster5.visible == true) {
			monster5.visible = false;
			score += 10;
		}
		if(monster6.visible == true) {
			monster6.visible = false;
			score += 10;
		}
		if(monster7.visible == true) {
			monster7.visible = false;
			score += 10;
		}
		if(monster8.visible == true) {
			monster8.visible = false;
			score += 10;
		}
		setTimeout(function() {
			randomMonster();
		}, 1000);
	}
});

//Add callback event when having perfectly click on monster.
function clickMonster(currX, currY, monster) {
	if(currX >= monster.x && currX <= monster.x + 100 && currY >= monster.y && currY <= monster.y + 100) {
		score += 10;
		heart++;

		monster.visible = false;
		monster.die = true;
		monster.dieX = currX;
		monster.dieY = currY;
		monster.x = monster.initX;
		monster.y = monster.initY;
		monster.toX = monster.initToX;
		monster.toY = monster.initToY;

		var blood = {};
		blood.x = monster.dieX;
		blood.y = monster.dieY;

		bloodList[bloodList.length] = blood;

		if(bloodList.length > 8) {
			bloodList.splice(0,1);
		}
		var levelBefore = level;
		level = Math.floor(score/100);
		if(level < levelBefore) {
			level = levelBefore;
		}

		if(level > 8) {
			level = 8;
		}
		for(li = 0; li <= level; li++) {
			randomMonster();
		}
		increaseSpeed(level);

		if(running) {
			thumpSound.play();
		}
	} 
}

function increaseSpeed(level) {
	speed = speedArr[level];
}

function randomMonster() {
	var random = Math.floor((Math.random() * 8) + 1);
	switch (random) {
		case 1:
		if(!monster1.visible) {
			monster1.visible = true;
			monster1.die = false;
		}
		break;
		case 2:
		if(!monster2.visible) {
			monster2.visible = true;
			monster2.die = false;
		}
		break;
		case 3:
		if(!monster3.visible) {
			monster3.visible = true;
			monster3.die = false;
		}
		break;
		case 4:
		if(!monster4.visible) {
			monster4.visible = true;
			monster4.die = false;
		}
		break;
		case 5:
		if(!monster5.visible) {
			monster5.visible = true;
			monster5.die = false;
		}
		break;
		case 6:
		if(!monster6.visible) {
			monster6.visible = true;
			monster6.die = false;
		}
		break;
		case 7:
		if(!monster7.visible) {
			monster7.visible = true;
			monster7.die = false;
		}
		break;
		case 8:
		if(!monster8.visible) {
			monster8.visible = true;
			monster8.die = false;
		}
		break;
	}
}

//Draw objects to mainCanvas.
//Include backgroud, monsters, blood stains, control buttons.
function render() {
	if(bgReady) {
		ctx.drawImage(bgImage,0,0);
	}

	if(bloodReady) {
		if(bloodList.length > 0) {
			for(bi = 0; bi < bloodList.length; bi++) {
				ctx.drawImage(bloodImage,bloodList[bi].x - 50, bloodList[bi].y - 50);
			}

		}
	}

	if(monsterReady) {
		if(monster1.visible)
			ctx.drawImage(monsterImage, monster1.x, monster1.y);
		if(monster2.visible)
			ctx.drawImage(monsterImage, monster2.x, monster2.y);
		if(monster3.visible)
			ctx.drawImage(monsterImage, monster3.x, monster3.y);
		if(monster4.visible)
			ctx.drawImage(monsterImage, monster4.x, monster4.y);
		if(monster5.visible)
			ctx.drawImage(monsterImage, monster5.x, monster5.y);
		if(monster6.visible)
			ctx.drawImage(monsterImage, monster6.x, monster6.y);
		if(monster7.visible)
			ctx.drawImage(monsterImage, monster7.x, monster7.y);
		if(monster8.visible)
			ctx.drawImage(monsterImage, monster8.x, monster8.y);
	}


	ctx.fillStyle = "#FFF";
	ctx.font = "24px Arial";
	ctx.textAlign = "left";
	ctx.textBaseLine = "top";
	ctx.fillText(boomNum,430,32);

	
	if(boomReady) {
		ctx.drawImage(boomImage,450,2);
	}

	ctx.fillStyle = "#4CAF50";
	ctx.font = "24px Arial";
	ctx.textAlign = "left";
	ctx.textBaseLine = "top";
	ctx.fillText("Score: " + score,32,32);

	if(bgFooterReady) {
		ctxFooter.drawImage(bgFooterImage,0,0);
	}

	if(pauseReady) {
		ctxFooter.drawImage(pauseImage,20,9);
	}

	if(resetReady) {
		ctxFooter.drawImage(resetImage,80,9);
	}

	if(heartReady) {
		var xHeart =150;
		for(hi = 1; hi <= heart; hi++) {
			ctxFooter.drawImage(heartImage,xHeart,13);
			xHeart += 34;
		}
	}
	highScore = sessionStorage.getItem("highscore");
	ctxFooter.fillStyle = "#4CAF50";
	ctxFooter.font = "24px Arial";
	ctxFooter.textAlign = "left";
	ctxFooter.textBaseLine = "top";
	
	ctxFooter.fillText("High Score: " + highScore, 300, 30);

}

//Add event listen for footer canvas
footerCanvas.addEventListener("click",function(e) {
	var xClick = e.pageX - this.offsetLeft;
	var yClick = e.pageY - this.offsetTop;

	if(xClick >= 20 && xClick <= 52) {
		
		if(running == true) {
			running = false;
		}
		else if(running == false) {
			running = true;
			main();
		}
	}
	if(xClick >= 80 && xClick <= 112) {
		resetGame();
	}
});

//Update coordinate for each monster
function update() {
	if(monster1.visible)
		updateMonster(monster1);
	if(monster2.visible)
		updateMonster(monster2);
	if(monster3.visible)
		updateMonster(monster3);
	if(monster4.visible)
		updateMonster(monster4);
	if(monster5.visible)
		updateMonster(monster5);
	if(monster6.visible)
		updateMonster(monster6);
	if(monster7.visible)
		updateMonster(monster7);
	if(monster8.visible)
		updateMonster(monster8);
}

/*
This function help monster know how to move in mainCanvas.
*/
function updateMonster(monster) {
	if(monster.x > monster.toX) {
		monster.x -= speed ;
	} else if(monster.x < monster.toX) {
		monster.x += speed;
	}

	if(monster.y > monster.toY) {
		monster.y -= speed;
	} else if(monster.y < monster.toY) {
		monster.y += speed;
	}

	if(monster.x == monster.toX && monster.y == monster.toY) {
		monster.x = monster.toX;
		monster.y = monster.toY;
		monster.toX = monster.initX;
		monster.toY = monster.initY;
	}

	if(monster.x == monster.initX && monster.y == monster.initY) {
		monster.visible = false;
		monster.x = monster.initX;
		monster.y = monster.initY;
		monster.toX = monster.initToX;
		monster.toY = monster.initToY;
		score -= 10;
		randomMonster();
	}
	
}

//Keyboard Event 
window.onkeydown = canvas_keyDown;
function canvas_keyDown(e) {
	if(e.keyCode == 27 && running == true) {
		running = false;
		console.log("PAUSE");
	} else if(e.keyCode == 27 && running == false) {
		running = true;
		main();
	}
}

//Reset all attributes to initial value. 
function resetGame() {
	initMonster(monster1);
	initMonster(monster2);
	initMonster(monster3);
	initMonster(monster4);
	initMonster(monster5);
	initMonster(monster6);
	initMonster(monster7);
	initMonster(monster8);

	level = 0;
	running = true;
	score = 0;
	heart = 3;
	highScore = sessionStorage.getItem("highscore");
	boomNum = 3;
	bloodList = new Array();
	console.log("BLOOD : " + bloodList.length);

	monster1.visible = true;
	main();
}

//End game
function endGame() {
	end = true;
	running = false;
}

//Initiate monster attributes to default
function initMonster(monster) {
	monster.x = monster.initX;
	monster.y = monster.initY;
	monster.toX = monster.initToX;
	monster.toY = monster.initToY;
	speed = 1;
	monster.die = false;
	monster.dieX = 0;
	monster.visible = false;
}
/*Main function
This function is main function.
Game Loop by defined time and FPS.
*/
function main() {
	if(heart <= 0) {
		endGame();
	}
	var now = Date.now();
	var differentTime = now - lastUpdateTime;
	if(differentTime >= TICKS) {
		update();
		render();
		lastUpdateTime = now;
	}
	var sleepTime = TICKS - differentTime;
	if(sleepTime < 0) {
		sleepTime = 0;
	} 
	if(running) {
		requestAnimationFrame(main);
	} else if (!running && !end) {
		ctx.fillStyle = "#F1F1F1";
		ctx.font = "30px Arial"
		ctx.fillText("PAUSE", 200, 250);
	} else if(!running && end) {
		if(score > highScore) {
			highScore = score;
			sessionStorage.setItem("highscore",score);
			console.log("HIGH SCORE: " + score);

			ctx.fillStyle = "#F1F1F1";
			ctx.font = "20px Arial"
			ctx.fillText("NEW HIGHSCORE: " + highScore, 150, 280);
		}
		console.log("GAME OVER");
		ctx.fillStyle = "#F1F1F1";
		ctx.font = "30px Arial"
		ctx.fillText("GAME OVER", 150, 250);
		gameoverSound.play();
	}

}


// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
var lastUpdateTime = Date.now();

main();