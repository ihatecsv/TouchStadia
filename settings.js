chrome.storage.sync.get([
    "stickRadius", "buttonDiameter", "buttonBorderLeftOffset", "buttonBorderRightOffset", "buttonBorderTopOffset", "buttonBorderBottomOffset"
], function(settings) {
    const stickRadiusElem = document.getElementById("stick-radius");
    const buttonDiameterElem = document.getElementById("button-diameter");
    const buttonBorderLeftOffsetElem = document.getElementById("button-border-left-offset");
    const buttonBorderRightOffsetElem = document.getElementById("button-border-right-offset");
    const buttonBorderTopOffsetElem = document.getElementById("button-border-top-offset");
    const buttonBorderBottomOffsetElem = document.getElementById("button-border-bottom-offset");
    const applyButtonElem = document.getElementById("apply-button");

    stickRadiusElem.value = settings.stickRadius;
    buttonDiameterElem.value = settings.buttonDiameter;
    buttonBorderLeftOffsetElem.value = settings.buttonBorderLeftOffset;
    buttonBorderRightOffsetElem.value = settings.buttonBorderRightOffset;
    buttonBorderTopOffsetElem.value = settings.buttonBorderTopOffset;
    buttonBorderBottomOffsetElem.value = settings.buttonBorderBottomOffset;

    applyButtonElem.onclick = function(){
        const startParams = {
            "stickRadius": stickRadiusElem.value,
            "buttonDiameter": buttonDiameterElem.value,
            "buttonBorderLeftOffset": buttonBorderLeftOffsetElem.value,
            "buttonBorderRightOffset": buttonBorderRightOffsetElem.value,
            "buttonBorderTopOffset": buttonBorderTopOffsetElem.value,
            "buttonBorderBottomOffset": buttonBorderBottomOffsetElem.value
        };
        chrome.storage.sync.set(startParams, function(){
            console.log("Set params!");
            chrome.tabs.reload();
        });
    }
});