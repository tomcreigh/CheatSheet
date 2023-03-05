// ************************************************************** Change Font - declorations & functions
const head = document.head || document.getElementsByTagName('head')[0];
let sticky_tabs_emabled = false;
let style;
const font_obj_array = [{
        name: 'public_sans',
        css: '@import url(\'https://fonts.googleapis.com/css?family=Public Sans\'); *, body {font-family: \'Public Sans\', sans-serif;}'
    },
    {
        name: 'roboto',
        css: '@import url(\'https://fonts.googleapis.com/css2?family=Roboto&display=swap\'); *, body {font-family: \'Roboto\', sans-serif;}'
    }
];

function clearFonts() {
    font_obj_array.forEach((font) => {
        if (document.getElementById(font.name)) {
            head.removeChild(document.getElementById(font.name));
            console.log(font.name + "removed");
        };
    });
}

function updateFont(font_name) {
    //clear all injected styles
    clearFonts();

    //access relevant font object
    font_css = font_obj_array.find(x => x.name === font_name).css;
    style = document.createElement('style');

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(font_css));
        style.setAttribute("id", font_name);
    }
    head.appendChild(style);
}

// ************************************************************** nodes - declorations & functions
let text_nodes;
const tempNodes = [];

// let img_nodes;

const css_obj_array = [{
    name: 'remove_distractions',
    css: 'img, iframe {opacity: 40%; transition: 0.3s;}'
}];

function toggleCss(css_obj_name) {
    if (document.getElementById(css_obj_name)) {
        head.removeChild(document.getElementById(css_obj_name));
        console.log(css_obj_name);
    } else {
        style = document.createElement('style');
        css_obj_css = css_obj_array.find(x => x.name == css_obj_name).css
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css_obj_css));
            style.setAttribute("id", css_obj_name);
        }
        head.appendChild(style);
    }
}

// ************************************************************** runtime
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request.message);

    switch (request.message) {
        // ************************************************************** Change Font
        case 'public_sans':
            updateFont('public_sans');
            break;
        case 'roboto':
            updateFont('roboto');
            break;
        case 'clear':
            clearFonts();
            break;
            // ************************************************************** Remove Distractions
        case 'remove_distractions':
            // img_nodes = document.querySelectorAll("img,iframe");
            // img_nodes.forEach((n) => { n.style.opacity = "0.4"; })
            toggleCss('remove_distractions');
            break;
        case 'undo_remove_distractions':
            // img_nodes = document.querySelectorAll("img,iframe");
            // img_nodes.forEach((n) => { n.style.opacity = "1"; })
            toggleCss('remove_distractions');
            break;
            // ************************************************************** Restructure Text
        case 'restructure_text':
            text_nodes = document.querySelectorAll("p,span,div");
            for (let i = 0; i < text_nodes.length; i++) {
                tempNodes[i] = String(text_nodes[i].innerHTML).replaceAll('. ', '.<br>');
                text_nodes[i] = "";
                text_nodes[i].innerHTML = tempNodes[i];
            }
            break;
        case 'undo_restructure_text':
            text_nodes = document.querySelectorAll("p,span,div");
            for (let i = 0; i < text_nodes.length; i++) {
                tempNodes[i] = String(text_nodes[i].innerHTML).replaceAll('.<br>', '. ');
                text_nodes[i] = "";
                text_nodes[i].innerHTML = tempNodes[i];
            }
            break;
            // ************************************************************** Diplay Number Text
        case 'display_num_text':
            break;
        case 'undo_display_num_text':
            break;
            // ************************************************************** Enable Sticky Tabs
        case 'enable_sticky_tabs':
            sticky_tabs_emabled = true;
            break;
        case 'undo_enable_sticky_tabs':
            sticky_tabs_emabled = false;
            const remove_sticky_tabs = document.querySelectorAll('.sticky_tab_generic_css');
            remove_sticky_tabs.forEach((s) => {
                s.remove();
            });
            break;
            // ************************************************************** Settings
        case 'settings':
            break;
        default:
            break
    }
});

// ************************************************************** Sticky Tabs
document.addEventListener("click", event => {
    let class_check = event.target.className;

    if (event.ctrlKey && sticky_tabs_emabled) {
        if (class_check == 'sticky_tab_div_spacer' || class_check == 'sticky_tab_div_point') {
            event.target.parentNode.remove();
            // console.log('sticky tab removed');
        } else {
            // get coordinates
            x_loc = event.clientX + window.scrollX;
            y_loc = event.clientY + window.scrollY;
            screen_width = window.innerWidth;

            // console.log("x: " + x_loc);
            // console.log("y: " + y_loc);
            // console.log("screen width: " + screen_width);

            // update coordinates for point
            y_loc -= 20;

            // create shape div + inner divs
            new_sticky_tab_div = document.createElement("div");
            new_sticky_tab_div.setAttribute("class", 'sticky_tab_generic_css');

            sticky_tab_div_spacer = document.createElement("div");
            sticky_tab_div_spacer.setAttribute("class", 'sticky_tab_div_spacer');

            sticky_tab_div_point = document.createElement("div");
            sticky_tab_div_point.setAttribute("class", 'sticky_tab_div_point');


            // create generic css
            sticky_tab_generic_css = document.createElement('style');
            sticky_tab_generic_css_block = '.sticky_tab_generic_css{height: 40px; width: 160px; position: absolute; display: flex; align-items: flex-start; margin: 0;} .sticky_tab_div_spacer {width: 120px; height: 40px; background: #6750A4; margin: 0;} .sticky_tab_div_point {border-top: 20px solid transparent; border-bottom: 20px solid transparent; margin: 0;}';
            sticky_tab_generic_css.appendChild(document.createTextNode(sticky_tab_generic_css_block));
            sticky_tab_generic_css.setAttribute("id", 'sticky_tab_generic_css_element');

            // create & apply div spisific css
            if (x_loc <= (screen_width / 2)) {
                new_sticky_tab_div.setAttribute("style", "flex-direction: row;");
                sticky_tab_div_point.setAttribute("style", "border-left: 40px solid #6750A4;");
                x_loc -= 160;
            } else {
                new_sticky_tab_div.setAttribute("style", "flex-direction: row-reverse;");
                sticky_tab_div_point.setAttribute("style", "border-right: 40px solid #6750A4;");
            }

            new_sticky_tab_div.style.top = y_loc + "px";
            new_sticky_tab_div.style.left = x_loc + "px";

            // inject div&css
            new_sticky_tab_div.appendChild(sticky_tab_div_spacer);
            new_sticky_tab_div.appendChild(sticky_tab_div_point);

            document.body.appendChild(new_sticky_tab_div);

            if (!document.getElementById('sticky_tab_generic_css_element')) {
                head.appendChild(sticky_tab_generic_css);
            }
        }
    }
});