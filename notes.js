/* There are multiple ways we can send messages 

1. Broadcast to every javascript file in the extension

    chrome.runtime.sendMessage({
        property: value
    })

2. Send message to a perticular tab

    chrome.tabs.sendMessage(
        tab.id,
        { property: value } // this is the message
    );

how do we get the active tab ?
    chrome.tabs.query(
        {
            active: true, 
            currentWindow: true
        }, 
        function (tabs) {
            // here are all the active tabs
        }
    );

*/