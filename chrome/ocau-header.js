__ocau_plugin.observers.relinkOCAUHeaderLogo = {
    name: 'relink-ocau-header-logo',
    state: 'relinkOCAUHeaderLogo',
    selector: '#logo a',
    process: function(element) {
        element.href = "http://www.overclockers.com.au"
    }
};
