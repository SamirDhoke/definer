// a background script keeps running in the background.
// it can listen to events fire events.
// it can fire events that will then reach content scripts.

// this is happen when the extension button is clicked.
// background scripts are in a different scope, so they cannot access the window.

// listening to messages

window.word = 'naught';

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(msg, sender, res) {
    console.log('Got Message', msg);
    const word = msg.word.trim();
    window.word = word;
}

/* The below code presumably solves the problem of "context getting invalidated" */

chrome.manifest = chrome.runtime.getManifest();

var injectIntoTab = function (tab) {
    // You could iterate through the content scripts here
    var scripts = chrome.manifest.content_scripts[0].js;
    var i = 0, s = scripts.length;
    for( ; i < s; i++ ) {
        chrome.tabs.executeScript(tab.id, {
            file: scripts[i]
        });
    }
}

// Get all windows
chrome.windows.getAll({
    populate: true
}, function (windows) {
    var i = 0, w = windows.length, currentWindow;
    for( ; i < w; i++ ) {
        currentWindow = windows[i];
        var j = 0, t = currentWindow.tabs.length, currentTab;
        for( ; j < t; j++ ) {
            currentTab = currentWindow.tabs[j];
            // Skip chrome:// and https:// pages
            if( ! currentTab.url.match(/(chrome|https):\/\//gi) ) {
                injectIntoTab(currentTab);
            }
        }
    }
});