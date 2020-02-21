document.getElementById("version").innerText = chrome.runtime.getManifest().version;

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
    "buttonConfig",
    "firstRun"
], function(settings) {
    const firstRunNotificationElem = document.getElementById("first-run-notification");
    const firstRunNotificationCloseButtonElem = document.getElementById("first-run-notification-close-button");
    const settingsElem = document.getElementById("settings");
    const stickRadiusElem = document.getElementById("stick-radius");
    const buttonDiameterElem = document.getElementById("button-diameter");
    const buttonBorderLeftOffsetElem = document.getElementById("button-border-left-offset");
    const buttonBorderRightOffsetElem = document.getElementById("button-border-right-offset");
    const buttonBorderTopOffsetElem = document.getElementById("button-border-top-offset");
    const buttonBorderBottomOffsetElem = document.getElementById("button-border-bottom-offset");
    const opacityElem = document.getElementById("opacity");
    const enableColorsElem = document.getElementById("enable-colors");
    const enableDrawSticksElem = document.getElementById("enable-draw-sticks");
    const disableTouchStadiaElem = document.getElementById("disable-touchstadia");
    const applyButtonElem = document.getElementById("apply-button");
    const resetButtonConfigControlElem = document.getElementById("reset-button-config-control");
    const resetButtonConfigButtonElem = document.getElementById("reset-button-config-button");

    if(settings.firstRun){
        settingsElem.style.display = "none";
    }else{
        firstRunNotificationElem.style.display = "none";
    }

    if(typeof settings.buttonConfig !== "undefined" && settings.buttonConfig !== null){
        const disableIfLayoutElems = document.getElementsByClassName("disable-if-layout");
        for(let i = 0; i < disableIfLayoutElems.length; i++){
            disableIfLayoutElems[i].disabled = true;
        }
        resetButtonConfigControlElem.style.display = "initial";
    }

    stickRadiusElem.value = settings.stickRadius;
    buttonDiameterElem.value = settings.buttonDiameter;
    buttonBorderLeftOffsetElem.value = settings.buttonBorderLeftOffset;
    buttonBorderRightOffsetElem.value = settings.buttonBorderRightOffset;
    buttonBorderTopOffsetElem.value = settings.buttonBorderTopOffset;
    buttonBorderBottomOffsetElem.value = settings.buttonBorderBottomOffset;
    opacityElem.value = settings.opacity;
    enableColorsElem.checked = settings.enableColors;
    enableDrawSticksElem.checked = settings.enableDrawSticks;
    disableTouchStadiaElem.checked = settings.disableTouchStadia;

    firstRunNotificationCloseButtonElem.onclick = function(){
        firstRunNotificationElem.style.display = "none";
        settingsElem.style.display = "initial";
        chrome.storage.sync.set({"firstRun": false}, function(){
            console.log("TouchStadia: First run completed!");
        });
    }

    applyButtonElem.onclick = function(){
        const startParams = {
            "stickRadius": parseInt(stickRadiusElem.value),
            "buttonDiameter": parseInt(buttonDiameterElem.value),
            "buttonBorderLeftOffset": parseInt(buttonBorderLeftOffsetElem.value),
            "buttonBorderRightOffset": parseInt(buttonBorderRightOffsetElem.value),
            "buttonBorderTopOffset": parseInt(buttonBorderTopOffsetElem.value),
            "buttonBorderBottomOffset": parseInt(buttonBorderBottomOffsetElem.value),
            "opacity": parseInt(opacityElem.value),
            "enableColors": enableColorsElem.checked,
            "enableDrawSticks": enableDrawSticksElem.checked,
            "disableTouchStadia": disableTouchStadiaElem.checked,
        };
        chrome.storage.sync.set(startParams, function(){
            console.log("TouchStadia: Set options!");
            chrome.tabs.reload();
        });
    }

    resetButtonConfigButtonElem.onclick = function(){
        chrome.storage.sync.set({"buttonConfig": null}, function(){
            console.log("TouchStadia: Reset button config!");
            chrome.tabs.reload();
            window.location.href = window.location.href;
        });
    }
});