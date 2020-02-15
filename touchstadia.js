function main(){
	const touches = {
		START: "start",
		MOVE: "move",
		END: "end"
	}

	const canvasElem = document.createElement("canvas");
	const canvasCtx = canvasElem.getContext("2d");
	
	const startTime = Date.now();

	const stickRadius = 40;
	const sticks = [
		{ color: "#82b4ff88" }, // Left joystick
		{ color: "#ff8a8288" }  // Right joystick
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

	const handleStickTouch = function(touch, type){
		const stickIndex = touch.clientX > window.innerWidth/2 ? 1 : 0;
		const stick = sticks[stickIndex];
		switch(type){
			case touches.START:
				stick.active = true;
				stick.startX = stick.endX = touch.clientX;
				stick.startY = stick.endY = touch.clientY;
				break;
			case touches.MOVE:
				stick.endX = touch.clientX;
				stick.endY = touch.clientY;
				break;
			case touches.END:
				stick.active = false;
				stick.startX = stick.endX = 0;
				stick.startY = stick.endY = 0;
				break;
		}
		stick.angle = Math.atan2(stick.startY - stick.endY, stick.startX - stick.endX) + Math.PI;
		stick.distance = Math.sqrt(Math.pow(stick.startX - stick.endX, 2) + Math.pow(stick.startY - stick.endY, 2)) / stickRadius;
		if(stick.distance > 1) stick.distance = 1;
		stick.deltaX = stick.distance * Math.cos(stick.angle) * stickRadius;
		stick.deltaY = stick.distance * Math.sin(stick.angle) * stickRadius;
		//console.log(stickIndex + ", " + stick.deltaX + ", " + stick.deltaY);
	}

	const drawSticks = function(){
		canvasCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
		for(let i = 0; i < sticks.length; i++){
			if(sticks[i].active){
				// Draw joystick base
				canvasCtx.fillStyle = "#cccccc55";
				canvasCtx.beginPath();
				canvasCtx.arc(sticks[i].startX, sticks[i].startY, stickRadius, 0, 2 * Math.PI);
				canvasCtx.fill();

				// Draw joystick
				canvasCtx.fillStyle = sticks[i].color;
				canvasCtx.beginPath();
				canvasCtx.arc(sticks[i].startX + sticks[i].deltaX, sticks[i].startY + sticks[i].deltaY, stickRadius / 2, 0, 2 * Math.PI);
				canvasCtx.fill();
			}
		}
	}

	const setStickPositions = function(){
		setAxis(0, sticks[0].deltaX / stickRadius);
		setAxis(1, sticks[0].deltaY / stickRadius);
		setAxis(2, sticks[1].deltaX / stickRadius);
		setAxis(3, sticks[1].deltaY / stickRadius);
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

	canvasElem.addEventListener("touchstart", function(e){
		if(e.touches[0]) handleStickTouch(e.touches[0], touches.START);
		if(e.touches[1]) handleStickTouch(e.touches[1], touches.START);
		drawSticks();
		setStickPositions();
	}, false);

	canvasElem.addEventListener("touchmove", function(e){
		if(e.touches[0]) handleStickTouch(e.touches[0], touches.MOVE);
		if(e.touches[1]) handleStickTouch(e.touches[1], touches.MOVE);
		drawSticks();
		setStickPositions();
	}, false);
	
	canvasElem.addEventListener("touchend", function(e){
		if(e.changedTouches[0]) handleStickTouch(e.changedTouches[0], touches.END);
		if(e.changedTouches[1]) handleStickTouch(e.changedTouches[1], touches.END);
		drawSticks();
		setStickPositions();
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