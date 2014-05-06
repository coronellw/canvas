var canvas, context, posx = 10, posy = 10, dirx = 1, diry = 1, allposx=[], allposy=[], moving = false;

function moverMotor(){
	var contenedor = document.getElementById("contenedor");
	canvas = null;
	contenedor.innerHTML = "";
	canvas = document.createElement("canvas")
	canvas.height = document.getElementById("alto").value;
	canvas.width = document.getElementById("ancho").value;
	/*dirx = document.getElementById("speed").value;
	diry = document.getElementById("speed").value;*/
	// alert("speed value = "+dirx);
	context = canvas.getContext("2d");
	contenedor.appendChild(canvas);
	toggleAnimation();
	animateMotor();
}

function animateMotor(){
	// alert("startAnimation");
	if ((posx <= 5)||(posx >= canvas.width-5)) {
		dirx*=-1;
		// alert("cambio de dir en x "+dirx);
	};

	if ((posy <= 5)||(posy >= canvas.height-5)) {
		diry*=-1;
		// alert("cambio de dir en y "+diry);
	};

	posx = posx + dirx;
	posy = posy + diry;	
	allposy.push(posy);
	allposx.push(posx);
	// console.log(posx);

	context.fillStyle = "black";
	context.fillRect(0, 0, canvas.width, canvas.height);

	context.fillStyle = "red";
	context.beginPath();
	context.arc(posx, posy, 10, 0, Math.PI*2);
	context.fill();
	if (moving) {
		setInterval(animateMotor(), 30);
	};
}

function writeArray(arreglo){
	for (var i = 0; i <= arreglo.length - 1; i++) {
		console.log("Arreglo["+i+"]="+arreglo[i]);
	};
}

function toggleAnimation(){
	// alert(document.getElementById("control").innerHTML);
	if(document.getElementById("control").innerHTML == "play"){
		moving = true;
		document.getElementById("control").innerHTMLalue = "pause";
	}else{
		if(document.getElementById("control").innerHTML == "pause"){
			moving = false;
			document.getElementById("control").innerHTML = "play";
		}else{
			document.getElementById("control").innerHTML = "play";
			moverMotor();
		}
	}
}