function main(){
	const touches = {
		START: "start",
		MOVE: "move",
		END: "end"
	}

	const canvasElem = document.createElement("canvas");
	const canvasCtx = canvasElem.getContext("2d");
	
	const startTime = Date.now();

	const zIndex = 6000;

	const sticks = [
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
		buttons: [
			{
				label: "A", // 0
				color: "#7dc242",
				locRight: buttonDiameter,
				locBottom: 0,
				scale: 1,
				img: "img/controls/A"
			},
			{
				label: "B", // 1
				color: "#ed1c24",
				locRight: 0,
				locBottom: buttonDiameter,
				scale: 1,
				img: "img/controls/B"
			},
			{
				label: "X", // 2
				color: "#24bcee",
				locRight: buttonDiameter * 2,
				locBottom: buttonDiameter,
				scale: 1,
				img: "img/controls/X"
			},
			{
				label: "Y", // 3
				color: "#f0ea1b",
				locRight: buttonDiameter,
				locBottom: buttonDiameter * 2,
				scale: 1,
				img: "img/controls/Y"
			},
			{
				label: "L1", // 4
				color: "#636466",
				locLeft: 0,
				locTop: buttonDiameter * 1.4,
				scale: 2,
				img: "img/controls/L1"
			},
			{
				label: "R1", // 5
				color: "#636466",
				locRight: 0,
				locTop: buttonDiameter * 1.4,
				scale: 2,
				img: "img/controls/R1"
			},
			{
				label: "L2", // 6
				color: "#636466",
				locLeft: 0,
				locTop: 0,
				scale: 2,
				img: "img/controls/L2"
			},
			{
				label: "R2", // 7
				color: "#636466",
				locRight: 0,
				locTop: 0,
				scale: 2,
				img: "img/controls/R2"
			},
			{
				label: "Se", // 8
				color: "#7a24ee",
				locLeft: buttonDiameter * 5,
				locTop: buttonDiameter * 1.1,
				scale: 1.2,
				img: "img/controls/select"
			},
			{
				label: "St", // 9
				color: "#7a24ee",
				locRight: buttonDiameter * 5,
				locTop: buttonDiameter * 1.1,
				scale: 1.2,
				img: "img/controls/start"
			},
			{
				label: "L3", // 10
				color: "#636466",
				locLeft: buttonDiameter * 5,
				locBottom: 0,
				scale: 1,
				img: "img/controls/L3"
			},
			{
				label: "R3", // 11
				color: "#636466",
				locRight: buttonDiameter * 5,
				locBottom: 0,
				scale: 1,
				img: "img/controls/R3"
			},
			{
				label: "⇧", // 12
				color: "#636466",
				locLeft: buttonDiameter,
				locBottom: buttonDiameter * 2,
				scale: 1,
				img: "img/controls/up"
			},
			{
				label: "⇩", // 13
				color: "#636466",
				locLeft: buttonDiameter,
				locBottom: 0,
				scale: 1,
				img: "img/controls/down"
			},
			{
				label: "⇦", // 14
				color: "#636466",
				locLeft: 0,
				locBottom: buttonDiameter,
				scale: 1,
				img: "img/controls/left"
			},
			{
				label: "⇨", // 15
				color: "#636466",
				locLeft: buttonDiameter * 2,
				locBottom: buttonDiameter,
				scale: 1,
				img: "img/controls/right"
			},
			{
				label: "H", // 16
				color: "#ed591c",
				locLeft: window.innerWidth/2 - buttonDiameter/2 - buttonBorderLeftOffset,
				locBottom: 0,
				scale: 1,
				img: "img/controls/home",
				dynUpd: true
			},
		]
	};

	const imgExt = ".svg";

	for(let i = 0; i < emulatedGamepad.buttons.length; i++){
		const buttonElem = document.createElement("img");

		buttonElem.src = extUrl + emulatedGamepad.buttons[i].img + imgExt;
		buttonElem.style.cssText = "position:fixed;z-index:" + (zIndex+1) + ";";
		buttonElem.style.cssText += "width:" + buttonDiameter*emulatedGamepad.buttons[i].scale + "px;";
		buttonElem.style.cssText += "opacity:" + ((opacity/255) * 100) + "%;";

		if(typeof emulatedGamepad.buttons[i].locLeft !== "undefined") buttonElem.style.left = (emulatedGamepad.buttons[i].locLeft + buttonBorderLeftOffset) + "px";
		if(typeof emulatedGamepad.buttons[i].locRight !== "undefined") buttonElem.style.right = (emulatedGamepad.buttons[i].locRight + buttonBorderRightOffset) + "px";
		if(typeof emulatedGamepad.buttons[i].locTop !== "undefined") buttonElem.style.top = (emulatedGamepad.buttons[i].locTop + buttonBorderTopOffset) + "px";
		if(typeof emulatedGamepad.buttons[i].locBottom !== "undefined") buttonElem.style.bottom = (emulatedGamepad.buttons[i].locBottom + buttonBorderBottomOffset) + "px";

		emulatedGamepad.buttons[i].pressed = false;
		emulatedGamepad.buttons[i].touched = false;
		emulatedGamepad.buttons[i].value = 0;

		emulatedGamepad.buttons[i].buttonElem = buttonElem;
	}

	canvasElem.style.cssText = "width:100%;height:100%;top:0;left:0;position:fixed;z-index:" + zIndex +";overflow:hidden;touch-action:none;";
	canvasElem.width = window.innerWidth;
	canvasElem.height = window.innerHeight;

	const handleStickTouch = function(touch, type){
		const stickIndex = touch.clientX > window.innerWidth/2 ? 1 : 0;
		const stick = sticks[stickIndex];
		switch(type){
			case touches.START:
				if(!stick.active){
					stick.active = true;
					stick.startX = stick.endX = touch.clientX;
					stick.startY = stick.endY = touch.clientY;
				}
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
		if(!drawSticksEn) return;
		canvasCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
		for(let i = 0; i < sticks.length; i++){
			if(sticks[i].active){
				// Draw joystick base
				canvasCtx.fillStyle = "#cccccc" + opacity.toString(16);
				canvasCtx.beginPath();
				canvasCtx.arc(sticks[i].startX, sticks[i].startY, stickRadius, 0, 2 * Math.PI);
				canvasCtx.fill();

				// Draw joystick
				canvasCtx.fillStyle = sticks[i].color + opacity.toString(16);
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
		emulatedGamepad.buttons[button].buttonElem.style.filter = isPressed ? "brightness(0)" : "";
		emulatedGamepad.timestamp = Date.now() - startTime;
	}

	const setAxis = function(axis, value){
		emulatedGamepad.axes[axis] = value;
		emulatedGamepad.timestamp = Date.now() - startTime;
	}

	canvasElem.addEventListener("touchstart", function(e){
		e.preventDefault();
		if(e.touches[0] && document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) === canvasElem) handleStickTouch(e.touches[0], touches.START);
		if(e.touches[1] && document.elementFromPoint(e.touches[1].clientX, e.touches[1].clientY) === canvasElem) handleStickTouch(e.touches[1], touches.START);
		setStickPositions();
		drawSticks();
	}, false);

	canvasElem.addEventListener("touchmove", function(e){
		e.preventDefault();
		if(e.touches[0] && document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) === canvasElem) handleStickTouch(e.touches[0], touches.MOVE);
		if(e.touches[1] && document.elementFromPoint(e.touches[1].clientX, e.touches[1].clientY) === canvasElem) handleStickTouch(e.touches[1], touches.MOVE);
		setStickPositions();
		drawSticks();
	}, false);
	
	canvasElem.addEventListener("touchend", function(e){
		e.preventDefault();
		if(e.changedTouches[0] && document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY) === canvasElem) handleStickTouch(e.changedTouches[0], touches.END);
		if(e.changedTouches[1] && document.elementFromPoint(e.changedTouches[1].clientX, e.changedTouches[1].clientY) === canvasElem) handleStickTouch(e.changedTouches[1], touches.END);
		setStickPositions();
		drawSticks();
	}, false);

	window.onload = function(){
		document.body.appendChild(canvasElem);
		for(let i = 0; i < emulatedGamepad.buttons.length; i++){
			document.body.appendChild(emulatedGamepad.buttons[i].buttonElem);
			emulatedGamepad.buttons[i].buttonElem.addEventListener("touchstart", function(e){
				e.preventDefault();
				pressButton(i, true);
			}, false);
			emulatedGamepad.buttons[i].buttonElem.addEventListener("touchend", function(e){
				e.preventDefault();
				pressButton(i, false);
			}, false);
		}
		console.log("TouchStadia canvas and buttons created!");
	}

	window.onresize = function(){
		canvasElem.width = window.innerWidth;
		canvasElem.height = window.innerHeight;
		for(let i = 0; i < emulatedGamepad.buttons.length; i++){
			if(emulatedGamepad.buttons[i].dynUpd){ //TODO: This is gross, do something different
				const newLoc = (window.innerWidth/2 - buttonDiameter/2) + "px";
				emulatedGamepad.buttons[i].buttonElem.style.left = newLoc;
			}
		}
	}

	navigator.getGamepads = function(){ // The magic happens here
		return [emulatedGamepad, null, null, null];
	}
}

chrome.storage.sync.get([
	"stickRadius", "buttonDiameter", "buttonBorderLeftOffset", "buttonBorderRightOffset", "buttonBorderTopOffset", "buttonBorderBottomOffset", "opacity", "drawSticksEn"
], function(settings) {
	settings.extUrl = chrome.runtime.getURL("/");
	let injVarTxt = "";
	const settingsKeys = Object.keys(settings);
	console.log(settings);
	for (const key of settingsKeys) {
		if(typeof settings[key] === "number" || typeof settings[key] === "boolean"){
			injVarTxt += "const " + key + " = " + settings[key] + ";";
		}else if(typeof settings[key] === "string"){
			injVarTxt += "const " + key + " = \"" + settings[key] + "\";";
		}else{
			console.error("Invalid setting type!");
		}
	}
	const injScript = document.createElement("script");
	injScript.appendChild(document.createTextNode("(" + (main + "").slice(0, 16) + injVarTxt + (main + "").slice(16) + ")();"));
	(document.body || document.head || document.documentElement).appendChild(injScript);
});