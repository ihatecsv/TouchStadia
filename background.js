chrome.runtime.onInstalled.addListener(function() {
    const startParams = {
        "stickRadius": 50,
        "buttonDiameter": 70,
        "buttonBorderLeftOffset": 30,
        "buttonBorderRightOffset": 30,
        "buttonBorderTopOffset": 30,
        "buttonBorderBottomOffset": 30,
        "opacity": 100
    };
    chrome.storage.sync.set(startParams, function() {
        console.log("Set start params!");
    });
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
});