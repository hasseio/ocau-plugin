var state = {
    hideAvatars: false,
    autoExpand: false,
    hideLike: false,
    relinkOCAUHeaderLogo: false
};

// block all avatar image requests 
var avatarListener = null;
function catchAvatarRequests() {
    var pattern = 'https://forums.overclockers.com.au/data/avatars/*';

    return browser.webRequest.onBeforeRequest.addListener(function(){
            return { cancel: true };
        }, 
        {urls: [pattern]},
        ['blocking']);
}

function getOption(option) {
    function setOption(result) {
        //console.log('background', option, !!result[option]);
        state[option] = !!result[option];
    }

    function onError (error) {
        console.log(`Error in getting option ${option} from local storage: ${error}`);
        state[option] = false;
    }

    var optionPromise = browser.storage.local.get(option);
    optionPromise.then(setOption, onError);
}

function getState(cb) {
    getOption("hideAvatars");
    getOption("autoExpand");
    getOption("hideLike");
    getOption("relinkOCAUHeaderLogo");

    cb();
}

function updateState(changes, area) {
    //console.log('updateState', JSON.stringify(changes));
    var keys = Object.keys(changes);

    keys.forEach(function(key){
        state[key] = changes[key].newValue;
    });

    if(state.hideAvatars && !avatarListener) {
        avatarListener = catchAvatarRequests();
    } else if (!state.hideAvatars && avatarListener) {
        browser.webRequest.onBeforeRequest.removeListener(avartarListener);
        avatarListener = null;
    }
}

function onStateRequest(request, sender, sendResponse) {
    sendResponse(state);
}

browser.storage.onChanged.addListener(updateState);
browser.runtime.onMessage.addListener(onStateRequest);

getState(function() {
    if(state.hideAvatars) {
        console.log('setting listener');
        avatarListener = catchAvatarRequests();
    } 
});
