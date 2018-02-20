/*
 * Remove like functionality
 */
__ocau_plugin.observers.noLikeButton = {
    name: 'no-like-button',
    state: 'hideLike',
    selector: '.LikeLink',
    process: function(element) {
        element.remove();
    }
};

__ocau_plugin.observers.noLikes = {
    name: 'no-likes',
    state: 'hideLike',
    selector: '.likesSummary',
    process: function(element) {
        element.parentNode.remove();
    }
};

