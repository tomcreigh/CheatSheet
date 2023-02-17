chrome.runtime.onMessage.addListener(data => {
    if (data.type === 'test') {
        // console.log(data.message);
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { "message": data.message });
        });
    }
});

// ************************************************************** Change Font
// ************************************************************** Remove Distractions
// ************************************************************** Restructure Text
// ************************************************************** Diplay Number Text
// ************************************************************** Enable Sticky Tabs