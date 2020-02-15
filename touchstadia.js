function main(){
	const canvasElem = document.createElement("canvas");
	const canvasCtx = canvasElem.getContext("2d");
	
	const startTime = Date.now();

	const joystickRadius = 40;
	const joysticks = [
		{ color: "#82b4ff" }, // Left joystick
		{ color: "#ff8a82" }  // Right joystick
	]

	const emulatedGamepad = {
		id: "TouchStadia emulated gamepad",
		index: 0,
		connected: true,
		timestamp: 0,
		mapping: "standard",
		axes: [0, 0, 0, 0],
		buttons: []
	};

	for(let i = 0; i < 17; i++){
		emulatedGamepad.buttons[i] = {
			pressed: false,
			touched: false,
			value: 0
		}
	}

	canvasElem.style.cssText = "width:100%;height:100%;top:0;left:0;position:fixed;z-index:1000;overflow:hidden;touch-action:none;";
	canvasElem.width = window.innerWidth;
	canvasElem.height = window.innerHeight;

	const handleTouch = function(touch, state){
		const stickIndex = touch.clientX > window.innerWidth/2 ? 1 : 0;
		const stick = joysticks[stickIndex];
		if(state == 0){
			stick.active = true;
			stick.startX = stick.endX = touch.clientX;
			stick.startY = stick.endY = touch.clientY;
		}else if(state == 1){
			stick.endX = touch.clientX;
			stick.endY = touch.clientY;
		}else if (state == 2){
			stick.active = false;
			stick.startX = stick.endX = 0;
			stick.startY = stick.endY = 0;
		}
		stick.angle = Math.atan2(stick.startY - stick.endY, stick.startX - stick.endX) + Math.PI;
		stick.distance = Math.sqrt(Math.pow(stick.startX - stick.endX, 2) + Math.pow(stick.startY - stick.endY, 2)) / joystickRadius;
		if(stick.distance > 1) stick.distance = 1;
		stick.deltaX = stick.distance * Math.cos(stick.angle) * joystickRadius;
		stick.deltaY = stick.distance * Math.sin(stick.angle) * joystickRadius;
		//console.log(stickIndex + ", " + stick.deltaX + ", " + stick.deltaY);
	}

	const drawSticks = function(){
		canvasCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
		for(let i = 0; i < joysticks.length; i++){
			if(joysticks[i].active){
				// Draw joystick base
				canvasCtx.fillStyle = "#cccccc";
				canvasCtx.beginPath();
				canvasCtx.arc(joysticks[i].startX, joysticks[i].startY, joystickRadius, 0, 2 * Math.PI);
				canvasCtx.fill();

				// Draw joystick
				canvasCtx.fillStyle = joysticks[i].color;
				canvasCtx.beginPath();
				canvasCtx.arc(joysticks[i].startX + joysticks[i].deltaX, joysticks[i].startY + joysticks[i].deltaY, joystickRadius / 2, 0, 2 * Math.PI);
				canvasCtx.fill();
			}
		}
	}

	const setPositions = function(){
		setAxis(0, joysticks[0].deltaX / joystickRadius);
		setAxis(1, joysticks[0].deltaY / joystickRadius);
		setAxis(2, joysticks[1].deltaX / joystickRadius);
		setAxis(3, joysticks[1].deltaY / joystickRadius);
	}

	const pressButton = function(button, isPressed){
		emulatedGamepad.buttons[button].pressed = isPressed;
		emulatedGamepad.buttons[button].touched = isPressed;
		emulatedGamepad.buttons[button].value = isPressed ? 1 : 0;
		emulatedGamepad.timestamp = Date.now() - startTime;
	}

	const setAxis = function(axis, value){
		emulatedGamepad.axes[axis] = value;
		emulatedGamepad.timestamp = Date.now() - startTime;
	}

	document.addEventListener("touchstart", function(e){
		if(e.touches[0]) handleTouch(e.touches[0], 0);
		if(e.touches[1]) handleTouch(e.touches[1], 0);
		drawSticks();
		setPositions();
	}, false);

	document.addEventListener("touchmove", function(e){
		if(e.touches[0]) handleTouch(e.touches[0], 1);
		if(e.touches[1]) handleTouch(e.touches[1], 1);
		drawSticks();
		setPositions();
	}, false);
	
	document.addEventListener("touchend", function(e){
		if(e.changedTouches[0]) handleTouch(e.changedTouches[0], 2);
		if(e.changedTouches[1]) handleTouch(e.changedTouches[1], 2);
		drawSticks();
		setPositions();
	}, false);

	window.onload = function(){
		document.body.appendChild(canvasElem);
		console.log("TouchStadia canvas created!");
	}

	navigator.getGamepads = function(){ // The magic happens here
		return [emulatedGamepad, null, null, null];
	}
}
  
const injScript = document.createElement("script");
injScript.appendChild(document.createTextNode("(" + main + ")();"));
(document.body || document.head || document.documentElement).appendChild(injScript);