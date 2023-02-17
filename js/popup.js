// const font = document.getElementById('');
const remove_distractions = document.getElementById('remove_distractions_checkbox');
const restructure_text = document.getElementById('restructure_text_checkbox');
const display_num_text = document.getElementById('display_num_text_checkbox');
const enable_sticky_tabs = document.getElementById('enable_sticky_tabs_checkbox');
const settings = document.getElementById('actions');

// ************************************************************** Remove Distractions
remove_distractions.addEventListener('change', () => {
    if (remove_distractions.checked) {
        chrome.runtime.sendMessage('', {
            type: 'test',
            message: 'remove_distractions'
        });
    } else {
        chrome.runtime.sendMessage('', {
            type: 'test',
            message: 'undo_remove_distractions'
        });
    }
});

// ************************************************************** Restructure Text
restructure_text.addEventListener('change', () => {
    if (restructure_text.checked) {
        chrome.runtime.sendMessage('', {
            type: 'test',
            message: 'restructure_text'
        });
    } else {
        chrome.runtime.sendMessage('', {
            type: 'test',
            message: 'undo_restructure_text'
        });
    }
});

// ************************************************************** Diplay Number Text
display_num_text.addEventListener('change', () => {
    if (display_num_text.checked) {
        chrome.runtime.sendMessage('', {
            type: 'test',
            message: 'display_num_text'
        });
    } else {
        chrome.runtime.sendMessage('', {
            type: 'test',
            message: 'undo_display_num_text'
        });
    }
});

// ************************************************************** Enable Sticky Tabs
enable_sticky_tabs.addEventListener('change', () => {
    if (enable_sticky_tabs.checked) {
        chrome.runtime.sendMessage('', {
            type: 'test',
            message: 'enable_sticky_tabs'
        });
    } else {
        chrome.runtime.sendMessage('', {
            type: 'test',
            message: 'undo_enable_sticky_tabs'
        });
    }
});

// ************************************************************** settings
settings.addEventListener('click', () => {
    chrome.runtime.sendMessage('', {
        type: 'test',
        message: 'settings'
    });
});