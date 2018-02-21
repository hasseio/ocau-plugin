function removeAvatarFromPost(messageUserBlock) {
    var avatarHolder = messageUserBlock.querySelector('.avatarHolder');

    var newDiv = document.createElement('div');

    // find the onlineMarker, remove it, add it to the newDiv
    // find the OP set of ribbon divs, remove them, add them to the newDiv
    var children = avatarHolder.children;
    var onlineMarker = null;
    var desktopRibbon = null;
    var mobileRibbon = null;

    for (var i = 0; i < children.length; i++) {
        if(children[i].classList.contains('onlineMarker')) {
            onlineMarker = children[i];
        }

        if(children[i].classList.contains('desktopRibbon')) {
            desktopRibbon = children[i];
        }

        if(children[i].classList.contains('mobileRibbon')) {
            mobileRibbon = children[i];
        }
    }

    if(desktopRibbon !== null) {
        desktopRibbon.remove();

        ribbonWrapper = desktopRibbon.querySelector('.ribbon-wrapper');
        ribbonWrapper.style = "left: 160px; top: 0px; width: 36px";
        newDiv.appendChild(desktopRibbon);
    }

    if(mobileRibbon !== null) {
        mobileRibbon.remove();
        newDiv.appendChild(mobileRibbon);
    }

    if(onlineMarker !== null) {
        onlineMarker.remove();
        var newOnlineMarker = document.createElement('div');
        newOnlineMarker.style = "position: absolute; top: 0px; left: 0px; z-index: 6; border: 7px solid transparent; border-top-color: rgb(127, 185, 0); border-left-color: rgb(127, 185, 0); ";

        newDiv.appendChild(newOnlineMarker);
    }

    messageUserBlock.appendChild(newDiv);

    // remove the avatarholder div
    avatarHolder.remove();

    // The default message height is 100px. This adds alot of whitespace which is not needed when avatars are removed
    var message = messageUserBlock.parentNode.parentNode;
    var messageContent = message.querySelector('.messageContent');
    if(messageContent){
        messageContent.style = "min-height: 1px";
    }
};

__ocau_plugin.observers.noAvatarsOnThreads = {
    name: 'no-avatars-on-threads',
    state: 'hideAvatars',
    selector: '.extraUserInfo',
    process: function(element) {
        removeAvatarFromPost(element.parentNode);
    }
};

__ocau_plugin.observers.quickReplyAvatar= {
    name: 'quick-reply-avatar',
    state: 'hideAvatars',
    selector: '.quickReply .messageUserInfo',
    process: function(element) {
        element.remove();
    }
};

__ocau_plugin.observers.ajaxReplyAvatar= {
    name: 'ajax-reply-avatar',
    state: 'hideAvatars',
    selector: 'li[style*="opacity"]',
    process: function(element) {
        var messageUserBlock = element.querySelector('.messageUserBlock');
        removeAvatarFromPost(messageUserBlock);
    }
};

