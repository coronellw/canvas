var canvas, context, posx = 10, posy = 10, dirx = 1, diry = 1, moving = false;
var stage, sunShape, timer, countDown=10, count=0, interval_id = 0, timeTxt;

window.onload = function(){
	// moverMotor();
}

function moverMotor(){
	var contenedor = document.getElementById("contenedor");
	canvas = null;
	contenedor.innerHTML = "";
	canvas = document.createElement("canvas")
	canvas.height = document.getElementById("alto").value;
	canvas.width = document.getElementById("ancho").value;
	dirx = parseInt(document.getElementById("speed").value);
	diry = parseInt(document.getElementById("speed").value);
	timer = parseInt(document.getElementById("time").value);
	timer *=1000;
	stage = new createjs.Stage(canvas);
	context = canvas.getContext("2d");
	contenedor.appendChild(canvas);

	sunShape = new createjs.Shape();
	sunShape.graphics.beginFill("#f00");
	sunShape.graphics.drawCircle(0,0,10);
	sunShape.graphics.endFill();
	sunShape.x = 20;
	sunShape.y = 20;
	stage.addChild(sunShape);
	count = 2;
	moving = true;
	countDown = timer;
	if (timer > 0) {
		document.getElementById("remaining").innerHTML = countDown/1000 +" segundos";
		interval_id = setInterval(function(){ 
			countDown = timer - 1000*(count+1);
			count++;
			console.log(countDown/1000);
		},1000);
		window.setTimeout(function(){stopAnimation();},timer);
	} 
	
	// createjs.Tween.get(sunShape, {loop:true}).to({x:240, y:240}, 1000).to({x:10,y:240}, 2000).to({x:240, y:10}, 2000).to({x:10, y:10},1000);

	createjs.Ticker.addEventListener("tick", tickHandler);
}

function tickHandler(e){
	if (moving) {
		moverPunto();
		if (timer <= 0) {
			timeTxt = "ciclico"
		}else{
			if (countDown == 0) {
				timeTxt = timer/1000 + " segundos"
			} else{
				timeTxt = countDown/1000 +" segundos";
			};
		}
		document.getElementById("remaining").innerHTML = timeTxt;
	}
	stage.update();
}

function moverPunto(){
	if ((sunShape.x < 10)||(sunShape.x > canvas.width - 10)) {
		dirx*=-1;
	};
	if ((sunShape.y < 10)||(sunShape.y > canvas.height - 10)) {
		diry*=-1;
	};

	sunShape.x += dirx;
	sunShape.y += diry;
}

function stopAnimation(){
	createjs.Tween.get(sunShape, {loop:false}).to({x:10, y:10}, 1000);
	moving = false;
	countDown = 0;
	clearInterval(interval_id);

	toggleControls();
	document.getElementById("remaining").innerHTML = " 0 segundos"
	document.getElementById("control").innerHTML = "start";
}


function toggleAnimation(){
	var texto = document.getElementById("control").innerHTML;
	if( texto == "play"){
		moving = true;
		document.getElementById("control").innerHTML = "pause";
	}else{
		if (texto == "pause") {
			moving = false;
			document.getElementById("control").innerHTML = "play";
		} else{
			console.log("Starting animation...");
			moving = true;
			toggleControls();			
			moverMotor();
			countDown = 0;
			count = 0;
			// document.getElementById("remaining").innerHTML = timer/1000 +" segundos";
			document.getElementById("control").innerHTML = "pause";
		};
	}
}

function toggleControls(){
	document.getElementById("ancho").disabled = document.getElementById("ancho").disabled? false:true;
	document.getElementById("alto").disabled = document.getElementById("alto").disabled? false:true;
	document.getElementById("speed").disabled = document.getElementById("speed").disabled? false:true;
	document.getElementById("time").disabled = document.getElementById("time").disabled? false:true;
	document.getElementById("stop").disabled = document.getElementById("stop").disabled? false:true;
}