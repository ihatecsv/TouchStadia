chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {hostEquals: "stadia.google.com"},
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {hostEquals: "html5gamepad.com"},
                }),
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
    const startParams = {
        "stickRadius": 50,
        "buttonDiameter": 70,
        "buttonBorderLeftOffset": 30,
        "buttonBorderRightOffset": 30,
        "buttonBorderTopOffset": 80,
        "buttonBorderBottomOffset": 30,
        "opacity": 255,
        "enableColors": false,
        "enableDrawSticks" : false,
        "disableTouchStadia": false,
        "buttonConfig": null,
        "firstRun": true
    };
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
        for(const key of Object.keys(settings)){
            startParams[key] = settings[key];
        }
        chrome.storage.sync.set(startParams, function() {
            console.log("TouchStadia: Set start params!");
        });
    });
});