/*
 * Remove avatars from showing on popups
 */
__ocau_plugin.observers.noSidebarAvatar = {
    name: 'no-sidebar-avatar',
    state: 'hideAvatars',
    selector: '.avatar',
    process: function(element) {
        element.remove()
    }
};
