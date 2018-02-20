__ocau_plugin.observers.noQuoteExpand = {
    name: 'no-quote-expand',
    state: 'autoExpand',
    selector: '.quoteExpand',
    process: function(element) {
        element.remove();
    }
};


