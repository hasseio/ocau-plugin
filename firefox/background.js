
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
    return browser.webRequest.onBeforeRequest.hasListener(listener);
}

function removeListener() {
    browser.webRequest.onBeforeRequest.removeListener(listener);
}

function addListener() {
    var pattern = 'https://forums.overclockers.com.au/data/avatars/*';

    browser.webRequest.onBeforeRequest.addListener(listener, {urls: [pattern]}, ['blocking']);
}

function getState(cb) {
    function onError (error) {
        console.log(`Error in getting state from local storage: ${error}`);

        state = defaultState;
        cb();
    }

    function onSuccess(response) {
        state = response;
        cb();
    }

    browser.storage.local.get().then(onSuccess, onError);
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

browser.storage.onChanged.addListener(updateState);
browser.runtime.onMessage.addListener(onStateRequest);

getState(function() {
    if(state.hideAvatars) {
        addListener();
    } 
});
