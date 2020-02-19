function main(){
	const touchStadiaElem = document.createElement("span");
	const canvasElem = document.createElement("canvas");
	const canvasCtx = canvasElem.getContext("2d");
	
	const startTime = Date.now();

	const zIndex = 6000;
	
	const stickLColor = "#82b4ff";
	let stickLActive = false;
	let stickLStartX = 0;
	let stickLStartY = 0;
	let stickLEndX = 0;
	let stickLEndY = 0;
	let stickLDeltaX = 0;
	let stickLDeltaY = 0;

	const stickRColor = "#ff8a82";
	let stickRActive = false;
	let stickRStartX = 0;
	let stickRStartY = 0;
	let stickREndX = 0;
	let stickREndY = 0;
	let stickRDeltaX = 0;
	let stickRDeltaY = 0;

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
				color: "#636466",
				locLeft: buttonDiameter * 5,
				locTop: buttonDiameter * 1.1,
				scale: 1.2,
				img: "img/controls/select"
			},
			{
				label: "St", // 9
				color: "#636466",
				locRight: buttonDiameter * 5,
				locTop: buttonDiameter * 1.1,
				scale: 1.2,
				img: "img/controls/start"
			},
			{
				label: "L3", // 10
				color: "#7a24ee",
				locLeft: buttonDiameter * 5,
				locBottom: 0,
				scale: 1,
				img: "img/controls/L3"
			},
			{
				label: "R3", // 11
				color: "#7a24ee",
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
		if(enableColors) buttonElem.style.cssText += "filter:drop-shadow(0 0 0 " + emulatedGamepad.buttons[i].color + ");"

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
	touchStadiaElem.style.display = "none";

	const handleStickTouch = function(touchEvent, type){
		const touches = type == 2 ? touchEvent.changedTouches : touchEvent.touches;
		for(let i = 0; i < touches.length; i++){
			if(touches[i].target !== canvasElem) continue;
			const clientX = touches[i].clientX;
			const clientY = touches[i].clientY;
			const stickIndex = clientX > window.innerWidth/2 ? 1 : 0;
			if(stickIndex){ //R
				switch(type){
					case 0:
						if(stickRActive) break;
						stickRActive = true;
						stickRStartX = stickREndX = clientX;
						stickRStartY = stickREndY = clientY;
						break;
					case 1:
						stickREndX = clientX;
						stickREndY = clientY;
						break;
					case 2:
						stickRActive = false;
						stickRStartX = stickREndX = 0;
						stickRStartY = stickREndY = 0;
						break;
				}
				const angle = Math.atan2(stickRStartY - stickREndY, stickRStartX - stickREndX) + Math.PI;
				let distance = Math.sqrt(
					(stickRStartX - stickREndX) * (stickRStartX - stickREndX) +
					(stickRStartY - stickREndY) * (stickRStartY - stickREndY)
				);
				if(distance > stickRadius) distance = stickRadius;
				stickRDeltaX = distance * Math.cos(angle);
				stickRDeltaY = distance * Math.sin(angle);

				setAxis(2, stickRDeltaX / stickRadius);
				setAxis(3, stickRDeltaY / stickRadius);
			}else{ //L
				switch(type){
					case 0:
						if(stickLActive) break;
						stickLActive = true;
						stickLStartX = stickLEndX = clientX;
						stickLStartY = stickLEndY = clientY;
						break;
					case 1:
						stickLEndX = clientX;
						stickLEndY = clientY;
						break;
					case 2:
						stickLActive = false;
						stickLStartX = stickLEndX = 0;
						stickLStartY = stickLEndY = 0;
						break;
				}
				const angle = Math.atan2(stickLStartY - stickLEndY, stickLStartX - stickLEndX) + Math.PI;
				let distance = Math.sqrt(
					(stickLStartX - stickLEndX) * (stickLStartX - stickLEndX) +
					(stickLStartY - stickLEndY) * (stickLStartY - stickLEndY)
				);
				if(distance > stickRadius) distance = stickRadius;
				stickLDeltaX = distance * Math.cos(angle);
				stickLDeltaY = distance * Math.sin(angle);

				setAxis(0, stickLDeltaX / stickRadius);
				setAxis(1, stickLDeltaY / stickRadius);
			}
		}
	}

	const drawSticks = function(){
		canvasCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
		if(stickLActive){
			canvasCtx.fillStyle = "#cccccc" + opacity.toString(16);
			canvasCtx.beginPath();
			canvasCtx.arc(stickLStartX, stickLStartY, stickRadius, 0, 2 * Math.PI);
			canvasCtx.fill();

			canvasCtx.fillStyle = stickLColor + opacity.toString(16);
			canvasCtx.beginPath();
			canvasCtx.arc(stickLStartX + stickLDeltaX, stickLStartY + stickLDeltaY, stickRadius / 2, 0, 2 * Math.PI);
			canvasCtx.fill();
		}

		if(stickRActive){
			canvasCtx.fillStyle = "#cccccc" + opacity.toString(16);
			canvasCtx.beginPath();
			canvasCtx.arc(stickRStartX, stickRStartY, stickRadius, 0, 2 * Math.PI);
			canvasCtx.fill();

			canvasCtx.fillStyle = stickRColor + opacity.toString(16);
			canvasCtx.beginPath();
			canvasCtx.arc(stickRStartX + stickRDeltaX, stickRStartY + stickRDeltaY, stickRadius / 2, 0, 2 * Math.PI);
			canvasCtx.fill();
		}
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

	const updateTSVisibility = function(){
		if(window.location.host == "stadia.google.com" && !window.location.pathname.includes("/player/")){
			touchStadiaElem.style.display = "none";
		}else{
			touchStadiaElem.style.display = "initial";
		}
	}

	canvasElem.addEventListener("touchstart", function(e){
		e.preventDefault();
		handleStickTouch(e, 0);
		if(enableDrawSticks) drawSticks();
	}, false);

	canvasElem.addEventListener("touchmove", function(e){
		e.preventDefault();
		handleStickTouch(e, 1);
		if(enableDrawSticks) drawSticks();
	}, false);
	
	canvasElem.addEventListener("touchend", function(e){
		e.preventDefault();
		handleStickTouch(e, 2);
		if(enableDrawSticks) drawSticks();
	}, false);

	window.onload = function(){
		document.body.appendChild(touchStadiaElem);
		touchStadiaElem.appendChild(canvasElem);
		for(let i = 0; i < emulatedGamepad.buttons.length; i++){
			touchStadiaElem.appendChild(emulatedGamepad.buttons[i].buttonElem);
			emulatedGamepad.buttons[i].buttonElem.addEventListener("touchstart", function(e){
				e.preventDefault();
				pressButton(i, true);
			}, false);
			emulatedGamepad.buttons[i].buttonElem.addEventListener("touchend", function(e){
				e.preventDefault();
				pressButton(i, false);
			}, false);
		}
		console.log("TouchStadia: Canvas and buttons created!");
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
	
	setInterval(updateTSVisibility, 3000); //TODO: We can do better!
	window.addEventListener("popstate", updateTSVisibility);
	updateTSVisibility();

	let fourGamepadsWarningShown = false;
	const originalGetGamepads = navigator.getGamepads;
	navigator.getGamepads = function(){ // The magic happens here
		const originalGamepads = originalGetGamepads.apply(navigator);
		const modifiedGamepads = [emulatedGamepad, null, null, null];
		if(originalGamepads[3] !== null && !fourGamepadsWarningShown){
			fourGamepadsWarningShown = true;
			alert("TouchStadia: Four USB gamepads have been detected. The fourth gamepad will not function, as TouchStadia requires a gamepad slot for itself.");
		}
		for(let i = 0; i < 3; i++){
			if(originalGamepads[i] !== null){
				modifiedGamepads[i+1] = {};
				for(let property in originalGamepads[i]){
					modifiedGamepads[i+1][property] = originalGamepads[i][property];
				}
				modifiedGamepads[i+1].index++;
			} 
		}
		return modifiedGamepads;
	}
}

chrome.storage.sync.get([
	"stickRadius",
	"buttonDiameter",
	"buttonBorderLeftOffset",
	"buttonBorderRightOffset",
	"buttonBorderTopOffset",
	"buttonBorderBottomOffset",
	"opacity",
	"enableColors",
	"enableDrawSticks",
	"disableTouchStadia"
], function(settings) {
	settings.extUrl = chrome.runtime.getURL("/");
	let injVarTxt = "";
	for (const key of Object.keys(settings)) {
		if(typeof settings[key] === "number" || typeof settings[key] === "boolean"){
			injVarTxt += "const " + key + " = " + settings[key] + ";";
		}else if(typeof settings[key] === "string"){
			injVarTxt += "const " + key + " = \"" + settings[key] + "\";";
		}else{
			console.error("Invalid setting type!");
		}
	}
	if(settings.disableTouchStadia) return;
	const injScript = document.createElement("script");
	injScript.appendChild(document.createTextNode("(" + (main + "").slice(0, 16) + injVarTxt + (main + "").slice(16) + ")();"));
	(document.body || document.head || document.documentElement).appendChild(injScript);
});