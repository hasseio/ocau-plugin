
/*
 * Load the state and init the plugin
 */
function handleError(error) {
    console.log(`Error in getting state: ${error}`);
}

// If the state indicates that an observer shouldn't be used, delete it
function initPlugin(state) {
    //console.log('state is back');
    var keys = Object.keys(__ocau_plugin.observers);
    
    keys.forEach(function(key) {
        var observer = __ocau_plugin.observers[key];
        if(!state[observer.state]) {
            //console.log('deleting', key);
            delete __ocau_plugin.observers[key];
        } else {
            //console.log('keeping', key);
        }
    });

    __ocau_plugin.loaded = true;
}

//console.log('getting state...');
var getState = chrome.runtime.sendMessage({}, initPlugin);

/*
 * Process all the nodes. We cache added nodes until the plugin has been init
 */
function debug(node) {
    if(node.nodeName === "LI") {
        //console.log('id: ', node.id, 'class(es): ', node.className);

        var index = 0;
        var item = node.attributes.item(index);
        while(item) {
            //console.log('\tattr: ', item.name, item.value);
            index++;
            item = node.attributes.item(index);
        }
    }
}

function processNode(node, keys) {
    if (node.nodeType === Node.ELEMENT_NODE) {
        for(var i = 0; i < keys.length; i++) {
            var observe = __ocau_plugin.observers[keys[i]];
            if(node.matches(observe.selector)) {
                observe.process(node);
            }
        } 
    } 
}

var mutationCache = [];

var observer = new MutationObserver(function(mutations) {
    //console.log('dom mutations coming in... ', __ocau_plugin.loaded);
    // State might not have come back yet from the background page, 
    // so the plugin is not fully initialised yet. But the page may
    // already have begun loading the dom so cache the mutations 
    // for later processing
    if(!__ocau_plugin.loaded) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                mutationCache.push(node);
            });
        });

        return;
    } 

    // state is loaded, process our cache if any
    var keys = Object.keys(__ocau_plugin.observers);
    if(mutationCache.length !== 0) {
        mutationCache.forEach(function(node){
            processNode(node, keys); 
        });

        mutationCache = [];
    }

    mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
            processNode(node, keys); 
        });
    });
});

observer.observe(document, { childList: true, subtree: true, attributes: true, characterData: true });
