/*
 * Remove avatars from showing on popups
 */
__ocau_plugin.observers.noPopupAvatar = {
    name: 'no-popup-avatar',
    state: 'hideAvatars',
    selector: '.alertsPopup',
    process: function(element) {
        var avatars = element.querySelectorAll('.avatar');
        avatars.forEach(function(element){
            element.remove()
        });
    }
};
