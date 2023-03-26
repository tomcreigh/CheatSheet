// ************************************************************** Change Font
const head = document.head || document.getElementsByTagName("head")[0];
let sticky_tabs_emabled = false;
let style;
const font_obj_array = [{
        name: "public_sans",
        css: "@import url('https://fonts.googleapis.com/css?family=Public Sans'); *, body {font-family: 'Public Sans', sans-serif;}",
    },
    {
        name: "roboto",
        css: "@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap'); *, body {font-family: 'Roboto', sans-serif;}",
    },
];

function ClearFonts() {
    font_obj_array.forEach((font) => {
        if (document.getElementById(font.name)) {
            head.removeChild(document.getElementById(font.name));
            console.log(font.name + " removed");
        }
    });
}

function UpdateFont(font_name) {
    //clear all injected styles
    ClearFonts();

    //access relevant font object
    font_css = font_obj_array.find((x) => x.name === font_name).css;
    style = document.createElement("style");

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(font_css));
        style.setAttribute("id", font_name);
    }
    head.appendChild(style);
}

// ************************************************************** Remove Distractions
const css_obj_array = [{
    name: "remove_distractions",
    css: "img, video, iframe {opacity: 40%; transition: 0.3s;}",
}, ];

function AddCss(css_obj_name) {
    style = document.createElement("style");
    css_obj_css = css_obj_array.find((x) => x.name == css_obj_name).css;
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css_obj_css));
        style.setAttribute("id", css_obj_name);
    }
    head.appendChild(style);
}

function RemoveCss(css_obj_name) {
    if (document.getElementById(css_obj_name)) {
        head.removeChild(document.getElementById(css_obj_name));
        // console.log(css_obj_name);
    }
}

// ************************************************************** Restructure Text
let text_nodes;
const tempNodes = [];

function RestructureText(from, to) {
    text_nodes = document.querySelectorAll("p,span,li,em,#text");
    for (let i = 0; i < text_nodes.length; i++) {
        tempNodes[i] = String(text_nodes[i].innerHTML).replaceAll(
            from,
            to
        );
        text_nodes[i] = "";
        text_nodes[i].innerHTML = tempNodes[i];
    }
}
// ************************************************************** Diplay Number Text



// ************************************************************** Enable Sticky Tabs
// define svgs
const right_arrow =
    '<svg width="168" height="48" viewBox="0 0 168 48" fill="none" xmlns="http://www.w3.org/2000/svg" > <g filter="url(#filter0_d_322_41987)"> <path class="sticky_tab" d="M4 0H124L164 20L124 40H4V0Z" fill="#DBECF4" /> </g> <defs> <filter id="filter0_d_322_41987" x="0" y="0" width="168" height="48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB" > <feFlood flood-opacity="0" result="BackgroundImageFix" /> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" /> <feOffset dy="4" /> <feGaussianBlur stdDeviation="2" /> <feComposite in2="hardAlpha" operator="out" /> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" /> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_322_41987" /> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_322_41987" result="shape" /> </filter> </defs> </svg>';
const left_arrow =
    '<svg width="168" height="48" viewBox="0 0 168 48" fill="none" xmlns="http://www.w3.org/2000/svg" > <g filter="url(#filter0_d_322_41990)"> <path class="sticky_tab" d="M164 40L44 40L4 20L44 1.04907e-05L164 0L164 40Z" fill="#DBECF4" /> </g> <defs> <filter id="filter0_d_322_41990" x="0" y="0" width="168" height="48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB" > <feFlood flood-opacity="0" result="BackgroundImageFix" /> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" /> <feOffset dy="4" /> <feGaussianBlur stdDeviation="2" /> <feComposite in2="hardAlpha" operator="out" /> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" /> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_322_41990" /> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_322_41990" result="shape" /> </filter> </defs> </svg>';

document.addEventListener("click", (event) => {
    let class_check = event.target.className.baseVal;
    // console.log(class_check);

    if (event.ctrlKey && sticky_tabs_emabled) {
        if (class_check == "sticky_tab") {
            event.target.parentNode.remove();
            // console.log('sticky tab removed');
        } else {
            // get coordinates
            x_loc = event.clientX + window.scrollX;
            y_loc = event.clientY + window.scrollY;
            screen_width = window.innerWidth;

            //   console.log("x: " + x_loc);
            //   console.log("y: " + y_loc);
            //   console.log("screen width: " + screen_width);

            // update coordinates for point
            y_loc -= 20;

            // create shape div + inner divs
            new_sticky_tab_div = document.createElement("div");
            //   new_sticky_tab_div.setAttribute("class", "sticky_tab_generic");
            new_sticky_tab_div.setAttribute("style", "position: absolute");

            // create & apply div spisific svg
            if (x_loc <= screen_width / 2) {
                new_sticky_tab_div.innerHTML = right_arrow;
                x_loc -= 160;
            } else {
                new_sticky_tab_div.innerHTML = left_arrow;
            }

            new_sticky_tab_div.style.top = y_loc + "px";
            new_sticky_tab_div.style.left = x_loc + "px";

            // inject div&css
            document.body.appendChild(new_sticky_tab_div);
        }
    }
});

// ************************************************************** runtime
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request.message);

    if (request.message.startsWith("font_")) {
        font = request.message.substring(5);
        console.log(font);
        UpdateFont(font);
    } else if (request.message.startsWith("remove_distractions_")) {
        if (request.message.endsWith("true")) {
            AddCss("remove_distractions");
        } else {
            RemoveCss("remove_distractions");
        }
    } else if (request.message.startsWith("restructure_text_")) {
        if (request.message.endsWith("true")) {
            RestructureText(". ", ".<br>");
        } else {
            RestructureText(".<br>", ". ");
        }

    } else if (request.message.startsWith("display_num_text_")) {
        if (request.message.endsWith("true")) {} else {}

    } else if (request.message.startsWith("enable_sticky_tabs_")) {
        if (request.message.endsWith("true")) {
            sticky_tabs_emabled = true;
        } else {
            sticky_tabs_emabled = false;
            const remove_sticky_tabs = document.querySelectorAll(
                ".sticky_tab"
            );
            remove_sticky_tabs.forEach((s) => {
                s.remove();
            });
        }

    } else if (request.message.startsWith("ntw:")) {
        // console.log(request.message.substring(4));
        alert(request.message.substring(4));
    } else {}
});

function runTest() {
    console.log("runtest");
    chrome.runtime.sendMessage("", {
        type: "DCL",
    });
}

document.addEventListener('DOMContentLoaded', runTest());