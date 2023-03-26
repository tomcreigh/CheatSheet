function restoreOptions() {
    let font = "clear";
    chrome.storage.sync.get({
        font: true,
        remove_distractions: true,
        restructure_text: true,
        display_num_text: true,
        enable_sticky_tabs: true
    }, function(options) {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { type: 'pass', message: 'font_' + font });
        });
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { type: 'pass', message: 'remove_distractions_' + options.remove_distractions });
        });
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { type: 'pass', message: 'restructure_text_' + options.restructure_text });
        });
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { type: 'pass', message: 'display_num_text_' + options.display_num_text });
        });
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { type: 'pass', message: 'enable_sticky_tabs_' + options.enable_sticky_tabs });
        });
    });
}

chrome.runtime.onMessage.addListener((data) => {
    if (data.type === "pass") {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { message: data.message });
        });
    }
    if (data.type === "DCL") {
        console.log("recieved")
        restoreOptions();
    }
});

// ************************************************************** Diplay Number Text code block

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
    if (String(number).includes(",")) {
        number = parseInt(number.toString().replaceAll(",", ""));
        return ConvertIntToWords(number);
    } else if (String(number).includes(".")) {
        var tempNumArray = number.toString().split(".");
        return (
            ConvertIntToWords(parseInt(tempNumArray[0])) +
            " point " +
            ConvertIntToWords(parseInt(tempNumArray[1]))
        );
    } else if (isNaN(number)) {
        return number + " is not a number";
    } else {
        return ConvertIntToWords(number);
    }
}

// console.log(ConvertNumToWords(45896));

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "cheatsheat",
        title: "click to convert %s",
        contexts: ["selection"],
    });

    chrome.contextMenus.onClicked.addListener(function(info, tab) {
        // console.log(ConvertNumToWords(info.selectionText));
        num = ConvertNumToWords(info.selectionText);
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { message: "ntw:" + num });
        });
    });
});