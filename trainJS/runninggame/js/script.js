var images = ["imgs/runner_2.png","imgs/runner_3.png","imgs/runner_4.png", "imgs/runner_3.png", "imgs/runner_2.png", "imgs/runner_1.png"];
var running;
var lane = 2;
var down = {};
var FPS = 30;
var updateFrame;
var runner = $("#runner");
var runnerimg = $("#runner > img");
var ob;

$(document).ready(function(e) {
	createObstacles();
	$("#startButton").click(function(e) {
        goRun();
    });
});

$(document).keydown(function(e) {
    switch(e.which) {
        case 32: // space
		jump();
        break;

        case 38: // up
		changeLine(1);
		
        break;

        case 40: // down
		changeLine(-1);
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

function goRun() {
	updateFrame = setInterval(update, 1000/FPS);
	
	running = setInterval(setImage, 100);
	runner.animate({
			left: "+=100px"
		}, 700, "linear" , function() { moveScene();
		});
}

function gameOver() {
	clearInterval(running);
	clearInterval(updateFrame);
	$("#playground").stop();
	$("#points").stop();
}

function update() {
	var runnery = runner.offset().top + runner.height();
	var runnerx = runner.offset().left + runner.width() - 50;
	
	for(var i = 0; i < ob.length; i++)
	{
		var obx1 = $(ob[i]).offset().left;
		var obx2 = $(ob[i]).offset().left + $(ob[i]).width();
		var oby1 = $(ob[i]).offset().top;
		var oby2 = $(ob[i]).offset().top + $(ob[i]).height();
		var oblane = $(ob[i]).data("lane");
		
		if (runnerx >= obx1 && runnerx <= obx2 && runnery >= oby1 && runnery <= oby2 && oblane === lane)
		{
			$("#end").removeClass("hide");
			gameOver();
			return;
		}
	}
}

function setImage() {
    images.push(images.shift());
	runnerimg.attr("src", images[0]);
}

function changeLine(direction) {
	if((lane == 1 && direction < 0) || (lane == 3 && direction > 0) || (lane == 2))
	{
		runner.animate({
			bottom: "+=" + (12 * direction * ((direction === 1) ? lane : (lane - direction))),
		}, 200);
		
		runnerimg.animate({
			width: "-=" + (12 * direction * ((direction === 1) ? lane : (lane - direction)))
		}, 200);
		
		lane -= direction;
	}
	else
	{
		return;
	}
}

function jump() {
	if (down['32'] == null) { // first press
		down['32'] = true; // record that the key's down
		clearInterval(running);
		runnerimg.attr("src", "imgs/runner_1.png");
		images = ["imgs/runner_2.png","imgs/runner_3.png","imgs/runner_4.png", "imgs/runner_3.png", "imgs/runner_2.png", "imgs/runner_1.png"];
		runner.animate({bottom: "+=200"},250).animate({bottom: "-=200"},250, function() {
			running = setInterval(setImage, 200);
			down['32'] = null;
			});
	}
}

function moveScene() {
	var sceneduration = 10000;
	var left = $('#playground').offset().left;
	$("#playground").css({left:left}).animate({"left":"-77%"}, sceneduration, "linear", function() {
		runner.animate({left: "+=300px"}, 600, "linear")
		.animate({left: "+=30px", bottom: "+=10px"}, 100, "linear")
		.animate({left: "+=100px", bottom: "+=80px"}, 400, "linear")
		.animate({left: "+=50px", bottom: "+=30px"}, 300, "linear")
		.animate({left: "+=50px", bottom: "+=10px"}, 200, "linear")
		.animate({left: "+=100px"}, 400, "linear" , function() {
				$("#pyre > img").attr("src","imgs/pyre_fire.svg");
				$("#oplympicPanel").show(200);
				gameOver();
			});
		});
		
	$("#points").css({left:left}).animate({"left":"-77%"},
		{
			duration: sceneduration,
			easing: "linear",
			step: function(now) {
				var cur = Math.round(now);
				switch(cur) {
					case -10:
					$("#amazon").show(200);
					$("#amazonPanel").show(200);
					break;
					
					case -25:
					$("#bahia").show(200);
					$("#bahiaPanel").show(200);
					break;
					
					case -40:
					$("#parana").show(200);
					$("#paranaPanel").show(200);
					break;
					
					case -52:
					$("#saopaulo").show(200);
					$("#saopauloPanel").show(200);
					break;
					
					case -65:
					$("#rio").show(200);
					$("#rioPanel").show(200);
					break;
			
					default: return; // exit this handler for other keys
				}
				
			}	
		}
	
	);
}

function createObstacles() {
	var numOb = Math.floor(Math.random() * 3) + 2; //Chỉ cho xuất hiện từ 5 đến 8 thanh chắn
	for(var i = 0; i < numOb; i++)
	{
		var oblane = Math.floor(Math.random() * 3);
		$(".runway").eq(oblane).append('<span class="obstacle" data-lane="' + (oblane + 1) + '"></span>');
	}
	
	ob = $(".obstacle");
	for(var i = 0; i < ob.length; i++)
	{
		$(".obstacle").eq(i).css("left", (Math.floor(Math.random() * 73) + 10 ) + "%"); //Đặt thanh chắn từ 10 đên 83% chiều dài đường chạy.
	}
}