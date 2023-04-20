const public_sans = document.getElementById("public_sans");
const roboto = document.getElementById("roboto");
const clear = document.getElementById("clear");
const current_font = document.getElementById("current_font");
let font;

const remove_distractions = document.getElementById(
  "remove_distractions_checkbox"
);
const restructure_text = document.getElementById("restructure_text_checkbox");
const display_num_text = document.getElementById("display_num_text_checkbox");
const enable_sticky_tabs = document.getElementById(
  "enable_sticky_tabs_checkbox"
);
const settings = document.getElementById("actions");

// ************************************************************** Change Font
// ************************************************************** Remove Distractions
// ************************************************************** Restructure Text
// ************************************************************** Diplay Number Text
// ************************************************************** Enable Sticky Tabs

function saveOptions() {
  chrome.storage.sync.set(
    {
      font: font,
      remove_distractions: remove_distractions.checked,
      restructure_text: restructure_text.checked,
      display_num_text: display_num_text.checked,
      enable_sticky_tabs: enable_sticky_tabs.checked,
    },
    function () {
      chrome.runtime.sendMessage("", { type: "pass", message: "font_" + font });
      chrome.runtime.sendMessage("", {
        type: "pass",
        message: "remove_distractions_" + remove_distractions.checked,
      });
      chrome.runtime.sendMessage("", {
        type: "pass",
        message: "restructure_text_" + restructure_text.checked,
      });
      chrome.runtime.sendMessage("", {
        type: "pass",
        message: "display_num_text_" + display_num_text.checked,
      });
      chrome.runtime.sendMessage("", {
        type: "pass",
        message: "enable_sticky_tabs_" + enable_sticky_tabs.checked,
      });
    }
  );
}

function restoreOptions() {
  chrome.storage.sync.get(
    {
      font: true,
      remove_distractions: true,
      restructure_text: true,
      display_num_text: true,
      enable_sticky_tabs: true,
    },
    function (options) {
      font = font;
      remove_distractions.checked = options.remove_distractions;
      restructure_text.checked = options.restructure_text;
      display_num_text.checked = options.display_num_text;
      enable_sticky_tabs.checked = options.enable_sticky_tabs;
    }
  );
}
document.addEventListener("DOMContentLoaded", restoreOptions);

function closeDropDown() {
  font_dropdown.classList.remove("show");
  font_button.classList.remove("selected");
  font_arrow.classList.remove("rotate");
}

function displayCurrentFont(font) {
  if (font === "clear") {
    current_font.textContent = font;
    current_font.classList.remove("show");
    // console.log(font);
  } else {
    current_font.textContent = font;
    current_font.classList.add("show");
  }
}

function set_font(f) {
  font = f;
  displayCurrentFont(font);
  closeDropDown();
}

public_sans.addEventListener("click", () => {
  set_font("public_sans");
  saveOptions();
});

roboto.addEventListener("click", () => {
  set_font("roboto");
  saveOptions();
});

clear.addEventListener("click", () => {
  set_font("clear");
  saveOptions();
});

var checkbox_nodes = document.getElementsByClassName("toggle-checkbox");
var i;
for (i = 0; i < checkbox_nodes.length; i++) {
  checkbox_nodes[i].addEventListener("click", saveOptions);
}

// ************************************************************** settings
settings.addEventListener("click", () => {
  // chrome.runtime.sendMessage("", {
  //     type: "pass",
  //     message: "settings",
  // });
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL("options.html"));
  }
});

// ****************************************************************************************************************************
// ************************************************************** Font Dropdown Menu
const font_button = document.getElementById("font_button");
const font_dropdown = document.getElementById("font_dropdown");
const font_arrow = document.getElementById("font_arrow");

font_button.addEventListener("click", () => {
  if (!font_dropdown.classList.contains("show")) {
    font_dropdown.classList.toggle("show");
    font_button.classList.toggle("selected");
    font_arrow.classList.toggle("rotate");
  } else {
    font_dropdown.classList.toggle("show");
    font_button.classList.toggle("selected");
    font_arrow.classList.toggle("rotate");
  }
});
