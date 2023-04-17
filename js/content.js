// ************************************************************** Change Font
const head = document.head || document.getElementsByTagName("head")[0];
let sticky_tabs_emabled = false;
let display_num_text_emabled = false;
let style;
const font_obj_array = [{
        name: "public_sans",
        css: '@import url("https://fonts.googleapis.com/css?family=Public Sans"); *, body {font-family: "Public Sans", sans-serif !important;}',
    },
    {
        name: "roboto",
        css: '@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap"); *, body {font-family: "Roboto", sans-serif !important;}',
    },
];

function ClearFonts() {
    font_obj_array.forEach((font) => {
        if (document.getElementById(font.name)) {
            head.removeChild(document.getElementById(font.name));
            // console.log(font.name + " removed");
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
let original_num_nodes;
const tempNodes = [];

function RestructureText(from, to) {
    original_num_nodes = document.querySelectorAll("p,span,li,em,#text");
    for (let i = 0; i < original_num_nodes.length; i++) {
        tempNodes[i] = String(original_num_nodes[i].innerHTML).replaceAll(from, to);
        original_num_nodes[i] = "";
        original_num_nodes[i].innerHTML = tempNodes[i];
    }
}

// ************************************************************** Diplay Number Text
const numbersToWords = {
    0: "zero",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
    10: "ten",
    11: "eleven",
    12: "twelve",
    13: "thirteen",
    14: "fourteen",
    15: "fifteen",
    16: "sixteen",
    17: "seventeen",
    18: "eighteen",
    19: "nineteen",
    20: "twenty",
    30: "thirty",
    40: "forty",
    50: "fifty",
    60: "sixty",
    70: "seventy",
    80: "eighty",
    90: "ninety",
};

function ConvertIntToWords(number) {
    if (number in numbersToWords) return numbersToWords[number];

    let words = "";

    if (number >= 1000000000000000000) {
        words +=
            ConvertIntToWords(Math.floor(number / 1000000000000000000)) +
            " quintillion";
        number %= 1000000000000000000;
        if (number > 0 && words !== "") words += ", ";
    }

    if (number >= 1000000000000000) {
        words +=
            ConvertIntToWords(Math.floor(number / 1000000000000000)) + " quadrillion";
        number %= 1000000000000000;
        if (number > 0 && words !== "") words += ", ";
    }

    if (number >= 1000000000000) {
        words += ConvertIntToWords(Math.floor(number / 1000000000000)) + " tillion";
        number %= 1000000000000;
        if (number > 0 && words !== "") words += ", ";
    }

    if (number >= 1000000000) {
        words += ConvertIntToWords(Math.floor(number / 1000000000)) + " billion";
        number %= 1000000000;
        if (number > 0 && words !== "") words += ", ";
    }

    if (number >= 1000000) {
        words += ConvertIntToWords(Math.floor(number / 1000000)) + " million";
        number %= 1000000;
        if (number > 0 && words !== "") words += ", ";
    }

    if (number >= 1000) {
        words += ConvertIntToWords(Math.floor(number / 1000)) + " thousand";
        number %= 1000;
        if (number > 0 && words !== "") words += ", ";
    }

    if (number >= 100) {
        words += ConvertIntToWords(Math.floor(number / 100)) + " hundred";
        number %= 100;
    }

    if (number > 0) {
        if (words !== "") words += " and ";

        if (number < 20) words += numbersToWords[number];
        else {
            words += numbersToWords[Math.floor(number / 10) * 10];

            if (number % 10 > 0) {
                words += "-" + numbersToWords[number % 10];
            }
        }
    }

    return words;
}

function ConvertNumToWords(number) {
    //remove all commas from number
    if (String(number).includes(",")) {
        number = number.toString().replaceAll(",", "");
    }
    //check if number contains decimals
    if (String(number).includes(".")) {
        let tempNumArray = number.toString().split(".");
        let return_num_text =
            ConvertIntToWords(parseInt(tempNumArray[0])) + " point";
        //update numbers after decimals
        let testnum = tempNumArray[1].split("");
        testnum.forEach((e) => {
            return_num_text += " " + ConvertIntToWords(e);
        });
        return return_num_text;
    } else {
        return ConvertIntToWords(number);
    }
}

// add tooltip css
const num_css =
    "[num-data-tooltip] { position: relative; z-index: 2; cursor: pointer;} [num-data-tooltip]:before { position: absolute; bottom: 150%; left: 50%; margin-bottom: 5px; margin-left: -80px; padding: 7px; width: 160px; -webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px; background-color: #000; background-color: hsla(0, 0%, 20%, 0.9); color: #fff; content: attr(num-data-tooltip); text-align: center; font-family: sans-serif; font-size: 14px; line-height: 1.2; } [num-data-tooltip]:after { position: absolute; bottom: 150%; left: 50%; margin-left: -5px; width: 0; border-top: 5px solid #000; border-top: 5px solid hsla(0, 0%, 20%, 0.9); border-right: 5px solid transparent; border-left: 5px solid transparent; content: ' '; font-size: 0; line-height: 0; }";

numSstyle = document.createElement("style");
numSstyle.appendChild(document.createTextNode(num_css));
head.appendChild(numSstyle);

// update num when selected
let stored_num = "";

// add tool-tip on click
document.addEventListener("click", function(e) {
    if (display_num_text_emabled) {
        // create selection
        let selection = window.getSelection().toString();

        //check if selection is a num (pos/neg) (contains comma/decimal)
        if (selection.length > 0 && /^[-+]?[0-9,]*(\.[0-9]*)?$/.test(selection)) {
            //store original selection
            stored_num = selection;

            // add span to selection
            let range = window.getSelection().getRangeAt(0);
            let new_num_node = document.createElement("span");
            new_num_node.setAttribute("class", "selected-number");
            new_num_node.setAttribute(
                "num-data-tooltip",
                ConvertNumToWords(selection)
            );
            new_num_node.appendChild(document.createTextNode(selection));
            range.deleteContents();
            range.insertNode(new_num_node);
        }
    }
});

//remove tool-tip on deselect
document.addEventListener("mouseup", function(e) {
    if (stored_num.length > 0) {
        let span = document.querySelector(".selected-number");
        let original_num_node = document.createTextNode(stored_num);
        span.parentNode.replaceChild(original_num_node, span);
    }
    stored_num = "";
});

// ************************************************************** Enable Sticky Tabs
// define applicable random colours
const arrow_colour_array = [
    "#DBECF4",
    "#EDC5E6",
    "#CFC5E8",
    "#B3C2E4",
    "#B0CEE2",
    "#DDC6E9",
];
let arrow_colour_fill;

function randomColour(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// add sticky tabs at location on click
document.addEventListener("click", (event) => {
    let class_check = event.target.className.baseVal;
    // console.log(class_check);

    if (event.ctrlKey && sticky_tabs_emabled) {
        if (class_check == "sticky_tab") {
            // remove outermost node of sticky_tab
            event.target.parentNode.parentNode.parentNode.remove();
            // console.log('sticky tab removed');
        } else {
            // get coordinates
            x_loc = event.clientX + window.scrollX;
            y_loc = event.clientY + window.scrollY;
            screen_width = window.innerWidth;

            //   console.log('x: ' + x_loc);
            //   console.log('y: ' + y_loc);
            //   console.log('screen width: ' + screen_width);

            // update coordinates for point
            y_loc -= 20;

            // create shape div + inner divs
            new_sticky_tab_div = document.createElement("div");
            new_sticky_tab_div.setAttribute("class", "sticky_tab");
            new_sticky_tab_div.style.cssText = "position: absolute; z-index: 10";

            // randomly select arrow colour
            arrow_colour_fill = randomColour(arrow_colour_array);
            // define svgs
            const right_arrow =
                '<svg width="168" height="48" viewBox="0 0 168 48" fill="none" xmlns="http://www.w3.org/2000/svg" > <g filter="url(#filter0_d_322_41987)"> <path class="sticky_tab" d="M4 0H124L164 20L124 40H4V0Z" fill=' +
                arrow_colour_fill +
                ' /> </g> <defs> <filter id="filter0_d_322_41987" x="0" y="0" width="168" height="48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB" > <feFlood flood-opacity="0" result="BackgroundImageFix" /> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" /> <feOffset dy="4" /> <feGaussianBlur stdDeviation="2" /> <feComposite in2="hardAlpha" operator="out" /> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" /> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_322_41987" /> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_322_41987" result="shape" /> </filter> </defs> </svg>';
            const left_arrow =
                '<svg width="168" height="48" viewBox="0 0 168 48" fill="none" xmlns="http://www.w3.org/2000/svg" > <g filter="url(#filter0_d_322_41990)"> <path class="sticky_tab" d="M164 40L44 40L4 20L44 1.04907e-05L164 0L164 40Z" fill=' +
                arrow_colour_fill +
                ' /> </g> <defs> <filter id="filter0_d_322_41990" x="0" y="0" width="168" height="48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB" > <feFlood flood-opacity="0" result="BackgroundImageFix" /> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" /> <feOffset dy="4" /> <feGaussianBlur stdDeviation="2" /> <feComposite in2="hardAlpha" operator="out" /> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" /> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_322_41990" /> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_322_41990" result="shape" /> </filter> </defs> </svg>';

            // create & apply div specific svg
            if (x_loc <= screen_width / 2) {
                new_sticky_tab_div.innerHTML = right_arrow;
                x_loc -= 160;
            } else {
                new_sticky_tab_div.innerHTML = left_arrow;
            }

            new_sticky_tab_div.style.top = y_loc + "px";
            new_sticky_tab_div.style.left = x_loc + "px";

            // inject div & css
            document.body.appendChild(new_sticky_tab_div);
        }
    }
});

// ************************************************************** runtime
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // console.log(request.message);

    if (request.message.startsWith("font_")) {
        font = request.message.substring(5);
        // console.log(font);
        if (font !== "clear" && font !== "undefined") {
            UpdateFont(font);
        }
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
        if (request.message.endsWith("true")) {
            display_num_text_emabled = true;
            console.log(display_num_text_emabled);
        } else {
            display_num_text_emabled = false;
        }
    } else if (request.message.startsWith("enable_sticky_tabs_")) {
        if (request.message.endsWith("true")) {
            sticky_tabs_emabled = true;
        } else {
            sticky_tabs_emabled = false;
            const remove_sticky_tabs = document.querySelectorAll(".sticky_tab");
            remove_sticky_tabs.forEach((s) => {
                s.remove();
            });
        }
    } else if (request.message.startsWith("ntw:")) {
        // console.log(request.message.substring(4));
        alert(request.message.substring(4));
    } else {}

});

function loadOptions() {
    chrome.runtime.sendMessage("", {
        type: "DCL",
    });
}
document.addEventListener("DOMContentLoaded", loadOptions());