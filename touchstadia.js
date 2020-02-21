function main(){
	let config = null;
	window.addEventListener("startConfig", function(e) {
		config = e.detail;
		setupTS();
	}, false);
	const setupTS = function(){
		let blacklist = [];
		
		const touchStadiaElem = document.createElement("span");
		const canvasElem = document.createElement("canvas");
		const canvasCtx = canvasElem.getContext("2d");
		
		const startTime = Date.now();

		const zIndex = 6000;

		const imgExt = ".svg";

		let layoutMode = false;
		let forceTSVisible = false;
		
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
					locRight: config.buttonDiameter + config.buttonBorderRightOffset,
					locBottom: 0 + config.buttonBorderBottomOffset,
					scale: 1,
					img: "img/controls/A"
				},
				{
					label: "B", // 1
					color: "#ed1c24",
					locRight: 0 + config.buttonBorderRightOffset,
					locBottom: config.buttonDiameter + config.buttonBorderBottomOffset,
					scale: 1,
					img: "img/controls/B"
				},
				{
					label: "X", // 2
					color: "#24bcee",
					locRight: (config.buttonDiameter * 2) + config.buttonBorderRightOffset,
					locBottom: config.buttonDiameter + config.buttonBorderBottomOffset,
					scale: 1,
					img: "img/controls/X"
				},
				{
					label: "Y", // 3
					color: "#f0ea1b",
					locRight: config.buttonDiameter + config.buttonBorderRightOffset,
					locBottom: (config.buttonDiameter * 2) + config.buttonBorderBottomOffset,
					scale: 1,
					img: "img/controls/Y"
				},
				{
					label: "L1", // 4
					color: "#636466",
					locLeft: 0 + config.buttonBorderLeftOffset,
					locTop: (config.buttonDiameter * 1.4) + config.buttonBorderTopOffset,
					scale: 2,
					img: "img/controls/L1"
				},
				{
					label: "R1", // 5
					color: "#636466",
					locRight: 0 + config.buttonBorderRightOffset,
					locTop: (config.buttonDiameter * 1.4) + config.buttonBorderTopOffset,
					scale: 2,
					img: "img/controls/R1"
				},
				{
					label: "L2", // 6
					color: "#636466",
					locLeft: 0 + config.buttonBorderLeftOffset,
					locTop: 0 + config.buttonBorderTopOffset,
					scale: 2,
					img: "img/controls/L2"
				},
				{
					label: "R2", // 7
					color: "#636466",
					locRight: 0 + config.buttonBorderRightOffset,
					locTop: 0 + config.buttonBorderTopOffset,
					scale: 2,
					img: "img/controls/R2"
				},
				{
					label: "Se", // 8
					color: "#636466",
					locLeft: (config.buttonDiameter * 5) + config.buttonBorderLeftOffset,
					locTop: (config.buttonDiameter * 1.1)  + config.buttonBorderTopOffset,
					scale: 1.2,
					img: "img/controls/select"
				},
				{
					label: "St", // 9
					color: "#636466",
					locRight: (config.buttonDiameter * 5)  + config.buttonBorderRightOffset,
					locTop: (config.buttonDiameter * 1.1) +  + config.buttonBorderTopOffset,
					scale: 1.2,
					img: "img/controls/start"
				},
				{
					label: "L3", // 10
					color: "#7a24ee",
					locLeft: (config.buttonDiameter * 5) + config.buttonBorderLeftOffset,
					locBottom: 0 + config.buttonBorderBottomOffset,
					scale: 1,
					img: "img/controls/L3"
				},
				{
					label: "R3", // 11
					color: "#7a24ee",
					locRight: (config.buttonDiameter * 5) + config.buttonBorderRightOffset,
					locBottom: 0 + config.buttonBorderBottomOffset,
					scale: 1,
					img: "img/controls/R3"
				},
				{
					label: "⇧", // 12
					color: "#636466",
					locLeft: config.buttonDiameter + config.buttonBorderLeftOffset,
					locBottom: (config.buttonDiameter * 2) + config.buttonBorderBottomOffset,
					scale: 1,
					img: "img/controls/up"
				},
				{
					label: "⇩", // 13
					color: "#636466",
					locLeft: config.buttonDiameter + config.buttonBorderLeftOffset,
					locBottom: 0 + config.buttonBorderBottomOffset,
					scale: 1,
					img: "img/controls/down"
				},
				{
					label: "⇦", // 14
					color: "#636466",
					locLeft: 0 + config.buttonBorderLeftOffset,
					locBottom: config.buttonDiameter + config.buttonBorderBottomOffset,
					scale: 1,
					img: "img/controls/left"
				},
				{
					label: "⇨", // 15
					color: "#636466",
					locLeft: (config.buttonDiameter * 2) + config.buttonBorderLeftOffset,
					locBottom: config.buttonDiameter + config.buttonBorderBottomOffset,
					scale: 1,
					img: "img/controls/right"
				},
				{
					label: "H", // 16
					color: "#ed591c",
					locLeft: window.innerWidth/2 - config.buttonDiameter/2,
					locBottom: 0 + config.buttonBorderBottomOffset,
					scale: 1,
					img: "img/controls/home",
					dynamicUpdate: true
				}
			]
		};

		if(typeof config.buttonConfig !== "undefined" && config.buttonConfig !== null){
			emulatedGamepad.buttons = config.buttonConfig.slice();
		}

		for(let i = 0; i < emulatedGamepad.buttons.length; i++){
			const buttonElem = document.createElement("img");

			buttonElem.src = config.extUrl + emulatedGamepad.buttons[i].img + imgExt;
			buttonElem.style.cssText = "position:fixed;z-index:" + (zIndex+1) + ";";
			buttonElem.style.cssText += "width:" + config.buttonDiameter*emulatedGamepad.buttons[i].scale + "px;";
			buttonElem.style.cssText += "opacity:" + ((config.opacity/255) * 100) + "%;";
			if(config.enableColors) buttonElem.style.cssText += "filter:drop-shadow(0 0 0 " + emulatedGamepad.buttons[i].color + ");"

			if(typeof emulatedGamepad.buttons[i].locLeft !== "undefined") buttonElem.style.left = emulatedGamepad.buttons[i].locLeft + "px";
			if(typeof emulatedGamepad.buttons[i].locRight !== "undefined") buttonElem.style.right = emulatedGamepad.buttons[i].locRight + "px";
			if(typeof emulatedGamepad.buttons[i].locTop !== "undefined") buttonElem.style.top = emulatedGamepad.buttons[i].locTop + "px";
			if(typeof emulatedGamepad.buttons[i].locBottom !== "undefined") buttonElem.style.bottom = emulatedGamepad.buttons[i].locBottom + "px";

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
			const touches = type === 2 ? touchEvent.changedTouches : touchEvent.touches;
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
					if(distance > config.stickRadius) distance = config.stickRadius;
					stickRDeltaX = distance * Math.cos(angle);
					stickRDeltaY = distance * Math.sin(angle);

					setAxis(2, stickRDeltaX / config.stickRadius);
					setAxis(3, stickRDeltaY / config.stickRadius);
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
					if(distance > config.stickRadius) distance = config.stickRadius;
					stickLDeltaX = distance * Math.cos(angle);
					stickLDeltaY = distance * Math.sin(angle);

					setAxis(0, stickLDeltaX / config.stickRadius);
					setAxis(1, stickLDeltaY / config.stickRadius);
				}
			}
		}

		const drawSticks = function(){
			canvasCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
			if(stickLActive){
				canvasCtx.fillStyle = "#cccccc" + config.opacity.toString(16);
				canvasCtx.beginPath();
				canvasCtx.arc(stickLStartX, stickLStartY, config.stickRadius, 0, 2 * Math.PI);
				canvasCtx.fill();

				canvasCtx.fillStyle = stickLColor + config.opacity.toString(16);
				canvasCtx.beginPath();
				canvasCtx.arc(stickLStartX + stickLDeltaX, stickLStartY + stickLDeltaY, config.stickRadius / 2, 0, 2 * Math.PI);
				canvasCtx.fill();
			}

			if(stickRActive){
				canvasCtx.fillStyle = "#cccccc" + config.opacity.toString(16);
				canvasCtx.beginPath();
				canvasCtx.arc(stickRStartX, stickRStartY, config.stickRadius, 0, 2 * Math.PI);
				canvasCtx.fill();

				canvasCtx.fillStyle = stickRColor + config.opacity.toString(16);
				canvasCtx.beginPath();
				canvasCtx.arc(stickRStartX + stickRDeltaX, stickRStartY + stickRDeltaY, config.stickRadius / 2, 0, 2 * Math.PI);
				canvasCtx.fill();
			}
		}

		const pressButton = function(buttonID, isPressed){
			emulatedGamepad.buttons[buttonID].pressed = isPressed;
			emulatedGamepad.buttons[buttonID].touched = isPressed;
			emulatedGamepad.buttons[buttonID].value = isPressed ? 1 : 0;
			if(config.enableColors){
				emulatedGamepad.buttons[buttonID].buttonElem.style.filter = isPressed ? "brightness(0)" : "drop-shadow(0 0 0 " + emulatedGamepad.buttons[buttonID].color + ")";
			}else{
				emulatedGamepad.buttons[buttonID].buttonElem.style.filter = isPressed ? "brightness(0)" : "";
			}
			emulatedGamepad.timestamp = Date.now() - startTime;
		}

		const setAxis = function(axis, value){
			emulatedGamepad.axes[axis] = value;
			emulatedGamepad.timestamp = Date.now() - startTime;
		}

		const updateTSVisibility = function(){
			if(window.location.host == "stadia.google.com" && !window.location.pathname.includes("/player/") && !forceTSVisible){
				touchStadiaElem.style.display = "none";
			}else{
				touchStadiaElem.style.display = "initial";
			}
		}

		const fetchResources = async function(){
			const [blacklistResp] = await Promise.all([
				fetch(config.extUrl + "res/blacklist.json")
			]);
			blacklist = await blacklistResp.json();
		}

		const layoutButton = function(touchEvent, type, buttonID){
			const touches = type === 2 ? touchEvent.changedTouches : touchEvent.touches;
			const button = emulatedGamepad.buttons[buttonID];
			const buttonElem = button.buttonElem;
			const newX = touches[0].clientX - (buttonElem.offsetWidth/2);
			const newY = touches[0].clientY - (buttonElem.offsetHeight/2);
			buttonElem.style.left = newX + "px";
			buttonElem.style.top = newY + "px";
			if(type === 2){
				if(typeof button.locRight !== "undefined") delete button.locRight;
				if(typeof button.locBottom !== "undefined") delete button.locBottom;
				if(typeof button.dynamicUpdate !== "undefined") delete button.dynamicUpdate;
				button.locLeft = newX;
				button.locTop = newY;
				const sentButtons = JSON.parse(JSON.stringify(emulatedGamepad.buttons));
				for(let i = 0; i < sentButtons.length; i++){
					if(typeof sentButtons[i].buttonElem !== "undefined") delete sentButtons[i].buttonElem;
					if(typeof sentButtons[i].pressed !== "undefined") delete sentButtons[i].pressed;
					if(typeof sentButtons[i].touched !== "undefined") delete sentButtons[i].touched;
					if(typeof sentButtons[i].value !== "undefined") delete sentButtons[i].value;
				}
				console.log(sentButtons);
				window.dispatchEvent(new CustomEvent("newButtonConfig", {detail: sentButtons}));
			}
		}

		const isPlayingGame = function(){
			return window.location.host == "stadia.google.com" && window.location.pathname.includes("/player/");
		}

		canvasElem.addEventListener("touchstart", function(e){
			e.preventDefault();
			handleStickTouch(e, 0);
			if(config.enableDrawSticks) drawSticks();
		}, false);

		canvasElem.addEventListener("touchmove", function(e){
			e.preventDefault();
			handleStickTouch(e, 1);
			if(config.enableDrawSticks) drawSticks();
		}, false);
		
		canvasElem.addEventListener("touchend", function(e){
			e.preventDefault();
			handleStickTouch(e, 2);
			if(config.enableDrawSticks) drawSticks();
		}, false);

		document.addEventListener("keyup", function(e) {
			if(e.ctrlKey && e.key === ";"){
				layoutMode = !layoutMode;
				if(layoutMode){
					document.documentElement.requestFullscreen();
					canvasElem.style.backgroundColor = "#ff00ff55";
					forceTSVisible = true;
					updateTSVisibility();
				}else{
					if(!isPlayingGame()) document.exitFullscreen();
					canvasElem.style.backgroundColor = "initial";
					forceTSVisible = false;
					updateTSVisibility();
				}
			}
		});

		window.onload = async function(){
			await fetchResources();
			document.body.appendChild(touchStadiaElem);
			touchStadiaElem.appendChild(canvasElem);
			for(let i = 0; i < emulatedGamepad.buttons.length; i++){
				touchStadiaElem.appendChild(emulatedGamepad.buttons[i].buttonElem);
				emulatedGamepad.buttons[i].buttonElem.addEventListener("touchstart", function(e){
					e.preventDefault();
					layoutMode ? layoutButton(e, 0, i) : pressButton(i, true);
				}, false);
				emulatedGamepad.buttons[i].buttonElem.addEventListener("touchmove", function(e){
					e.preventDefault();
					if(layoutMode) layoutButton(e, 1, i);
				}, false);
				emulatedGamepad.buttons[i].buttonElem.addEventListener("touchend", function(e){
					e.preventDefault();
					layoutMode ? layoutButton(e, 2, i) : pressButton(i, false);
				}, false);
			}
			console.log("TouchStadia: Canvas and buttons created!");
		}

		window.onresize = function(){
			canvasElem.width = window.innerWidth;
			canvasElem.height = window.innerHeight;
			for(let i = 0; i < emulatedGamepad.buttons.length; i++){
				if(emulatedGamepad.buttons[i].dynamicUpdate){ //TODO: This is gross, do something different
					const newLoc = (window.innerWidth/2 - config.buttonDiameter/2) + "px";
					emulatedGamepad.buttons[i].buttonElem.style.left = newLoc;
				}
			}
		}
		
		setInterval(updateTSVisibility, 3000); //TODO: We can do better!
		window.addEventListener("popstate", updateTSVisibility);
		updateTSVisibility();

		const originalGetGamepads = navigator.getGamepads;
		navigator.getGamepads = function(){ // The magic happens here
			const originalGamepads = originalGetGamepads.apply(navigator);
			const modifiedGamepads = [emulatedGamepad, null, null, null];
			let insertIndex = 1;
			originalGamepadsLoop:
			for(let i = 0; i < 4; i++){
				if(insertIndex >= 4) break;
				if(originalGamepads[i] !== null){
					for(let j = 0; j < blacklist.length; j++){
						if(originalGamepads[i].id.includes(blacklist[j])){
							continue originalGamepadsLoop;
						}
					}
					modifiedGamepads[insertIndex] = {};
					for(let property in originalGamepads[i]){
						modifiedGamepads[insertIndex][property] = originalGamepads[i][property];
					}
					modifiedGamepads[insertIndex].index = insertIndex;
					insertIndex++;
				} 
			}
			return modifiedGamepads;
		}
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
	"disableTouchStadia",
	"buttonConfig"
], function(settings) {
	settings.extUrl = chrome.runtime.getURL("/");
	if(settings.disableTouchStadia) return;
	const injScript = document.createElement("script");
	injScript.appendChild(document.createTextNode("(" + main + ")();"));
	(document.body || document.head || document.documentElement).appendChild(injScript);
	window.dispatchEvent(new CustomEvent("startConfig", {detail: settings}));
});

window.addEventListener("newButtonConfig", function(e) {
	const buttons = e.detail;
	console.log(buttons);
	chrome.storage.sync.set({"buttonConfig": buttons}, function(){
		console.log("TouchStadia: Set layout!");
	});
}, false);