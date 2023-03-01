let css = '* {font-family: "Comic Sans MS", "Comic Sans", cursive !important;}';
const head = document.head || document.getElementsByTagName('head')[0]
const style = document.createElement('style')

if (style.styleSheet) {
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
}

let nodes;
const tempNodes = [];
const updatedNodes = [];

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request.message);

    switch (request.message) {
        // ************************************************************** Change Font
        case 'public_sans':

            head.appendChild(style);
            break;
        case 'roboto':
            break;
        case 'clear':
            break;
            // ************************************************************** Remove Distractions
        case 'remove_distractions':
            nodes = document.querySelectorAll("img,iframe");
            nodes.forEach((n) => { n.style.opacity = "0.4"; })
            break;
        case 'undo_remove_distractions':
            nodes = document.querySelectorAll("img,iframe");
            nodes.forEach((n) => { n.style.opacity = "1"; })
            break;
            // ************************************************************** Restructure Text
        case 'restructure_text':
            nodes = document.querySelectorAll("p,span,div");
            for (let i = 0; i < nodes.length; i++) {
                tempNodes[i] = String(nodes[i].innerHTML).replaceAll('. ', '.<br>');
                nodes[i] = "";
                nodes[i].innerHTML = tempNodes[i];
            }
            break;
        case 'undo_restructure_text':
            nodes = document.querySelectorAll("p,span,div");
            for (let i = 0; i < nodes.length; i++) {
                tempNodes[i] = String(nodes[i].innerHTML).replaceAll('.<br>', '. ');
                nodes[i] = "";
                nodes[i].innerHTML = tempNodes[i];
            }
            break;
            // ************************************************************** Diplay Number Text
        case 'display_num_text':
            break;
        case 'undo_display_num_text':
            break;
            // ************************************************************** Enable Sticky Tabs
        case 'enable_sticky_tabs':
            break;
        case 'undo_enable_sticky_tabs':
            break;
            // ************************************************************** Settings
        case 'settings':
            break;
        default:
            break
    }


});