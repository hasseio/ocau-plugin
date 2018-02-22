__ocau_plugin.observers.noQuoteExpand = {
    name: 'no-quote-expand',
    state: 'autoExpand',
    selector: '.quoteExpand',
    process: function(element) {
        var blockQuote = element.parentNode;
        var quote = blockQuote.querySelector('.quote');
        quote.style = "max-height: 1000px";

        element.remove();
    }
};


