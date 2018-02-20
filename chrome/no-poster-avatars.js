/*
 * Remove avatars from showing on the watched threads page
 */
__ocau_plugin.observers.noPosterAvatars = {
    name: 'no-poster-avatars',
    state: 'hideAvatars',
    selector: '.posterAvatar',
    process: function(element) {
        element.remove();
    }
};
