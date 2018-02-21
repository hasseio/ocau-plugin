var defaultState = {
    hideAvatars: false,
    autoExpand: false,
    hideLike: false,
    relinkOCAUHeaderLogo: false
};

var state = defaultState;

function listener() {
    return { cancel: true };
}

function hasListener() {
    return chrome.webRequest.onBeforeRequest.hasListener(listener);
}

function removeListener() {
    chrome.webRequest.onBeforeRequest.removeListener(listener);
}

function addListener() {
    var pattern = 'https://forums.overclockers.com.au/data/avatars/*';

    chrome.webRequest.onBeforeRequest.addListener(listener, {urls: [pattern]}, ['blocking']);
}

function getState(cb) {
    function onError (error) {
        console.log(`Error in getting state from local storage: ${error}`);
        state = defaultState;
        cb();
    }

    function setState(response) {
        if(chrome.runtime.lastError) {
            onError(chrome.runtime.lastError);
        }

        state = response;
        cb();
    }

    chrome.storage.local.get(null, setState);
}

function updateState(changes, area) {
    var keys = Object.keys(changes);

    keys.forEach(function(key){
        state[key] = changes[key].newValue;
    });

    if(state.hideAvatars && !hasListener()) {
        addListener();
    } else if (!state.hideAvatars && hasListener()) {
        removeListener();
    }
}

function onStateRequest(request, sender, sendResponse) {
    sendResponse(state);
}

chrome.storage.onChanged.addListener(updateState);
chrome.runtime.onMessage.addListener(onStateRequest);

getState(function() {
    if(state.hideAvatars) {
        addListener();
    } 
});
