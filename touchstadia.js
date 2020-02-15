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
	const buttonDiameter = 60;
	const buttonBorderOffset = 20;
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
		buttons: [
			{
				label: "A", // 0
				color: "#7dc242",
				locRight: buttonDiameter,
				locBottom: 0
			},
			{
				label: "B", // 1
				color: "#ed1c24",
				locRight: 0,
				locBottom: buttonDiameter
			},
			{
				label: "X", // 2
				color: "#24bcee",
				locRight: buttonDiameter * 2,
				locBottom: buttonDiameter
			},
			{
				label: "Y", // 3
				color: "#f0ea1b",
				locRight: buttonDiameter,
				locBottom: buttonDiameter * 2
			},
			{
				label: "L1", // 4
				color: "#636466",
				locLeft: 0,
				locTop: buttonDiameter
			},
			{
				label: "R1", // 5
				color: "#636466",
				locRight: 0,
				locTop: buttonDiameter
			},
			{
				label: "L2", // 6
				color: "#636466",
				locLeft: 0,
				locTop: 0
			},
			{
				label: "R2", // 7
				color: "#636466",
				locRight: 0,
				locTop: 0
			},
			{
				label: "Se", // 8
				color: "#7a24ee",
				locLeft: buttonDiameter * 3,
				locTop: 0
			},
			{
				label: "St", // 9
				color: "#7a24ee",
				locRight: buttonDiameter * 3,
				locTop: 0
			},
			{
				label: "L3", // 10
				color: "#636466",
				locLeft: buttonDiameter * 5,
				locBottom: 0
			},
			{
				label: "R3", // 11
				color: "#636466",
				locRight: buttonDiameter * 5,
				locBottom: 0
			},
			{
				label: "⇧", // 12
				color: "#636466",
				locLeft: buttonDiameter,
				locBottom: buttonDiameter * 2
			},
			{
				label: "⇩", // 13
				color: "#636466",
				locLeft: buttonDiameter,
				locBottom: 0
			},
			{
				label: "⇦", // 14
				color: "#636466",
				locLeft: 0,
				locBottom: buttonDiameter
			},
			{
				label: "⇨", // 15
				color: "#636466",
				locLeft: buttonDiameter * 2,
				locBottom: buttonDiameter
			},
			{
				label: "H", // 16
				color: "#ed591c",
				locRight: buttonDiameter * 6,
				locTop: 0
			},
		]
	};

	for(let i = 0; i < emulatedGamepad.buttons.length; i++){
		const buttonElem = document.createElement("div");
		buttonElem.innerText = emulatedGamepad.buttons[i].label;
		buttonElem.style.cssText = "position:fixed;z-index:1000;vertical-align:middle;display:table-cell;text-align:center;color:#ffffff;";
		buttonElem.style.cssText += "width:" + buttonDiameter + "px;height:" + buttonDiameter + "px;border-radius:" + buttonDiameter + "px;font-size:" + buttonDiameter + "px;";
		buttonElem.style.cssText += "background-color:" + emulatedGamepad.buttons[i].color + ";";
		if(typeof emulatedGamepad.buttons[i].locLeft !== "undefined") buttonElem.style.cssText += "left:" + (emulatedGamepad.buttons[i].locLeft + buttonBorderOffset) + "px;";
		if(typeof emulatedGamepad.buttons[i].locRight !== "undefined") buttonElem.style.cssText += "right:" + (emulatedGamepad.buttons[i].locRight + buttonBorderOffset) + "px;";
		if(typeof emulatedGamepad.buttons[i].locTop !== "undefined") buttonElem.style.cssText += "top:" + (emulatedGamepad.buttons[i].locTop + buttonBorderOffset) + "px;";
		if(typeof emulatedGamepad.buttons[i].locBottom !== "undefined") buttonElem.style.cssText += "bottom:" + (emulatedGamepad.buttons[i].locBottom + buttonBorderOffset) + "px;";
		emulatedGamepad.buttons[i].buttonElem = buttonElem;

		emulatedGamepad.buttons[i].pressed = false;
		emulatedGamepad.buttons[i].touched = false;
		emulatedGamepad.buttons[i].value = 0;
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
		for(let i = 0; i < emulatedGamepad.buttons.length; i++){
			document.body.appendChild(emulatedGamepad.buttons[i].buttonElem);
			emulatedGamepad.buttons[i].buttonElem.addEventListener("touchstart", function(){
				pressButton(i, true);
			}, false);
			emulatedGamepad.buttons[i].buttonElem.addEventListener("touchend", function(){
				pressButton(i, false);
			}, false);
		}
		console.log("TouchStadia canvas and buttons created!");
	}

	navigator.getGamepads = function(){ // The magic happens here
		return [emulatedGamepad, null, null, null];
	}
}
  
const injScript = document.createElement("script");
injScript.appendChild(document.createTextNode("(" + main + ")();"));
(document.body || document.head || document.documentElement).appendChild(injScript);