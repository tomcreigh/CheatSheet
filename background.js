chrome.runtime.onMessage.addListener(data => {
    if (data.type === 'pass') {
        // console.log(data.message);
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { "message": data.message });
        });
    }
});