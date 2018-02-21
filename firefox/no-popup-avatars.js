/*
 * Remove avatars from showing on popups
 */
__ocau_plugin.observers.noAlertsAvatar = {
    name: 'no-alerts-avatar',
    state: 'hideAvatars',
    selector: '.alertsPopup',
    process: function(element) {
        var avatars = element.querySelectorAll('.avatar');
        avatars.forEach(function(element){
            element.remove()
        });
    }
};

__ocau_plugin.observers.noInboxAvatar = {
    name: 'no-inbox-avatar',
    state: 'hideAvatars',
    selector: '.listPlaceholder div[class=""]:first-child',
    process: function(element) {
        var avatars = element.querySelectorAll('.avatar');
        avatars.forEach(function(element){
            element.remove()
        });
    }
};

__ocau_plugin.observers.noUserAvatar = {
    name: 'no-user-avatar',
    state: 'hideAvatars',
    selector: '.menuHeader .avatar',
    process: function(element) {
        element.remove();
    }
};
