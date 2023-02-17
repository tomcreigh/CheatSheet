var head = document.getElementsByTagName('HEAD')[0];
var link = document.createElement('link');

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request.message);

    // ************************************************************** Change Font
    // ************************************************************** Remove Distractions
    if (request.message === 'remove_distractions') {
        const nodes = document.querySelectorAll("img,iframe");
        nodes.forEach((n) => { n.style.opacity = "0.4"; })
    } else if (request.message === 'undo_remove_distractions') {
        const nodes = document.querySelectorAll("img,iframe");
        nodes.forEach((n) => { n.style.opacity = "1"; })
    }
    // ************************************************************** Restructure Text
    // ************************************************************** Diplay Number Text
    // ************************************************************** Enable Sticky Tabs
});