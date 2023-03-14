// ************************************************************** Change Font - declorations & functions
const head = document.head || document.getElementsByTagName("head")[0];
let sticky_tabs_emabled = false;
let style;
const font_obj_array = [
  {
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

// ************************************************************** nodes - declorations & functions
let text_nodes;
const tempNodes = [];

// let img_nodes;

const css_obj_array = [
  {
    name: "remove_distractions",
    css: "img, iframe {opacity: 40%; transition: 0.3s;}",
  },
];

function ToggleCss(css_obj_name) {
  if (document.getElementById(css_obj_name)) {
    head.removeChild(document.getElementById(css_obj_name));
    // console.log(css_obj_name);
  } else {
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
}

// ************************************************************** runtime
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request.message);

  switch (request.message) {
    // ************************************************************** Change Font
    case "public_sans":
      UpdateFont("public_sans");
      break;
    case "roboto":
      UpdateFont("roboto");
      break;
    case "clear":
      ClearFonts();
      break;
    // ************************************************************** Remove Distractions
    case "remove_distractions":
      // img_nodes = document.querySelectorAll("img,iframe");
      // img_nodes.forEach((n) => { n.style.opacity = "0.4"; })
      ToggleCss("remove_distractions");
      break;
    case "undo_remove_distractions":
      // img_nodes = document.querySelectorAll("img,iframe");
      // img_nodes.forEach((n) => { n.style.opacity = "1"; })
      ToggleCss("remove_distractions");
      break;
    // ************************************************************** Restructure Text
    case "restructure_text":
      text_nodes = document.querySelectorAll("p,span,li");
      for (let i = 0; i < text_nodes.length; i++) {
        tempNodes[i] = String(text_nodes[i].innerHTML).replaceAll(
          ". ",
          ".<br>"
        );
        text_nodes[i] = "";
        text_nodes[i].innerHTML = tempNodes[i];
      }
      break;
    case "undo_restructure_text":
      text_nodes = document.querySelectorAll("p,span,li");
      for (let i = 0; i < text_nodes.length; i++) {
        tempNodes[i] = String(text_nodes[i].innerHTML).replaceAll(
          ".<br>",
          ". "
        );
        text_nodes[i] = "";
        text_nodes[i].innerHTML = tempNodes[i];
      }
      break;
    // ************************************************************** Diplay Number Text
    case "display_num_text":
      break;
    case "undo_display_num_text":
      break;
    // ************************************************************** Enable Sticky Tabs
    case "enable_sticky_tabs":
      sticky_tabs_emabled = true;
      break;
    case "undo_enable_sticky_tabs":
      sticky_tabs_emabled = false;
      const remove_sticky_tabs = document.querySelectorAll(
        ".sticky_tab_generic_css"
      );
      remove_sticky_tabs.forEach((s) => {
        s.remove();
      });
      break;
    // ************************************************************** Settings
    case "settings":
      break;
    default:
      break;
  }

  if (request.message.startsWith("ntw:")) {
    // console.log(request.message.substring(4));
    alert(request.message.substring(4));
  }
});

// ************************************************************** Sticky Tabs
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

// ************************************************************** onload
// ************************************************************** check local storage
window.addEventListener("load", () => {
  chrome.runtime.sendMessage("", {
    type: "load",
  });
});
