const public_sans = document.getElementById('public_sans');
const roboto = document.getElementById('roboto');
const clear = document.getElementById('clear');

const remove_distractions = document.getElementById('remove_distractions_checkbox');
const restructure_text = document.getElementById('restructure_text_checkbox');
const display_num_text = document.getElementById('display_num_text_checkbox');
const enable_sticky_tabs = document.getElementById('enable_sticky_tabs_checkbox');
const settings = document.getElementById('actions');

// ************************************************************** Font Dropdown Menu
const font_button = document.getElementById('font_button');
const font_dropdown = document.getElementById('font_dropdown');
const font_arrow = document.getElementById('font_arrow');

font_button.addEventListener('click', () => {
    if (!font_dropdown.classList.contains('show')) {
        font_dropdown.classList.toggle('show');
        font_button.classList.toggle('selected');
        font_arrow.classList.toggle('rotate');
    } else {
        font_dropdown.classList.toggle('show');
        font_button.classList.toggle('selected');
        font_arrow.classList.toggle('rotate');
    }
});

// ************************************************************** Change Font
public_sans.addEventListener('click', () => {
    chrome.runtime.sendMessage('', {
        type: 'pass',
        message: 'public_sans'
    });
});

roboto.addEventListener('click', () => {
    chrome.runtime.sendMessage('', {
        type: 'pass',
        message: 'roboto'
    });
});

clear.addEventListener('click', () => {
    chrome.runtime.sendMessage('', {
        type: 'pass',
        message: 'clear'
    });
});

// ************************************************************** Remove Distractions
remove_distractions.addEventListener('change', () => {
    if (remove_distractions.checked) {
        chrome.runtime.sendMessage('', {
            type: 'pass',
            message: 'remove_distractions'
        });
    } else {
        chrome.runtime.sendMessage('', {
            type: 'pass',
            message: 'undo_remove_distractions'
        });
    }
});

// ************************************************************** Restructure Text
restructure_text.addEventListener('change', () => {
    if (restructure_text.checked) {
        chrome.runtime.sendMessage('', {
            type: 'pass',
            message: 'restructure_text'
        });
    } else {
        chrome.runtime.sendMessage('', {
            type: 'pass',
            message: 'undo_restructure_text'
        });
    }
});

// ************************************************************** Diplay Number Text
display_num_text.addEventListener('change', () => {
    if (display_num_text.checked) {
        chrome.runtime.sendMessage('', {
            type: 'pass',
            message: 'display_num_text'
        });
    } else {
        chrome.runtime.sendMessage('', {
            type: 'pass',
            message: 'undo_display_num_text'
        });
    }
});

// ************************************************************** Enable Sticky Tabs
enable_sticky_tabs.addEventListener('change', () => {
    if (enable_sticky_tabs.checked) {
        chrome.runtime.sendMessage('', {
            type: 'pass',
            message: 'enable_sticky_tabs'
        });
    } else {
        chrome.runtime.sendMessage('', {
            type: 'pass',
            message: 'undo_enable_sticky_tabs'
        });
    }
});

// ************************************************************** settings
settings.addEventListener('click', () => {
    chrome.runtime.sendMessage('', {
        type: 'pass',
        message: 'settings'
    });
});