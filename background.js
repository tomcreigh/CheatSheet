function restoreOptions() {
  let font = "clear";
  chrome.storage.sync.get(
    {
      font: true,
      remove_distractions: true,
      restructure_text: true,
      display_num_text: true,
      enable_sticky_tabs: true,
    },
    function (options) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: "pass",
          message: "font_" + font,
        });
      });
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: "pass",
          message: "remove_distractions_" + options.remove_distractions,
        });
      });
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: "pass",
          message: "restructure_text_" + options.restructure_text,
        });
      });
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: "pass",
          message: "display_num_text_" + options.display_num_text,
        });
      });
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: "pass",
          message: "enable_sticky_tabs_" + options.enable_sticky_tabs,
        });
      });
    }
  );
}

chrome.runtime.onMessage.addListener((data) => {
  if (data.type === "pass") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { message: data.message });
    });
  }
  if (data.type === "DCL") {
    // console.log("recieved");
    restoreOptions();
  }
});
