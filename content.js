// This is the first try of making a chrome extension.

// there can be multiple content scripts per url.
// A content script runs when a tab loaded.
// A content script can manupulate things on a tab.

// to receive the message, we need to add a listener

// chrome.runtime.onMessage.addListener(handleRequest);

// function handleRequest(req, sender, res) {
//     // req is the message you passed.
//     console.log('MESSAGE', req.text);
// }

// we can also send messages from any script.

window.addEventListener('mouseup', handleDefining)

function handleDefining(e) {
    const selected = window.getSelection().toString();
    
    console.log('Selected', selected);
    
    if (!selected.length) {
        return;
    }
    
    chrome.runtime.sendMessage({
        word: selected
    })
}

chrome.runtime.connect().onDisconnect.addListener(function() {
    console.log('disconnected, now connecting...');
    chrome.runtime.connect();
})